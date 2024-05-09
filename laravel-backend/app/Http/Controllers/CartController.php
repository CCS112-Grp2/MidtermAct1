<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartModel;

class CartController extends Controller
{
    public function addItem(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        // Create a new cart item
        $cartItem = CartModel::create([
            'product_id' => $request->product_id,
            'quantity' => $request->quantity
        ]);

        // Return success response
        return response()->json(['message' => 'Item added to cart successfully'], 201);
    }

    public function removeItem(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'product_id' => 'required|exists:carts,product_id'
        ]);

        // Find the cart item by product_id and delete it
        CartModel::where('product_id', $request->product_id)->delete();

        // Return success response
        return response()->json(['message' => 'Item removed from cart successfully']);
    }

    public function updateQuantity(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'product_id' => 'required|exists:carts,product_id',
            'quantity' => 'required|integer|min:1'
        ]);

        // Find the cart item by product_id and update its quantity
        $cartItem = CartModel::where('product_id', $request->product_id)->first();
        $cartItem->quantity = $request->quantity;
        $cartItem->save();

        // Return success response
        return response()->json(['message' => 'Item quantity updated successfully']);
    }
}
