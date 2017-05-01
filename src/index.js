'use strict';
/**
 * @file ./index.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Parent module for TongueTwistTester
 * @module index
 *
 */
 
var Alexa = require('alexa-sdk');
var config = require('./configuration');
var statelessHandlers = require('./statelessHandlers');
var gameModeIntentHandlers = require('./gameModeIntentHandlers');
var repeatModeIntentHandlers = require('./repeatModeIntentHandlers');
var continueModeIntentHandlers = require('./continueModeIntentHandlers');
var eventHandlers = require('./eventHandlers');
var speechHandlers = require('./speechHandlers');
var constants = require('./constants');

/** Alexa skill handler */
exports.handler = function(event, context, callback){
	console.info("new session: " + JSON.stringify(event.session.sessionId));
    var alexa = Alexa.handler(event, context);
    alexa.appId = config.appId;
    
    alexa.registerHandlers(
    	launchRequestHandler,
    	statelessHandlers, 
		gameModeIntentHandlers, 
		repeatModeIntentHandlers, 
		continueModeIntentHandlers,
		eventHandlers.statelessHandlers,
		eventHandlers.gameModeHandlers,
		eventHandlers.repeatModeHandlers,
		eventHandlers.continueModeHandlers,
		speechHandlers.statelessHandlers,
		speechHandlers.gameModeHandlers,
		speechHandlers.repeatModeHandlers,
		speechHandlers.continueModeHandlers);
    alexa.execute();
};

var launchRequestHandler = { };

/** converts LaunchRequest into LaunchIntent */
launchRequestHandler[constants.events.LAUNCH_REQUEST] = function () {
	if(!this.attributes.state && this.event.request.type === constants.events.LAUNCH_REQUEST) {
        this.emit(constants.intents.LAUNCH_INTENT);
	} else if(this.attributes.state && this.event.request.type === constants.events.LAUNCH_REQUEST){
		this.emitWithState(constants.intents.LAUNCH_INTENT);
	}
}