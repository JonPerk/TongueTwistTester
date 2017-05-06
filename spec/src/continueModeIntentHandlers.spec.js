/**
 * @file ./continueModeIntentHandlers.spec.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Test intent requests from Amazon Alexa for CONTINUE_MODE state
 * @module continueModeIntentHandlersTest
 *
 */

var index = require('../../src/index'),
	continueModeIntentHandlers = require('../../src/continueModeIntentHandlers'),
	statelessHandlers = require('../../src/statelessHandlers'),
	eventHandlers = require('../../src/eventHandlers'),
	speechHandlers = require('../../src/speechHandlers'),
    framework = require('../alexa-test-framework'),
	context = require('aws-lambda-mock-context'),
	tests = framework.json.continueModeIntentHandlers.tests;

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

/** continueModeIntentHandlers Test Alexa skill continue mode intents */
describe('continueModeIntentHandlers tests', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	let testNames = ['testAttemptIntent', 'testRepeatIntent', 'testHelpIntent', 
		'testNoScoreStopIntent', 'testZeroScoreStopIntent', 'testScoreStopIntent', 
		'testNoScoreCancelIntent', 'testZeroScoreCancelIntent', 'testScoreCancelIntent',
		'testLaunchIntent', 'testYesIntent', 'testNoIntent', 'testNoIntentZero', 'testNoIntentScore'];
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
		spyOn(continueModeIntentHandlers, 'Unhandled').andCallThrough();
		spyOn(statelessHandlers, intent.request.intent.name).andCallFake(function(){ 
			this.handler.state = "_CONTINUE_MODE";
			this.emitWithState(intent.request.intent.name);
		});
		
		if(test.handlerType === 'event'){
			spyOn(eventHandlers.continueModeHandlers, test.response).andCallFake(function(){ ctx.succeed(test.response); });
		} else {
			spyOn(speechHandlers.continueModeHandlers, test.response).andCallFake(function(){ ctx.succeed(test.response); });
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
	
	it('testYesIntent - should return newTwister event', function() {
		validate(testNames, i, 10, test, response, error);
    });
	
	it('testNoIntent - should return goodbyeSpeech', function() {
		validate(testNames, i, 11, test, response, error);
    });
	
	it('testNoIntentZero - should return goodbyeSpeech', function() {
		validate(testNames, i, 12, test, response, error);
    });
	
	it('testNoIntentScore - should return goodbyeSpeech', function() {
		validate(testNames, i, 13, test, response, error);
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
		expect(continueModeIntentHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
	}
	
	afterEach(function(){
		this.removeAllSpies();
		response = undefined;
		error = undefined;
		i++;
	});
});