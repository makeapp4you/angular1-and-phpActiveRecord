<!DOCTYPE html>
<html ng-app="newsApp" ng-strict-di>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title ng-bind-template="{{ pageTitle }} - QHOnline Solutions">QHOnline Solutions</title>
	<link rel="stylesheet" href="app/scripts/css/bootstrap.min.css">
	<link rel="stylesheet" href="app/scripts/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="app/scripts/css/style.css">
	<script type="text/javascript" src="app/scripts/js/jquery.min.js"></script>
	<script type="text/javascript" src="app/scripts/js/bootstrap.min.js"></script>	
	<script type="text/javascript" src="app/components/angular.min.js"></script>
	<script type="text/javascript" src="app/components/angular-route.min.js"></script>
	<script type="text/javascript" src="app/components/ng-file-upload.min.js"></script>	
	<script type="text/javascript" src="app/app.min.js"></script>
</head>
<body>
	<div ng-if="isBackend">
		<ng-include src="'app/views/admin/header.html'"></ng-include>
		<div ng-view></div>
		<ng-include src="'app/views/admin/footer.html'"></ng-include>
	</div>

	<div ng-if="!isBackend">
		<ng-include src="'app/views/home/header.html'"></ng-include>
		<div ng-view></div>
		<ng-include src="'app/views/home/footer.html'"></ng-include>
	</div>
</body>
</html>