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

/** welcome speech handler, gives first twister */
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

/** say twister speech handler. says twister w/o welcome speech */
speechHandlers[constants.speeches.SAY_TWISTER_SPEECH] = function(){
	console.info('Speech handler ' + constants.speeches.SAY_TWISTER_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	
	if(this.handler.state !== constants.states.GAME_MODE){
		console.warn('Speech handler ' + constants.speeches.SAY_TWISTER_SPEECH + ' state mismatch for ' + this.event.session.sessionId + 
				' Expected state: ' + constants.states.GAME_MODE + ' Actual State: ' + this.handler.state);
		this.emitWithState(constants.intents.UNHANDLED_INTENT);
		return;
	}
	
	if(!this.attributes || !this.attributes.twister || !this.attributes.twister.value){
		console.error('Speech handler ' + constants.speeches.SAY_TWISTER_SPEECH + ' no twister found for ' + this.event.session.sessionId);
		this.emitWithState(constants.speeches.FATAL_SPEECH);
		return;
	}
	
	this.emit(":askWithCard", 
			constants.speechOutputs.SAY_TWISTER_SPEECH + this.attributes.twister.value, 
			constants.reprompts.REPEAT_TWISTER_SPEECH + this.attributes.twister.value,
			constants.cardTitles.LETS_PLAY,
			constants.cards.SAY_TWISTER_CARD + this.attributes.twister.value);
};

/** correct speech handler. congratulates and asks if user wants to continue */
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
		this.emit(':askWithCard', 
				constants.speechOutputs.CORRECT_SINGLE_SCORE_SPEECH,
				constants.reprompts.CORRECT_SPEECH,
				constants.cardTitles.CORRECT,
				constants.cards.CORRECT_SINGLE_SCORE_CARD);
	} else {
		this.emit(":askWithCard", 
				constants.speechOutputs.CORRECT_MULTI_SCORE_SPEECH.replace('%d', this.attributes.score), 
				constants.reprompts.CORRECT_SPEECH,
				constants.cardTitles.CORRECT,
				constants.cards.CORRECT_MULTI_SCORE_CARD.replace('%d', this.attributes.score));
	}
			
};

/** incorrect speech handler. informs user and asks if they want to try again */
speechHandlers[constants.speeches.INCORRECT_SPEECH] = function(){
	console.info('Speech handler ' + constants.speeches.INCORRECT_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	if(this.handler.state !== constants.states.REPEAT_MODE){
		console.warn('Speech handler ' + constants.speeches.INCORRECT_SPEECH + ' state mismatch for ' + this.event.session.sessionId + 
				' Expected state: ' + constants.states.REPEAT_MODE + ' Actual State: ' + this.handler.state);
		this.emitWithState(constants.intents.UNHANDLED_INTENT);
		return;
	}
	
	if(!this.attributes || !this.attributes.twister || !this.attributes.twister.value){
		console.error('Speech handler ' + constants.speeches.INCORRECT_SPEECH + ' no twister found for ' + this.event.session.sessionId);
		this.emitWithState(constants.speeches.FATAL_SPEECH);
		return;
	}
	
	if(!this.attributes.attempt || this.attributes.attempt.trim() === ''){
		this.emit(':askWithCard', 
				constants.speechOutputs.INCORRECT_SPEECH,
				constants.reprompts.INCORRECT_SPEECH,
				constants.cardTitles.INCORRECT,
				constants.cards.INCORRECT_NO_ATTEMPT)
	} else {
		this.emit(':askWithCard', 
				constants.speechOutputs.INCORRECT_SPEECH,
				constants.reprompts.INCORRECT_SPEECH,
				constants.cardTitles.INCORRECT,
				constants.cards.INCORRECT + this.attributes.attempt)
	}
};

speechHandlers[constants.speeches.REPEAT_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.RETRY_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};
speechHandlers[constants.speeches.HELP_SPEECH] = function(){console.error(JSON.stringify(this)); throw 'Not yet implemented' + JSON.stringify(this);};

/** asks user if they want to continue with a new twister */
speechHandlers[constants.speeches.CONTINUE_SPEECH] = function(){
console.info('Speech handler ' + constants.speeches.CONTINUE_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	
	if(this.handler.state !== constants.states.CONTINUE_MODE){
		console.warn('Speech handler ' + constants.speeches.CONTINUE_SPEECH + ' state mismatch for ' + this.event.session.sessionId + 
				' Expected state: ' + constants.states.CONTINUE_MODE + ' Actual State: ' + this.handler.state);
		this.emitWithState(constants.intents.UNHANDLED_INTENT);
	} else {
		this.emit(":ask", 
				constants.speechOutputs.CONTINUE_SPEECH, 
				constants.reprompts.CONTINUE_SPEECH);
	}
};

/** gives score and says goodbye */
speechHandlers[constants.speeches.GOODBYE_SPEECH] = function(){
	console.log('Speech handler ' + constants.speeches.GOODBYE_SPEECH + ' called for ' + this.event.session.sessionId + " session ending");
	if(!this.attributes.score || this.attributes.score <= 0){
		this.emit(":tellWithCard", 
				constants.speechOutputs.GOODBYE_SPEECH, 
				constants.cardTitles.THANK_YOU,
				constants.cards.GOODBYE_NO_SCORE_CARD);
	} else if(this.attributes.score === 1){
		this.emit(":tellWithCard", 
				constants.speechOutputs.GOODBYE_SINGLE_SCORE_SPEECH, 
				constants.cardTitles.GREAT_JOB,
				constants.cards.GOODBYE_SINGLE_SCORE_CARD);
	} else {
		this.emit(":tellWithCard", 
				constants.speechOutputs.GOODBYE_MULTI_SCORE_SPEECH.replace('%d', this.attributes.score), 
				constants.cardTitles.AWESOME_JOB,
				constants.cards.GOODBYE_MULTI_SCORE_CARD.replace('%d', this.attributes.score));
	}
};

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

/** congratulates user on win and exits */
speechHandlers[constants.speeches.WIN_SPEECH] = function(){
	console.log('Speech handler ' + constants.speeches.WIN_SPEECH + ' called for ' + this.event.session.sessionId + " session ending");
	this.emit(":tellWithCard", 
			constants.speechOutputs.WIN_SPEECH, 
			constants.cardTitles.YOU_WIN,
			constants.cards.WIN_CARD);
};
 
var gameMode = Object.assign({}, speechHandlers);
var repeatMode = Object.assign({}, speechHandlers);
var continueMode = Object.assign({}, speechHandlers);
 
module.exports = {
	statelessHandlers : speechHandlers,
	gameModeHandlers : Alexa.CreateStateHandler(constants.states.GAME_MODE, gameMode),
	repeatModeHandlers : Alexa.CreateStateHandler(constants.states.REPEAT_MODE, repeatMode),
	continueModeHandlers : Alexa.CreateStateHandler(constants.states.CONTINUE_MODE, continueMode)	
};
