<?php

namespace App\Http\Requests\Api;
use App\Http\Requests\Api\ValidationRequest;

class SliceRequest extends ValidationRequest
{  
public function rules()
    {
        return [
            "id" => ["required"],
            "health" => ["required","integer","between:0,10"],
            "job" => ["required","integer","between:0,10"],
            "environment" => ["required","integer","between:0,10"],
            "relationships" => ["required","integer","between:0,10"],
            "rest" => ["required","integer","between:0,10"],
            "development" => ["required","integer","between:0,10"],
            "realization" => ["required","integer","between:0,10"],
            "spirituality" => ["required","integer","between:0,10"]
        ];
    }
}
