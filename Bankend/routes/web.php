<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::group(['middleware' => ['cors']], function() {

    Route::post('register', 'UserController@register')->name('register');
    Route::post('login', 'UserController@authenticate')->name('login');
    Route::get('login', function () { return view('login');});
    Route::get('register', function () { return view('register');});

    Route::group(['middleware' => ['jwt.verify']], function() {
        Route::post('car', 'CarController@show')->name('car');
        Route::get('cars', 'CarController@index')->name('cars');
        Route::post('car/create', 'CarController@store')->name('carStore');
        Route::put('car/update', 'CarController@update')->name('carUpdate');
        Route::delete('car/delete', 'CarController@destroy')->name('carDelete');

        Route::get('users', 'UserController@index')->name('users');
        Route::post('user', 'UserController@show')->name('user');
        Route::post('user/create', 'UserController@store')->name('userStore');
        Route::put('user/update', 'UserController@update')->name('userUpdate');
        Route::delete('user/delete', 'UserController@destroy')->name('userDelete');
    });

});




