var _ = require('underscore');

const TYPES = [
	'PlainText',
	'SSML'
];
const TAGS = {
    audio: {
        type: 'audio',
        attr: {
            src: []
        }
    },
    break: {
        type: 'break',
        attr: {
            strength: [],
            time: []
        }
    },
    p: {
        type: 'p',
        close: true
    },
    phoneme: {
        type: 'phoneme',
        attr: {
            alphabet: [],
            ph: []
        }
    },
    s: {
        type: 's'
    },
    'say-as': {
        type: 'say-as',
        attr: {
            'interpret-as': [],
            format: []
        }
    },
    speak: {
        type: 'speak'
    },
    w: {
        type: 'w',
        attr: {
            role: []
        }
    }
};
const TAG_NAMES = _.keys(TAGS);

module.exports.TYPES = TYPES;
module.exports.TAGS = TAGS;
module.exports.TAG_NAMES = TAG_NAMES;