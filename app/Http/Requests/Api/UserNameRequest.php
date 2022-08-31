<?php

namespace App\Http\Requests\Api;

use App\Http\Requests\Api\ValidationRequest;

class UserNameRequest extends ValidationRequest
{
public function authorize()
    {
        return true;
    }
public function rules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'password' => ['required', 'string', 'min:6']
        ];
    }
}
