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

/** repeat mode handler for launch intent. Launch intent is unhandled when in repeat mode */
intents[constants.intents.LAUNCH_INTENT] = function(){
	console.warn('Intent handler ' + constants.intents.LAUNCH_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

/** repeat mode handler for attempt intent. Attempt intent is unhandled when in repeat mode */
intents[constants.intents.ATTEMPT_INTENT] = function(){
	console.warn('Intent handler ' + constants.intents.ATTEMPT_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};

/** repeat mode handler for yes intent. Repeats current twister for another attempt */
intents[constants.intents.YES_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.YES_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	if(!this.attributes.twister || !this.attributes.twister.value || !(this.attributes.twister.index || this.attributes.twister.index === 0)){
		console.error('Intent handler in REPEAT_MODE_ ' + constants.intents.YES_INTENT + ' called for missing twister ' + this.event.session.sessionId + " " + JSON.stringify(this));
		this.emitWithState(constants.speeches.FATAL_SPEECH);
	} else {
		this.handler.state = constants.states.GAME_MODE;
		this.emitWithState(constants.speeches.SAY_TWISTER_SPEECH);
	}
};

/** repeat mode handler for no intent. moves current twister to skipped and prompts user if they want a new twister */
intents[constants.intents.NO_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.NO_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	if(!this.attributes.twister || !this.attributes.twister.value || !(this.attributes.twister.index || this.attributes.twister.index === 0)){
		console.error('Intent handler in REPEAT_MODE_ ' + constants.intents.NO_INTENT + ' called for missing twister ' + this.event.session.sessionId + " " + JSON.stringify(this));
		this.emitWithState(constants.speeches.FATAL_SPEECH);
	} else {
		console.log("wrong place")
		if(!this.attributes.skipped){
			this.attributes.skipped = []
		}
		this.attributes.skipped.push(this.attributes.twister.index);
		this.handler.state = constants.states.CONTINUE_MODE;
		this.emitWithState(constants.speeches.CONTINUE_SPEECH);
	}
};

/** repeat mode handler for repeat attempt. Asks again if user wants to try again */
intents[constants.intents.REPEAT_INTENT] = function(){
	console.info('Intent handler ' + constants.intents.REPEAT_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.REPEAT_SPEECH);
};

/** repeat mode handler for help intent. Gives help and hints */
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

/** continue mode handler for unhandled intent. notifies user */
intents[constants.intents.UNHANDLED_INTENT] = function(){
	console.warn('Intent handler ' + constants.intents.UNHANDLED_INTENT + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emitWithState(constants.speeches.UNHANDLED_SPEECH);
};


/** handlers for Intents in REPEAT_MODE */
var repeatModeIntentHandlers = Alexa.CreateStateHandler(constants.states.REPEAT_MODE, intents);

module.exports = repeatModeIntentHandlers;