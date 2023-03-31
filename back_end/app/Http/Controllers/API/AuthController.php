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



    public function login(Request $req){

        $validator = Validator::make($req->all(), [
            'email'=> 'required|email|max:190',
            'password' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{
            $user = User::where('email', $req->email)->first();
 
            if (! $user || ! Hash::check($req->password, $user->password)) {
                return response()->json([
                    'status' => 401,
                    'message' => 'Invalid Credential',
                   ]);
            }else{
                $token = $user->createToken($user->email.'_token')->plainTextToken;
                return response()->json([
                 'status' => 200,
                 'username' => $user->name,
                 'token' =>$token,
                 'message' => 'logged in Sucessfully',
                ]);
            }
        }

    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'logged out Sucessfully',
           ]);
    }
    
}