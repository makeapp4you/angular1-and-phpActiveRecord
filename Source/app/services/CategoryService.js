'use strict';

newsApp.factory('Category', ['$rootScope', '$http', function($rootScope, $http) {
	// Categories API
	this.all = function(callback, page) {
		$http.get('api/category?page=' + page).then(function(results) {
			callback(results.data);
		});
	};

	this.create = function(data, callback) {
		$http.post('api/category/create', data).then(function(results) {
			callback(results.data);
		});
	};

	this.get = function(id, callback) {
		$http.get('api/category/' + id).then(function(results) {
			callback(results.data);
		});
	};

	this.update = function(id, data, callback) {
		$http.put('api/category/' + id, data).then(function(results) {
			callback(results.data);
		});
	};

	this.delete = function(id, callback) {
		$http.delete('api/category/' + id).then(function(results) {
			callback(results.data);
		});
	}
	
	return this;
}]);