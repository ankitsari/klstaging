var async = require('async');

export function filterObject(filterDetail, arrOfObj, callback) {
	var newArrOfObj = [];
	var newArrOfObjVideo = [];
	var newArrOfObjArticle = [];
	var knowledgeblockIteration = function(obj, callbackDone){
			if (obj.knowledgeBlock_Category==filterDetail.category) {
					newArrOfObj.push(obj);
				}
			callbackDone();
	}
	var knowledgeblockIterationForVideo = function(obj, callbackDone){
			if (obj.public_WebVideo_Resource_Level==filterDetail.category) {
				newArrOfObjVideo.push(obj);
			}
			callbackDone();
	}
	var knowledgeblockIterationForArticle = function(obj, callbackDone){
			if (obj.public_WebArticle_Resource_Level==filterDetail.category) {
				newArrOfObjArticle.push(obj);
			}
			callbackDone();
	}

	if (filterDetail) {
		if (filterDetail.for=="knowledgeblock") {
			if (filterDetail.scenario=="videoArticle") {
				newArrOfObjVideo = [];
				newArrOfObjArticle = [];
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
			}else{
				newArrOfObj = [];
				async.eachSeries(arrOfObj, knowledgeblockIteration, function(err){
			            		if (err) {
			            			callback(err);
			            		}else{
			            			callback(null, newArrOfObj);	
			            		}
			            	});
			}
		}else{
			callback(null, "its careerpath");
		}
	}
}