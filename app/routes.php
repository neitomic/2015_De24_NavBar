<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::group(["before" => "auth"], function()
{
    Route::get('/', "HomeController@index");

    Route::get('/menu', "MenuController@getMenu");
    Route::get('/menu/default', "MenuController@getDefaultMenu");

    Route::post('/menu', "MenuController@updateMenu");
    Route::post('/menu/html', "MenuController@updateHtml");
    Route::post('/menu/style', "MenuController@updateStyle");

    Route::get('/logout', 'AuthController@getLogout');
});

Route::group(['before' => 'guest'], function()
{
    Route::get('/login', "AuthController@getLogin");
    Route::post('/login', "AuthController@postLogin");

    Route::get('/register', 'AuthController@getRegister');
    Route::post('/register', 'AuthController@postRegister');
});
