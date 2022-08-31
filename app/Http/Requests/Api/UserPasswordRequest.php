<?php

namespace App\Http\Requests\Api;

use App\Http\Requests\Api\ValidationRequest;

class UserPasswordRequest extends ValidationRequest
{
public function authorize()
    {
        return true;
    }
public function rules()
    {
        return [
            'password' => ['required', 'string', 'min:6'],
            'newPassword' => ['required', 'string', 'min:6'],
        ];
    }
}