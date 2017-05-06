/**
 * @file ./speechHandlers.spec.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Test module for speeches
 * @module speechHandlersHandlers.spec
 *
 */
var index = require('../../src/index'),
	statelessHandlers = require('../../src/statelessHandlers'),
	speechHandlers = require('../../src/speechHandlers'),
	eventHandlers = require('../../src/eventHandlers'),
	gameModeIntentHandlers = require('../../src/gameModeIntentHandlers'),
	repeatModeIntentHandlers = require('../../src/repeatModeIntentHandlers'),
	continueModeIntentHandlers = require('../../src/continueModeIntentHandlers'),
	twisterHelper = require('../../src/twisterHelper'),
    framework = require('../alexa-test-framework'),
	context = require('aws-lambda-mock-context'),
	tests = framework.json.speechHandlers.tests;
	
var terminateRequest = {
		"session": {
			"sessionId": "terminate",
			"application": {
				"applicationId": "amzn1.ask.skill.3f0a383b-3e3f-430b-b8cd-34ed3ab5a2b0"
			},
			"attributes": {},
			"user": {
				"userId": "testAccount"
			},
			"new": true
		},
		"request": {
			"type": "IntentRequest",
			"locale": "en-US",
			"intent": {
				"name": "endSession"
			}
		},
		"version": "1.0"
	}

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

/** Test speech handlers */
describe('speechHandlers - tests', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	let testNames = ['testWelcomeSpeech', 'testWelcomeSpeechGameMode', 'testWelcomeSpeechRepeatMode', 'testWelcomeSpeechContinueMode', 
		'testWelcomeSpeechTwisterError', 'testCorrectSpeech', 'testCorrectSpeechGameMode', 'testCorrectSpeechRepeatMode',
		'testCorrectSpeechContinueMode', 'testCorrectSpeechContinueModeMultiscore', 'testCorrectSpeechScoreError',
		'testIncorrectSpeech', 'testIncorrectSpeechGameMode', 'testIncorrectSpeechRepeatMode', 'testIncorrectSpeechRepeatModeNoAttempt', 
		'testIncorrectSpeechContinueMode', 'testSayTwisterSpeech', 'testSayTwisterSpeechGameMode', 'testSayTwisterSpeechRepeatMode',
		'testSayTwisterSpeechContinueMode', 'testSayTwisterSpeechTwisterError', 'testGoodbyeSpeech', 'testGoodbyeSpeechWithMode', 
		'testGoodbyeSpeechSingleScore', 'testGoodbyeSpeechMultiscore', 'testWinSpeech', 'testWinSpeechWithMode',
		'testContinueSpeech', 'testContinueSpeechWrongMode', 'testRetrySpeech', 'testRetrySpeechWrongMode'];
	let i = 0;
	let response;
	let error;
	let test;
	
    framework.beforeEachMatchers();
	
	beforeEach(function(done){
		test = tests[testNames[i]];
		// context for call to speechHandler
		let ctx = context();
		let ctx2 = context();

		ctx.Promise
			.then(resp => {
				response = resp;
				index.handler(terminateRequest, ctx2, null);
			})
			.catch(err => {
				console.log("first call failed: " + err);
				error = err;
				done();
			});
		
		ctx2.Promise
		.then(resp => {
			done();
		})
		.catch(err => {
			done();
		});
		
		intent = test.request;
		
		if(test.requestHandlerType === 'gameMode'){
			// since I haven't found a way to set mock the state in an intent we mock the statelessHandlers and bounce the call to the correct state
			spyOn(speechHandlers.statelessHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emitWithState(test.request.request.intent.name);
			});
		} else if(test.requestHandlerType === 'repeatMode'){
			// since I haven't found a way to set mock the state in an intent we mock the statelessHandlers and bounce the call to the correct state
			spyOn(speechHandlers.statelessHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emitWithState(test.request.request.intent.name);
			});
		} else if(test.requestHandlerType === 'continueMode'){
			// since I haven't found a way to set mock the state in an intent we mock the statelessHandlers and bounce the call to the correct state
			spyOn(speechHandlers.statelessHandlers, test.request.request.intent.name).andCallFake(function(){ 
				this.handler.state = test.requestState;
				this.emitWithState(test.request.request.intent.name);
			});
		}
		
		spyOn(speechHandlers[test.speechStateHandler], test.request.request.intent.name).andCallThrough();
		
		spyOn(eventHandlers.statelessHandlers, 'endSession').andCallFake(function(){ 
			this.emit(":tell", "session ended", "session ended");
		});
		spyOn(eventHandlers.gameModeHandlers, 'endSession').andCallFake(function(){ 
			this.emit(":tell", "session ended", "session ended");
		});
		spyOn(eventHandlers.repeatModeHandlers, 'endSession').andCallFake(function(){ 
			this.emit(":tell", "session ended", "session ended");
		});
		spyOn(eventHandlers.continueModeHandlers, 'endSession').andCallFake(function(){ 
			this.handler.state = test.requestState;
			this.emit(":tell", "session ended", "session ended");
		});

		index.handler(intent, ctx, null);
	});
	
	it('testWelcomeSpeech - get unhandled intent - negative case', function() {
		validate(testNames, i, 0, test, response, error);
    });
	
	it('testWelcomeSpeechGameMode - get welcomeSpeech intent - positive case', function() {
		validate(testNames, i, 1, test, response, error);
    });
	
	it('testWelcomeSpeechRepeatMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 2, test, response, error);
    });
	
	it('testWelcomeSpeechContinueMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 3, test, response, error);
    });
	
	it('testWelcomeSpeechTwisterError - get fatalSpeech intent - negative case', function() {
		validate(testNames, i, 4, test, response, error);
    });
	
	it('testCorrectSpeech - get unhandled intent - negative case', function() {
		validate(testNames, i, 5, test, response, error);
    });
	
	it('testCorrectSpeechGameMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 6, test, response, error);
    });
	
	it('testCorrectSpeechRepeatMode - get fatalSpeech intent - negative case', function() {
		validate(testNames, i, 7, test, response, error);
    });
	
	it('testCorrectSpeechContinueMode - get correct intent - positive case', function() {
		validate(testNames, i, 8, test, response, error);
    });
	
	it('testCorrectSpeechContinueModeMultiscore - get correct intent - positive case', function() {
		validate(testNames, i, 9, test, response, error);
    });
	
	it('testCorrectSpeechScoreError - get fatalSpeech intent - negative case', function() {
		validate(testNames, i, 10, test, response, error);
    });
	
	it('testIncorrectSpeech - get unhandled intent - negative case', function() {
		validate(testNames, i, 11, test, response, error);
    });
	
	it('testIncorrectSpeechGameMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 12, test, response, error);
    });
	
	it('testIncorrectSpeechRepeatMode - get incorrect attempt intent - positive case', function() {
		validate(testNames, i, 13, test, response, error);
    });
	
	it('testIncorrectSpeechRepeatModeNoAttempt - get incorrect attempt intent - positive case', function() {
		validate(testNames, i, 14, test, response, error);
    });
	
	it('testIncorrectSpeechContinueMode - get correct intent - negative case', function() {
		validate(testNames, i, 15, test, response, error);
    });
	
	it('testSayTwisterSpeech - get unhandled intent - negative case', function() {
		validate(testNames, i, 16, test, response, error);
    });
	
	it('testSayTwisterSpeechGameMode - get sayTwisterSpeech intent - positive case', function() {
		validate(testNames, i, 17, test, response, error);
    });
	
	it('testSayTwisterSpeechRepeatMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 18, test, response, error);
    });
	
	it('testSayTwisterSpeechContinueMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 19, test, response, error);
    });
	
	it('testSayTwisterSpeechTwisterError - get fatalSpeech intent - negative case', function() {
		validate(testNames, i, 20, test, response, error);
    });
	
	it('testGoodbyeSpeech - get one score speech - positive case', function() {
		validate(testNames, i, 21, test, response, error);
    });
	
	it('testGoodbyeSpeechWithMode - get zero score speech - positive case', function() {
		validate(testNames, i, 22, test, response, error);
    });
	
	it('testGoodbyeSpeechSingleScore - get one score speech - positive case', function() {
		validate(testNames, i, 23, test, response, error);
    });
	
	it('testGoodbyeSpeechMultiscore - get multiscore speech - positive case', function() {
		validate(testNames, i, 24, test, response, error);
    });
	
	it('testGoodbyeSpeechMultiscore - get win speech - positive case', function() {
		validate(testNames, i, 25, test, response, error);
    });
	
	it('testWinSpeechWithMode - get win speech - positive case', function() {
		validate(testNames, i, 26, test, response, error);
    });
	
	it('testContinueSpeech - get sayTwisterSpeech intent - positive case', function() {
		validate(testNames, i, 27, test, response, error);
    });
	
	it('testContinueSpeechWrongMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 28, test, response, error);
    });
	
	it('testRetrySpeech - get retry speech - positive case', function() {
		validate(testNames, i, 29, test, response, error);
    });
	
	it('testRetrySpeechWrongMode - get unhandled intent - negative case', function() {
		validate(testNames, i, 30, test, response, error);
    });
	
	afterEach(function(){
		this.removeAllSpies();
		response = undefined;
		error = undefined;
		i++;
	});
	
	function validate(testNames, index, expectedIndex, test, response, error){
		expect(testNames[index]).toBe(testNames[expectedIndex]);
		expect(speechHandlers[test.speechStateHandler][test.request.request.intent.name]).toHaveBeenCalled();
		expect(response).not.toBeUndefined();
		expect(response).toEqual(test.response);
		expect(error).toBeUndefined();
	}
});