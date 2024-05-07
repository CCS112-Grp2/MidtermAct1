<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve all products from the database
        $products = Product::all();

        // Return JSON response with the products
        return response()->json($products);
    }
}
