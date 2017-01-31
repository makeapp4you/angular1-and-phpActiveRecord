'use strict';
var categoryCtrl = angular.module('categoryCtrl', []);

categoryCtrl.controller('CategoryListCtrl', ['$scope', '$routeParams', 'Custom', 'Category', function($scope, $routeParams, Custom, Category) {
	// Trang hiện tại
	$scope.page = $routeParams.page ? $routeParams.page : 1;
	// Lấy thông tin từ FlashMessages
	$scope.messages = Custom.getFlashMessages();
	// Danh sách Categorys
	Category.all(function(results) {
		var categories = results && results.categories && results.categories.data;
		var render = results && results.categories && results.categories.pagination && results.categories.pagination.render;
		if (categories) {
			$scope.categories = categories;
		}
		if (render) {
			$scope.pagination = Custom.getRender(render);
		}
	}, $scope.page);


	// Delete Categorys
	var category;
	$scope.openModal = function(input) {
		category = angular.copy(input);
		jQuery('.modal').modal('toggle');
	};

	$scope.delete = function() {
		if (category) {
			var id = category.id;
			category = undefined;
			jQuery('.modal').modal('toggle');
			Category.delete(id, function(results) {
				// Thông báo
				$scope.errors = results && results.errors;
				$scope.messages = results && results.messages;
				if ($scope.messages && $scope.messages.length) {
					$scope.categories.splice($scope.categories.indexOf(category), 1);
					Category.all(function(results) {
						var categories = results && results.categories && results.categories.data;
						if (categories) {
							$scope.categories = categories;
						}
					}, $scope.page);
				}
			});
		}
	};

	// Thiết lập đường dẫn đến View
	Custom.setTitle('Danh sách chuyên mục');
	Custom.setPath('categories/list');
}]);

categoryCtrl.controller('CategoryCreateCtrl', ['$scope', '$location', 'Custom', 'Category', function($scope, $location, Custom, Category) {
	// Thiết lập giá trị mặc định
	$scope.input = {
		level: '2'
	};


	$scope.create = function(input) {
		var category = angular.copy(input) || {};
		Category.create({
			name: category.name,
			order: category.order
		}, function(results) {
			// Thông báo
			$scope.errors = results && results.errors;
			$scope.messages = results && results.messages;
			// Chuyển trang
			if ($scope.messages && $scope.messages.length) {
				Custom.setFlashMessages($scope.messages);
				$location.path('admin/category');
			}
		});
	};
	
	// Thiết lập đường dẫn đến View
	Custom.setTitle('Tạo chuyên mục');
	Custom.setPath('categories/create');
}]);

categoryCtrl.controller('CategoryUpdateCtrl', ['$scope', '$location', '$routeParams', 'Custom', 'Category', function($scope, $location, $routeParams, Custom, Category) {
	$scope.id = $routeParams.id;

	Category.get($scope.id, function(results) {
		if (results && results.category) {
			$scope.input = results.category;
		}
	});


	$scope.update = function(input) {
		var category = angular.copy(input) || {};
		Category.update($scope.id, {
			name: category.name,
			order: category.order
		}, function(results) {
			// Thông báo
			$scope.errors = results && results.errors;
			$scope.messages = results && results.messages;
			// Chuyển trang
			if ($scope.messages && $scope.messages.length) {
				Custom.setFlashMessages($scope.messages);
				$location.path('admin/category');
			}
		});
	};	
	
	// Thiết lập đường dẫn đến View
	Custom.setTitle('Chỉnh sửa chuyên mục');
	Custom.setPath('categories/show');
}]);