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
		SCORE_SPEECH: 'scoreSpeech',
		GOODBYE_SPEECH: 'goodbyeSpeech',
		UNHANDLED_SPEECH: 'unhandledSpeech',
		FATAL_SPEECH: 'fatalSpeech',
		WIN_SPEECH: 'winSpeech'
	},
	
	speechOutputs: {
		WELCOME_SPEECH: 'Welcome to TongueTwistTester. Try this tongue twister. Repeat after me. ',
		FATAL_NO_SCORE_SPEECH: 'An error occured and we had to stop playing, sorry! Please play again soon!',
		FATAL_SCORE_SPEECH: 'An error occured and we had to stop playing, sorry! You got %d tongue twisters, thanks for playing!',
		SAY_TWISTER_SPEECH: 'sayTwisterSpeech',
		CORRECT_SPEECH: 'correctSpeech',
		INCORRECT_SPEECH: 'incorrectSpeech',
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
		CORRECT_SPEECH: 'correctSpeech',
		INCORRECT_SPEECH: 'incorrectSpeech',
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
		TTT: "Tongue Twist Tester"
	},
	
	cards: {
		WELCOME_CARD: 'Welcome! Here\'s your twister: ',
		FATAL_NO_SCORE_CARD: 'An error occured and we had to stop playing, sorry! Please play again soon!',
		FATAL_SCORE_CARD: 'An error occured and we had to stop playing, sorry! You got %d tongue twisters, thanks for playing!'
	},
	
    //  Custom constants
    terminate: 'TERMINATE',
});