'use strict';
app.controller('editUserCtrl',function ($scope,$state,$stateParams,$ngBootbox,apiServiceFactory,appInfoService,Page) {
   Page.setTitle(' Add User Profile');
//-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');

//-------------------------------------------------------------------------------------------------------------

    $scope.data={
                  ID:0
                  ,company_ID:appAuthInfo.Data.company_ID
                  ,Name: ''
                  ,LName:''
                  ,EmailID:''
                  ,Phone:''
                  ,Mobile:''
                  ,Password:''
                  ,Role:''
                  ,Status:''
                };

    $scope.Roles = [
            { name: 'Admin', value: 1 },
            { name: 'User', value: 2 }
        ];

    $scope.Status = [
            { name: 'Active', value: 1 },
            { name: 'Inactive', value: 2 }
        ];

  var ID = 0;
  $scope.frmData = {
  btnsave :' Save',
  frmCaption: ' Add User Profile'
  }

//------------Form config-----------------------------
  if ($stateParams.ID) 
  {
     ID= $stateParams.ID;
     $scope.frmData.btnsave = ' Update';
     $scope.frmData.frmCaption = ' Edit User Profile'
     var req = '?ID=' + ID;
     Page.setTitle(' Edit User Profile');
     apiServiceFactory.GetUser(req).then(function(res){
        if (res.Success)
        {
          $scope.data.ID = res.Data.ID;
          $scope.data.company_ID = res.Data.company_ID;
          $scope.data.Name = res.Data.Name;
          $scope.data.LName = res.Data.LName;
          $scope.data.EmailID = res.Data.EmailID;
          $scope.data.Phone = res.Data.Phone;
          $scope.data.Mobile = res.Data.Mobile;
          $scope.data.Password = res.Data.Password;
          $scope.data.Role = res.Data.Role;
          $scope.data.Status = res.Data.Status;

          console.log($scope.data);
        }
      
      },function(res){
      $ngBootbox.alert(res.Message)
      }); 
  }

  $scope.save = function()
  {
    var req = angular.copy($scope.data);
    apiServiceFactory.InsertUser(req).then(
    function (res) {
      if (res.Success) {
        // var rtemdata = angular.copy(res);
        $ngBootbox.alert(res.Message).then(function(){
          $state.go("userProfile");
          // afterSaveOrCancel();
        })
      }
    },function (res){
       $ngBootbox.alert(res.Message)
    });
  }

	$scope.cancel = function()
  { 
    	$ngBootbox.confirm('Do you want to cancel?')
    	.then(function(){
    		$state.go("userProfile");
    	});    	
	}

});