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
		twisterHelper.getNewTwister().then(function(twister){
			if(twister){
				context.attributes.score = 0;
				context.attributes.twister = twister;
				context.handler.state = constants.states.GAME_MODE;
				context.emitWithState(constants.speeches.WELCOME_SPEECH);
			} else {
				console.error('GetNewTwister failed in event ' + constants.events.NEW_SESSION + ' for ' + context.event.session.sessionId + ' State: ' + context.handler.state);
				context.emit(constants.speeches.FATAL_SPEECH);
			}
		})
		.catch(function(err){
			console.error('GetNewTwister failed in event ' + constants.events.NEW_SESSION + ' for ' + context.event.session.sessionId + ' State: ' + context.handler.state + ' Error: ' + err);
			context.emit(constants.speeches.FATAL_SPEECH);
		});
	};
	getTwister(this);
};

//temp
eventHandlers[constants.events.NEW_TWISTER] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
eventHandlers[constants.events.VALIDATE_ATTEMPT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
eventHandlers[constants.events.END_SESSION] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};

var gameMode = Object.assign({}, eventHandlers);
var repeatMode = Object.assign({}, eventHandlers);
var continueMode = Object.assign({}, eventHandlers);
 
module.exports = {
	statelessHandlers : eventHandlers,
	gameModeHandlers : Alexa.CreateStateHandler(constants.states.GAME_MODE, gameMode),
	repeatModeHandlers : Alexa.CreateStateHandler(constants.states.REPEAT_MODE, repeatMode),
	continueModeHandlers : Alexa.CreateStateHandler(constants.states.CONTINUE_MODE, continueMode)	
};
