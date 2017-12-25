'use strict';
app.factory('authFactory',function($http, $q,$localStorage, $sessionStorage) {
    
    this.login = function (data){
        $localStorage.$reset()
        return appUtil.postData(data, 'Admin/UserLogin', $http, $q, function (res) {
            if (res.Success)
            {
                $localStorage.authInfo = res;
            }
        }, function (res) {
            logOut();
        });
    }

    this.isAuthenticated = function (){
        if ($localStorage.authInfo == undefined) {
            return false;
        }
        var auth = {};
        auth = $localStorage.authInfo;
        if (auth.name != '') {
            return true;
        }else{
            return false;
        }

    }

    this.logOut = function(){
        $localStorage.$reset()
        return true;
    }

    return this;

})     