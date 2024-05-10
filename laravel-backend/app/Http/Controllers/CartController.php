<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $productId = $request->input('productId');
        $quantity = $request->input('quantity');

        // Retrieve the product details based on $productId
        $product = Product::find($productId);

        // Add the product to the cart
        $cart = session()->get('cart');
        $cart[$productId] = [
            'product' => $product,
            'quantity' => $quantity
        ];
        session()->put('cart', $cart);

        return response()->json(['message' => 'Product added to cart successfully']);
    }

    public function viewCart()
    {
        $cart = session()->get('cart');
        return response()->json(['cart' => $cart]);
    }
}
