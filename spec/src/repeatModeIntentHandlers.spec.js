/**
 * @file ./repeatModeIntentHandlers.spec.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Test intent requests from Amazon Alexa for REPEAT_MODE state
 * @module repeatModeIntentHandlersTest
 *
 */

var index = require('../../src/index'),
	repeatModeIntentHandlers = require('../../src/repeatModeIntentHandlers'),
	statelessHandlers = require('../../src/statelessHandlers'),
	eventHandlers = require('../../src/eventHandlers'),
	speechHandlers = require('../../src/speechHandlers'),
    framework = require('../alexa-test-framework'),
	context = require('aws-lambda-mock-context'),
	tests = framework.json.repeatModeIntentHandlers.tests;

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

/** repeatModeIntentHandlers Test Alexa skill repeat mode intents */
describe('repeatModeIntentHandlers tests', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	var testNames = ['testAttemptIntent', 'testRepeatIntent', 'testHelpIntent', 
		'testNoScoreStopIntent', 'testZeroScoreStopIntent', 'testScoreStopIntent', 
		'testNoScoreCancelIntent', 'testZeroScoreCancelIntent', 'testScoreCancelIntent',
		'testLaunchIntent', 'testYesIntent', 'testYesIntentNoTwister', 'testNoIntent', 
		'testNoIntentNoSkipped', 'testNoIntentNoTwister'];
	var i = 0;
	var response;
	var error;
	var test;
	
    framework.beforeEachMatchers();
	
    beforeEach(function(done){
		test = tests[testNames[i]];
		var ctx = context();
		ctx.Promise
			.then(resp => {
				console.log("succeeded: " + JSON.stringify(resp, null, 2));
				response = resp;
				done();
			})
			.catch(err => {
				console.log("failed: " + err);
				error = err;
				done();
			});
		intent = test.request;
		spyOn(repeatModeIntentHandlers, 'Unhandled').andCallThrough();
		spyOn(statelessHandlers, intent.request.intent.name).andCallFake(function(){ 
			this.handler.state = "_REPEAT_MODE";
			this.emitWithState(intent.request.intent.name);
		});
		
		if(test.handlerType === 'event'){
			if(test.handlerState === '_GAME_MODE'){
				spyOn(eventHandlers.gameModeHandlers, test.response.intent).andCallFake(function(){ ctx.succeed(test.response); });
			} else if(test.handlerState === '_CONTINUE_MODE') {
				spyOn(eventHandlers.continueModeHandlers, test.response.intent).andCallFake(function(){ ctx.succeed(test.response); });
			} else {
				spyOn(eventHandlers.repeatModeHandlers, test.response.intent).andCallFake(function(){ ctx.succeed(test.response); });
			}
		} else {
			if(test.handlerState === '_GAME_MODE'){
				spyOn(speechHandlers.gameModeHandlers, test.response.intent).andCallFake(function(){ ctx.succeed(test.response); });
			} else if(test.handlerState === '_CONTINUE_MODE') {
				spyOn(speechHandlers.continueModeHandlers, test.response.intent).andCallFake(function(){ ctx.succeed(test.response); });
			} else {
				spyOn(speechHandlers.repeatModeHandlers, test.response.intent).andCallFake(function(){ ctx.succeed(test.response); });
			}
		}
		
		index.handler(intent, ctx, response);
    });
	
    it('testAttemptIntent - get unhandledSpeech intent', function() {
    	validateNegative(testNames, i, 0, test, response, error);
    });
	
	it('testRepeatIntent - get repeatSpeech intent', function() {
		validate(testNames, i, 1, test, response, error);
    });
	
	it('testHelpIntent - get helpSpeech intent', function() {
		validate(testNames, i, 2, test, response, error);
    });
	
	it('testNoScoreStopIntent - get goodbyeSpeech intent', function() {
		validate(testNames, i, 3, test, response, error);
    });
	
	it('testZeroScoreStopIntent - get goodbyeSpeech intent', function() {
		validate(testNames, i, 4, test, response, error);
    });
	
	it('testScoreStopIntent - get goodbyeSpeech intent', function() {
		validate(testNames, i, 5, test, response, error);
    });
	
	it('testNoScoreCancelIntent - get goodbyeSpeech intent', function() {
		validate(testNames, i, 6, test, response, error);
    });
	
	it('testZeroScoreCancelIntent - get goodbyeSpeech intent', function() {
		validate(testNames, i, 7, test, response, error);
    });
	
	it('testScoreCancelIntent - get goodbyeSpeech intent', function() {
		validate(testNames, i, 8, test, response, error);
    });
	
	it('testLaunchIntent - should return unhandledSpeech', function() {
		validateNegative(testNames, i, 9, test, response, error);
    });
	
	it('testYesIntent - should return sayTwister speech', function() {
		validate(testNames, i, 10, test, response, error);
    });
	
	it('testYesIntentNoTwister - should return fatalSpeech', function() {
		validateNegative(testNames, i, 11, test, response, error);
    });
	
	it('testNoIntent - should return continueSpeech', function() {
		validate(testNames, i, 12, test, response, error);
    });
	
	it('testNoIntentNoSkipped - should return continueSpeech', function() {
		validate(testNames, i, 13, test, response, error);
    });
	
	it('testNoIntentNoTwister - should return fatalSpeech', function() {
		validateNegative(testNames, i, 14, test, response, error);
    });
	
	function validate(testNames, index, expectedIndex, test, response, error){
		expect(testNames[index]).toBe(testNames[expectedIndex]);
		expect(response).not.toBeUndefined();
		expect(response).toEqual(test.response);
		expect(error).toBeUndefined();
	}
	
	function validateNegative(testNames, index, expectedIndex, test, response, error){
		expect(testNames[index]).toBe(testNames[expectedIndex]);
		expect(response).not.toBeUndefined();
		expect(response).toEqual(test.response);
		expect(repeatModeIntentHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
	}
	
	afterEach(function(){
		this.removeAllSpies();
		response = undefined;
		error = undefined;
		i++;
	});
});