/**
 * @file ./eventHandlers.js
 * @copyright Jon Perkowski 2017
 */

/**
 * Handles main logic of TongueTwistTester
 * @module eventHandlers
 *
 */

var Alexa = require('alexa-sdk');
var constants = require('./constants');
var twisterHelper = require('./twisterHelper');

var eventHandlers = {};

/** creates new session, initializes attributes, fetches first tongue twister */
eventHandlers[constants.events.NEW_SESSION] = function(){
	console.info('Event handler ' + constants.events.NEW_SESSION + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	
	if(this.handler.state){
		console.warn('Event handler ' + constants.events.NEW_SESSION + ' state mismatch for ' + this.event.session.sessionId + ' Expected state: null Actual State: ' + this.handler.state);
		this.emitWithState(constants.intents.UNHANDLED_INTENT);
		return;
	}
	
	var getTwister = function(context){
		twisterHelper.getNewTwister(context.attributes.completed, context.attributes.skipped).then(function(twister){
			if(twister){
				context.attributes.score = 0;
				context.attributes.twister = twister;
				context.attributes.completed = [];
				context.attributes.skipped = [];
				context.handler.state = constants.states.GAME_MODE;
				context.emitWithState(constants.speeches.WELCOME_SPEECH);
			} else {
				throw 'No tongue twisters found';
			}
		})
		.catch(function(err){
			console.error('GetNewTwister failed in event ' + constants.events.NEW_SESSION + ' for ' + context.event.session.sessionId + ' State: ' + context.handler.state + ' Error: ' + err);
			context.emit(constants.speeches.FATAL_SPEECH);
		});
	};
	
	getTwister(this);
};

eventHandlers[constants.events.NEW_TWISTER] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};

/** validates attempt. 
 * if correct, goes to continue mode to see if user wants to continue. 
 * if incorrect, goes to repeat mode to see if user wants to try again */
eventHandlers[constants.events.VALIDATE_ATTEMPT] = function(){
	console.info('Event handler ' + constants.events.VALIDATE_ATTEMPT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	if(!this.handler.state){
		console.warn('Event handler ' + constants.events.VALIDATE_ATTEMPT + ' state mismatch for ' + this.event.session.sessionId + ' Expected state: null Actual State: ' + this.handler.state);
		this.emit(constants.intents.UNHANDLED_INTENT);
		return;
	}
	if(this.handler.state !== constants.states.GAME_MODE){
		console.warn('Event handler ' + constants.events.VALIDATE_ATTEMPT + ' state mismatch for ' + this.event.session.sessionId + ' Expected state: _GAME_MODE Actual State: ' + this.handler.state);
		this.emitWithState(constants.intents.UNHANDLED_INTENT);
		return;
	}
	if(!this.attributes.twister || !this.attributes.twister.value){
		console.warn('Event handler ' + constants.events.VALIDATE_ATTEMPT + ' missing expected twister for ' + this.event.session.sessionId);
		this.emitWithState(constants.speeches.FATAL_SPEECH);
		return;
	}
	if(!this.event.request.intent.slots || !this.event.request.intent.slots.Twister || !this.event.request.intent.slots.Twister.value){
		this.handler.state = constants.states.REPEAT_MODE;
		this.emitWithState(constants.speeches.INCORRECT_SPEECH);
		return;
	}
	
	var expected = this.attributes.twister.value.replace(/[^a-zA-z ]/g, "").toLowerCase();
	var attempt = this.event.request.intent.slots.Twister.value.replace(/[^a-zA-z ]/g, "").toLowerCase();
	
	console.info("Expected: " + expected + " Actual attempt: " + attempt + " Match? " + (attempt === expected));
	if(attempt === expected){
		this.attributes.score++;
		if(!this.attributes.completed){
			this.attributes.completed = [];
		}
		this.attributes.completed.push(this.attributes.twister.index);
		this.handler.state = constants.states.CONTINUE_MODE;
		this.attributes.twister = null;
		this.emitWithState(constants.speeches.CORRECT_SPEECH);
	} else {
		this.handler.state = constants.states.REPEAT_MODE;
		this.emitWithState(constants.speeches.INCORRECT_SPEECH);
	}
};

eventHandlers[constants.events.END_SESSION] = function(){console.warn('Not yet implemented' + JSON.stringify(this)); this.emit(':tell', 'Goodbye')};

var gameMode = Object.assign({}, eventHandlers);
var repeatMode = Object.assign({}, eventHandlers);
var continueMode = Object.assign({}, eventHandlers);
 
module.exports = {
	statelessHandlers : eventHandlers,
	gameModeHandlers : Alexa.CreateStateHandler(constants.states.GAME_MODE, gameMode),
	repeatModeHandlers : Alexa.CreateStateHandler(constants.states.REPEAT_MODE, repeatMode),
	continueModeHandlers : Alexa.CreateStateHandler(constants.states.CONTINUE_MODE, continueMode)	
};
