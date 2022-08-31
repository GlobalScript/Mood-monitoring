<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\MoodChartRequest;
use App\Http\Resources\MoodChartCollection;
use App\Http\Resources\MoodDateCollection;
use Illuminate\Support\Facades\Auth;
use App\Models\MoodChart;
use Carbon\Carbon;

class MoodChartController extends Controller
{
public function addMark(MoodChartRequest $request)
    {
        MoodChart::create(
                [
                "year" => $request->year,
                "month" => $request->month,
                "day" => $request->day,
                "mark" => $request->mark,
                "user_id"=> Auth::id()
                ]
            );
        return response()->json([
            'status' => 201,
            'message'=>'create mark successfully'
            ], 201);
    }
public function updateMark(MoodChartRequest $request)
    {
        $mark = MoodChart::find($request->id);
            if(is_null($mark))
            {
                return response()->json([
                    'status' => 404,
                    'massage'=>'not found'
                    ], 404);
            }
        MoodChart::where('id', $request->id)->update($request->all());
        return  response()->json(['status' =>200, 'message'=>'updated successfully'], 200);
    }
public function monthMark($date)
    {
        if (preg_match("/\d{4}\-\d{2}/", $date))
        {
            $marks = MoodChart::where(
                    "user_id", Auth::id()
                    )->where('created_at', 'like', '%' . $date . '%')->get();
            return response()->json([
                        'status' => 200,
                        "marks" => new MoodChartCollection($marks)
                        ], 200);
        }
            return response()->json([
                'status' => 400,
                'message'=>'the date is not correct'
                ], 400);
    }
public function lastMonth()
    {
        $nowYear = Carbon::now()->format('Y');
        $nowMonth = Carbon::now()->format('m');
        $marks = MoodChart::where(
            "user_id", Auth::id())->where(
            'year', 'like',
            '%' . $nowYear . '%')->where(
            'month', 'like',
            '%' . $nowMonth . '%')->get();
        return response()->json([
                        'status' => 200,
                        "lastMonthMarks" => new MoodChartCollection($marks)
                        ], 200);
    }
public function dateMarkList()
    {
        $marks = MoodChart::where("user_id", Auth::id())->orderBy('id', 'DESC')->get();             
        return response()->json([
                        'status' => 200,
                        "markList" => new MoodDateCollection($marks)
                        ], 200);
    }   
}
