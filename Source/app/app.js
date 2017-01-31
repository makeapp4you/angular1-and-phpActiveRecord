'use strict';
var newsApp = angular.module('newsApp', [
	'ngRoute',
	'ngFileUpload',
	'userCtrl',
	'postCtrl',
	'categoryCtrl',
	'authCtrl',
	'homeCtrl'
]);

// Thiết lập ứng dụng
newsApp.config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider) {
	$compileProvider.debugInfoEnabled(false);

	$routeProvider.
	when('/admin', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'UserListCtrl'
	}).
	// User
	when('/admin/user' ,{
		templateUrl: 'app/views/admin/master.html',
		controller: 'UserListCtrl'
	}).
	when('/admin/user/page/:page', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'UserListCtrl'
	}).
	when('/admin/user/create', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'UserCreateCtrl'
	}).
	when('/admin/user/:id', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'UserUpdateCtrl'
	}).
	// Post
	when('/admin/post' ,{
		templateUrl: 'app/views/admin/master.html',
		controller: 'PostListCtrl'
	}).
	when('/admin/post/page/:page', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'PostListCtrl'
	}).
	when('/admin/post/create', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'PostCreateCtrl'
	}).
	when('/admin/post/:id', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'PostUpdateCtrl'
	}).
	// Category
	when('/admin/category' ,{
		templateUrl: 'app/views/admin/master.html',
		controller: 'CategoryListCtrl'
	}).
	when('/admin/category/page/:page', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'CategoryListCtrl'
	}).
	when('/admin/category/create', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'CategoryCreateCtrl'
	}).
	when('/admin/category/:id', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'CategoryUpdateCtrl'
	}).
	// Login
	when('/admin/login', {
		templateUrl: 'app/views/admin/master.html',
		controller: 'AuthLoginCtrl'
	}).
	when('/', {
		templateUrl: 'app/views/home/master.html',
		controller: 'HomeIndexCtrl'
	}).
	when('/page/:page', {
		templateUrl: 'app/views/home/master.html',
		controller: 'HomeIndexCtrl'
	}).
	when('/show/:id/:any', {
		templateUrl: 'app/views/home/master.html',
		controller: 'HomeShowCtrl'
	}).
	when('/category/:id', {
		templateUrl: 'app/views/home/master.html',
		controller: 'HomeCategoryCtrl'
	}).
	when('/category/:id/page/:page', {
		templateUrl: 'app/views/home/master.html',
		controller: 'HomeCategoryCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
}]);

// Khởi động ứng dụng
newsApp.run(['$rootScope', '$location', function($rootScope, $location) {
	$rootScope.link = function(link) {
		var hashPrefix = '#/';
		return hashPrefix + link;
	};


	// Search
	$rootScope.searchResults = '';
	$rootScope.searchText = function(txt) {
		$rootScope.searchResults = txt;
	};

	// OrderBy
	$rootScope.orderBy = false;
	$rootScope.reverseData = false;
	$rootScope.reverse = function(name) {
		$rootScope.reverseData = !$rootScope.reverseData;
		$rootScope.orderBy = name;
	};

	// Kiểm tra Backend hay Frontend
	$rootScope.isBackend = false;
	$rootScope.isBackendFunc = function(url) {
		if (/^\/admin.*$/.test(url) === true) {
			$rootScope.isBackend = true;
		} else {
			$rootScope.isBackend = false;
		}
		return $rootScope.isBackend;
	};

	// Sự kiện $routeChangeStart
	$rootScope.$on('$routeChangeStart', function(event) {
		var currentUrl = $location.path();
		if ($rootScope.isBackendFunc(currentUrl)) {
			console.log('Backend');
		} else {
			console.log('Frontend');
		}
	});
}]);