'use strict';

newsApp.factory('User', ['$rootScope', '$http', function($rootScope, $http) {
	// Login & Logout
	this.login = function(data, callback) {
		$http.post('api/login', data).then(function(results) {
			callback(results.data);
		});
	};

	this.logout = function(callback) {
		$http.get('api/logout').then(function(results) {
			callback(results.data);
		});
	};

	this.isLogin = function(callback) {
		$http.get('api/isLogin').then(function(results) {
			callback(results.data);
		});
	};


	// Users API
	this.all = function(callback, page) {
		$http.get('api/user?page=' + page).then(function(results) {
			callback(results.data);
		});
	};

	this.create = function(data, callback) {
		$http.post('api/user/create', data).then(function(results) {
			callback(results.data);
		});
	};

	this.get = function(id, callback) {
		$http.get('api/user/' + id).then(function(results) {
			callback(results.data);
		});
	};

	this.update = function(id, data, callback) {
		$http.put('api/user/' + id, data).then(function(results) {
			callback(results.data);
		});
	};

	this.delete = function(id, callback) {
		$http.delete('api/user/' + id).then(function(results) {
			callback(results.data);
		});
	}
	
	return this;
}]);