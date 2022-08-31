<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\SliceCollection;
use App\Http\Requests\Api\SliceRequest;
use App\Models\Slice;
use App\Http\Resources\OneSliceResource;
use Illuminate\Support\Facades\Auth;

class SliceController extends Controller
{
function addSlice(SliceRequest $request)
    {
        Slice::create(
            [
            "health" => $request->health,
            "job" => $request->job,
            "environment" => $request->environment,
            "relationships" => $request->relationships,
            "rest" => $request->rest,
            "development" => $request->development,
            "realization" => $request->realization,
            "spirituality" => $request->spirituality,
            "user_id"=>Auth::id(),
            "create_date" => $request->create_date
            ]
        );
        return response()->json([
            "status" => 201,
            'message'=>"create slice successfully" 
            ], 201);
    }
public function updateSlice(SliceRequest $request)
    {
        $slice = Slice::find($request->id);
            if(is_null($slice))
            {
                return response()->json([
                    'status' => 404,
                    'massage'=>'not found'
                    ], 404);
            }
        Slice::where('id', $request->id)->update($request->all());
        return  response()->json([
            'status' =>200,
            'message'=>'updated successfully'
            ], 200);
    }
public function oneSlice($id)
    {
        $slice = Slice::find($id);
            if(!$slice)
                {
                    return response()->json([
                        'status' => 404,
                        'massage'=>'not found'
                        ], 404);
                }
        return response()->json([
            'status' => 200,
            "sliceId"=> new OneSliceResource($slice)
            ], 200);
    }
public function refreshList()
    {
        $slice = Slice::where('user_id', Auth::id())->orderBy('id', 'DESC')->get();
        return response()->json([
                'status' => 200,
                "sliceList" => new SliceCollection($slice)
                ], 200);
    } 
public function refreshLastSlice(){
        $userSlice = Slice::where("user_id", Auth::id())->latest()->first();
        return response()->json([
            'status' => 200,
            "lastSlice"=> is_null($userSlice) ? [] : new OneSliceResource($userSlice)
            ], 200);
    }   
}
