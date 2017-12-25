var app = angular.module('brioweb',['ngRoute'
                                    ,'ui.bootstrap'
                                    ,'ngMap'
                                    ,'ngTouch'
                                    ,'ui.grid'
                                    ,'ui.grid.selection'
                                    ,'ui.grid.pagination'
                                    ,'ui.grid.exporter'
                                    ,'ui.grid.moveColumns'
                                    ,'ui.grid.pinning'
                                    ,'ui.grid.autoResize'
                                    ,'ui.grid.resizeColumns'
                                    ,'ui.router'
                                    ,'ngBootbox'
									                  ,'googlechart'
                                    ,'ngAnimate'
                                    ,'ngStorage'
                                    ,'darthwade.dwLoading'
                                    ,'rzModule'
                                    ,'datatables'
									                 ,'angularSpinner'
                                   ,'ngLoadingSpinner'
                                    ]);

app.run(function($rootScope, NgMap) {
        NgMap.getMap().then(function(map) {
          $rootScope.map = map;
        });
      });
app.directive('appPage', function () {
    // <app-page> </app-page> 
    return {
        restrict: 'EA',
        templateUrl: 'common/header.html'
    };
});


app.run(function ($rootScope, $state, authFactory) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.authenticate && !authFactory.isAuthenticated()){
      // User isn’t authenticated
      $state.transitionTo("login");
      event.preventDefault(); 
    }else{
      var x = document.getElementById("mainmenu");
      x.style.display = "block";
      var x1 = document.getElementById("frmHeader");
      x1.style.display = "block";
    }
  });
});
/*
app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  }]);
  */  
  
app.config(['usSpinnerConfigProvider', function (usSpinnerConfigProvider) {
    usSpinnerConfigProvider.setTheme('bigBlue', {color: 'blue', radius: 20});
    usSpinnerConfigProvider.setTheme('smallRed', {color: 'red', radius: 6});
}]);
	  
app.config(function ($stateProvider,$urlMatcherFactoryProvider,$urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $stateProvider
    // .state("main", {
    //     url: "/main",
    //     templateUrl: "../Views/main.htm"
    // })

    .state("dashboard", {
        url: "/dashboard",
        controller: "dashboardCtrl",
        templateUrl: "../Views/dashboard.htm"
        ,authenticate: true
    })

    .state("speedReport", {
        url: "/speedReport",
        controller: "speedReportCtrl",
        templateUrl: "../Views/speedReport.htm"
        ,authenticate: true
    })

    .state("idlevchrpt", {
         url: "/idlevchrpt",
        controller: "idlevchrptCtrl",
        templateUrl: "../Views/idlevchrpt.htm"
        ,authenticate: true
    })   
 
    .state("userProfile", {
         url: "/userProfile",
        controller: "userProfileCtrl",
        templateUrl: "../Views/userProfile.htm"
        ,authenticate: true
    })  

    .state("alerts", {
         url: "/alerts",
        controller: "alertsettingsCtrl",
        templateUrl: "../Views/alertsettings.htm"
        ,authenticate: true
    })

    .state("history", {
         url: "/history",
        controller: "historyCtrl",
        templateUrl: "../Views/history.htm"
        ,authenticate: true
    })

    .state("orgProfile", {
         url: "/orgProfile",
        controller: "orgProfileCtrl",
        templateUrl: "../Views/orgProfile.htm"
        ,authenticate: true
    })

    .state("editUser", {
         url: "/editUser?ID",
        controller: "editUserCtrl",
        templateUrl: "../Views/editUser.htm"
        ,authenticate: true
    })      

    .state("login", {
         url: "/login",
        controller: "loginCtrl",
        templateUrl: "../Views/login.htm"
        ,authenticate: false
    }) 

    .state("EditPwd", {
         url: "/EditPwd",
        controller: "EditPwdCtrl",
        templateUrl: "../Views/EditPwd.htm"
        ,authenticate: true
    })

    .state("liveAll", { 
         url: "/liveAll?vehstatus",
         controller: "liveCtrl",
        templateUrl: "../Views/live.htm"
        ,authenticate: true
    })

    .state("liveMoving", { 
         url: "/liveMoving?vehstatus",
         controller: "liveCtrl",
        templateUrl: "../Views/live.htm"
        ,authenticate: true
    })

    .state("liveIdle", { 
         url: "/liveIdle?vehstatus",
         controller: "liveCtrl",
        templateUrl: "../Views/live.htm"
        ,authenticate: true
    })

    .state("liveHault", { 
         url: "/liveHault?vehstatus",
         controller: "liveCtrl",
        templateUrl: "../Views/live.htm"
        ,authenticate: true
    })
    
    .state("HaultedVehrpt", { 
         url: "/HaultedVehrpt",
        controller: "HaultedVehrptCtrl",
        templateUrl: "../Views/HaultedVehrpt.htm"
        ,authenticate: true
    })

    .state("MovingVehReport", { 
         url: "/MovingVehReport",
        controller: "MovingVehReportCtrl",
        templateUrl: "../Views/MovingVehReport.htm"
        ,authenticate: true
    })

    .state("GeoZone", { 
         url: "/GeoZone",
        controller: "GeoZoneCtrl",
        templateUrl: "../Views/GeoZone.htm"
        ,authenticate: true
    })
    .state("licence", { 
         url: "/licence",
        controller: "licenceCtrl",
        templateUrl: "../Views/licence.htm"
        ,authenticate: true
    })
     .state("changePassword", { 
         url: "/changePassword",
        controller: "changePasswordCtrl",
        templateUrl: "../Views/changePassword.htm"
        ,authenticate: true
    })
      .state("editVehicle", {
         url: "/editVehicle?VehicleNumber",
        controller: "editVehicleCtrl",
        templateUrl: "../Views/editVehicle.htm"
        ,authenticate: true
    })      

    // $routeProvider.otherwise({ redirectTo: "/dashboard" });
});

app.factory('Page', function(){
  var title = 'default';
  return {
    title: function() { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});