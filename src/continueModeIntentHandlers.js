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

intents[constants.intents.LAUNCH_INTENT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
intents[constants.intents.ATTEMPT_INTENT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
intents[constants.intents.YES_INTENT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
intents[constants.intents.NO_INTENT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
intents[constants.intents.REPEAT_INTENT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
intents[constants.intents.HELP_INTENT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
intents[constants.intents.STOP_INTENT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
intents[constants.intents.CANCEL_INTENT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};

intents[constants.intents.UNHANDLED_INTENT] = function(){
	console.warn('Intent handler ' + constants.intents.UNHANDLED_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

/** handlers for Intents in CONTINUE_MODE */
var continueModeIntentHandlers = Alexa.CreateStateHandler(constants.states.CONTINUE_MODE, intents);

module.exports = continueModeIntentHandlers;