// app.js
var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })


        .state('editView', {
            params: ['id', 'firstName', 'lastName', 'dob', 'address', 'designation', 'city', 'pin_code', 'state', 'email', 'mobile', 'card_number'],
            templateUrl: 'partial-home-list.html',
            controller: function ($scope,$stateParams,$http,$state) {
            console.log($stateParams);
            console.log($stateParams.id);
            $scope.user = {};
            $scope.user.id = $stateParams.id;
            $scope.user.firstName = $stateParams.firstName;
            $scope.user.lastName = $stateParams.lastName;
            $scope.user.email = $stateParams.email;
            $scope.user.mobile = parseInt($stateParams.mobile);
            $scope.user.designation = $stateParams.designation;
            $scope.user.dob = $stateParams.dob;
            $scope.user.address = $stateParams.address;
            $scope.user.city = $stateParams.city;
            $scope.user.pin_code = parseInt($stateParams.pin_code);
            $scope.user.state = $stateParams.state;
            $scope.user.card_number = $stateParams.card_number;

            $scope.listview = "false";
            $scope.options = [];
            $scope.scannig = false;
            $scope.error = false;
            $scope.scan = function(){
                $scope.scannig = true;
                $scope.listview = "true";
                $scope.options = [];
                $http.get("http://192.168.1.8:9090/Project/scan")
            .success(function(response) {
                console.log("Hi I am API") // debugging
                card_list = response["ScanList"];
                for (var i = 0; i < card_list.length; i++) {
                    var card_number = card_list[i].slice(0,36);
                    var card_number_5 = card_list[i].slice(31,36);
                    var distance = card_list[i].slice(38,40);
                    console.log(distance)
                if (distance <= "40"){
                    $scope.options.push({label:card_number_5,value:card_number})
                    $scope.user.card_number = $scope.options[0]
                    $scope.error = false;
                }

                if($scope.options.length ==0){
                    $scope.error = true;
                }

                $scope.scannig = false;
                }

            }).error( function(response) {
                           alert('Network Error');
                           $scope.scannig = false; 
                           
            });
        }


            $scope.update = function(isValid){

                var formdata = new FormData();
                // formdata.append("file", file);
                formdata.append("id", $scope.user.id);
                formdata.append("firstName", $scope.user.firstName);
                formdata.append("lastName", $scope.user.lastName);
                formdata.append("email", $scope.user.email);
                formdata.append("dob", $scope.user.dob);
                formdata.append("mobile", $scope.user.mobile);
                formdata.append("address", $scope.user.address);
                formdata.append("city", $scope.user.city);
                formdata.append("pin_code", $scope.user.pin_code);
                formdata.append("state", $scope.user.state);
                formdata.append("designation", $scope.user.designation);
                if($scope.options.length !=0){
                    formdata.append("card_number", $scope.user.card_number.value);
                }
                else{
                    formdata.append("card_number", $scope.user.card_number);
                }

                if (isValid) {
                    for (var value of formdata.entries()) {
                        console.log(value); }
                    $http({
                        url:"http://127.0.0.1:8080/employee/api/editemployee",
                        method:'POST',
                        transformRequest: angular.identity,
                        headers:{'Content-Type':undefined  },
                        data: formdata,
                        }).success(function(response) {
                        $state.go('home');
                        alert('Employee updated successfully');
                }).error( function(response) {
                       alert('Network Error');       
            });
                     
            }

            };

            $scope.cancel= function(){
                $state.go('home');

            };
        }
    })


    // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a drink right now.'
        })

        .state('addemployee', {
            url:'/addemployee',
            templateUrl:'registerEmployee.html'

        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit  
            url: '/about' ,
            views: {

                // the main template will be placed here (relatively named)
                '': { templateUrl: 'partial-about.html' },

                // the child views will be defined here (absolutely named)
                'columnOne@about': {templateUrl: 'table-data.html',
                    controller: 'scotchController'},

                // for column two, we'll define a separate controller 
                'columnTwo@about': { 
                    templateUrl: 'table-data.html',
                    controller: 'scotchController'
                }

            }   
        })

        // Contact Us PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('contact', {
            url:'/contact',
            templateUrl: 'partial-contact.html'

        });

        
});

myApp.controller('scotchController', function($scope) {
    
    $scope.message = 'test';
   
    $scope.scotches = [
        {
            name: 'Macallan 12',
            price: 50
        },
        {
            name: 'Chivas Regal Royal Salute',
            price: 10000
        },
        {
            name: 'Glenfiddich 1937',
            price: 20000
        }
    ];
    
});

myApp.controller('mycntrl', function($scope,$state,$http) {

   
    $scope.user = {}
    $scope.scannig = false;
    $scope.error = false;
    $scope.options = [];

    $scope.scan = function(){
        $scope.error = false;
        $scope.options = [];
        $scope.scannig = true;
        $http.get("http://192.168.1.8:9090/Project/scan")
    .success(function(response) {
        console.log("Hi I am API") // debugging
        card_list = response["ScanList"];
        for (var i = 0; i < card_list.length; i++) {
            var card_number_scanned = card_list[i].slice(0,36);
            var card_number_5 = card_list[i].slice(31,36);
            var distance = card_list[i].slice(38,40);
            console.log(distance)
            if (distance <= "40"){
            $scope.options.push({label:card_number_5,value:card_number_scanned})
                if($scope.options.length !=0){
                    $scope.user.card_number = $scope.options[0]
                    $scope.error = false;
                } 
            }
            if($scope.options.length ==0){
                $scope.error = true;
            }
            $scope.scannig = false;
        }
        }).error( function(response) {
                           alert('Network Error'); 
                           $scope.scannig = false;
        });
    }
     
    $scope.submitForm = function(isValid) {
        console.log("yes iam working");
        $scope.submitted = true;

        var file = $scope.picFile;
        // console.log('file is ' );
        // console.dir(file);
        var formdata = new FormData();

        formdata.append("file", file);
        formdata.append("firstName", $scope.user.firstName);
        formdata.append("lastName", $scope.user.lastName);
        formdata.append("email", $scope.user.email);
        formdata.append("dob", $scope.user.dob);
        formdata.append("mobile", $scope.user.mobile);
        formdata.append("address", $scope.user.address);
        formdata.append("city", $scope.user.city);
        formdata.append("pin_code", $scope.user.pin_code);
        formdata.append("state", $scope.user.state);
        formdata.append("designation", $scope.user.designation);
        if($scope.options.length !=0){
                formdata.append("card_number", $scope.user.card_number.value);
            }
        else {formdata.append("card_number", "");}
        
        for (var value of formdata.values()) {
            console.log(value); }
    // check to make sure the form is completely valid
        if (isValid) {
            for (var value of formdata.values()) {
                console.log(value); }
            $http({
                url:"http://127.0.0.1:8080/employee/api/addemployee",
                method:'POST',
                transformRequest: angular.identity,
                headers:{'Content-Type': undefined},
                data:formdata
                }).success(function(response) {
                    $state.go($state.current, {}, {reload: true});
                    alert('Employee addded successfully');
            }).error( function(response) {
                           alert('Network Error');       
                });
                 
        }
        
    };

    $scope.quit = function() {
        $state.go($state.current, {}, {reload: true});
       ;
    };

});

// make sure file field populated
myApp.directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ngModel){
          //change event is fired when file is selected
            el.bind('change',function(){
                    scope.$apply(function(){
                        ngModel.$setViewValue(el.val());
                        ngModel.$render();
                    });
            });
        }
    };
});

// retrun upload file
 myApp.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }]);


myApp.controller('listemployee', function($scope,$state,$http) {
    console.log("inside-listemployee");
    $scope.editingdata = {};

    // $sce.trustAsResourceUrl(url);
    $scope.items = [];
    $http.get("http://127.0.0.1:8080/employee/api/listemployee")
    .success(function(response) {
        console.log("Hi I am API") // debugging
        $scope.items = response["employee_list"];
        }).error( function(response) {
                           alert('Network Error');       
    });
    
    for (var i=0, length=$scope.items.length; i < length; i++ ){
        $scope.editingdata[$scope.items[i].id] = false;
    }
    $scope.edit = function(item) {
        console.log("insideeditfunction")
        console.log(item)
        $state.go('editView', item);    
    };

    $scope.doubleClick = function(item) {
        $scope.editingdata[item.id] = true; 

    };

    $scope.cancel = function() {
        console.log("cancel func");
        $state.go($state.current, {}, {reload: true});
    };

    $scope.update = function(item) {
        $scope.editingdata[item.id] = false;
        console.log(item)
        var formdata = new FormData();

        formdata.append("id", item.id);
        formdata.append("firstName", item.firstName);
        formdata.append("lastName", item.lastName);
        formdata.append("email", item.email);
        formdata.append("dob", item.dob);
        formdata.append("mobile", item.mobile);
        formdata.append("address", item.address);
        formdata.append("city", item.city);
        formdata.append("pin_code", item.pin_code);
        formdata.append("state", item.state);
        formdata.append("designation", item.designation);
        formdata.append("card_number", item.card_number);
        
        console.log(employee)
        $http({
            url:"http://127.0.0.1:8080/employee/api/editemployee",
            method:'POST',
            transformRequest: angular.identity,
            headers:{'Content-Type':undefined  },
            data: formdata,
            }).success(function(response) {
            $scope.data = response;
            $scope.status = data["Status"];
            $scope.message = data["Message"];
            $state.go($state.current, {}, {reload: true});
            alert('Employee updated');
            console.log(status)
            console.log(message)
        }).error( function(response) {
                           alert('Network Error');       
        });
        
    };



    $scope.remove = function(item) { 
        alert('Warning you are going to remove employee details');  
        console.log(item)
        var employee = JSON.stringify(item);
        $http({
            url:"http://127.0.0.1:8080/employee/api/removeEmployee",
            method:'POST',
            headers:{'Content-Type':undefined  },
            data: employee,
            }).success(function(response) {
            $scope.data = response;
            $state.go($state.current, {}, {reload: true});
            alert('Employee deleted');
        }).error( function(response) {
                alert('Network Error');       
    });     
        };
});


myApp.controller('httpcntrl', function($scope,$http) {

    $http({
        url:"http://52.36.221.91:9090/Project/capture",
        method:'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        data: "UniqueId=" + '555'+'&'+ "LaneNumber=" + 'sdg',

        }).success(function(response) {
        $scope.myWelcome = response.data;
        $scope.statuscode = response.status;
    }).error( function(response) {
            alert('Network Error');       
    });     

});




// http://52.36.221.91:9090/Project/capture

   // $scope.user.lastName = 'Pupneja';
    // $scope.user.email = "sushant_pupneja@yahoo.com";
    // $scope.user.mobile = "9781087800";
    // $scope.user.dob = "2006-01-02";
    // $scope.user.address = "XXXXX";
    // $scope.user.city = 'Gurgaon';
    // $scope.user.pin_code = "122001";
    // $scope.user.state = "Haryana";
    // $scope.user.designation = 'Software Developer';
    // $scope.user.card_number = '5105105105105100';

