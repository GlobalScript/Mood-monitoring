<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DayBookCollection;
use Illuminate\Http\Request;
use App\Http\Requests\Api\DayBookRequest;
use Illuminate\Support\Facades\Auth;
use App\Models\DayBook;

class DayBookController extends Controller
{ 
public function addNote(DayBookRequest $request)
    {
        DayBook::create(
            [
            "title" => $request->title,
            "note" => $request->note,
            "user_id"=> Auth::id()
            ]
        );
        return response()->json([
            'status' => 201,
            'message'=>'create note successfully'
            ], 201);
    }
public function note($id)
    {
        $note = DayBook::find($id);
            if(!$note)
                {
                    return response()->json([
                        'status' => 404,
                        'massage'=>'not found'
                        ], 404);
                }
            return response()->json([
                'status' => 200,
                "note"=>$note
                ], 200);
    }
public function deleteNote(Request $request)
    {
        $note = DayBook::find($request->note_id);
            if(is_null($note))
            {
                return response()->json([
                    'status' => 404,
                    'massage'=>'not found'
                    ], 404);
            }
        DayBook::where('id', $request->note_id)->delete();
        return  response()->json([
            'status' =>200,
            'message'=>'note delete successfully'
            ], 200);
    }
public function refreshList()
    {
        $dayBook = DayBook::where('user_id', Auth::id())->orderBy('id', 'DESC')->get();
        return response()->json([
                'status' => 200,
                "noteList" => new DayBookCollection($dayBook)
                ], 200);
    }
}
