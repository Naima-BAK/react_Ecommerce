<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;



Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function(){

    Route::get('/checkingAuthenticated',function(){
        return response()->json(['message' => 'you are in', 'status' => 200],200);
    });

    // Category :
    Route::post('add_Category',[CategoryController::class,'store']);


});




Route::middleware(['auth:sanctum'])->group(function(){

    
    Route::post('logout',[AuthController::class,'logout']);

});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
