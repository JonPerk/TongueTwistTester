/**
 * @file ./repeatModeIntentHandlers.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Handles Intent requests from Amazon Alexa for REPEAT_MODE state
 * @module repeatModeIntentHandlers
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
intents[constants.intents.UNHANDLED_INTENT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};

/** handlers for Intents in REPEAT_MODE */
var repeatModeIntentHandlers = Alexa.CreateStateHandler(constants.states.REPEAT_MODE, intents);

module.exports = repeatModeIntentHandlers;