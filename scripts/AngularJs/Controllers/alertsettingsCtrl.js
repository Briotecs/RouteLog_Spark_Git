'use strict';
app.controller('alertsettingsCtrl',function ($scope,$state,$ngBootbox,apiServiceFactory,$loading,appInfoService,Page) {
  Page.setTitle('Alert Settings'); 
  $loading.start('spinLoading');

  //-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');

//-------------------------------------------------------------------------------------------------------------

    $scope.checkEmail = function(index)
    {
      if($scope.data[index].IsEmail == 0)
      {
          $scope.data[index].IsEmail =1;
      }
      else
      {
        $scope.data[index].IsEmail =0;
      }
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

    $scope.checkPushNotification = function(index)
    {
      if($scope.data[index].IsPushNotification == 0)
      {
          $scope.data[index].IsPushNotification =1;
      }
      else
      {
        $scope.data[index].IsPushNotification =0;
      }
    }

    $scope.data=[];

  function load() 
    { 
        var req =   {
                       "company_ID" :  appAuthInfo.Data.company_ID
                    }
                            
        apiServiceFactory.getAlertSetting(req)
        .then(function(res){
          if (res.Success)
          {
            $scope.data = angular.copy(res.Data);
           //console.log(res.Data);
          }
          
        },function(res){
          $ngBootbox.alert(res.Message)
        });

   }

  load();

  $scope.changeEmail = function(value){
    console.log('Call changeEmail.....')
        if (value == 0)
        {
            value = 1;
        }
        else
        {
            value = 0;
        }
  }

  $scope.save = function()
    {
        var req = angular.copy($scope.data);
        apiServiceFactory.saveAlertSetting(req).then(
        function (res) {
          if (res.Success) {
            // var rtemdata = angular.copy(res);
            $ngBootbox.alert(res.Message).then(function(){
              //afterSaveOrCancel();
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
            $state.go("dashboard");
        });     
    }
	$scope.data = [];

    $scope.speedalert = 'true';

});