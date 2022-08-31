<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class VueSpaController extends Controller
{
    public function index()
    {
       return view('index');
    }
}
