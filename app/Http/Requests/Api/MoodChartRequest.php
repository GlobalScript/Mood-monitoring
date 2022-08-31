<?php

namespace App\Http\Requests\Api;
use App\Http\Requests\Api\ValidationRequest;
use Illuminate\Foundation\Http\FormRequest;

class MoodChartRequest extends ValidationRequest
{
    
    public function rules()
    {
        return [
            "mark" => ["required","integer","between:-5,5"]
        ];
    }
}
