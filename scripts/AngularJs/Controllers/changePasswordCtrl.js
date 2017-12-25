'use strict';
app.controller('changePasswordCtrl',function ($scope,$state,$ngBootbox,apiServiceFactory,appInfoService,authFactory,$loading,$localStorage) {
//,usSpinnerService
//-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');

$scope.oldpassword = '';
$scope.newpassword = '';

function isBlank(str) {
	console.log("IS Blank");
    return (!str || /^\s*$/.test(str));
}


   function checkForValidCredentials()
   {
  	var oldPassword = $scope.oldpassword;
  	var newPassword = $scope.newpassword;
  	
  	if(isBlank(oldPassword) || isBlank(newPassword)){
  		return false;
  	}else{
  		console.log("Not Blank");
  		return true;
  	}
  }
 $scope.changepassword = function ()
  {
    if(checkForValidCredentials())
      {
      
          var req = {          
                    ID:appAuthInfo.Data.ID 
                    ,company_ID:appAuthInfo.Data.company_ID 
                    ,OldPassword : $scope.oldpassword
                   ,Password : $scope.newpassword
                   
                  }
              
            apiServiceFactory.UpdatePwd(req)
            .then(function(res){
              if (res.Success)
              {
                $ngBootbox.alert('Password Changed Successfully')
                console.log("updated")
                $state.go("dashboard");

              }
              else
              {
                  $ngBootbox.alert('Invalid Old Password')
              }
              
            },function(res){
              $ngBootbox.alert(res.Message)
            });

}
else{
        //usSpinnerService.stop('spinner-1');
        $ngBootbox.alert('Enter Password');
        $scope.isDisabled = false;
      }
}
  //
});