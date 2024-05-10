<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
/*
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
*/

Route::post('register', [ApiController::class, 'register']);

Route::post('login', [ApiController::class, 'login']);

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get('profile', [ApiController::class, 'profile']);

    Route::get('products', [ProductController::class, 'index']);

    Route::get('logout', [ApiController::class, 'logout']);

    Route::post('/cart/add', [CartController::class, 'addToCart']);

    Route::post('checkout', [CheckoutController::class, 'store']);
});
Route::post('/cart/remove', [CartController::class, 'removeFromCart']);

Route::post('/cart/update', [CartController::class, 'updateCart']);

