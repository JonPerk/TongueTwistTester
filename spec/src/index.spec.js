/**
 * @file ./index.spec.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Test module for TongueTwistTester
 * @module index.spec
 *
 */
var index = require('../../src/index'),
	statelessHandlers = require('../../src/statelessHandlers'),
    framework = require('../alexa-test-framework'),
	context = require('aws-lambda-mock-context'),
	tests = framework.json.index.tests;

jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

/** Test Alexa skill handler positive case */
describe('index - connectivity test', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	var testNames = ['testLaunchIntent'];
	var i = 0;
	var response;
	var error;
    framework.beforeEachMatchers();
	beforeEach(function(done){
			var test = testNames[i];
			var ctx = context();
			ctx.Promise
				.then(resp => {
					response = resp;
					done();
				})
				.catch(err => {
					console.log("failed: " + err);
					error = err;
					done();
				});
			intent = tests[test].request;
			spyOn(statelessHandlers, tests[test].request.request.intent.name).andCallFake(function(){ ctx.succeed(tests[test].response); });
			index.handler(intent, ctx, response);
	});
    it('testLaunchIntent - get any response', function() {
		expect(response).not.toBeUndefined();
		expect(response.response.outputSpeech.ssml).not.toBeNull();
		expect(error).toBeUndefined();
    });
	afterEach(function(){
		response = undefined;
		error = undefined;
		i++;
	});
});

/** Test Alexa skill handler negative case */
describe('index - unhandled intent test', function() {
	//tests must correspond to the name of the object for the test case in the json file
	//they must also be in the order of the test cases below
	var testNames = ['testBadIntent'];
	var i = 0;
	var response;
	var error;
    framework.beforeEachMatchers();
	beforeEach(function(done){
			var test = testNames[i];
			var ctx = context();
			ctx.Promise
				.then(resp => {
					response = resp;
					done();
				})
				.catch(err => {
					console.log("failed: " + err);
					error = err;
					done();
				});
			intent = tests[test].request;
			spyOn(statelessHandlers, 'LaunchIntent').andCallFake(function(){ ctx.succeed(tests[test].response); });
			spyOn(statelessHandlers, 'Unhandled').andCallFake(function(){ ctx.succeed(tests[test].response); });
			index.handler(intent, ctx, response);
	});
	it('testBadIntent - should return speech output', function() {
		expect(response).not.toBeUndefined();
		expect(response.response.outputSpeech.ssml).not.toBeNull();
		expect(error).toBeUndefined();
    });
	afterEach(function(){
		response = undefined;
		error = undefined;
		i++;
	});
});