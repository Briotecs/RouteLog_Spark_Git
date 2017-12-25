'use strict';
app.controller('dashboardCtrl',dashboardCtrl);

//var x1 = document.getElementById("frmHeader");
//var x1 = angular.element( document.querySelector( '#frmHeader' ) );
//x1.text('xxx');





function dashboardCtrl ($scope,$location,$state,$ngBootbox,apiServiceFactory,appInfoService, $localStorage, $loading, Page, DTOptionsBuilder, DTColumnBuilder) 
{
      Page.setTitle('Dashboard');
      appInfoService.setPath('Dashboard');
      $scope.dashBoardData = {VehStatus:[],VehList:[]}

  /*Get Auth Info*/
     var appAuthInfo= {};
     appAuthInfo = appInfoService.getLocalStorage('authInfo');

  /*Get Image*/
  $scope.getVehicleIcon = function(){
    return "content/map_icons/hmv.png";
  }


  /*Get Vehicle status*/
    function getVehicleStatus(req)
    {
          apiServiceFactory.VehicleStatus(req)
          .then(function(res){
            if (res.Success)
            {
              $scope.dashBoardData.VehStatus = res.Data;           
            }
            
          },function(res){
            $ngBootbox.alert(res.Message)
          });
    }  

  /*Get Vehicle List*/
    function getVehicleList(req)
    {
          apiServiceFactory.GetVehicleList(req)
          .then(function(res){
            if (res.Success)
            {
              $scope.dashBoardData.VehList = res.Data;           
            }
            
          },function(res){
            $ngBootbox.alert(res.Message)
          });
    } 

  /* Show History */
    $scope.showHistory = function()
    {
      $location.url('/history');
    }

  /* Show History */
    $scope.showLocation = function()
    {
     $location.url('/liveAll?vehstatus=AllVehicle');
    }

    function init(byLimit) 
    { 
      var req = {
                  "company_ID": appAuthInfo.Data.company_ID
                  ,"RepName" : byLimit
                }
        getVehicleStatus(req);
        var reqVehList = {
                          "companyID" : appAuthInfo.Data.company_ID
                          ,"vchNumber" : ""
                          ,"VchStatus" : "All"
                        }

        getVehicleList(reqVehList)
    }


/* Show History */
    $scope.editVehicle = function()
    {
      $location.url('/editVehicle');
    }

$scope.editVehicle = function(data)
  {
      $ngBootbox.confirm('Do you want to edit?' +data.VehicleNumber)
      .then(function(){
          $location.url('/editVehicle?VehicleNumber='+data.VehicleNumber)
                   }); 
  };


    init('today');

}