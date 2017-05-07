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

/** asks the user if they want to retry a twister they got wrong */
speechHandlers[constants.speeches.RETRY_SPEECH] = function(){
	console.info('Speech handler ' + constants.speeches.RETRY_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	
	if(this.handler.state !== constants.states.REPEAT_MODE){
		console.warn('Speech handler ' + constants.speeches.RETRY_SPEECH + ' state mismatch for ' + this.event.session.sessionId + 
				' Expected state: ' + constants.states.REPEAT_MODE + ' Actual State: ' + this.handler.state);
		this.emitWithState(constants.intents.UNHANDLED_INTENT);
	} else {
		this.emit(":ask", 
				constants.speechOutputs.RETRY_SPEECH, 
				constants.reprompts.RETRY_SPEECH);
	}
};

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


/** gives the user tips and asks if they want to play */
var statelessHelp = function(){
	console.info('Speech handler ' + constants.speeches.HELP_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emit(':ask',
			constants.speechOutputs.HELP_SPEECH,
			constants.speechOutputs.HELP_SPEECH);
};

/** gives the user tips and asks twister */
var gameModeHelp = function(){
	console.info('Speech handler ' + constants.speeches.HELP_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	
	if(!this.attributes || !this.attributes.twister || !this.attributes.twister.value){
		console.error('Speech handler ' + constants.speeches.HELP_SPEECH + ' no twister found for ' + this.event.session.sessionId);
		this.emitWithState(constants.speeches.FATAL_SPEECH);
		return;
	} else {
		this.emit(':ask',
				constants.speechOutputs.HELP_GAME_MODE_SPEECH + this.attributes.twister.value,
				constants.reprompts.REPEAT_TWISTER_SPEECH + this.attributes.twister.value);
	}
};

/** gives the user tips and asks if they want to retry the twister */
var repeatModeHelp = function(){
	console.info('Speech handler ' + constants.speeches.HELP_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emit(':ask',
			constants.speechOutputs.HELP_REPEAT_MODE_SPEECH,
			constants.reprompts.RETRY_SPEECH);
};

/** gives the user tips and asks if they want to try a new twister */
var continueModeHelp = function(){
	console.info('Speech handler ' + constants.speeches.HELP_SPEECH + ' for ' + this.event.session.sessionId + ' State: ' + this.handler.state);
	this.emit(':ask',
			constants.speechOutputs.HELP_CONTINUE_MODE_SPEECH,
			constants.reprompts.CONTINUE_SPEECH);
};

/*/** notifies user of recoverable failure and continues 
speechHandlers[constants.speeches.UNHANDLED_SPEECH] = function(){
	console.warn('Speech handler ' + constants.speeches.UNHANDLED_SPEECH + ' called for ' + this.event.session.sessionId + " context " + JSON.stringify(this));
	this.emit(":ask", constants.speechOutputs.UNHANDLED_SPEECH, constants.reprompts.UNHANDLED_SPEECH);
}
/** notifies user of recoverable failure and asks if they want to play */
var statelessUnhandled = function(){
	console.warn('Speech handler ' + constants.speeches.UNHANDLED_SPEECH + ' called for ' + this.event.session.sessionId + " context " + JSON.stringify(this));
	this.emit(":ask", 
			constants.speechOutputs.UNHANDLED_SPEECH + constants.speechOutputs.HELP_SPEECH, 
			constants.reprompts.UNHANDLED_SPEECH + constants.speechOutputs.HELP_SPEECH);
};

/** notifies user of recoverable failure and asks twister */
var gameModeUnhandled = function(){
	if(!this.attributes || !this.attributes.twister || !this.attributes.twister.value){
		console.error('Speech handler ' + constants.speeches.HELP_SPEECH + ' no twister found for ' + this.event.session.sessionId);
		this.emitWithState(constants.speeches.FATAL_SPEECH);
		return;
	} else {
		console.warn('Speech handler ' + constants.speeches.UNHANDLED_SPEECH + ' called for ' + this.event.session.sessionId + " context " + JSON.stringify(this));
		this.emit(":ask", 
				constants.speechOutputs.UNHANDLED_SPEECH + constants.speechOutputs.HELP_GAME_MODE_SPEECH + this.attributes.twister.value, 
				constants.reprompts.UNHANDLED_SPEECH + constants.speechOutputs.HELP_GAME_MODE_SPEECH + this.attributes.twister.value);
	}
};

/** notifies user of recoverable failure and asks if they want to retry the twister */
var repeatModeUnhandled = function(){
	console.warn('Speech handler ' + constants.speeches.UNHANDLED_SPEECH + ' called for ' + this.event.session.sessionId + " context " + JSON.stringify(this));
	this.emit(":ask", 
			constants.speechOutputs.UNHANDLED_SPEECH + constants.speechOutputs.HELP_REPEAT_MODE_SPEECH, 
			constants.reprompts.UNHANDLED_SPEECH + constants.speechOutputs.HELP_REPEAT_MODE_SPEECH);
};

/** notifies user of recoverable failure and asks if they want to try a new twister */
var continueModeUnhandled = function(){
	console.warn('Speech handler ' + constants.speeches.UNHANDLED_SPEECH + ' called for ' + this.event.session.sessionId + " context " + JSON.stringify(this));
	this.emit(":ask", 
			constants.speechOutputs.UNHANDLED_SPEECH + constants.speechOutputs.HELP_CONTINUE_MODE_SPEECH, 
			constants.reprompts.UNHANDLED_SPEECH + constants.speechOutputs.HELP_CONTINUE_MODE_SPEECH);
};
 
var gameMode = Object.assign({}, speechHandlers);
var repeatMode = Object.assign({}, speechHandlers);
var continueMode = Object.assign({}, speechHandlers);

speechHandlers[constants.speeches.HELP_SPEECH] = statelessHelp;
gameMode[constants.speeches.HELP_SPEECH] = gameModeHelp;
repeatMode[constants.speeches.HELP_SPEECH] = repeatModeHelp;
continueMode[constants.speeches.HELP_SPEECH] = continueModeHelp;

speechHandlers[constants.speeches.UNHANDLED_SPEECH] = statelessUnhandled;
gameMode[constants.speeches.UNHANDLED_SPEECH] = gameModeUnhandled;
repeatMode[constants.speeches.UNHANDLED_SPEECH] = repeatModeUnhandled;
continueMode[constants.speeches.UNHANDLED_SPEECH] = continueModeUnhandled;
 
module.exports = {
	statelessHandlers : speechHandlers,
	gameModeHandlers : Alexa.CreateStateHandler(constants.states.GAME_MODE, gameMode),
	repeatModeHandlers : Alexa.CreateStateHandler(constants.states.REPEAT_MODE, repeatMode),
	continueModeHandlers : Alexa.CreateStateHandler(constants.states.CONTINUE_MODE, continueMode)	
};
