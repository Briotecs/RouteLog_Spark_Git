'use strict';
app.controller('liveCtrl',function ($scope,$state,$stateParams,$ngBootbox,apiServiceFactory,$log,appInfoService,Page) {
  Page.setTitle('Tracking : All Vehicle');   
 //-------------------------Get List of Vehicle----------------------------------------------------------------------------
  $scope.selected="";
  $scope.ListOfVehicle = [];
  $scope.ListOfVehicle = appInfoService.getLocalStorage('VehicleList');
  $scope.vehNumber = '';
  $scope.mapCenter = [12.0616259,78.3884725];

//-------------------------Get Company Info ----------------------------------------------------------------------------
   var appAuthInfo= {};
   appAuthInfo = appInfoService.getLocalStorage('authInfo');

//-------------------------------------------------------------------------------------------------------------
    $scope.vehicleStatus = [
            { name: 'All Vehicle', value: '' },
            { name: 'Moving Vehicle', value: 'Move' },
            { name: 'Idle Vehicle', value: 'Idle' },
            { name: 'Hault Vehicle', value: 'Off' }
          ];

    $scope.data = [];
    $scope.vchhistory = [];
     
    $scope.vchInfoWindow = {
                        VehicleNumber: ''
                        ,DriverName: ''
                        ,Dt : null
                        ,Ignition : ''
                        ,Lat:''
                        ,Lon:''
                        ,Status: ''
                        ,address: ''
                        }; 

    
    $scope.isMap = true;
   
   //----------Check Query Params-----------


      $scope.vehstatus = {name:'All Vehicle', value:''}

      if ($stateParams.vehstatus)
      {
        var vStatus = $stateParams.vehstatus;
        if(vStatus == 'MovingVehicle')
        {
            $scope.vehstatus = {name:'Moving Vehicle', value:'Move'}
            Page.setTitle('Tracking : Moving Vehicle');   
        }
        else if(vStatus == 'IdleVehicle')
        {
            $scope.vehstatus = {name:'Idle Vehicle', value:'Idle'}
            Page.setTitle('Tracking : Idle Vehicle'); 
        }
        else if(vStatus == 'HaultVehicle')
        {
            $scope.vehstatus = {name:'Hault Vehicle', value:'Off'}
            Page.setTitle('Tracking : Hault Vehicle'); 
        }
  
      }

   //-------------------

    $scope.showIcon = function(data)
    {
      var iconName = data.VehicleType + '_' + data.Status;
      iconName = iconName.toLowerCase();
      return 'content/map_icons/' + iconName + '.png';
    }
      
    $scope.showMap = function()
    {
        $scope.isMap = !$scope.isMap;
    }

    $scope.isInfoWindow = false;
  
    $scope.showVchInfo = function(event, data) 
    {
        $scope.vchInfoWindow.VehicleNumber = data.VehicleNumber;
        $scope.vchInfoWindow.DriverName = data.DriverName;
        $scope.vchInfoWindow.Dt = data.Dt;
        $scope.vchInfoWindow.Ignition = data.Ignition;
        $scope.vchInfoWindow.Lat =data.Lat;
        $scope.vchInfoWindow.Lon =data.Lon;
        $scope.vchInfoWindow.Status = data.Status;
        $scope.vchInfoWindow.address = data.address;
        $scope.map.showInfoWindow('bar', this);
    };  



  function pageinit() 
  {

    var tdata = {};  
    tdata = {          
          "companyID" : appAuthInfo.Data.company_ID
          ,"vchNumber" : $scope.vehNumber
          ,"VchStatus": $scope.vehstatus.value
          }
    getVehicleStatus(tdata);
  }

  function getVehicleStatus(tdata)
  {

      $scope.data = [];
      apiServiceFactory.GetVehicleList(tdata)
      .then(function(res){
        if (res.Success)
        {
          $scope.data = angular.copy(res.Data);
          $scope.gridOptions.data = angular.copy(res.Data);
          if (res.Data.length == 1) {
            $scope.mapCenter = [res.Data[0].Lat,res.Data[0].Lon];
          }else{
            $scope.mapCenter = [12.0616259,78.3884725];
          }
          

          loadAddressData();
      }
        
      },function(res){
        $ngBootbox.alert(res.Message);
      })
  }


  function loadAddressData()
  {
      
      angular.forEach($scope.gridOptions.data, function(currentObj){
          var tempData = appUtil.googlemapKey  + 'latlng=' + currentObj.Lat + ',' + currentObj.Lon;
           apiServiceFactory.getgeocode(tempData)
          .then(function(res){
              if (res.status == "OK") 
              {
                if (res.results.length != 0) 
                {
                  currentObj["address"] = res.results[0].formatted_address;
                }
                else
                {
                  $log.error('Google api error : ' + res.error_message);
                }
                
              }
          },function(res){
            $ngBootbox.alert(res);
          });
      });
    }
  
    pageinit();
   
  
    $scope.submit = function()
    {
      pageinit();
    }
  
    $scope.refreshMap = function()
    {
      $log.debug('call refresh');
      pageinit();
    }

//-----------------------Data Grid---------------------------------
   $scope.gridOptions = {
    enableSorting: true,
    columnDefs: [    
      { field: '#',width: 30,displayName:'#', cellTemplate: '<div class="ui-grid-cell-contents">{{((grid.options.paginationCurrentPage-1)*grid.options.paginationPageSize) + (1+grid.renderContainers.body.visibleRowCache.indexOf(row))}} </div>'}
      ,{ field: 'VehicleNumber',width: 100,displayName:'Vehicle No'}
      ,{ field: 'Dt',width: 170,displayName:'Last Connected',cellTooltip: 
                function( row, col ) {
                  return ' StartDtTime: ' + row.entity.StartDtTime;
                }, headerTooltip: 
                function( col ) {
                  return 'Header: ' + col.displayName;
      }}
       ,{ field: 'address',width: 250,displayName:'Location'}
       ,{ field: 'spd',width: 70,displayName:'Speed'}
       ,{ field: 'duration',width: 85,displayName:'Duration'}
       ,{ field: 'Ignition',width: 85,displayName:'Ignition'}
       ,{ field: 'Status',width: 70,displayName:'Status'}
      // ,{ name: 'Action',resizable: false,width: '80',
      //   cellTemplate:'<div style="text-align: center;"> <i class="material-icons bt-green" style="cursor:pointer;" ng-click="grid.appScope.showMap(row.entity)" >location_on</i>'
      //   }
      ],
      enableColumnResize: true,
                rowHeight: 40,
    exporterLinkLabel: 'get your csv here',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 400,
    onRegisterApi: function(gridApi){ 
      $scope.gridApi = gridApi;
    }
}
 
 $scope.gridOptions.paginationPageSizes = appUtil.pagination.PageSizes;
 $scope.gridOptions.paginationPageSize = appUtil.pagination.PageSize;  
 $scope.gridOptions.data = [ ]; 

})