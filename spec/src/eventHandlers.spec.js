/**
 * @file ./eventHandlers.spec.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Test module for events
 * @module eventHandlersHandlers.spec
 *
 */
var index = require('../../src/index'),
	statelessHandlers = require('../../src/statelessHandlers'),
	eventHandlers = require('../../src/eventHandlers'),
	speechHandlers = require('../../src/speechHandlers'),
	gameModeIntentHandlers = require('../../src/gameModeIntentHandlers'),
	repeatModeIntentHandlers = require('../../src/repeatModeIntentHandlers'),
	continueModeIntentHandlers = require('../../src/continueModeIntentHandlers'),
	twisterHelper = require('../../src/twisterHelper'),
    framework = require('../alexa-test-framework'),
	context = require('aws-lambda-mock-context'),
	tests = framework.json.eventHandlers.tests;

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

/** Test event handlers */
describe('eventHandlers - tests', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	var testNames = ['testNewSession', 'testNewSessionGameMode', 'testNewSessionRepeatMode', 'testNewSessionContinueMode', 
		'testNewSessionTwisterError'];
	var i = 0;
	var response;
	var error;
	var test;
	
    framework.beforeEachMatchers();
	
	beforeEach(function(done){
		test = tests[testNames[i]];
		// context for call to intentHandler
		var ctx = context();
		// context for call from eventHandler
		var ctx2 = context();
		ctx.Promise
			.then(resp => {
				response = resp;
				index.handler(intent, ctx2, null);
			})
			.catch(err => {
				console.log("first call failed: " + err);
				error = err;
				done();
			});
		ctx2.Promise
			.then(resp => {
				response = resp;
				index.handler(intent, ctx, null);
				done();
			})
			.catch(err => {
				console.log("final failed: " + err);
				error = err;
				done();
			});
		intent = test.request;
		spyOn(eventHandlers[test.eventStateHandler], test.requestName).andCallThrough();
		spyOn(twisterHelper, 'getNewTwister').andCallFake(function(){
			return new Promise(function(resolve, reject){
				if(test.resolvePromise){
					resolve(test.response.twister);
				} else {
					reject('Error retrieving twister');
				}
			});
		});
		
		// spies for intent sent from eventHandler
		if(test.requestHandlerType === 'event'){
			spyOn(eventHandlers[test.eventStateHandler], test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				if(this.handler.state){
					this.emitWithState(test.requestName);
				} else {
					this.emit(test.requestName);
				}
				ctx.succeed(test.requestName); 
			});
		} else if(test.requestHandlerType === 'gameMode'){
			// since I haven't found a way to set mock the state in an intent we mock the statelessHandlers and bounce the call to the correct state
			spyOn(statelessHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emitWithState(test.request.request.intent.name);
			});
			spyOn(gameModeIntentHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emitWithState(test.requestName); 
			});
		} else if(test.requestHandlerType === 'repeatMode'){
			// since I haven't found a way to set mock the state in an intent we mock the statelessHandlers and bounce the call to the correct state
			spyOn(statelessHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emitWithState(test.request.request.intent.name);
			});
			spyOn(repeatModeIntentHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emitWithState(test.requestName);
			});
		} else if(test.requestHandlerType === 'continueMode'){
			// since I haven't found a way to set mock the state in an intent we mock the statelessHandlers and bounce the call to the correct state
			spyOn(statelessHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emitWithState(test.request.request.intent.name);
			});
			spyOn(continueModeIntentHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emitWithState(test.requestName);
			});
		} else {
			spyOn(statelessHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emit(test.requestName);
			});
		}
		
		// spies for intent sent from eventHandler
		if(test.response.handlerType === 'event'){
			spyOn(eventHandlers[test.response.stateHandler], test.response.intent).andCallFake(function(){ 
				buildResponse(this, test, response, ctx2);
			});
		} else if(test.response.handlerType === 'gameMode'){
			spyOn(gameModeIntentHandlers, test.response.intent).andCallFake(function(){ 
				buildResponse(this, test, response, ctx2);
			});
		} else if(test.response.handlerType === 'repeatMode'){
			spyOn(repeatModeIntentHandlers, test.response.intent).andCallFake(function(){ 
				buildResponse(this, test, response, ctx2);
			});
		} else if(test.response.handlerType === 'continueMode'){
			spyOn(continueModeIntentHandlers, test.response.intent).andCallFake(function(){ 
				buildResponse(this, test, response, ctx2); 
			});
		} else {
			spyOn(speechHandlers[test.response.stateHandler], test.response.intent).andCallFake(function(){
				buildResponse(this, test, response, ctx2);
			});
		}
		
		index.handler(intent, ctx, null);
	});
	
	it('testNewSession - get welcomeSpeech intent - positive case', function() {
		validate(testNames, i, 0, test, response, error);
    });
	
	it('testNewSessionGameMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 1, test, response, error);
    });
	
	it('testNewSessionRepeatMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 2, test, response, error);
    });
	
	it('testNewSessionContinueMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 3, test, response, error);
    });
	
	it('testNewSessionTwisterError - get fatalSpeech intent - negative case', function() {
		validate(testNames, i, 4, test, response, error);
    });
	
	afterEach(function(){
		this.removeAllSpies();
		response = undefined;
		error = undefined;
		i++;
	});
	
	function buildResponse(context, test, response, callback){
		response = {};
		response.handlerType = test.response.handlerType;
		response.stateHandler = test.response.stateHandler;
		response.intent = context.name.replace(context.handler.state, '');
		response.state = context.handler.state;
		if(context.attributes.twister)
			response.twister = context.attributes.twister;
		if(context.attributes.score !== undefined)
			response.score = context.attributes.score;
		if(context.attributes.completed)
			response.completed = context.attributes.completed;
		if(context.attributes.skipped)
			response.skipped = context.attributes.skipped;
		callback.succeed(response); 
	}
	
	function validate(testNames, index, expectedIndex, test, response, error){
		expect(testNames[index]).toBe(testNames[expectedIndex]);
		expect(eventHandlers[test.eventStateHandler][test.requestName]).toHaveBeenCalled();
		expect(response).not.toBeUndefined();
		expect(response).toEqual(test.response);
		expect(error).toBeUndefined();
	}
});