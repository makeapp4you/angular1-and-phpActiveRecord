'use strict';

newsApp.factory('Home', ['$rootScope', '$http', function($rootScope, $http) {
	// Posts API
	this.getPosts = function(callback, page) {
		$http.get('api/home?page=' + page).then(function(results) {
			callback(results.data);
		});
	};

	this.getCategories = function(callback) {
		$http.get('api/home/category/get').then(function(results) {
			callback(results.data);
		});
	};

	this.getPostsByCategory = function(id, callback, page) {
		$http.get('api/home/category/' + id + '?page=' + page).then(function(results) {
			callback(results.data);
		});
	};

	this.showPost = function(id, callback) {
		$http.get('api/home/' + id).then(function(results) {
			callback(results.data);
		});
	};
	
	return this;
}]);