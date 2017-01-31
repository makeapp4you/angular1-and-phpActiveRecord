'use strict';
var userCtrl = angular.module('userCtrl', []);

userCtrl.controller('UserListCtrl', ['$scope', '$routeParams', 'Custom', 'User', function($scope, $routeParams, Custom, User) {
	// Trang hiện tại
	$scope.page = $routeParams.page ? $routeParams.page : 1;
	// Lấy thông tin từ FlashMessages
	$scope.messages = Custom.getFlashMessages();
	// Danh sách Users
	User.all(function(results) {
		var users = results && results.users && results.users.data;
		var render = results && results.users && results.users.pagination && results.users.pagination.render;
		if (users) {
			$scope.users = users;
		}
		if (render) {
			$scope.pagination = Custom.getRender(render);
		}
	}, $scope.page);

	$scope.getLevel = function(level) {
		switch(level){
			case 1:
				return 'Administrator';
				break;
			case 2:
				return 'Member';
				break;
			default:
				return 'Unknown';
				break;
		}
	};


	// Delete Users
	var user;
	$scope.openModal = function(input) {
		user = angular.copy(input);
		jQuery('.modal').modal('toggle');
	};

	$scope.delete = function() {
		if (user) {
			var id = user.id;
			user = undefined;
			jQuery('.modal').modal('toggle');
			User.delete(id, function(results) {
				// Thông báo
				$scope.errors = results && results.errors;
				$scope.messages = results && results.messages;
				if ($scope.messages && $scope.messages.length) {
					$scope.users.splice($scope.users.indexOf(user), 1);
					User.all(function(results) {
						var users = results && results.users && results.users.data;
						if (users) {
							$scope.users = users;
						}
					}, $scope.page);
				}
			});
		}
	};

	// Thiết lập đường dẫn đến View
	Custom.setTitle('Danh sách người dùng');
	Custom.setPath('users/list');
}]);

userCtrl.controller('UserCreateCtrl', ['$scope', '$location', 'Custom', 'User', function($scope, $location, Custom, User) {
	// Thiết lập giá trị mặc định
	$scope.input = {
		level: '2'
	};


	$scope.create = function(input) {
		var user = angular.copy(input) || {};
		User.create({
			email: user.email,
			password: user.password,
			confirm_password: user.confirm_password,
			level: user.level
		}, function(results) {
			// Thông báo
			$scope.errors = results && results.errors;
			$scope.messages = results && results.messages;
			// Chuyển trang
			if ($scope.messages && $scope.messages.length) {
				Custom.setFlashMessages($scope.messages);
				$location.path('admin/user');
			}
		});
	};
	
	// Thiết lập đường dẫn đến View
	Custom.setTitle('Tạo người dùng');
	Custom.setPath('users/create');
}]);

userCtrl.controller('UserUpdateCtrl', ['$scope', '$location', '$routeParams', 'Custom', 'User', function($scope, $location, $routeParams, Custom, User) {
	$scope.id = $routeParams.id;
	// Thiết lập giá trị mặc định
	$scope.input = {
		level: '2'
	};

	User.get($scope.id, function(results) {
		if (results && results.user) {
			$scope.input = results.user;
		}
	});


	$scope.update = function(input) {
		var user = angular.copy(input) || {};
		User.update($scope.id, {
			email: user.email,
			password: user.password,
			confirm_password: user.confirm_password,
			level: user.level
		}, function(results) {
			// Thông báo
			$scope.errors = results && results.errors;
			$scope.messages = results && results.messages;
			// Chuyển trang
			if ($scope.messages && $scope.messages.length) {
				Custom.setFlashMessages($scope.messages);
				$location.path('admin/user');
			}
		});
	};	
	
	// Thiết lập đường dẫn đến View
	Custom.setTitle('Chỉnh sửa người dùng');
	Custom.setPath('users/show');
}]);