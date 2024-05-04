<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Define the table associated with the model
    protected $table = 'products';

    // Define the columns that are fillable
    protected $fillable = ['name', 'description', 'price', 'imageSrc'];

    // Define any relationships with other models
    // For example, if products belong to a category, you would define it here
    // public function category()
    // {
    //     return $this->belongsTo(Category::class);
    // }
}
