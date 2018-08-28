var async = require('async');

export function filterObject(filterValue, arrOfObj, callback) {
	var newArrOfObjVideo = [];
	var newArrOfObjArticle = [];
	var knowledgeblockIterationForVideo = function(obj, callbackDone){
			if (obj.public_WebVideo_Resource_Level == filterValue) {
				newArrOfObjVideo.push(obj);
			}
			callbackDone();
	}
	var knowledgeblockIterationForArticle = function(obj, callbackDone){
			if (obj.public_WebArticle_Resource_Level == filterValue) {
				newArrOfObjArticle.push(obj);
			}
			callbackDone();
	}
	async.eachSeries(arrOfObj.video, knowledgeblockIterationForVideo, function(err){
            		if (err) {
            			callback(err);
            		}else{
            			//callback(null, newArrOfObj);	
            			async.eachSeries(arrOfObj.article, knowledgeblockIterationForArticle, function(err){
		            		if (err) {
		            			callback(err);
		            		}else{
		            			var result = {video:newArrOfObjVideo,article:newArrOfObjArticle}
		            			callback(null, result);	
		            		}
		            	});
            		}
            	});
	}	