/**
 * @file ./eventHandlers.spec.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Test module for retrieving tongue twisters
 * @module eventHandlersHandlers.spec
 *
 */
var proxyquire =  require('proxyquire'),
	index = require('../../src/index'),
	statelessHandlers = require('../../src/statelessHandlers'),
	eventHandlers = require('../../src/eventHandlers'),
	speechHandlers = require('../../src/speechHandlers'),
	gameModeIntentHandlers = require('../../src/gameModeIntentHandlers'),
	repeatModeIntentHandlers = require('../../src/repeatModeIntentHandlers'),
	continueModeIntentHandlers = require('../../src/continueModeIntentHandlers'),
    framework = require('../alexa-test-framework'),
	context = require('aws-lambda-mock-context'),
	tests = framework.json.twisterHelper.tests,
	twisters = ['She sells seashells by the seashore', 'some twister', 'another twister', 'yet another twister', 'a final twisters'];

var twisterHelper = proxyquire('../../src/twisterHelper', {'./twisters.json': twisters});
	
jasmine.getEnv().addReporter(new jasmine.ConsoleReporter(console.log));

/** test getNewTwister function */
describe('twisterHelper - getNewTwister positive tests', function() {
	var testNames = ['initialTwister', 'completedTwister', 'skippedTwister', 'completedAndSkippedTwister',
		'completedNullTwister', 'skippedNullTwister', 'completedAndSkippedFullTwister', 'noMoreTwisters'];
	var i = 0;
	var response;
	var error;
	var test;
		
	beforeEach(function(done){
		test = tests[testNames[i]];
		var completed = test.completed;
		var skipped = test.skipped;
		var result = test.result;
		
		spyOn(twisterHelper, 'getNewTwister').andCallThrough();
		var twister = function () { 
			twisterHelper.getNewTwister(test.completed, test.skipped)
			.then(resp => {
				response = resp;
				done();
			})
			.catch(err => {
				console.log("first call failed: " + err);
				error = err;
				done();
			}); 
		}
		
		twister();
	});
	
	it('initialTwister - get twister with no completed or skipped - positive case', function() {
		validate(testNames, i, 0, test, response, error);
    });
	
	it('completedTwister - get twister with some completed - positive case', function() {
		validate(testNames, i, 1, test, response, error);
    });
	
	it('skippedTwister - get twister with some skipped - positive case', function() {
		validate(testNames, i, 2, test, response, error);
    });
	
	it('completedAndSkippedTwister - get twister with some completed and skipped - positive case', function() {
		validate(testNames, i, 3, test, response, error);
    });
	
	it('completedNullTwister - get twister with completed array null - positive case', function() {
		validate(testNames, i, 4, test, response, error);
    });
	
	it('skippedNullTwister - get twister with skipped array null - positive case', function() {
		validate(testNames, i, 5, test, response, error);
    });
	
	it('completedAndSkippedFullTwister - get twister with completed and skipped array null - positive case', function() {
		validate(testNames, i, 6, test, response, error);
    });
	
	it('noMoreTwisters - not twisters left - negative case', function() {
		expect(response).toBeUndefined();
		expect(error).toBeUndefined();
    });
	
	afterEach(function(){
		this.removeAllSpies();
		response = undefined;
		error = undefined;
		i++;
	});
	
	function validate(testNames, index, expectedIndex, test, response, error){
		expect(testNames[index]).toBe(testNames[expectedIndex]);
		expect(response).not.toBeUndefined();
		expect(test.response[response.index]).toEqual(response);
		expect(error).toBeUndefined();
	}
});
