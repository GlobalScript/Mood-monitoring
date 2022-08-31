<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Api\Auth\RegisterFormRequest;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
public function register(RegisterFormRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
    
        return response()->json(['status' => 201], 201);
    }
public function login()
    {
    $user = User::whereEmail(request('username'))->first();
        if (!$user)
            {
                return response()->json([
                    'message' => 'Wrong email or password',
                    'status' => 422
                ], 422);
            }
        if (!Hash::check(request('password'), $user->password))
            {
                return response()->json([
                    'message' => 'Wrong email or password',
                    'status' => 422
                ], 422);
            }
    $client = DB::table('oauth_clients')->where('password_client', true)->first();
        if (!$client)
            {
                return response()->json([
                    'message' => 'Laravel Passport is not setup properly.',
                    'status' => 500
                ], 500);
            }
    $data = [
        'grant_type' => 'password',
        'client_id' => $client->id,
        'client_secret' => $client->secret,
        'username' => request('username'),
        'password' => request('password'),
        ];
    $request = Request::create('/oauth/token', 'POST', $data);
    $response = app()->handle($request);
        if ($response->getStatusCode() != 200)
            {
                return response()->json([
                    'message' => 'Wrong email or password',
                    'status' => 422
                ], 422);
            }
    $data = json_decode($response->getContent());
    return response()->json([
        'token' => $data->access_token,
        'status' => 200
        ], 200);
    }
public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['status' => 200], 200);
    }
}
