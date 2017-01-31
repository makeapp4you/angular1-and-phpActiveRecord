'use strict';

newsApp.factory('Post', ['$rootScope', '$http', function($rootScope, $http) {
	// Posts API
	this.all = function(callback, page) {
		$http.get('api/post?page=' + page).then(function(results) {
			callback(results.data);
		});
	};

	this.create = function(data, callback) {
		$http.post('api/post/create', data).then(function(results) {
			callback(results.data);
		});
	};

	this.creator = function(callback) {
		$http.get('api/post/creator').then(function(results) {
			callback(results.data);
		});
	};

	this.get = function(id, callback) {
		$http.get('api/post/' + id).then(function(results) {
			callback(results.data);
		});
	};

	this.update = function(id, data, callback) {
		$http.put('api/post/' + id, data).then(function(results) {
			callback(results.data);
		});
	};

	this.delete = function(id, callback) {
		$http.delete('api/post/' + id).then(function(results) {
			callback(results.data);
		});
	}
	
	return this;
}]);