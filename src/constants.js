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
		UNHANDLED_SPEECH: 'unhandledSpeech'
	},
	
    //  Custom constants
    terminate: 'TERMINATE',
});