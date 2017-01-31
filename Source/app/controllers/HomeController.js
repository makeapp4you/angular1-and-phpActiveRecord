'use strict';
var homeCtrl = angular.module('homeCtrl', []);

homeCtrl.run(['$rootScope', 'Home', function($rootScope, Home) {
	Home.getCategories(function(results) {
		$rootScope.categories = results && results.categories && results.categories.data;
	});
}]);

homeCtrl.controller('HomeIndexCtrl', ['$scope', '$routeParams', 'Custom', 'Home', function($scope, $routeParams, Custom, Home) {
	// Trang hiện tại
	$scope.page = $routeParams.page ? $routeParams.page : 1;

	// Danh sách Posts
	Home.getPosts(function(results) {
		var posts = results && results.posts && results.posts.data;
		var render = results && results.posts && results.posts.pagination && results.posts.pagination.render;
		if (posts) {
			$scope.posts = posts;
		}
		if (render) {
			$scope.pagination = Custom.getRender(render);
		}
	}, $scope.page);

	// Thiết lập đường dẫn đến View
	Custom.setTitle('Trang chủ');
	Custom.setPath('index');
}]);

homeCtrl.controller('HomeShowCtrl', ['$scope', '$routeParams', 'Custom', 'Home', function($scope, $routeParams, Custom, Home) {
	// ID của bài viết
	$scope.id = $routeParams.id ? $routeParams.id : 1;

	// Danh sách Posts
	Home.showPost($scope.id, function(results) {
		$scope.post = results && results.post;
		$scope.post.intro = Custom.getRender($scope.post.intro);
		$scope.post.content = Custom.getRender($scope.post.content);
		Custom.setTitle($scope.post.title);
	});

	// Thiết lập đường dẫn đến View
	Custom.setTitle('Chi tiết');
	Custom.setPath('show');
}]);

homeCtrl.controller('HomeCategoryCtrl', ['$scope', '$routeParams', 'Custom', 'Home', function($scope, $routeParams, Custom, Home) {
	// Trang hiện tại
	$scope.page = $routeParams.page ? $routeParams.page : 1;
	$scope.id = $routeParams.id ? $routeParams.id : 1;

	// Danh sách Posts
	Home.getPostsByCategory($scope.id, function(results) {
		var posts = results && results.posts && results.posts.data;
		var render = results && results.posts && results.posts.pagination && results.posts.pagination.render;
		if (posts) {
			$scope.posts = posts;
			if (posts[0].category) {
				Custom.setTitle(posts[0].category);
			}
		}
		if (render) {
			$scope.pagination = Custom.getRender(render);
		}
	}, $scope.page);

	// Thiết lập đường dẫn đến View
	Custom.setTitle('Chuyên mục');
	Custom.setPath('category');
}]);