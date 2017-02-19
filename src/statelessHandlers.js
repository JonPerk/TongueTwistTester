/**
 * @file ./statelessHandlers.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Handles stateless Intent requests from Amazon Alexa
 * @module statelessHandlers
 *
 */

var constants = require('./constants');

/** statelessHandlers - handlers for stateless Intents */
var statelessHandlers = {};

/** stateless handler for launch intent. Starts new session */
statelessHandlers[constants.intents.LAUNCH_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.LAUNCH_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
	this.attributes['lastSpeech'] =  null;
	this.emit(constants.events.NEW_SESSION);
};

/** stateless handler for attempt intent. Attempt intent is unhandled when stateless */
statelessHandlers[constants.intents.ATTEMPT_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.ATTEMPT_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
	this.emit(constants.speeches.UNHANDLED_SPEECH);
};

/** stateless handler for yes intent. Yes intent is unhandled when stateless */
statelessHandlers[constants.intents.YES_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.YES_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
	this.emit(constants.speeches.UNHANDLED_SPEECH);
};

/** stateless handler for no intent. No intent is unhandled when stateless */
statelessHandlers[constants.intents.NO_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.NO_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
	this.emit(constants.speeches.UNHANDLED_SPEECH);
};

/** stateless handler for repeat intent. Repeats last phrase spoken by Alexa */
statelessHandlers[constants.intents.REPEAT_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.REPEAT_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
	if(this.attributes.lastSpeech && this.attributes.lastSpeech.trim() !== ''){
		this.emit(constants.speeches.REPEAT_SPEECH);
	}
	else {
		console.warn('RepeatIntent with no prior speech: ' + this.attributes.lastSpeech + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
		this.emit(constants.speeches.UNHANDLED_SPEECH);
	}
};

/** stateless handler for help intent. Gives help and hints */
statelessHandlers[constants.intents.HELP_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.HELP_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
	this.emit(constants.speeches.HELP_SPEECH);
};

/** stateless handler for stop intent. Gives score and exits */
statelessHandlers[constants.intents.STOP_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.STOP_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
	if(this.attributes.score && this.attributes.score > 0){
		this.emit(constants.speeches.SCORE_SPEECH);
	}
	else {
		this.emit(constants.speeches.GOODBYE_SPEECH);
	}
};

/** stateless handler for cancel intent. Gives score and exits */
statelessHandlers[constants.intents.CANCEL_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.STOP_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
	if(this.attributes.score && this.attributes.score > 0){
		this.emit(constants.speeches.SCORE_SPEECH);
	}
	else {
		this.emit(constants.speeches.GOODBYE_SPEECH);
	}
};

/** stateless handler for unexpected prompts from user */
statelessHandlers[constants.intents.UNHANDLED_INTENT] = function(){
	console.warn('Intent handler ' + constants.intents.UNHANDLED_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.state);
	this.emit(constants.speeches.UNHANDLED_SPEECH);
};

module.exports = statelessHandlers;