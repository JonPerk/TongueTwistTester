/**
 * @file ./statelessHandlers.spec.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Test module for stateless intent handlers
 * @module statelessHandlers.spec
 *
 */
var index = require('../../src/index'),
	statelessHandlers = require('../../src/statelessHandlers'),
	eventHandlers = require('../../src/eventHandlers'),
	speechHandlers = require('../../src/speechHandlers'),
    framework = require('../alexa-test-framework'),
	context = require('aws-lambda-mock-context'),
	tests = framework.json.statelessHandlers.tests;

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

/** Test Alexa skill intents positive case */
describe('statelessHandlers - positive tests', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	let testNames = ['testLaunchIntent', 'testRepeatIntentNoTwister', 
		'testRepeatIntentWithTwister', 'testHelpIntent', 'testNoScoreStopIntent', 
		'testZeroScoreStopIntent', 'testScoreStopIntent', 'testNoScoreCancelIntent', 
		'testZeroScoreCancelIntent', 'testScoreCancelIntent'];
	let i = 0;
	let response;
	let error;
	let test;
	
    framework.beforeEachMatchers();
	
	beforeEach(function(done){
			test = tests[testNames[i]];
			let ctx = context();
			ctx.Promise
				.then(resp => {
					console.log("success: " + resp);
					response = resp;
					done();
				})
				.catch(err => {
					console.log("failed: " + err);
					error = err;
					done();
				});
			intent = test.request;
			//spyOn(statelessHandlers, test.request.request.intent.name).andCallThrough();
			
			if(test.handlerType === 'event'){
				spyOn(eventHandlers.statelessHandlers, test.response).andCallFake(function(){ console.log(JSON.stringify(this));ctx.succeed(test.response); });
			} else {
				spyOn(speechHandlers.statelessHandlers, test.response).andCallFake(function(){ ctx.succeed(test.response); });
				spyOn(speechHandlers.gameModeHandlers, test.response).andCallFake(function(){ ctx.succeed(test.response); });
			}
			
			index.handler(intent, ctx, response);
	});
	
    it('testLaunchIntent - get newSession intent', function() {
		expect(testNames[i]).toBe(testNames[0]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	it('testRepeatIntentWithTwister - get repeatSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[1]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	it('testRepeatIntentNoTwister - get repeatSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[2]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	it('testHelpIntent - get helpSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[3]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	it('testNoScoreStopIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[4]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	it('testZeroScoreStopIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[5]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	it('testScoreStopIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[6]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	it('testNoScoreCancelIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[7]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	it('testZeroScoreCancelIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[8]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	it('testScoreCancelIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[9]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(error).toBeUndefined();
    });
	
	afterEach(function(){
		this.removeAllSpies();
		response = undefined;
		error = undefined;
		i++;
	});
});

/** Test Alexa skill intents negative case */
describe('statelessHandlers - unhandled intent test', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	let testNames = ['testBadIntent', 'testAttemptIntent', 'testYesIntent', 'testNoIntent'];
	let i = 0;
	let response;
	let error;
	let test;
	
    framework.beforeEachMatchers();
	
	beforeEach(function(done){
			test = tests[testNames[i]];
			let ctx = context();
			ctx.Promise
				.then(resp => {
					console.log("succeeded: " + resp);
					response = resp;
					done();
				})
				.catch(err => {
					console.log("failed: " + err);
					error = err;
					done();
				});
			intent = test.request;
			spyOn(statelessHandlers, 'Unhandled').andCallThrough();
			
			if(test.handlerType === 'event'){
				spyOn(eventHandlers.statelessHandlers, test.response).andCallFake(function(){ ctx.succeed(test.response); });
			} else {
				spyOn(speechHandlers.statelessHandlers, test.response).andCallFake(function(){ ctx.succeed(test.response); });
			}
			
			index.handler(intent, ctx, response);
	});
	
	it('testBadIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[0]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(statelessHandlers.Unhandled).toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	it('testAttemptIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[1]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(statelessHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	it('testYesIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[2]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(statelessHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	it('testNoIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[3]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(test.response);
		expect(statelessHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	afterEach(function(){
		this.removeAllSpies();
		response = undefined;
		error = undefined;
		i++;
	});
});