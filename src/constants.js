"use strict";

module.exports = Object.freeze({
    states: {
        GAME_MODE: '_GAME_MODE',
        REPEAT_MODE: '_REPEAT_MODE',
        CONTINUE_MODE: '_CONTINUE_MODE'
    },
	
	intents: {
		LAUNCH_INTENT: 'LaunchIntent',
		ATTEMPT_INTENT: 'AttemptIntent',
		YES_INTENT: 'AMAZON.YesIntent',
		NO_INTENT: 'AMAZON.NoIntent',
		REPEAT_INTENT: 'AMAZON.RepeatIntent',
		HELP_INTENT: 'AMAZON.HelpIntent',
		STOP_INTENT: 'AMAZON.StopIntent',
		CANCEL_INTENT: 'AMAZON.CancelIntent',
		UNHANDLED_INTENT: 'Unhandled'
	},
	
	events: {
		NEW_SESSION: 'newSession',
		NEW_TWISTER: 'newTwister',
		VALIDATE_ATTEMPT: 'validateAttempt',
		END_SESSION: 'endSession'
	},
	
	speeches: {
		WELCOME_SPEECH: 'welcomeSpeech',
		SAY_TWISTER_SPEECH: 'sayTwisterSpeech',
		CORRECT_SPEECH: 'correctSpeech',
		INCORRECT_SPEECH: 'incorrectSpeech',
		REPEAT_SPEECH: 'repeatSpeech',
		HELP_SPEECH: 'helpSpeech',
		CONTINUE_SPEECH: 'continueSpeech',
		GOODBYE_SPEECH: 'goodbyeSpeech',
		UNHANDLED_SPEECH: 'unhandledSpeech',
		FATAL_SPEECH: 'fatalSpeech',
		WIN_SPEECH: 'winSpeech'
	},
	
	speechOutputs: {
		WELCOME_SPEECH: 'Welcome to TongueTwistTester. Try this tongue twister. Repeat after me. ',
		FATAL_NO_SCORE_SPEECH: 'An error occured and we had to stop playing, sorry! Please play again soon!',
		FATAL_SINGLE_SCORE_SPEECH: 'An error occured and we had to stop playing, sorry! You got 1 tongue twister, thanks for playing!',
		FATAL_MULTI_SCORE_SPEECH: 'An error occured and we had to stop playing, sorry! You got %d tongue twisters, thanks for playing!',
		SAY_TWISTER_SPEECH: 'sayTwisterSpeech',
		CORRECT_SINGLE_SCORE_SPEECH: 'Great job! You got it right! That\'s your first tongue twister. Would you like to try another, yes or no?',
		CORRECT_MULTI_SCORE_SPEECH: 'Great job! You got it right! %d tongue twisters completed so far. Would you like to try another, yes or no?',
		INCORRECT_SPEECH: 'I\'m sorry, that didn\'t sound quite right. Would you like to try it again, yes or no?',
		REPEAT_SPEECH: 'repeatSpeech',
		HELP_SPEECH: 'helpSpeech',
		CONTINUE_SPEECH: 'continueSpeech',
		SCORE_SPEECH: 'scoreSpeech',
		GOODBYE_SPEECH: 'goodbyeSpeech',
		UNHANDLED_SPEECH: 'I\'m sorry I couldn\'t understand that',
		FATAL_SPEECH: 'fatalSpeech',
		WIN_SPEECH: 'winSpeech'
	},
	
	reprompts: {
		REPEAT_TWISTER_SPEECH: 'Here\'s the tongue twister. Repeat after me. ',
		SAY_TWISTER_SPEECH: 'sayTwisterSpeech',
		CORRECT_SPEECH: 'Would you like to try another tongue twister, yes or no?',
		INCORRECT_SPEECH: 'Would you like to try the tongue twister again, yes or no?',
		REPEAT_SPEECH: 'repeatSpeech',
		HELP_SPEECH: 'helpSpeech',
		CONTINUE_SPEECH: 'continueSpeech',
		SCORE_SPEECH: 'scoreSpeech',
		GOODBYE_SPEECH: 'goodbyeSpeech',
		UNHANDLED_SPEECH: 'I\'m sorry I couldn\'t understand that',
		FATAL_SPEECH: 'fatalSpeech',
		WIN_SPEECH: 'winSpeech'
	},
	
	cardTitles: {
		TTT: "Tongue Twist Tester",
		LETS_PLAY: "Let's Play",
		FATAL: "Sorry, something went wrong",
		CORRECT: "Way to go!",
		INCORRECT:"Sorry, that didn't sound right"
	},
	
	cards: {
		WELCOME_CARD: 'Welcome! Here\'s your twister: ',
		FATAL_NO_SCORE_CARD: 'An error occured and we had to stop playing, sorry! Please play again soon!',
		FATAL_SINGLE_SCORE_CARD: 'An error occured and we had to stop playing, sorry! You got 1 tongue twister, thanks for playing!',
		FATAL_MULTI_SCORE_CARD: 'An error occured and we had to stop playing, sorry! You got %d tongue twisters, thanks for playing!',
		CORRECT_SINGLE_SCORE_CARD: 'You got the tongue twister correct!',
		CORRECT_MULTI_SCORE_CARD: 'You got the tongue twister correct! %d tongue twisters completed!',
		INCORRECT: 'I heard ',
		INCORRECT_NO_ATTEMPT: 'Please try again'
	},
	
    //  Custom constants
    terminate: 'TERMINATE',
});