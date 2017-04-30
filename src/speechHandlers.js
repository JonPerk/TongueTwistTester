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

speechHandlers[constants.speeches.WELCOME_SPEECH] = function(){
	console.info('Speech handler ' + constants.speeches.WELCOME_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	
	if(this.handler.state !== constants.states.GAME_MODE){
		console.warn('Speech handler ' + constants.speeches.WELCOME_SPEECH + ' state mismatch for ' + this.event.session.sessionId + 
				' Expected state: ' + constants.states.GAME_MODE + ' Actual State: ' + this.handler.state);
		this.emitWithState(constants.intents.UNHANDLED_INTENT);
		return;
	}
	
	if(!this.attributes || !this.attributes.twister || !this.attributes.twister.value){
		console.error('Speech handler ' + constants.speeches.WELCOME_SPEECH + ' no twister found for ' + this.event.session.sessionId);
		this.emitWithState(constants.speeches.FATAL_SPEECH);
		return;
	}
	
	this.emit(":askWithCard", 
			constants.speechOutputs.WELCOME_SPEECH + this.attributes.twister.value, 
			constants.reprompts.REPEAT_TWISTER_SPEECH + this.attributes.twister.value,
			constants.cardTitles.LETS_PLAY,
			constants.cards.WELCOME_CARD + this.attributes.twister.value);
};

speechHandlers[constants.speeches.SAY_TWISTER_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};

//temp
speechHandlers[constants.speeches.CORRECT_SPEECH] = function(){
	console.info('Speech handler ' + constants.speeches.CORRECT_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	
	if(this.handler.state !== constants.states.CONTINUE_MODE){
		console.warn('Speech handler ' + constants.speeches.CORRECT_SPEECH + ' state mismatch for ' + this.event.session.sessionId + 
				' Expected state: ' + constants.states.CONTINUE_MODE + ' Actual State: ' + this.handler.state);
		this.emitWithState(constants.intents.UNHANDLED_INTENT);
		return;
	}
	
	if(!this.attributes.score || this.attributes.score <= 0){
		console.error('Speech handler ' + constants.speeches.CORRECT_SPEECH + ' called with no score for ' + this.event.session.sessionId);
		this.emitWithState(constants.speeches.FATAL_SPEECH);
	} else if(this.attributes.score === 1){
		console.log("Single score")
		this.emit(':askWithCard', 
				constants.speechOutputs.CORRECT_SINGLE_SCORE_SPEECH,
				constants.reprompts.CORRECT_SPEECH,
				constants.cardTitles.CORRECT,
				constants.cards.CORRECT_SINGLE_SCORE_CARD);
	} else {
		console.log("Multi score")
		this.emit(":askWithCard", 
				constants.speechOutputs.CORRECT_MULTI_SCORE_SPEECH.replace('%d', this.attributes.score), 
				constants.reprompts.CORRECT_SPEECH,
				constants.cardTitles.CORRECT,
				constants.cards.CORRECT_MULTI_SCORE_CARD.replace('%d', this.attributes.score));
	}
			
};

speechHandlers[constants.speeches.INCORRECT_SPEECH] = function(){
	console.info('Speech handler ' + constants.speeches.INCORRECT_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emit(':tellWithCard', 
			'Sorry, that didn\'t sound right. I heard ' + this.event.request.intent.slots.Twister.value,  
			'You didn\'t get it',
			'Expecting: ' + this.attributes.twister.value + ' Got: ' + this.event.request.intent.slots.Twister.value)
};
//end temp

speechHandlers[constants.speeches.REPEAT_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.HELP_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.CONTINUE_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.SCORE_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.GOODBYE_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};

/** notifies user of recoverable failure and continues */
speechHandlers[constants.speeches.UNHANDLED_SPEECH] = function(){
	console.warn('Speech handler ' + constants.speeches.UNHANDLED_SPEECH + ' called for ' + this.event.session.sessionId + " context " + JSON.stringify(this));
	this.emit(":ask", constants.speechOutputs.UNHANDLED_SPEECH, constants.reprompts.UNHANDLED_SPEECH);
}

/** notifies user of unrecoverable failure and ends session */
speechHandlers[constants.speeches.FATAL_SPEECH] = function(){
	console.error('Speech handler ' + constants.speeches.FATAL_SPEECH + ' called for ' + this.event.session.sessionId + " context " + JSON.stringify(this));
	if(!this.attributes.score || this.attributes.score <= 0){
		this.emit(":tellWithCard", 
				constants.speechOutputs.FATAL_NO_SCORE_SPEECH, 
				constants.cardTitles.FATAL,
				constants.cards.FATAL_NO_SCORE_CARD);
	} else if(this.attributes.score === 1){
		this.emit(":tellWithCard", 
				constants.speechOutputs.FATAL_SINGLE_SCORE_SPEECH, 
				constants.cardTitles.FATAL,
				constants.cards.FATAL_SINGLE_SCORE_CARD);
	} else {
		this.emit(":tellWithCard", 
				constants.speechOutputs.FATAL_MULTI_SCORE_SPEECH.replace('%d', this.attributes.score), 
				constants.cardTitles.FATAL,
				constants.cards.FATAL_MULTI_SCORE_CARD.replace('%d', this.attributes.score));
	}
};

speechHandlers[constants.speeches.WIN_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
 
var gameMode = Object.assign({}, speechHandlers);
var repeatMode = Object.assign({}, speechHandlers);
var continueMode = Object.assign({}, speechHandlers);
 
module.exports = {
	statelessHandlers : speechHandlers,
	gameModeHandlers : Alexa.CreateStateHandler(constants.states.GAME_MODE, gameMode),
	repeatModeHandlers : Alexa.CreateStateHandler(constants.states.REPEAT_MODE, repeatMode),
	continueModeHandlers : Alexa.CreateStateHandler(constants.states.CONTINUE_MODE, continueMode)	
};
