<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Http\Requests\Api\UserPasswordRequest;
use App\Http\Requests\Api\UserNameRequest;
use App\Http\Resources\DayBookCollection;
use App\Http\Resources\OneSliceResource;
use App\Http\Resources\MoodChartCollection;
use App\Http\Resources\MoodDateCollection;
use App\Http\Resources\SliceCollection;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use App\Models\DayBook;
use App\Models\MoodChart;
use App\Models\Slice;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class UserController extends Controller
{
public function getUser()
    {
        $user = User::find(Auth::id());
            if(is_null($user))
            {
                return response()->json([
                    'status' => 404,
                    'massage'=>'not found'
                    ], 404);
            }
            return response()->json([
                    "user" => new UserResource(User::findOrFail(Auth::id())),
                    ], 200);
    }
public function updatePassword(UserPasswordRequest $request)
    {
        $user = User::find(Auth::id());
            if(is_null($user))
            {
                return response()->json([
                    'status' => 404,
                    'massage'=>'not found'
                    ], 404);
            }
            if (Hash::check(request('password'), $user->password))
            {
                User::where('id', Auth::id())->update(["password" => bcrypt($request->newPassword)]);           
                return  response()->json([
                    'status' =>200,
                    'message'=>'updated successfully'
                    ], 200);
            }
        return response()->json([
                'message' => 'Wrong password',
                'status' => 422
            ], 422);
    }
public function updateName(UserNameRequest $request)
    {
        $user = User::find(Auth::id());
            if(is_null($user))
            {
                return response()->json([
                    'status' => 404,
                    'massage'=>'not found'
                    ], 404);
            }
            if (Hash::check(request('password'), $user->password))
            {
                User::where('id', Auth::id())->update(["name" => $request->name]);           
                return  response()->json([
                    'status' =>200,
                    'message'=>'updated successfully'
                    ], 200);
            }
        return response()->json([
                'message' => 'Wrong password',
                'status' => 422
            ], 422);
    }
public function deleteUser()
    {
        $user = User::find(Auth::id());
            if(is_null($user))
            {
                return response()->json([
                    'status' => 404,
                    'massage'=>'not found'
                    ], 404);
            }
            if (Hash::check(request('password'), $user->password))
            {
                User::where('id', Auth::id())->delete();
                return  response()->json([
                    'status' =>200,
                    'message'=>'user delete successfully'
                    ], 200);
            }
        return response()->json([
                'message' => 'Wrong password',
                'status' => 422
            ], 422);    
    }
public function start()
    {
        $user = User::find(Auth::id());
            if(is_null($user))
            {
                return response()->json([
                    'status' => 404,
                    'massage'=>'not found'
                    ], 404);
            }
        $noteList = DayBook::where('user_id', Auth::id())->orderBy('id', 'DESC')->get();
        $lastSlice = Slice::where('user_id', Auth::id())->latest()->first();
        $sliceList = Slice::where('user_id', Auth::id())->orderBy('id', 'DESC')->get();
        $nowYear = Carbon::now()->format('Y');
        $nowMonth = Carbon::now()->format('m');
        $marks = MoodChart::where("user_id", Auth::id())->orderBy('id', 'DESC')->get(); 
        $lastMonthMarks = MoodChart::where(
                "user_id", Auth::id())->where(
                'year', 'like',
                '%' . $nowYear . '%')->where(
                'month', 'like',
                '%' . $nowMonth . '%')->get();
            return response()->json([
                        'status' => 200,
                        "user" => new UserResource(User::findOrFail(Auth::id())),
                        "noteList" => new DayBookCollection($noteList),
                        "sliceList" => new SliceCollection($sliceList),
                        "markList" => new MoodDateCollection($marks), 
                        "lastSlice" => is_null($lastSlice) ?  [] : new OneSliceResource($lastSlice),
                        "lastMonthMarks" => new MoodChartCollection($lastMonthMarks)
                        ], 200);
    }
}
