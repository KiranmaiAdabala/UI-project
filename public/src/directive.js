angular.module('ContactsApp')
       .value('FieldTypes',{
       text : ['Text','Sholuld be text'],
       email : ['Email','Sholuld be email address'],
       date : ['Date','Sholuld be a date'],
       dateTime : ['Datetime','Sholuld be datetime'],
       time : ['Time','Sholuld be text'],
       month : ['Month','Sholuld be month'],
       week : ['Week','Sholuld be week'],
        url : ['URL','Sholuld be url'],
        tel : ['Phone NUmber','Sholuld be phone number'],
        color : ['Color','Sholuld be color']
       })
       .directive('formField',function  ($timeout,FieldTypes) {
          return{
          	restrict:'EA',
          	templateUrl:'views/formField.html',
          	replace:true,
          	scope : {
          		record :'=',
          		field : '@',
          		required : '@',
          		live :'@'
          	},

          
          	link: function ($scope,elements,attr){
          		$scope.$on('record:invaid' ,function(){
          			$scope[$scope.field].$setDirty();
          		});
          		$scope.types=FieldTypes;
          		$scope.remove = function (field){

          			delete $scope.record[field];
          			$scope.blurUpdate();
          		};
          		$scope.blurUpdate = function (){
          			if ($scope.live !== false){
          				$scope.record.$update(function (updateRecord){
          					$scope.record = updateRecord;
          				});
          			}
          		};
          		var saveTimeout;
                   $scope.update = function (){
          			$timeout.cancel(saveTimeout);
          			saveTimeout=$timeout($scope.blurUpdate,1000);
          		};
          		
          	}

          };
       })

      .directive('newField', function($filter,FieldTypes){
      	return{
      		restrict:'EA',
      		templateUrl:'views/newField.html',
      			replace:true,
      		    scope : {
          		  record :'=',
          		  live : '@'
          		},
          		require:'^form',
          		link : function($scope,elements,attrs,form){
          			$scope.types = FieldTypes;
          			$scope.field = {};
          			$scope.show = function (type){
          				$scope.field.type = type;
          				$scope.display =  true;

                   };
                   $scope.remove=function(){
                   	 $scope.field={};
                   	 $scope.display=false;
                    };
                    $scope.add=function(){
                    	if(form.newField.$valid){
                    		$scope.record[$filter('camelCase')($scope.field.name)]=[$scope.field.value , $scope.field.type];
                    		$scope.remove();
                    	if ($scope.live!==false){
          				    $scope.record.$update(function (updateRecord){
          					    $scope.record=updateRecord;
          				    });
          			     }	

                         }

                    };

          		}
        };
    });
