app.service('appInfoService',function($localStorage){
   var navpath;

   this.setPath = function(data){
      	navpath = data;
   };

   this.getPath = function(){
      	return navpath;
   };

   this.setLocalStorage = function(key,value){
   		$localStorage[key] = value;
   };

   this.getLocalStorage = function(key){
   		return $localStorage[key];
   };

   this.removeLocalStorage = function(){
   		$localStorage.$reset();
   };

});