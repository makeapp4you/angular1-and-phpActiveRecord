'use strict';

newsApp.directive('tinymce', ['$q', function($q) {
	return {
		restrict: 'A',
		scope: {
			lazyLoad: '@', // Chứa đường dẫn đến Script
			callback: '&', // Phương thức được chạy sau khi load thành công
			selector: '@' // Selector đến Textarea
		},
		transclude: true,
		template: '<div ng-transclude></div>',
		link: function(scope, elem, attr) {
			// Hàm load TinyMCE
			function loadTinyMCE() {
				var intervalId;
				var deferred = $q.defer();
				setTimeout(function() {
					deferred.notify('Chuẩn bị load TinyMCE');
					var script = document.createElement('script');
					script.type = 'text/javascript';
					script.src = scope.lazyLoad;
					document.getElementsByTagName('head')[0].appendChild(script);

					deferred.notify('Chờ load TinyMCE');
					intervalId = setInterval(function() {
						if (typeof window.tinymce !== 'undefined') {
							tinymce.remove(scope.selector);
							tinymce.init({
								selector: scope.selector
							});
							deferred.resolve('Load TinyMCE thành công');
							clearInterval(intervalId);
						}
					}, 100);
				}, 0);
				return deferred.promise;
			}

			// Thực thi hàm load TinyMCE
			var promise = loadTinyMCE();
			promise.then(function(results) {
				console.log(results);
				if (typeof scope.callback === 'function') {
					scope.callback();
				}
			}, false, function(notify) {
				console.log(notify);
			});
		}
	};
}]);