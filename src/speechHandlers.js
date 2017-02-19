/**
 * @file ./speechHandlers.js
 * @copyright Jon Perkowski 2017
 */

/**
 * Handles speech output for TongueTwistTester
 * @module speechHandlers
 *
 */

var Alexa = require('alexa-sdk');
var constants = require('./constants');

var speechHandlers = {};

//temp
speechHandlers[constants.speeches.WELCOME_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.SAY_TWISTER_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.CORRECT_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.INCORRECT_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.REPEAT_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.HELP_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.CONTINUE_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.SCORE_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.GOODBYE_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.UNHANDLED_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
 
module.exports = speechHandlers;