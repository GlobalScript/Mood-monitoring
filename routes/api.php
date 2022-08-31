<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\Api\SliceController;
use App\Http\Controllers\Api\DayBookController;
use App\Http\Controllers\Api\MoodChartController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/start', [UserController::class, 'start']);
    Route::get('/user/get', [UserController::class, 'getUser']);
    Route::post('/user/delete', [UserController::class, 'deleteUser']);
    Route::put('/user/password', [UserController::class, 'updatePassword']);
    Route::put('/user/name', [UserController::class, 'updateName']);
    Route::post('/slice/add', [SliceController::class, 'addSlice']);
    Route::put('/slice/update', [SliceController::class, 'updateSlice']);
    Route::get('/slices/list', [SliceController::class, 'refreshList']);
    Route::get('/slice/{id}', [SliceController::class, 'oneSlice']);
    Route::get('/slice/last/refresh', [SliceController::class, 'refreshLastSlice']);
    Route::post('/note/add', [DayBookController::class, 'addNote']);
    Route::post('/note/delete', [DayBookController::class, 'deleteNote']);
    Route::get('/notes/list', [DayBookController::class, 'refreshList']);
    Route::get('/note/{id}', [DayBookController::class, 'note']);
    Route::post('/mark/add', [MoodChartController::class, 'addMark']);
    Route::get('/mark/list', [MoodChartController::class, 'DateMarkList']);
    Route::put('/mark/update', [MoodChartController::class, 'updateMark']);
    Route::get('/marks/month/{date}', [MoodChartController::class, 'monthMark']);
    Route::get('/marks/last', [MoodChartController::class, 'lastMonth']);
});

    

