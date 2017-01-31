'use strict';

newsApp.factory('Custom', ['$rootScope', '$sce', function($rootScope, $sce) {
	// Thiết lập đường dẫn tới View
	this.setPath = function(path) {
		$rootScope.path = path;
	};
	this.getPath = function() {
		return $rootScope.path;
	};

	// Thiết lập tiêu đề
	this.setTitle = function(title) {
		$rootScope.pageTitle = title;
	};
	this.getTitle = function() {
		return $rootScope.pageTitle;
	};

	// Flash Message
	var flashMessages = '';
	this.setFlashMessages = function(messages) {
		if (messages) {
			flashMessages = messages;
		}
	};

	this.getFlashMessages = function() {
		var messages = flashMessages;
		flashMessages = '';
		return messages ? messages : '';
	};

	this.getRender = function(html) {
		return $sce.trustAsHtml(html);
	};
	
	return this;
}]);