<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;

Route::post('register', [ApiController::class, 'register']);

Route::post('login', [ApiController::class, 'login']);

Route::group(["middleware" => ["auth:sanctum"]], function () {
    Route::get('profile', [ApiController::class, 'profile']);
    Route::get('logout', [ApiController::class, 'logout']);

    Route::get('products', [ProductController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'addToCart']);
    Route::post('checkout', [CheckoutController::class, 'store']);
});

Route::group(["middleware" => ["auth:sanctum", "admin"]], function () {
    Route::get('products/view', [ProductController::class, 'view']);
    Route::post('products/add', [ProductController::class, 'store']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);

    Route::get('users', [UserController::class, 'index']);
    Route::post('users', [UserController::class, 'store']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
});

Route::post('/cart/remove', [CartController::class, 'removeFromCart']);
Route::post('/cart/update', [CartController::class, 'updateCart']);
