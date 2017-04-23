/**
 * @file ./gameModeIntentHandlers.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Handles Intent requests from Amazon Alexa for GAME_MODE state
 * @module gameModeIntentHandlers
 *
 */
 
var Alexa = require('alexa-sdk');
var constants = require('./constants');

var intents = {};

/** game mode handler for launch intent. Launch intent is unhandled when in game mode */
intents[constants.intents.LAUNCH_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.LAUNCH_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

/** game mode handler for attempt intent. Directs to validate event */
intents[constants.intents.ATTEMPT_INTENT] = function(){ 
	console.info('Intent handler ' + constants.intents.ATTEMPT_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.events.VALIDATE_ATTEMPT);
};

/** game mode handler for yes intent. Yes intent is unhandled when in game mode */
intents[constants.intents.YES_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.YES_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

/** game mode handler for no intent. No intent is unhandled when in game mode */
intents[constants.intents.NO_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.NO_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

intents[constants.intents.REPEAT_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.REPEAT_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	console.log(JSON.stringify(this.attributes.twister))
	if(this.attributes.twister && 
			(this.attributes.twister.index || this.attributes.twister.index === 0)  && 
			this.attributes.twister.value && 
			this.attributes.twister.value.trim() !== ''){
		this.emitWithState(constants.speeches.SAY_TWISTER_SPEECH);
	} else {
		console.error('No twister loaded on repeat request in _GAME_MODE for ' + this.event.session.sessionId);
		this.emitWithState(constants.speeches.FATAL_SPEECH);
	}
};

/** game mode handler for help intent. Gives help and hints */
intents[constants.intents.HELP_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.HELP_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.HELP_SPEECH);
};

/** game mode handler for stop intent. Gives score and exits */
intents[constants.intents.STOP_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.STOP_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	if(this.attributes.score && this.attributes.score > 0){
		this.emitWithState(constants.speeches.SCORE_SPEECH);
	}
	else {
		this.emitWithState(constants.speeches.GOODBYE_SPEECH);
	}
};

/** game mode handler for cancel intent. Gives score and exits */
intents[constants.intents.CANCEL_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.STOP_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	if(this.attributes.score && this.attributes.score > 0){
		this.emitWithState(constants.speeches.SCORE_SPEECH);
	}
	else {
		this.emitWithState(constants.speeches.GOODBYE_SPEECH);
	}
};

intents[constants.intents.UNHANDLED_INTENT] = function(){
	console.warn('Intent handler ' + constants.intents.UNHANDLED_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

/** handlers for Intents in GAME_MODE */
var gameModeIntentHandlers = Alexa.CreateStateHandler(constants.states.GAME_MODE, intents);

module.exports = gameModeIntentHandlers;