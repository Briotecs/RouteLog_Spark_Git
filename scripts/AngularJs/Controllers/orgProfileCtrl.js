'use strict';
app.controller('orgProfileCtrl',function ($scope,$state,$ngBootbox,apiServiceFactory,$loading,appInfoService,Page) {
  //$loading.start('spinLoading');
  Page.setTitle('Organisation Settings'); 
    $scope.data={};

//-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');

//-----------------------------------------------------------------------------------------------------------------------

  function load() 
    { 
        var req = {
                        ID:appAuthInfo.Data.company_ID,
                    }
        
        apiServiceFactory.getCompany(req)
        .then(function(res){
          if (res.Success)
          { 
            $loading.start('spinLoading');            
            $scope.data = angular.copy(res.Data);
           //console.log(res.Data);
           $loading.finish('spinLoading');
          }
          
        },function(res){
          $ngBootbox.alert(res.Message)
        });

   }

  load();

  $scope.update = function()
  {
    var req = angular.copy($scope.data);
    console.log($scope.data);
    apiServiceFactory.saveCompany(req).then(
    function (res) {
      if (res.Success) {
        // var rtemdata = angular.copy(res);
        $ngBootbox.alert(res.Message).then(function(){
          afterSaveOrCancel();
        })
      }else{
        $ngBootbox.alert(res.Message);
      }
    },function (res){
       $ngBootbox.alert(res.Message)
    });
 }

 //$scope.someProp = '/history',
 // 	$scope.update = function()
 //    {
 //    	$ngBootbox.confirm('Do you want to update?')
 //    	.then(function(){
 //    		$ngBootbox.alert('Your Settings has been Updated Successfully')
 //        .then(function(){
 //            $location.path('/orgprofsettings');
 //        });
 //    	});
 //    	//console.log($scope.data);  	
	// }

	$scope.cancel = function()
    {    
    	$ngBootbox.confirm('Do you want to cancel?')
    	.then(function(){
    		$state.go("dashboard");
    	});    	
	}
 });