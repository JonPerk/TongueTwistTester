/**
 * @file ./gameModeIntentHandlers.spec.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Test intent requests from Amazon Alexa for GAME_MODE state
 * @module gameModeIntentHandlersTest
 *
 */

var index = require('../../src/index'),
	gameModeIntentHandlers = require('../../src/gameModeIntentHandlers'),
	statelessHandlers = require('../../src/statelessHandlers'),
	eventHandlers = require('../../src/eventHandlers'),
	speechHandlers = require('../../src/speechHandlers'),
    framework = require('../alexa-test-framework'),
	context = require('aws-lambda-mock-context'),
	tests = framework.json.gameModeIntentHandlers.tests;

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

/** gameModeIntentHandlers Test Alexa skill game mode intents */
describe('gameModeIntentHandlers tests', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	var testNames = ['testAttemptIntent', 'testRepeatIntent', 'testHelpIntent', 
		'testNoScoreStopIntent', 'testZeroScoreStopIntent', 'testScoreStopIntent', 
		'testNoScoreCancelIntent', 'testZeroScoreCancelIntent', 'testScoreCancelIntent',
		'testLaunchIntent', 'testYesIntent', 'testNoIntent', 'testBadRepeatIntent', 'testEmptyRepeatIntent'];
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
		spyOn(gameModeIntentHandlers, 'Unhandled').andCallThrough();
		spyOn(statelessHandlers, intent.request.intent.name).andCallFake(function(){ 
			this.handler.state = "_GAME_MODE";
			this.emitWithState(intent.request.intent.name);
		});
		
		if(test.handlerType === 'event'){
			spyOn(eventHandlers.gameModeHandlers, test.response).andCallFake(function(){ ctx.succeed(test.response); });
		} else {
			spyOn(speechHandlers.gameModeHandlers, test.response).andCallFake(function(){ ctx.succeed(test.response); });
		}
		
		index.handler(intent, ctx, response);
    });
	
    it('testAttemptIntent - get validate intent', function() {
    	validate(testNames, i, 0, test, response, error);
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
	
	it('testScoreStopIntent - get scoreSpeech intent', function() {
		validate(testNames, i, 5, test, response, error);
    });
	
	it('testNoScoreCancelIntent - get goodbyeSpeech intent', function() {
		validate(testNames, i, 6, test, response, error);
    });
	
	it('testZeroScoreCancelIntent - get goodbyeSpeech intent', function() {
		validate(testNames, i, 7, test, response, error);
    });
	
	it('testScoreCancelIntent - get scoreSpeech intent', function() {
		validate(testNames, i, 8, test, response, error);
    });
	
	it('testLaunchIntent - should return unhandledSpeech', function() {
		validateNegative(testNames, i, 9, test, response, error);
    });
	
	it('testYesIntent - should return unhandledSpeech', function() {
		validateNegative(testNames, i, 10, test, response, error);
    });
	
	it('testNoIntent - should return unhandledSpeech', function() {
		validateNegative(testNames, i, 11, test, response, error);
    });
	
	it('testBadRepeatIntent - should return unhandledSpeech', function() {
		validateNegative(testNames, i, 12, test, response, error);
    });
	
	it('testEmptyRepeatIntent - should return unhandledSpeech', function() {
		validateNegative(testNames, i, 13, test, response, error);
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
		expect(gameModeIntentHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
	}
	
	afterEach(function(){
		this.removeAllSpies();
		response = undefined;
		error = undefined;
		i++;
	});
});