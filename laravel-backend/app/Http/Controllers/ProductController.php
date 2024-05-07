<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductModel;

class ProductController extends Controller
{
    public function index()
    {
        $products = ProductModel::all();
        return response()->json($products);
    }
}
