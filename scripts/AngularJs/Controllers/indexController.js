'use strict';
app.controller('indexController',function ($scope, $rootScope, $state,$location,$injector,authFactory,Page) {
	$scope.Page = Page;
	$scope.$state = $injector.get('$state');
	
	$rootScope.sideMenu=0;
	$rootScope.authentication = {};


	
    $scope.logOut = function () {
		if (authFactory.logOut()) {
			$rootScope.authentication  = {};
            $state.go("login");	
		}
    };


	$rootScope.setMenuActive = function(path)
	{
		//return ($location.path().substr(0, path.length) === path) ? 'active' : '';
		return $state.current.name;
	}   
	

});