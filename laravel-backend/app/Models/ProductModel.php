<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    protected $table = 'tblproducts';

    protected $fillable = [
        'name',
        'description',
        'price',
        'imageSrc',
        // Add other attributes as needed
    ];

}
