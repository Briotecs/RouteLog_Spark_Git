'use strict';
var appUtil = 
{
	 serviceBaseUrl: 'http://api.spark.briotecs.com/api/'
	//serviceBaseUrl: 'http://testapi.briotecs.com/api/'
	// serviceBaseUrl: 'http://localhost:1722/api/'
	,googleapismaps: 'https://maps.googleapis.com/maps/api/'
	//,googlemapKey: '?AIzaSyB_KXLEWNYN2f3DePRVSrpVkd848BqCHpQ' //Nithi
	,googlemapKey: '?AIzaSyB35lTAP48jdsh0TA5p49nFGwBljvtkimk&' //Uma
	,pagination : {
					PageSize:30
					,PageSizes:[20,30,50]
				  }
	,dateFormat: ['dd-MM-yyyy','dd-MMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate']
	,postData: function (data, url, $http, $q, successCallback, errorCallback) 
    {
        var deferred = $q.defer();
        $http.post(appUtil.serviceBaseUrl + url,
            data, { headers: { 'Content-Type': 'application/json; charset=utf-8'} }).success(function (response) {
                //success callback
                if (response.Success) {
                    if (successCallback) {
                        successCallback(response);
                    }
                    deferred.resolve(response);
                } else {
                	deferred.reject({ error_description: response.Message });
                }
            }).error(function (err, status) {
                //error callback
                if (errorCallback) {
                    errorCallback(err);
                }
                deferred.reject({ error_description: err });
            });

        return deferred.promise;
    }
}