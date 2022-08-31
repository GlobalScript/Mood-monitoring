<?php

namespace App\Http\Requests\Api;
use App\Http\Requests\Api\ValidationRequest;
use Illuminate\Foundation\Http\FormRequest;

class DayBookRequest extends ValidationRequest
{
    
    public function rules()
    {
        return [
            "title" => ["required", "max:30"],
            "note" => ["required"],

        ];
    }
}
