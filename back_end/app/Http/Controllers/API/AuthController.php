<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

use App\Models\User;
class AuthController extends Controller
{
    public function register(Request $req)
    {
        $validator = Validator::make($req->all(),[
           'name'=> 'required',
           'email'=> 'required|email|max:190|unique:users,email',
           'password' => 'required|min:8'
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{
               $user = User::create([
                 'name' => $req->name,
                 'email' => $req->email,
                 'password' => Hash::make($req->password),
               ]);
               $token = $user->createToken($user->email.'_token')->plainTextToken;
               return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' =>$token,
                'message' => 'registered Sucessfully',
               ]);
               
            }
    }
    
}
