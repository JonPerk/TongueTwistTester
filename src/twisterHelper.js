/**
 * @file ./twisterHelper.js
 * @copyright Jon Perkowski 2017
 */

/**
 * Retrieves tongue twisters
 * @module twisterHelper
 *
 */

var twisterHelper = {
	getNewTwister : function(){
		return new Promise(function(resolve, reject){
			if(false){
				resolve('some tongue twister');
			} else {
				console.error(JSON.stringify(this)); 
				reject('Error retrieving twister Not yet implemented' + JSON.stringify(this));
			}
		});
	}
};

module.exports = twisterHelper;