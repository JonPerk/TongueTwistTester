/**
 * @file ./twisterHelper.js
 * @copyright Jon Perkowski 2017
 */

/**
 * Retrieves tongue twisters
 * @module twisterHelper
 *
 */

var twisters = require("./twisters.json");
var total = twisters.length;

/** gets new twisters. Omits completed and skipped ones. 
 * If completed + skipped = total number of twister then skipped are reused.
 * If all twisters are completed undefined is returned */
var twisterHelper = {
	getNewTwister : function(completed, skipped){
		return new Promise(function(resolve, reject){
			if(total === 0){
				reject("No twisters found");
				return;
			}
			if(!completed){
				completed = [];
			}
			if(!skipped){
				skipped = [];
			}
			
			var combined;
			
			if(completed.length >= total){
				resolve();
				return;
			}
			
			if(completed.length + skipped.length >= total){
				combined = completed;
			}
			else{
				combined = completed.concat(skipped);
			}
			
			var rand = null;
			
			while(rand === null || combined.includes(rand)){
		         rand = Math.round(Math.random() * (total - 1));
		    }
			
			resolve(twisters[rand]);
		});
	}
};

module.exports = twisterHelper;