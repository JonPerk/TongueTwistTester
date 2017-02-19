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
	var testNames = ['testLaunchIntent', 'testRepeatIntent', 'testHelpIntent', 
		'testNoScoreStopIntent', 'testZeroScoreStopIntent', 'testScoreStopIntent', 
		'testNoScoreCancelIntent', 'testZeroScoreCancelIntent', 'testScoreCancelIntent'];
	var i = 0;
	var response;
	var error;
	var test;
	
    framework.beforeEachMatchers();
	
	beforeEach(function(done){
			test = testNames[i];
			var ctx = context();
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
			intent = tests[test].request;
			//spyOn(statelessHandlers, tests[test].request.request.intent.name).andCallThrough();
			
			if(tests[test].handlerType === 'event'){
				spyOn(eventHandlers, tests[test].response).andCallFake(function(){ ctx.succeed(tests[test].response); });
			} else {
				spyOn(speechHandlers, tests[test].response).andCallFake(function(){ ctx.succeed(tests[test].response); });
			}
			
			index.handler(intent, ctx, response);
	});
	
    it('testLaunchIntent - get newSession intent', function() {
		expect(testNames[i]).toBe(testNames[0]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(error).toBeUndefined();
    });
	
	it('testRepeatIntent - get repeatSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[1]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(error).toBeUndefined();
    });
	
	it('testHelpIntent - get helpSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[2]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(error).toBeUndefined();
    });
	
	it('testNoScoreStopIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[3]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(error).toBeUndefined();
    });
	
	it('testZeroScoreStopIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[4]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(error).toBeUndefined();
    });
	
	it('testScoreStopIntent - get scoreSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[5]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(error).toBeUndefined();
    });
	
	it('testNoScoreCancelIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[6]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(error).toBeUndefined();
    });
	
	it('testZeroScoreCancelIntent - get goodbyeSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[7]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(error).toBeUndefined();
    });
	
	it('testScoreCancelIntent - get scoreSpeech intent', function() {
		expect(testNames[i]).toBe(testNames[8]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(error).toBeUndefined();
    });
	
	afterEach(function(){
		response = undefined;
		error = undefined;
		i++;
	});
});

/** Test Alexa skill intents negative case */
describe('statelessHandlers - unhandled intent test', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	var testNames = ['testBadIntent', 'testAttemptIntent', 'testYesIntent',
		'testNoIntent', 'testBadRepeatIntent', 'testEmptyRepeatIntent'];
	var i = 0;
	var response;
	var error;
	var test;
	
    framework.beforeEachMatchers();
	
	beforeEach(function(done){
			test = testNames[i];
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
			intent = tests[test].request;
			spyOn(statelessHandlers, 'Unhandled').andCallThrough();
			
			if(tests[test].handlerType === 'event'){
				spyOn(eventHandlers, tests[test].response).andCallFake(function(){ ctx.succeed(tests[test].response); });
			} else {
				spyOn(speechHandlers, tests[test].response).andCallFake(function(){ ctx.succeed(tests[test].response); });
			}
			
			index.handler(intent, ctx, response);
	});
	
	it('testBadIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[0]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(statelessHandlers.Unhandled).toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	it('testAttemptIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[1]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(statelessHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	it('testYesIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[2]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(statelessHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	it('testNoIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[3]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(statelessHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	it('testBadRepeatIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[4]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(statelessHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	it('testEmptyRepeatIntent - should return unhandledSpeech', function() {
		expect(testNames[i]).toBe(testNames[5]);
		expect(response).not.toBeUndefined();
		expect(response).toBe(tests[test].response);
		expect(statelessHandlers.Unhandled).not.toHaveBeenCalled();
		expect(error).toBeUndefined();
    });
	
	afterEach(function(){
		response = undefined;
		error = undefined;
		i++;
	});
});