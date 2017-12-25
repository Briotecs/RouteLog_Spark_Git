'use strict';
app.factory('apiServiceFactory',function (dalFactory) {

	this.GetVchHistorySummary = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"vehicle/GetVchHistorySummary");
	}
	// Google Api Service
	this.getgeocode = function(data){
		return dalFactory.getgeocode(data,appUtil.googleapismaps+"geocode/json");
	}
	//
	this.UserLogin = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"Admin/UserLogin");
	}
	
	this.UpdatePwd = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"Admin/changePassword");
	}

	this.getVehTripDetails = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"VehicleReport/getVehTripDetails");
	}

	this.getAlertSetting = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"AlertSetting/getAlertSetting");
	}

	this.saveAlertSetting = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"AlertSetting/saveAlertSetting");
	}

	this.InsertUser = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"User/InsertUser");
	}

	this.GetUser = function(data){
		return dalFactory.getfromServer(data,appUtil.serviceBaseUrl+"User/GetUser");
	}

	this.getUserList = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"User/getUserList");
	}

	this.saveCompany = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"Admin/saveCompany");
	}

	this.getCompany = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"Admin/getCompany");
	}

	this.DistanceTravel = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"Dashboard/DistanceTravel");
	}

	this.VehicleSpeed = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"Dashboard/VehicleSpeed");
	}

	this.VehicleStatus = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"Dashboard/VehicleStatus");
	}

	this.TopfiveOverSpeed = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"Dashboard/TopfiveOverSpeed");
	}

	this.TopfiveOverHalt = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"Dashboard/TopfiveOverHalt");
	}

	this.Idle = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"VehicleReport/Idle");
	}

	this.TripSummaryrpt = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"VehicleReport/TripSummaryrpt");
	}

	this.GetVehicleHistory = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"vehicle/GetVehicleHistory");
	}

	this.GetVehicleList = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"vehicle/GetVehicleList");
	}

	// Get All Vehicle List
	this.getAllVehicleList = function(data){
		return dalFactory.getfromServer(data,appUtil.serviceBaseUrl+"vehicle/SearchVehicle");
	}
	//
	// Get Vehicle Licence
	this.GetVehicleLicence = function(data){
		return dalFactory.getfromServer(data,appUtil.serviceBaseUrl+"vehicle/GetVehicleLicence");
	}
	//

	this.GetVehicle = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"vehicle/GetVehicle");
	}

	this.InsertVehicle = function(data){
		return dalFactory.postToServer(data,appUtil.serviceBaseUrl+"vehicle/InsertVehicle");
	}
	
	return this;
});