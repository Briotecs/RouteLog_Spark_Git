'use strict';
app.controller('licenceCtrl',function ($scope,$location,$route,$ngBootbox,apiServiceFactory,$loading,appInfoService,Page,DTOptionsBuilder, DTColumnBuilder) {
Page.setTitle('Licence Info'); 	
 //-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');
$loading.start('spinLoading');
//-------------------------------------------------------------------------------------------------------------
     
  function load() 
    { 
      $loading.start('spinLoading');
        var req = '?ID=' + appAuthInfo.Data.company_ID;
        apiServiceFactory.GetVehicleLicence(req)
        .then(function(res){
          if (res.Success)
          {
            //$loading.start('spinLoading');
               $loading.finish('spinLoading');
               $scope.data = res.Data;
           // console.log(res.Data);
          }
          
        },function(res){
          $ngBootbox.alert(res.Message)
        });

   }
        $loading.start('spinLoading');
        load();


});