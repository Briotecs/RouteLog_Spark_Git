'use strict';
app.controller('EditPwdCtrl',function ($scope,apiServiceFactory,appInfoService) {
	console.log('run All vehicle');

$scope.newPwd = '';
$scope.confirmPwd = '';
$scope.currentPwd = '';

//-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');

//-----------------------------------------------------------------------------------------------------------------------

 function updatePassword (){
	console.log("In update pwd");
    var updateData = { 
		ID : appAuthInfo.Data.company_ID
		,company_ID : appAuthInfo.Data.company_ID
		,OldPassword : $scope.currentPwd
		,Password : $scope.newPwd 
        };
    apiServiceFactory.UpdatePwd(updateData)
    .then(function(res){
      if (res.Success)
      {
       // $state.go("dashboard");
        console.log("Response --> "+res.Success);
		alert('Updated Successully');
      }
      else{
      	alert('Incorrect fields');
      }
      
    },function(res){
      $ngBootbox.alert('Failed : '+res.Message)
    })
  }

$scope.checkSamePwd = function (){
	
	var newPassword = $scope.newPwd;
	var confirmPassword = $scope.confirmPwd;
	
	if(newPassword === confirmPassword){
		updatePassword();
	}else{
		alert('Not equal');
	}
}


});