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

    public function removeFromCart(Request $request)
    {
        $productId = $request->input('productId');

        // Remove the product from the cart
        $cart = session()->get('cart');
        unset($cart[$productId]);
        session()->put('cart', $cart);

        return response()->json(['message' => 'Product removed from cart successfully']);
    }

    public function updateCart(Request $request)
    {
        $productId = $request->input('productId');
        $quantity = $request->input('quantity');

        // Update the quantity of the product in the cart
        $cart = session()->get('cart');
        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] = $quantity;
            session()->put('cart', $cart);
            return response()->json(['message' => 'Cart updated successfully']);
        } else {
            return response()->json(['message' => 'Product not found in cart']);
        }
    }

    public function viewCart()
    {
        $cart = session()->get('cart');
        return response()->json(['cart' => $cart]);
    }
}
