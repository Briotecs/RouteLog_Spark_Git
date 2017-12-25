'use strict';
app.controller('historyCtrl',function ($scope,$state,$filter,apiServiceFactory,$http,appInfoService, $q,$timeout,$interval,$ngBootbox,$loading,Page) {
Page.setTitle('Vehicle History');
$scope.ListOfVehicle = [];
  $scope.ListOfVehicle = appInfoService.getLocalStorage('VehicleList');
  $scope.vehNumber = '';

  if ($scope.ListOfVehicle.length) {
    $scope.vehNumber = $scope.ListOfVehicle[0];    
  }

 function apply(scope) 
  {
    if (!scope.$$phase && !scope.$root.$$phase) {
      scope.$apply();
    } 
    else {
      setTimeout(function() {
          apply(scope)
      }, 200);
    }
  }

$scope.isMap = true;
$scope.isPlay = true;
$scope.stopPlay = false;
$scope.data = [];
$scope.dataGird = [];
$scope.historydt =[];
$scope.historydt = new Date();
$scope.markers = [];
$scope.vchhistory = [];
$scope.vehPoints = [];
$scope.tempVehPoints = [];
$scope.gaugeSpeed = 0;

$scope.iconMoving = new google.maps.MarkerImage("/Content/map_icons/moving.png");
var indexValue = 0;
var stop;
var perTimer = 0;
var playIndex = 0;
var index = 0;
var currentLength = 0;
var appAuthInfo= {};
appAuthInfo = appInfoService.getLocalStorage('authInfo');

var Speed = 0;
Speed = appAuthInfo.Data.SpeedLmt;
var OverSpeed = 0;
OverSpeed = appAuthInfo.Data.OverSpeedLmt;   

  $scope.showLiveMap = false;
  $scope.showLiveMap = false;
  var firtslat, firstlong,
      iconHault = new google.maps.MarkerImage("/Content/map_icons/off.png"), 
      iconIdle  = new google.maps.MarkerImage("/Content/map_icons/idle.png"),
      iconOverSpeed  = new google.maps.MarkerImage("/Content/map_icons/overSpeed.png"),
      iconSpeed  = new google.maps.MarkerImage("/Content/map_icons/speed.png"),
      iconMoving  = new google.maps.MarkerImage("/Content/map_icons/moving.png"), 
      icon = new google.maps.MarkerImage("/Content/map_icons/moving_icon.png"),
      iconStart = new google.maps.MarkerImage("/Content/map_icons/flag.png"),
      iconEnd = new google.maps.MarkerImage("/Content/map_icons/lmv_off.png"),
      iconCaution = new google.maps.MarkerImage("/Content/map_icons/caution.png"),
      center = null,
      map = null,
      currentPopup,
      iconLastSet = "";

  var bounds = new google.maps.LatLngBounds();
  var markLAT, markLNG, trackId;
  var marker;
  var pointMarker;
  var pointSaticMarker;
  var flightPath;
  var staticMarker = [];
  var route;
  var movingMarker = [];

$scope.map = 
          {
            centerLat:11.8050563
            ,centerLon:78.377721
          }
$scope.myZoomLevel = 6;     

//----------------------Gauge--------------------------

    $scope.myChartObject = {};
    $scope.myChartObject.type = "Gauge";

    $scope.myChartObject.options = {
      width: 400,
      height: 140,
     // redFrom: 90,
      redTo: 100,
      //yellowFrom: 75,
      //yellowTo: 90,
      greenFrom: 20,
      majorTicks: ['0', '25', '50', '75', '100'],
      minorTicks: 5
    };
    $scope.myChartObject.options.greenTo = Speed;
    $scope.myChartObject.options.yellowFrom = Speed;
    $scope.myChartObject.options.yellowTo = OverSpeed;
    $scope.myChartObject.options.redFrom = OverSpeed;   
    loadGaugeChart(0);    

//----------------------End of Gauge--------------------------
  
  /* Date picker*/
  $scope.today = function() {
    $scope.historydt = new Date();
  };
  $scope.today();

  $scope.clear = function() {
    $scope.historydt = null;
  };
  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.historydt = new Date(year, month, day);
  };

  $scope.format = appUtil.dateFormat[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };

  $scope.showMap = function()
  {
      $scope.isMap = !$scope.isMap;
  }

  $scope.playMap = function(){
    alert('Clicked play');
  }
  /* End of Date picker*/

 /* Method to show grid data */
 function getVchHistory()
 {
    var filterDt = $filter('date')($scope.historydt, "yyyy-MM-dd")
    var tdata = {
                  "vchNumber" : $scope.vehNumber
                  ,"fromDateTime" : filterDt + " 00:00:00"
                  ,"toDateTime" : filterDt + " 23:59:00"
                }
    apiServiceFactory.GetVchHistorySummary(tdata) 
    .then(function(res){
      if (res.Success)
         {
            $scope.dataGird = angular.copy(res.Data);
          }
          
        },function(res){
          $ngBootbox.alert(res.Message)
        });
  }
 
 /* Method to show points in Map */
  function getHistoryData() 
  {
    var filterDt = $filter('date')($scope.historydt, "yyyy-MM-dd")
    var tdata = {
                  "vchNumber" : $scope.vehNumber
                  ,"fromDateTime" : filterDt + " 00:00:00"
                  ,"toDateTime" : filterDt + " 23:59:00"
                }
                
    apiServiceFactory.GetVehicleHistory(tdata) 
    .then(function(res){
      if (res.Success)
      {
      if(flightPath !== undefined){
        flightPath.setMap(null);
      }
      if(route !== undefined){
      //console.log("Clearing route : "+route);
      route.setMap(null);
      marker.setMap(null);
      }
      deleteMarkers();
      
        if (res.Data.Points.length) {
           
          $scope.data = angular.copy(res.Data);
          $scope.markers = angular.copy($scope.data.Points);
          $scope.map.centerLat = $scope.markers[$scope.markers.length-1].Lat;
          $scope.map.centerLon = $scope.markers[$scope.markers.length-1].Lon;
      
          $scope.vehPoints = angular.copy($scope.data.Points);
          $scope.myZoomLevel = 8;
            
          //console.log("Load map");
          initMyMap();
  
        }else{
      
          $scope.map.centerLat = 11.8050563;
          $scope.map.centerLon = 78.377721;
          $ngBootbox.alert('Sorry, No History available...!!!')
        }
      }
      
    },function(res){
      $ngBootbox.alert(res.Message)
    })
  }
  
 //Gauge chart Start//

 function loadGaugeChart(speed){

     $scope.myChartObject.data = [
      ['Label', 'Value'],
      ['km/h', speed]
    ];
     apply($scope);  
}

$scope.slider = {
  value: 2,
  options: {
    floor: 1,
    ceil: 3,
    step: 1,
    rightToLeft: true,
    showTicksValues: true,
    translate: function(value) {
      if (value == 1)
        return 'Fast';
      if (value == 2)
        return 'Med';
      return 'Slow'
    }
  }
};
 // Gauge Chart End//
  $scope.showHistory =  function(){
    
    //usSpinnerService.spin('spinner-2');
    currentLength = 0;
    if($scope.isPlay == false){
      //route.setMap(null);
      // deleteMarkers();
      map.clear();
      map.off();
    }
   
    getHistoryData();
    getVchHistory();
  }
  
  function showIconByStatus(vehPoint,indx)
    {
    var iconName;
      if (indx == 0) {
        iconName = "flag";
      }else if ($scope.vehPoints.length-1 == indx ) {
        if (vehPoint.Ing == "OFF") {
          iconName = "lmv_off";  
        }else{
          iconName = "lmv_move";
        }
      }else if(vehPoint.Ing === "OFF" && vehPoint.Spd > 0){
        iconName = "caution";
      }else if(vehPoint.Ing === "OFF"){
        iconName = "off";
      }else{
        if((vehPoint.Spd > 0  ) && (vehPoint.Spd < Speed))
        {
          if (iconLastSet != "moving") {
            iconName = "moving";
          }else{
            iconName = "";
          }
          iconLastSet = "moving";
        }else if((vehPoint.Spd >= Speed)){
          if (iconLastSet != "speed") {
            iconName = "overSpeed";
          }else{
            iconName = "";
          }
          iconLastSet = "speed";
        }else if(vehPoint.Spd == 0){
          iconName = "idle";                    
        }
      }
      
      return 'content/map_icons/' + iconName + '.png';
    }
  
  function loadTitle(vehPoint)
  {
    var titleString;
      if(vehPoint.Ing === "OFF")
      {
        titleString = 'Hault Hrs : '+JSON.stringify(vehPoint.Hrs)+', Time : '+JSON.stringify(vehPoint.PtTime);
      }else{
        if((vehPoint.Spd > 0  ) && (vehPoint.Spd < Speed)){
        titleString = 'Speed : ' +JSON.stringify(vehPoint.Spd) +'Kmph, Time : '+JSON.stringify(vehPoint.PtTime);                  
        // }else if((vehPoint.Spd >= Speed) && (vehPoint.Spd  < OverSpeed)){
        // titleString = 'Speed : ' +JSON.stringify(vehPoint.Spd) +'Kmph, Time : '+JSON.stringify(vehPoint.PtTime);
        }else if(vehPoint.Spd >= Speed){
        titleString = 'Speed : ' +JSON.stringify(vehPoint.Spd) +'Kmph, Time : '+JSON.stringify(vehPoint.PtTime);
        }else if(vehPoint.Spd == 0){
        titleString = 'Idle Hours : '+JSON.stringify(vehPoint.Hrs)+', Time : ' +JSON.stringify(vehPoint.PtTime);                    
        }
      }
      return  titleString;
  }
  
  /* play map calling function */
  
  function moveMarker(map, marker, lat, lon) {
    try {
      marker.setPosition(new google.maps.LatLng(lat, lon));
      map.panTo(new google.maps.LatLng(lat, lon));

    } catch (e) {}
  }
  
  $scope.autoRefresh = function() {
    try {
      route = new google.maps.Polyline({
              path: [],
              geodesic : true,
              strokeColor: '#1A3289',
              strokeOpacity: 1.0,
              strokeWeight: 3,
              editable: false,
              map:map
            }),
           // index=0,
            marker=new google.maps.Marker({map:map,icon:icon});
      
      if (!_.isEmpty($scope.vehPoints)) 
      {

       if ( angular.isDefined(stop) ) return;
          stop = $interval(function() 
          {

             if (currentLength < $scope.vehPoints.length) 
             {
                //currentLength = currentLength+1;
                var coordinates = $scope.vehPoints[currentLength];
                route.getPath().push(new google.maps.LatLng(coordinates.Lat, coordinates.Lon));
                    
                route.setMap(map);
                moveMarker(map, marker, coordinates.Lat, coordinates.Lon);
                markLAT = coordinates.Lat;
                markLNG = coordinates.Lon;
                $scope.gaugeSpeed = coordinates.Spd;

                if (currentLength == 0) 
                {
                  pointMarker = new google.maps.Marker({map:map,icon:iconStart,options: { title: 'Hault Hrs : '+JSON.stringify(coordinates.Hrs)+', Time : '+JSON.stringify(coordinates.PtTime)}});
                  pointMarker.setPosition(new google.maps.LatLng(coordinates.Lat, coordinates.Lon));
                  staticMarker.push(pointMarker); 
                }
                else if (currentLength == $scope.vehPoints.length) 
                {
                  pointMarker = new google.maps.Marker({map:map,icon:iconEnd,options: { title: 'Hault Hrs : '+JSON.stringify(coordinates.Hrs)+', Time : '+JSON.stringify(coordinates.PtTime)}});
                  pointMarker.setPosition(new google.maps.LatLng(coordinates.Lat, coordinates.Lon));
                  staticMarker.push(pointMarker);
                }
                else if(coordinates.Ing === "OFF" && coordinates.Spd > 0)
                {
                  pointMarker = new google.maps.Marker({map:map,icon:iconCaution,options: { title: 'Hault Hrs : '+JSON.stringify(coordinates.Hrs)+', Time : '+JSON.stringify(coordinates.PtTime)}});
                  pointMarker.setPosition(new google.maps.LatLng(coordinates.Lat, coordinates.Lon));
                  staticMarker.push(pointMarker);
                }
                else if(coordinates.Ing === "OFF")
                {
                  pointMarker = new google.maps.Marker({map:map,icon:iconHault,options: { title: 'Hault Hrs : '+JSON.stringify(coordinates.Hrs)+', Time : '+JSON.stringify(coordinates.PtTime)}});
                  pointMarker.setPosition(new google.maps.LatLng(coordinates.Lat, coordinates.Lon));
                  staticMarker.push(pointMarker);
                }
                else
                {
                  
                  if((coordinates.Spd > 0  ) && (coordinates.Spd < Speed))
                  {
                    
                    if((currentLength%10) == 0)
                    {
                      pointMarker = new google.maps.Marker({map:map,icon:iconMoving,options: { title: 'Speed : ' +JSON.stringify(coordinates.Spd) +'Kmph, Time : '+JSON.stringify(coordinates.PtTime) }});
                      pointMarker.setPosition(new google.maps.LatLng(coordinates.Lat, coordinates.Lon));
                      staticMarker.push(pointMarker);
                      //setMapOnAll(map);
                    }
                    else
                    {
                    
                    }
                      loadGaugeChart(coordinates.Spd);      
                  }
                  else if(coordinates.Spd >= Speed)
                  {
                    pointMarker = new google.maps.Marker({map:map,icon:iconOverSpeed,options: { title: 'Speed : ' +JSON.stringify(coordinates.Spd) +'Kmph, Time : '+JSON.stringify(coordinates.PtTime) }});
                    pointMarker.setPosition(new google.maps.LatLng(coordinates.Lat, coordinates.Lon));
                    staticMarker.push(pointMarker);
                    loadGaugeChart(coordinates.Spd);  
                    //setMapOnAll(map);
                  }
                  else if(coordinates.Spd == 0)
                  {
                    
                    pointMarker = new google.maps.Marker({map:map,icon:iconIdle,options: { title: 'Idle Hrs : '+JSON.stringify(coordinates.Hrs)+', Time : ' +JSON.stringify(coordinates.PtTime)}});
                    pointMarker.setPosition(new google.maps.LatLng(coordinates.Lat, coordinates.Lon));
                    staticMarker.push(pointMarker);
                    loadGaugeChart(coordinates.Spd);          
                    //setMapOnAll(map);
                  }
                }
                currentLength = currentLength+1;
                //staticMarker.push(pointMarker);
                //setMapOnAll(map);
              }
              else
              {
                 console.log("Reached else");
                 $scope.isPlay = true;
                 currentLength = 0;
                 $scope.stopFight();
              }
      
          }, 200 * $scope.slider.value);
      }   
    } catch (e) {
      console.log(e); 
    }
  };
  
  
  
  function initMap()
  {
    try 
    {
      console.log("INITMAP");
      if(currentLength == 0)
      {
        markLAT = $scope.vehPoints[$scope.vehPoints.length - 1].Lat;
        markLNG = $scope.vehPoints[$scope.vehPoints.length - 1].Lon;
        map = new google.maps.Map(document.getElementById("map"), {
          center: new google.maps.LatLng(markLAT, markLNG),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
          }, 
          navigationControl: true,
          navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
          }
        });
       $scope.autoRefresh();
      }
      else
      {
        console.log("INITMAP else");
        $scope.autoRefresh();
      }
    } 
    catch (e) 
    {
      console.log(e);
    }
  }
  
  function initMyMap() 
  {
      markLAT = $scope.vehPoints[$scope.vehPoints.length - 1].Lat;
      markLNG = $scope.vehPoints[$scope.vehPoints.length - 1].Lon;
      map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: new google.maps.LatLng(markLAT, markLNG),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    
      $scope.map.centerLat = 11.8050563;
      $scope.map.centerLon = 78.377721;

        flightPath = new google.maps.Polyline({
          path: [],
          geodesic: true,
          strokeColor: '#1A3289',
          strokeOpacity: 1.0,
          strokeWeight: 3
        });
    
    angular.forEach($scope.vehPoints,function(coordinates,$index){

      flightPath.getPath().push(new google.maps.LatLng(coordinates.Lat, coordinates.Lon));  
       var marker = new google.maps.Marker({
              position: new google.maps.LatLng(coordinates.Lat, coordinates.Lon),
              map: map,
              icon: showIconByStatus(coordinates,$index),
              title: loadTitle(coordinates),
              zIndex: index
            });
      
      staticMarker.push(marker);
      setMapOnAll(map);
      
    });
        // $loading.finish('spinLoading');
        flightPath.setMap(map);
  }
    
  $scope.playGPSTracking = function() 
  {
    $scope.stopPlay = false;
    $scope.isPlay = false;
      initMap();  
  };
  
  $scope.pauseGPSTracking = function() 
  {
    currentLength = currentLength-1;
    $scope.stopFight();
  
    $scope.stopPlay = true;
    $scope.isPlay = true;
  
  };

  $scope.stopFight = function() 
  {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
  };
    
   function setMapOnAll(map) {
        for (var i = 0; i < staticMarker.length; i++) {
          staticMarker[i].setMap(map);
        }
   }
    
   function clearMarkers() {
       setMapOnAll(null);
   }
    
   function deleteMarkers() {
        clearMarkers();
        staticMarker = [];
   }
   
  /*Page init*/
  $scope.showHistory();

});