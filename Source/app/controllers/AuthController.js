'use strict';
var authCtrl = angular.module('authCtrl', []);

authCtrl.run(['$rootScope', '$location', 'User', function($rootScope, $location, User) {
	$rootScope.isLogin = false;
	$rootScope.$on('$routeChangeStart', function() {
		if (/^\/admin.*$/.test($location.path()) === true && $location.path() != '/admin/login' && !$rootScope.isLogin) {
			User.isLogin(function(results) {
				if (results && results.isLogin) {
					$rootScope.isLogin = true;
				} else {
					$rootScope.isLogin = false;
				}

				if (results && !results.isLogin && $location.path() != '/admin/login') {
					$rootScope.errors = results && results.errors;
					$location.path('admin/login');
				}

				if (results && results.isLogin && $location.path() == '/admin/login') {
					$location.path('admin');
				}
			});
		}
	});


	// Logout
	$rootScope.logout = function() {
		User.logout(function(results) {
			$rootScope.toggleActive = false;
			$rootScope.isLogin = false;
			$location.path('admin/login');
		});
	};


	// Selected Tab
	$rootScope.toggleActive = $location.path();
	$rootScope.selectedTab = function(url) {
		User.isLogin(function(results) {
			$rootScope.isLogin = results && results.isLogin;
			if (!$rootScope.isLogin && $location.path() != '/admin/login') {
				$location.path('/admin/login');
			} else if ($rootScope.isLogin) {
				$rootScope.toggleActive = url;
				$location.path(url);
			} else if (results && results.errors) {
				$rootScope.errors = results.errors;
			}
		});
	};
}]);

authCtrl.controller('AuthLoginCtrl', ['$scope', '$rootScope', '$location', 'Custom', 'User', function($scope, $rootScope, $location, Custom, User) {
	$scope.login = function(input) {
		var user = angular.copy(input);
		User.login({
			email: user.email,
			password: user.password
		}, function(results) {
			// Thống báo lỗi
			$rootScope.errors = results && results.errors;
			$rootScope.isLogin = results && results.isLogin;
			if ($rootScope.isLogin) {
				$rootScope.errors = [];
				$location.path('/admin');
			}
		});
	};

	// Thiết lập đường dẫn đến View
	Custom.setTitle('Đăng nhập');
	Custom.setPath('login');
}]);