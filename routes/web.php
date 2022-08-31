<?php

use App\Http\Controllers\VueSpaController;
use Illuminate\Support\Facades\Route;

Route::get('/{any}', [VueSpaController::class, 'index'])->where('any', '.*');
