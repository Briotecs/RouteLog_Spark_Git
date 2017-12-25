'use strict';
app.controller('editVehicleCtrl',function ($scope,$state,$stateParams,$ngBootbox,apiServiceFactory,appInfoService,Page) {
   Page.setTitle(' Add Vehicle');
//-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');


$scope.data={
                  ID:0
                  ,company_ID:appAuthInfo.Data.company_ID
                  ,VehicleNumber: ''
                  ,VehicleType:''
                  ,EngNumber:''
                  ,DriverName:''
                  ,DriverMobile:''
                  ,BackupDay:''
                  ,Mobile:''
                  ,Status:''
                  ,Createdby:''
                 
                };

   $scope.Status = [
            { name: 'Active', value: 1 },
            { name: 'Inactive', value: 2 }
        ];
    
//-------------------------------------------------------------------------------------------------------------

    $scope.data={
                  ID:0
                  ,company_ID:appAuthInfo.Data.company_ID
                  ,VehicleNumber: ''
                  ,VehicleType:''
                  ,EngNumber:''
                  ,DriverName:''
                  ,DriverMobile:''
                  ,BackupDay:''
                  ,Mobile:''
                  ,Status:''
                  ,Createdby:''
                  ,Alerts:[]
                };

    $scope.Roles = [
            { name: 'Admin', value: 1 },
            { name: 'User', value: 2 }
        ];

    $scope.Status = [
            { name: 'Active', value: 1 },
            { name: 'Inactive', value: 2 }
        ];

 // var ID = 0;
  var VehicleNumberID=0;
  $scope.frmData = {
  btnsave :' Save',
  frmCaption: ' Add User Profile'
  }
//------------Form config-----------------------------
  if ($stateParams.VehicleNumber) 
  {
     VehicleNumberID= $stateParams.VehicleNumber;
     $scope.frmData.btnsave = ' Update';
     $scope.frmData.frmCaption = ' Edit Vehicle'
     //var req = '?ID=' + ID;

     var req = {          
                    company_ID:appAuthInfo.Data.company_ID
                    ,VehicleNumber:VehicleNumberID 
                  }
           
     Page.setTitle(' Edit Vehicle');
     apiServiceFactory.GetVehicle(req).then(function(res){
        if (res.Success)
        {
          $scope.data.ID = res.Data.ID;
          //$scope.data.company_ID = res.Data.company_ID;
          $scope.data.VehicleNumber = res.Data.VehicleNumber;
          $scope.data.VehicleType = res.Data.VehicleType;
          $scope.data.EngNumber = res.Data.EngNumber;
          $scope.data.DriverName = res.Data.DriverName;
          $scope.data.DriverMobile = res.Data.DriverMobile;
          $scope.data.BackupDay = res.Data.BackupDay;
          $scope.data.Mobile = res.Data.Mobile;
          $scope.data.Status = res.Data.Status;
          $scope.data.Createdby = res.Data.Createdby;
          $scope.data.Alerts = res.Data.Alerts;
          console.log($scope.data);
        }
      
      },function(res){
      $ngBootbox.alert(res.Message)
      }); 
  }

  $scope.checkSMS = function(index)
    {
      if($scope.data[index].IsSMS == 0)
      {
          $scope.data[index].IsSMS =1;
      }
      else
      {
        $scope.data[index].IsSMS =0;
      }
    }

   $scope.checkMail = function(index)
    {
      if($scope.data[index].IsMail == 0)
      {
          $scope.data[index].IsMail =1;
      }
      else
      {
        $scope.data[index].IsMail =0;
      }
    }

  $scope.save = function()
  {
    var req = angular.copy($scope.data);
    apiServiceFactory.InsertVehicle(req).then(
    function (res) {
      if (res.Success) {
        // var rtemdata = angular.copy(res);
        $ngBootbox.alert(res.Message).then(function(){
          $state.go("dashboard");
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
        $state.go("editVehicle");
      });     
  }

});