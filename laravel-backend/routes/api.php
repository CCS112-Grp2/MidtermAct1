<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route for retrieving products
Route::get('products', [ProductController::class, 'index']);
