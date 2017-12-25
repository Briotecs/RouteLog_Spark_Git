'use strict';
app.controller('loginCtrl',function ($scope,$rootScope,$state, $localStorage, $sessionStorage, $window,authFactory) {
	// body...
	$scope.loginData = {userName:'', password :''};

	$scope.login = function() {
		if ($scope.loginData.userName == 'admin' && $scope.loginData.password == 'adminpass') {
			if (authFactory.login($scope.loginData)) {
				$rootScope.authentication  = {isAuth:true,user:'Admin'}
				 $state.go("profile");
			}else{
				alert('Login Failed');
			}
		}else{
			alert('Login Failed');
		}

	//$localStorage.$reset()
	//$localStorage.authInfo = {user:'user123'};
     //   $sessionStorage.SessionMessage = "SessionStorage: My name is Mudassar Khan.";
    //$localStorage.clear();
    // $localStorage.put('authInfo', );
	}

});