'use strict';
app.controller('enquiryCtrl',function ($scope,$state,$ngBootbox,$route,authFactory,apiServiceFactory) {
  // if (!authFactory.isAthu()) {
  //       $location.path('/login');
  //           return;
  //   }
	
  $scope.data = {}

  var ID = 0;
  $scope.frmData = {
    btnsave :' Save',
    frmCaption: ' ENQUIRY FORM'
  }

$scope.ModeOfPayment = ["Employed","Self-Employed","Un-Employed","Retired","Others"];

$scope.tallySkills = ["Learnt","Practiced","Followed","None"];

//------------Form config-----------------------------

    // To Send password throught URL
    if ($route.current.params.ID) {
         ID= $route.current.params.ID;
         $scope.frmData.btnsave = ' Update';
         $scope.frmData.frmCaption = ' Edit Profile'
     }


//-----------------------------Date Function------------------------
   $scope.today = function() {
      $scope.data.doj = new Date();
      $scope.data.dob = new Date();
    };

    $scope.today();

      $scope.dateOptions = {
      //dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(),
      minDate: new Date(1900,1,1),
      startingDay: 1
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.popup3 = {
      opened: false
    };

    $scope.open3 = function() {
      $scope.popup3.opened = true;
    };

    $scope.formats = ['dd-MM-yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

//-----------------------------------------------------------------------
	 $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];

      function setDefaultSetting(){
      $scope.data = 
      {
        ID: 0,
        name: '',
        doj: '',
        isMember:true,
        membershipNo : '',
        memberdate : '',
        photo: '',
        dob: '',
        gender: 'Male',
        caddress1: '',
        caddress2: '',
        ccity: '',
        cpincode: '',
        paddress1: '',
        paddress2: '',
        pcity: '',
        ppincode: '',
        mobile1: '',
        mobile2: '',
        Lanline: '',
        email: '',
        nomname1: '',
        nomrelation1:'',
        nomname2: '',
        nomrelation2:''
      }
   }
    
    
  setDefaultSetting();
  $scope.addfamilymemner = function() {
      // var newItemNo = $scope.choices.length+1;
      $scope.data.familymemner.push({name:'',relationship:''});
  };
    
  $scope.rmovefamilymemner = function() {
    var lastItem = $scope.data.familymemner.length-1;
    $scope.data.familymemner.splice(lastItem);
  };


  $scope.Save = function(){
     var tdata = $scope.data;
     apiServiceFactory.saveProfile(tdata).then(
      function (res) {
        if (res.Success) {
          $ngBootbox.alert(res.Message).then(function(){
            setDefaultSetting();
          })
        }
      },function (res){
         $ngBootbox.alert(res.Message)
      });
  }

  $scope.Cancel = function(){
    $ngBootbox.alert('Profile cancel')
      .then(function() {
          console.log('cancel');
      });
  }

  //-----------------------------------------------------------------

   $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
  
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };

  $scope.example1model = []; 
  $scope.example1data = [{id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];

  //-------------------Type head--------------------------------

  $scope.selected = undefined;
  $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  

});