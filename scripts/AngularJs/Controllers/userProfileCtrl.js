'use strict';
app.controller('userProfileCtrl',function ($scope,$location,$route,$ngBootbox,apiServiceFactory,$loading,appInfoService,Page,DTOptionsBuilder, DTColumnBuilder) {
Page.setTitle('User Profile List'); 	
 //-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');

//-------------------------------------------------------------------------------------------------------------
  $scope.data=[];

/* call user form */
 $scope.editUser = function(data)
  {
      $ngBootbox.confirm('Do you want to edit?' +data.Name)
      .then(function(){
          $location.url('/editUser?ID='+data.ID)
          }); 
  };

  function pageinit() 
    { 
      
        var req = {
                    "company_ID" : appAuthInfo.Data.company_ID                    
                   }
        
        apiServiceFactory.getUserList(req)
        .then(function(res){
          if (res.Success)
          {
               $scope.data = res.Data;
          }
          
        },function(res){
          $ngBootbox.alert(res.Message)
        });

   }
  
  pageinit();

});