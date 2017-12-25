'use strict';
app.factory('dalFactory',function ($http, $q) {
	
	this.postToServer = function(data, url){
		var deferred = $q.defer();
		$http.post(url,
			data, { headers: { 'Content-Type': 'application/json; charset=utf-8'} }
			).success( function(response,status){
				if (status == 200) {
					deferred.resolve(response);
				}
				else
				{
					deferred.reject(response);
				}
			}).error( function(response, status){
				deferred.reject(response);
			});
			return deferred.promise;
	}

	this.getfromServer = function(query,url)
	{
		var deferred = $q.defer();
		$http.get(url + query ,{ headers: { 'Content-Type': 'application/json; charset=utf-8'} }
			).success(function(response,status){
				if (response.Success) {
					deferred.resolve(response);
				}
				else
				{
					deferred.reject({ error_description: response.Message });
				}
			}).error(function(err, status){
				deferred.reject({ error_description: err });
			});
		return deferred.promise;
	}

	this.getgeocode = function(query,url)
	{
		var deferred = $q.defer();
		$http.get(url + query ,{ headers: { 'Content-Type': 'application/json; charset=utf-8'} }
			).success(function(response,status){
				// deferred.resolve(response);
				if (response.status = 'OK') {
					deferred.resolve(response);
				}
				else
				{
					deferred.reject({ error_description: response.Message });
				}
			}).error(function(err, status){
				deferred.reject({ error_description: err });
			});
		return deferred.promise;
	}

	// 	this.getfromServer = function(){
	// 	var deferred = $q.defer();
	// 	$http.get(appUtil.serviceBaseUrl + "/Customer/getCustomerList",{ headers: { 'Content-Type': 'application/json; charset=utf-8'} }
	// 		).success(function(response,status){
	// 			if (response.Success) {
	// 				deferred.resolve(response);
	// 			}
	// 			else
	// 			{
	// 				deferred.reject({ error_description: response.Message });
	// 			}
	// 		}).error(function(err, status){
	// 			deferred.reject({ error_description: err });
	// 		});
	// 	return deferred.promise;
	// }
	return this;
});
