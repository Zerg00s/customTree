"use strict";
app.controller('MainCtrl', function ($scope, $http, $log, $location, $rootScope,  spFormFactory, textAngularManager) {

$scope.w = {
    orightml: "<h1>test</h1>",
    disabled: false
};


spFormFactory.initialize($scope, 'Dialog').then(init);
$scope.calendarFormat = 'dd-MMMM-yyyy';
$scope.userId = _spPageContextInfo.userId;

    $scope.selectedItem = {
    value: 0,
    label: ''
};

    $scope.addStep = function(){
    var step = {
            id:1,
            header:'header1',            
            body:'body 1',
            options:[{title:'option 1',id:2},{title:'option 2',id:3}]
        };
        
    $scope.steps.push(step) ;

    };

    $scope.addOption = function(step, option){
            step.options.push({title:'type option text',id:0});
    };

    $scope.deleteStep = function(step){
        var index = $scope.steps.indexOf(step);
        $scope.steps.splice(index, 1)
    }

    $scope.deleteOption = function(step, option){
        var index = step.options.indexOf(step);
        step.options.splice(index, 1);
    }

    $scope.selectOption = function(step, option, $index){
        for(var i =0; i< step.options.length;i++){
            step.options[i].selected = false;
        }
        option.selected = true;
        var nextStep = $scope.getStepById(option.id);
        $scope.stepsHistory.length=$index+1;
        $scope.stepsHistory.push(nextStep);
        $scope.stepsHistory.length=$index+2;
    }

    $scope.appliedClass = function(option) {
    if (option.selected == true) {
        return "active";
    } else {
        return ""; // Or even "", which won't add any additional classes to the element
    }
}

    $scope.getStepById = function(stepId){
        for (var i=0; i<$scope.steps.length;i++){
            if($scope.steps[i].id == stepId){
                return $scope.steps[i];
            }
        }
    }

    $scope.setDefaultSteps = function(){
        
       $scope.steps = [];
       $scope.steps = [
           {
               id:1,
               header:'header1',               
               body:'body 1',
               options:[{title:'option 1',id:2},{title:'option 2',id:3}]
           },
           {
               id:2,
               header:'header2',
               body:'body 2',
               options:[{title:'option 1',id:3},{title:'option 2',id:4}]
           },
           {
               id:3,
               header:'header3',
               body:'body 3',
               options:[{title:'option 1',id:3},{title:'option 2',id:4}]
           }
       ];
    }

    $scope.saveWithCopy = function(){
        $scope.f.steps.Value = JSON.stringify($scope.steps, null, 2);
        $scope.save();
    }

    function init(){
       
       if($scope.formMode == 'New'){
           $scope.setDefaultSteps();
       }
       else {
            $scope.steps = angular.fromJson($scope.f.steps.Value);

            if($scope.formMode == 'View'){
                $scope.stepsHistory = [$scope.steps[0]];
            }
       }
    }// End of init()
});