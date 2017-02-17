'use strict';
/**
 * @file ./index.js
 * @copyright Jon Perkowski 2017
 */
/**
 * Parent module for TongueTwistTester
 * @module index
 *
 */
 
var Alexa = require('alexa-sdk');
var config = require('./configuration');
var eventHandlers = require('./eventHandlers');
var intentHandlers = require('./intentHandlers');
var sessionHandlers = require('./sessionHandlers');
var speechHandlers = require('./speechHandlers');

/** Alexa skill handler */
exports.handler = function(event, context, callback){
	console.log("new session: " + event.session.sessionId);
    var alexa = Alexa.handler(event, context);
    alexa.appId = config.appId;
    alexa.registerHandlers(intentHandlers.statelessHandlers);
    alexa.execute();
};