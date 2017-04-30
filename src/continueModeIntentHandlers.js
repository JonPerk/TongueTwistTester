/**
 * @file ./continueModeIntentHandlers.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Handles Intent requests from Amazon Alexa for CONTINUE_MODE state
 * @module continueModeIntentHandlers
 *
 */
 
var Alexa = require('alexa-sdk');
var constants = require('./constants');

var intents = {};

/** continue mode handler for launch intent. Launch intent is unhandled when in continue mode */
intents[constants.intents.LAUNCH_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.LAUNCH_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

/** continue mode handler for attempt intent. attempt intent is unhandled when in continue mode */
intents[constants.intents.ATTEMPT_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.ATTEMPT_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

/** continue mode handler for yes intent. user wants a new twister */
intents[constants.intents.YES_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.YES_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.events.NEW_TWISTER);
};

intents[constants.intents.NO_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.NO_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.GOODBYE_SPEECH);
};

/** continue mode handler for repeat intent. reprompts user */
intents[constants.intents.REPEAT_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.ATTEMPT_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.CONTINUE_SPEECH);
};

/** continue mode handler for help intent. Gives help and hints */
intents[constants.intents.HELP_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.HELP_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.HELP_SPEECH);
};

/** continue mode handler for stop intent. Gives score and exits */
intents[constants.intents.STOP_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.STOP_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.GOODBYE_SPEECH);
};

/** continue mode handler for cancel intent. Gives score and exits */
intents[constants.intents.CANCEL_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.CANCEL_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.GOODBYE_SPEECH);
};

/** game mode handler for unhandled intent. notifies user */
intents[constants.intents.UNHANDLED_INTENT] = function(){
	console.warn('Intent handler ' + constants.intents.UNHANDLED_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

/** handlers for Intents in CONTINUE_MODE */
var continueModeIntentHandlers = Alexa.CreateStateHandler(constants.states.CONTINUE_MODE, intents);

module.exports = continueModeIntentHandlers;