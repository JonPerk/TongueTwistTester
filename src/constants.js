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
		HELP_TWISTER: 'helpTwister',
		LAUNCH_REQUEST: 'LaunchRequest',
		SESSION_ENDED_REQUEST: 'SessionEndedRequest'
	},
	
	speeches: {
		WELCOME_SPEECH: 'welcomeSpeech',
		SAY_TWISTER_SPEECH: 'sayTwisterSpeech',
		CORRECT_SPEECH: 'correctSpeech',
		INCORRECT_SPEECH: 'incorrectSpeech',
		REPEAT_SPEECH: 'repeatSpeech',
		RETRY_SPEECH: 'retrySpeech',
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
		SAY_TWISTER_SPEECH: 'Try this tongue twister. Repeat after me. ',
		CORRECT_SINGLE_SCORE_SPEECH: 'Great job! You got it right! That\'s your first tongue twister. Would you like to try another?',
		CORRECT_MULTI_SCORE_SPEECH: 'Great job! You got it right! %d tongue twisters completed so far. Would you like to try another?',
		INCORRECT_SPEECH: 'I\'m sorry, that didn\'t sound quite right. Would you like to try it again?',
		REPEAT_SPEECH: 'repeatSpeech',
		RETRY_SPEECH: 'Would you like to try the tongue twister again?',
		HELP_SPEECH: 'Say give me a tongue twister to start playing.',
		HELP_GAME_MODE_SPEECH: 'I\'ll give you a tongue twister, and you try to repeat it as best you can. Here\'s the tongue twister. Repeat after me. ',
		HELP_REPEAT_MODE_SPEECH: 'You didn\'t get the tongue twister correct, but you can try it again. If you would like to try again, say yes. If not, say no.',
		HELP_CONTINUE_MODE_SPEECH: 'If you would like to keep playing with a new tongue twister, say yes. If you would like to stop playing, say no or stop.',
		CONTINUE_SPEECH: 'Would you like to try a new tongue twister?',
		GOODBYE_SPEECH: 'Thanks for playing! I hope you\'ll play again soon! Goodbye!',
		GOODBYE_SINGLE_SCORE_SPEECH: 'Thanks for playing! You got 1 tongue twister right! Goodbye!',
		GOODBYE_MULTI_SCORE_SPEECH: 'Thanks for playing! You got %d tongue twisters right! Well done! Goodbye!',
		UNHANDLED_SPEECH: 'I\'m sorry I couldn\'t understand that. ',
		WIN_SPEECH: 'Congratulations, you win! You got all the tongue twisters right! Thanks for playing! Goodbye!'
	},
	
	reprompts: {
		REPEAT_TWISTER_SPEECH: 'Here\'s the tongue twister. Repeat after me. ',
		CORRECT_SPEECH: 'Would you like to try another tongue twister?',
		INCORRECT_SPEECH: 'Would you like to try the tongue twister again?',
		RETRY_SPEECH: 'Would you like to try the tongue twister again?',
		CONTINUE_SPEECH: 'Would you like to try a new tongue twister?',
		UNHANDLED_SPEECH: 'I\'m sorry I couldn\'t understand that. '
	},
	
	cardTitles: {
		TTT: 'Tongue Twist Tester',
		LETS_PLAY: 'Let\'s Play',
		FATAL: 'Sorry, something went wrong',
		CORRECT: 'Way to go!',
		INCORRECT:'Sorry, that didn\'t sound right',
		THANK_YOU: 'Thank You!',
		GREAT_JOB: 'Great Job!',
		AWESOME_JOB: 'Awesome Job!',
		YOU_WIN: 'You Win!'
	},
	
	cards: {
		WELCOME_CARD: 'Welcome! Here\'s your twister: ',
		FATAL_NO_SCORE_CARD: 'An error occured and we had to stop playing, sorry! Please play again soon!',
		FATAL_SINGLE_SCORE_CARD: 'An error occured and we had to stop playing, sorry! You got 1 tongue twister, thanks for playing!',
		FATAL_MULTI_SCORE_CARD: 'An error occured and we had to stop playing, sorry! You got %d tongue twisters, thanks for playing!',
		CORRECT_SINGLE_SCORE_CARD: 'You got the tongue twister correct!',
		CORRECT_MULTI_SCORE_CARD: 'You got the tongue twister correct! %d tongue twisters completed!',
		INCORRECT: 'I heard ',
		INCORRECT_NO_ATTEMPT: 'Please try again',
		SAY_TWISTER_CARD: 'Try this tongue twister: ',
		GOODBYE_NO_SCORE_CARD: 'Thanks for trying Tongue Twist Tester! Let\'s play again soon!',
		GOODBYE_SINGLE_SCORE_CARD: 'Thanks for playing! You got 1 tongue twister! Let\'s play again soon!',
		GOODBYE_MULTI_SCORE_CARD: 'Thanks for playing! You got %d tongue twisters! Let\'s play again soon!',
		WIN_CARD: 'Congratulations! You got all the tongue twisters right! Thanks for playing!'
	},
	
    //  Custom constants
    terminate: 'TERMINATE',
});