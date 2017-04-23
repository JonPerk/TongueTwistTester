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
	
	if(!this.attributes.twister){
		console.error('Speech handler ' + constants.speeches.WELCOME_SPEECH + ' no twister found for ' + this.event.session.sessionId);
		this.emitWithState(constants.speeches.FATAL_SPEECH);
	}
	
	this.emit(":askWithCard", 
			constants.speechOutputs.WELCOME_SPEECH + this.attributes.twister, 
			constants.reprompts.REPEAT_TWISTER_SPEECH + this.attributes.twister,
			constants.cardTitles.TTT,
			constants.cards.WELCOME_CARD + this.attributes.twister);
};

speechHandlers[constants.speeches.SAY_TWISTER_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.CORRECT_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.INCORRECT_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.REPEAT_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.HELP_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.CONTINUE_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.SCORE_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.GOODBYE_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};

speechHandlers[constants.speeches.UNHANDLED_SPEECH] = function(){
	console.warn('Speech handler ' + constants.speeches.UNHANDLED_SPEECH + ' called for ' + this.event.session.sessionId);
	this.emit(":ask", constants.speechOutputs.UNHANDLED_SPEECH, constants.reprompts.UNHANDLED_SPEECH);
}

speechHandlers[constants.speeches.FATAL_SPEECH] = function(){
	console.error('Speech handler ' + constants.speeches.FATAL_SPEECH + ' called for ' + this.event.session.sessionId);
	if(!this.attributes.score || this.attributes.score <= 0){
		this.emit(":tellWithCard", 
				constants.speechOutputs.FATAL_NO_SCORE_SPEECH, 
				constants.cardTitles.TTT,
				constants.cards.FATAL_NO_SCORE_CARD);
	} else {
		this.emit(":tellWithCard", 
				constants.speechOutputs.FATAL_SCORE_SPEECH.replace('%d', this.attributes.score), 
				constants.cardTitles.TTT,
				constants.cards.FATAL_SCORE_CARD.replace('%d', this.attributes.score));
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
