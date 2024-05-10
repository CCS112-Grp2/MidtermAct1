<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    use HasFactory;

    protected $table = 'tblcheckout';
    protected $fillable = ['name', 'address', 'city', 'postal_code'];
}
