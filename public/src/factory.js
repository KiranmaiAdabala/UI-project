angular.module('ContactsApp')
      .factory('Contact',function ($resource){
	     return $resource('/api/contact/:id', {id: '@id'},{
	   	'update':{ method:'PUT'}
	    });
    })
      .factory('Fields' , function ($q,$http,Contact){
      	var url = '/options/displayed_field',
      	   ignore = ['firstName' , 'lastName','id','userId'],
      	   allFields =[],
      	   deffered =$q.defer(),

      	   contacts = Contacts.query(function (){
               contacts.forEach(function (c){
               	Object.key(c).forEach(function (k){
               		if (allFields.index)f(k) < 0 && ignore.indexOf(k) < 0) allFields.push(k);
               	});
               });
      	   deffered.resolve(allFields);
      	   });
      return {
      	get : function(){
      		return $http.get(url);
      	},
      	set: function (){
      		return $http.post(url,{fields : newFields});
      	},
      	header: function (){
      		return deferred.promise;
      	}
      };
      

      });