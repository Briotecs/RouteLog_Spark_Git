'use strict';
app.controller('HaultedVehrptCtrl',function ($scope,$state,$filter,$ngBootbox,apiServiceFactory,$loading,appInfoService,Page,DTOptionsBuilder, DTColumnBuilder) {
	Page.setTitle('Haulted Vehicle Report');
//,usSpinnerService

 //-------------------------Get List of Vehicle----------------------------------------------------------------------------
  $scope.selected="";
  $scope.ListOfVehicle = [];
  $scope.ListOfVehicle = appInfoService.getLocalStorage('VehicleList');
  $scope.vehNumber = '';

  if ($scope.ListOfVehicle.length) {
    $scope.vehNumber = $scope.ListOfVehicle[0];    
  }

//-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');

//-------------------------------------------------------------------------------------------------------------
    $scope.SpeedLimits = [
        { text: "above 30 mins", value: "30"},
        { text: "above 45 mins", value : "45" },
        { text: "above 60 mins", value : "60" }
    ];
    
    $scope.speedvalidation = $scope.SpeedLimits[0].value;
//-------------------------------------------------------------------------------------------------------------
      // $scope.odata = [];
      $scope.vchhistory = [];
      $scope.Speed = '';
      $scope.fromDate ='';
      $scope.toDate ='';
      // $scope.reportdt = new Date();
      $scope.fromDate = new Date();

      $scope.toDate = new Date();
      $scope.data = [];
      var fromFilterDt;
      var toFilterDt;

  function getHaultVehRpt()
   {
    fromFilterDt = $filter('date')($scope.fromDate, "yyyy-MM-dd")
    toFilterDt = $filter('date')($scope.toDate, "yyyy-MM-dd")
        var req = {
                      "company_ID" : appAuthInfo.Data.company_ID
                      ,"FromDtTime" : fromFilterDt + " 00:00:00"
                      ,"ToDtTime" : toFilterDt + " 23:59:00"
                      ,"VehNo" : $scope.vehNumber
                      ,"RType" : "Hault"
                      ,"FilterField":$scope.speedvalidation
                  }
                  
     apiServiceFactory.getVehTripDetails(req)
        .then(function(res){
          if (res.Success)
          {
		  if(res.Data.length != 0 ){
			 $scope.data = res.Data; 
			 //usSpinnerService.stop('spinner-5');
		  }else{
			 // usSpinnerService.stop('spinner-5');
			$ngBootbox.alert('Sorry,No data available...!!!');
		  }
          }
          
        },function(res){
			//usSpinnerService.stop('spinner-5');
          $ngBootbox.alert(res.Message)
        });
  }

  
    $scope.submit = function(){
		//usSpinnerService.spin('spinner-5');
      getHaultVehRpt();
     
    }
  
		 $scope.vm = {}; 

		 $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [, 'asc']); 


  $scope.today = function() {
    $scope.fromDate = new Date();
  };
  $scope.today();

  $scope.today = function() {
    $scope.toDate = new Date();
  };
  $scope.today();

  // $scope.clear = function() {
  //   $scope.reportdt = null;
  // };
  $scope.clear = function() {
    $scope.fromDate = null;
  };
  $scope.clear = function() {
    $scope.toDate = null;
  };
  
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  // $scope.setDate = function(year, month, day) {
  //  $scope.reportdt = new Date(year, month, day);
  // };
  $scope.setDate = function(year, month, day) {
    $scope.fromDate = new Date(year, month, day);
  };

$scope.setDate = function(year, month, day) {
    $scope.toDate = new Date(year, month, day);
  };
 
  $scope.format = appUtil.dateFormat[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  
});