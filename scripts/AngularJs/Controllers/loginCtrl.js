'use strict';
app.controller('loginCtrl',function ($scope,$state,$ngBootbox,apiServiceFactory,appInfoService,authFactory,$loading,$localStorage) {
//,usSpinnerService
$scope.username = '';
$scope.password = '';

 var x = document.getElementById("mainmenu");
 x.style.display = "none";

 var x1 = document.getElementById("frmHeader");
 x1.style.display = "none";

function isBlank(str) {
	console.log("IS Blank");
    return (!str || /^\s*$/.test(str));
}


   function checkForValidCredentials()
   {
  	var userName = $scope.username;
  	var userPassword = $scope.password;
  	
  	if(isBlank(userName) || isBlank(userPassword)){
  		return false;
  	}else{
  		console.log("Not Blank");
  		return true;
  	}
  }

  $scope.login = function ()
  {
	   //usSpinnerService.spin('spinner-1');
  	
  	    $scope.isDisabled = true;
    	if(checkForValidCredentials())
      {
        var req = {          
              EmailID : $scope.username
             ,Password : $scope.password
             
            }
        authFactory.login(req)
        .then(function(res){
          if (res.Success)
          {
            //getAllVehicle();
          	$loading.finish('spinLoading');
            getAllVehicle(res.Data.company_ID);
          	
          }
          else{
          	//usSpinnerService.stop('spinner-1');
          	$ngBootbox.alert('Invalid username/password...!!!')
          	$scope.isDisabled = false;
          }
          
        },function(res){
          //usSpinnerService.stop('spinner-1');
          $ngBootbox.alert(res.error_description)
          $scope.isDisabled = false;
        })
    	}else{
    		//usSpinnerService.stop('spinner-1');
    		$ngBootbox.alert('Bad credentials..');
    		$scope.isDisabled = false;
    	}
    }

  function getAllVehicle(ID)
  {
    // appAuthInfo.Data.company_ID
      var req = '?companyID='+ID;
      apiServiceFactory.getAllVehicleList(req)
      .then(function(res){
        if (res.Success)
        {
          $scope.AllVehicleList = angular.copy(res.Data);
          appInfoService.setLocalStorage('VehicleList', $scope.AllVehicleList);
          $state.go("dashboard");
        }
        
      },function(res){
        $ngBootbox.alert(res.Message)
      });
  }
  
  
  


});