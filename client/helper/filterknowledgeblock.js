var async = require('async');

export function filterObject(filterValue, arrOfObj, callback) {
	var newArrOfObj = [];
	var knowledgeblockIteration = function(obj, callbackDone){
	var	str = obj.relatedCareerPaths
	var re = new RegExp(filterValue, 'g');
			if (str.match(re)) {
				newArrOfObj.push(obj);
			}
			callbackDone();
	}
	async.eachSeries(arrOfObj.data, knowledgeblockIteration, function(err){
            		if (err) {
            			callback(err);
            		}else{
            			//callback(null, newArrOfObj);	            			
						var result = {data:newArrOfObj}
						callback(null, result);		
            		}
            	});
	}	