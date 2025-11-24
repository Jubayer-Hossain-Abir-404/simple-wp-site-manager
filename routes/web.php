<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Go to /wordpress-sites to manage WordPress sites.';
});

Route::namespace('App\Http\Controllers\Web')
    ->group(function () {
        Route::resource('wordpress-sites', 'WordpressSiteController');
        Route::post('wordpress-sites/{wordpressSite}/stop', 'WordpressSiteController@stopContainer')->name('wordpress-sites.stop');
    });
