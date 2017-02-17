var _ = require('underscore'),
    htmlparser = require('htmlparser2'),
    ssmlConstants = require('./ssmlConstants');

const TYPES = ssmlConstants.TYPES;
const TAGS = ssmlConstants.TAGS;
const TAG_NAMES = ssmlConstants.TAG_NAMES;

var validator = module.exports.validator = {
    _errors: [],
    PlainText: function(speech) {
        return speech.indexOf('<speak>') !== 0;
    },
    SSML: function(speech) {
        var parser;

        validator._errors = [];
        parser = new htmlparser.Parser({
            onopentag: validator.onopentag,
            onerror: validator.onerror
        });

        parser.write(speech);
        parser.end();

        return validator._errors;
    },
    onopentag: function(name, attributes) {
        if (!_.contains(TAG_NAMES, name)) {
            return validator._errors.push(`Tag not allowed: ${name}`);
        }

        if (!_.isEmpty(attributes)) {
            const TAG_ATTRS = TAGS[ name ];

            if (!TAG_ATTRS.attr || _.isEmpty(TAG_ATTRS.attr)) {
                return validator._errors.push(`Attribute not allowed for: ${name}`);
            }

            const NAME_ATTRS = _.keys(TAG_ATTRS.attr);
            _.each(attributes, function(val, attr) {
                if (!_.contains(NAME_ATTRS, attr)) {
                    validator._errors.push(`Attribute not allowed for: ${name}. ${attr}`);
                }

                // TODO: validate if attribute value is allowed.
            });
        }
    },
    onerror: function(err) {
        validator._errors.push(err);
    },
    test: function(actual, expected) {
        if (_.isObject(actual)) {
            if (
                !_.has(actual, 'speech') || !_.has(actual, 'type') ||
                actual.speech === '' || !_.contains(TYPES, actual.type)
            ) {
                return false;
            }

            return validator.SSML(actual.speech).length === 0 &&
                this.match(actual, expected);
        } else if (_.isString(actual)) {
            return validator.PlainText(actual) &&
                this.match(actual, expected);
        }

        return false;
    },
    match: function(actual, expected) {
        return !expected || actual === expected;
    }
};

module.exports.beforeEachMatchers = function() {
    beforeEach(function() {
        this.addMatchers({
            isSSML: function(expected) {
                return validator.test(this.actual, expected);
            }
        });
    });
}