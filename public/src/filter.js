angular.module('ContactsApp')
       .filter('lableCasing', function  () {
       	return function (input) {
       		input = input.replace(/([A-Z])/g , ' $1');
       		return input[0].toUpperCase() + input.slice(1);
       	};
       })
       .filter('camelCase', function(){
       	    return function (input){
       		     return input.toLowerCase().replace(/ (\w)/g, function (match, letter) {
       			      return letter.toUpperCase();
       		     });

       	     };

         })










       .filter('keyFilter',function(){
             return function (obj,contacts){
             	var result={};
             	angular.forEach(obj, function(val,key){
             		if(key!==contacts){
             			result[key]=val;
             		}

             	});
             	return result;

             };
       });