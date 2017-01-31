'use strict';
var postCtrl = angular.module('postCtrl', []);

postCtrl.controller('PostListCtrl', ['$scope', '$routeParams', 'Custom', 'Post', function($scope, $routeParams, Custom, Post) {
	// Trang hiện tại
	$scope.page = $routeParams.page ? $routeParams.page : 1;
	// Lấy thông tin từ FlashMessages
	$scope.messages = Custom.getFlashMessages();
	// Danh sách Posts
	Post.all(function(results) {
		var posts = results && results.posts && results.posts.data;
		var render = results && results.posts && results.posts.pagination && results.posts.pagination.render;
		if (posts) {
			$scope.posts = posts;
		}
		if (render) {
			$scope.pagination = Custom.getRender(render);
		}
	}, $scope.page);	

	// Delete Posts
	var post;
	$scope.openModal = function(input) {
		post = angular.copy(input);
		jQuery('.modal').modal('toggle');
	};

	$scope.delete = function() {
		if (post) {
			var id = post.id;
			post = undefined;
			jQuery('.modal').modal('toggle');
			Post.delete(id, function(results) {
				// Thông báo
				$scope.errors = results && results.errors;
				$scope.messages = results && results.messages;
				if ($scope.messages && $scope.messages.length) {
					$scope.posts.splice($scope.posts.indexOf(post), 1);
					Post.all(function(results) {
						var posts = results && results.posts && results.posts.data;
						if (posts) {
							$scope.posts = posts;
						}
					}, $scope.page);
				}
			});
		}
	};

	// Thiết lập đường dẫn đến View
	Custom.setTitle('Danh sách bài viết');
	Custom.setPath('posts/list');
}]);

postCtrl.controller('PostCreateCtrl', ['$scope', '$location', 'Custom', 'Post', 'Upload', function($scope, $location, Custom, Post, Upload) {
	// Thiết lập giá trị mặc định
	Post.creator(function(results) {
		var categories = results && results.categories && results.categories.data;
		if (categories) {
			$scope.categories = categories;
		}
	});


	$scope.create = function(input) {
		var post = angular.copy(input) || {};
		var category_id = post && post.category && post.category.id;
		var content = tinymce.activeEditor.getContent();
		Post.create({
			title: post.title,
			intro: post.intro,
			content: content,
			category_id: category_id			
		}, function(results) {
			// Thông báo
			$scope.errors = results && results.errors;
			$scope.messages = results && results.messages;
			// Chuyển trang
			if ($scope.messages && $scope.messages.length) {
				Custom.setFlashMessages($scope.messages);
				$location.path('admin/post');
			}
		});
	};


	// Upload File
	$scope.upload = function(file) {
		$scope.progress = 0;
		$scope.fileName = '';
		Upload.upload({
			url: 'api/upload',
			file: file
		}).progress(function(event) {
			$scope.progress = parseInt(100.0 * event.loaded / event.total);
		}).success(function(results) {
			var errors = results && results.errors;
			if (errors && errors.length) {
				$scope.fileError = true;
				$scope.fileTemp = false;
			} else {
				$scope.fileError = false;
				$scope.fileName = results && results.file && results.file.name;
				$scope.fileTemp = results && results.file && results.file.temp;
			}
		});
	};
	
	// Thiết lập đường dẫn đến View
	Custom.setTitle('Tạo bài viết');
	Custom.setPath('posts/create');
}]);

postCtrl.controller('PostUpdateCtrl', ['$scope', '$location', '$routeParams', 'Custom', 'Post', 'Upload', function($scope, $location, $routeParams, Custom, Post, Upload) {
	$scope.id = $routeParams.id;

	Post.get($scope.id, function(results) {
		if (results && results.post && results.categories) {
			$scope.input = results.post;
			$scope.input.category = {
				id: results.post.category_id
			};
			$scope.categories = results.categories.data;
		}
	});

	// LoadTinyMCE Callback
	$scope.loadTinyMCE = function() {
		console.log('loadTinyMCE Exec');
		if (tinymce) {
			setTimeout(function() {
				tinymce.activeEditor.setContent($scope.input.content);
			}, 100);
		}
	};


	$scope.update = function(input) {
		var post = angular.copy(input) || {};
		var category_id = post && post.category && post.category.id;
		var content = tinymce.activeEditor.getContent();
		var image = $scope.input && $scope.input.image;
		Post.update($scope.id, {
			title: post.title,
			intro: post.intro,
			content: content,
			category_id: category_id,
			image: image
		}, function(results) {
			// Thông báo
			$scope.errors = results && results.errors;
			$scope.messages = results && results.messages;
			// Chuyển trang
			if ($scope.messages && $scope.messages.length) {
				Custom.setFlashMessages($scope.messages);
				$location.path('admin/post');
			}
		});
	};	

	// Upload File
	$scope.upload = function(file) {
		$scope.progress = 0;
		$scope.fileName = '';
		Upload.upload({
			url: 'api/upload',
			file: file
		}).progress(function(event) {
			$scope.progress = parseInt(100.0 * event.loaded / event.total);
		}).success(function(results) {
			var errors = results && results.errors;
			if (errors && errors.length) {
				$scope.fileError = true;
				$scope.fileTemp = false;
			} else {
				$scope.input.image = results && results.file && results.file.hash;
				$scope.fileError = false;
				$scope.fileName = results && results.file && results.file.name;
				$scope.fileTemp = results && results.file && results.file.temp;
			}
		});
	};
	
	// Thiết lập đường dẫn đến View
	Custom.setTitle('Chỉnh sửa bài viết');
	Custom.setPath('posts/show');
}]);