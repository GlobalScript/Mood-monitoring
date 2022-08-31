<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slice extends Model
{
    use HasFactory;
    protected $fillable = [
    "health", 
    "job", 
    "environment",
    "relationships",
    "rest",
    "development",
    "realization", 
    "spirituality",
    "user_id",
    "create_date"
    ];
}
