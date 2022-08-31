<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MoodChart extends Model
{
    use HasFactory;
    protected $fillable = [
        "year",
        "month",
        "day",
        "mark", 
        "id",
        "user_id",
        "created_at"
        ];
}
