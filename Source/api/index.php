<?php
session_start();
require('cores.php');
define('BASEURL', 'http://localhost/angularjs/training/api');

// Khởi chạy sự kiện
Event::disPatcher();

App::start();

App::filter(['user.*', 'category.*', 'post.*', 'upload.*'], function() {
	header('Content-Type: application/json');
	if (!User::isLogin()) {
		$data['errors'] = [];
		$data['errors'][] = 'Bạn không được phép truy cập';
		echo App::toJson($data);
		return false;
	}
	return true;
});


App::filter(['home.*'], function() {
	header('Content-Type: application/json');
	return true;
});


// Auth Controller
Route::get('isLogin', 'AuthController@isLogin');
Route::post('login', 'AuthController@login');
Route::get('logout', 'AuthController@logout');

// User Controller
Route::get('user', 'UserController@index');
Route::post('user/create', 'UserController@create');
Route::get('user/{$id}', 'UserController@show');
Route::put('user/{$id}', 'UserController@update');
Route::delete('user/{$id}', 'UserController@delete');

// Category Controller
Route::get('category', 'CategoryController@index');
Route::post('category/create', 'CategoryController@create');
Route::get('category/{$id}', 'CategoryController@show');
Route::put('category/{$id}', 'CategoryController@update');
Route::delete('category/{$id}', 'CategoryController@delete');

// Post Controller
Route::get('post', 'PostController@index');
Route::post('post/create', 'PostController@create');
Route::get('post/creator', 'PostController@creator');
Route::get('post/{$id}', 'PostController@show');
Route::put('post/{$id}', 'PostController@update');
Route::delete('post/{$id}', 'PostController@delete');
Route::post('upload', 'PostController@upload');

// Home Controller
Route::get('home', 'HomeController@index');
Route::get('home/{$id}', 'HomeController@show');
Route::get('home/category/get', 'HomeController@getCategories');
Route::get('home/category/{$id}', 'HomeController@category');


App::end();