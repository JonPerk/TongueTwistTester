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

var eventHandlers = {};

//temp
eventHandlers[constants.events.NEW_SESSION] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
eventHandlers[constants.events.NEW_TWISTER] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
eventHandlers[constants.events.VALIDATE_ATTEMPT] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
eventHandlers[constants.events.END_SESSION] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
 
module.exports = eventHandlers;