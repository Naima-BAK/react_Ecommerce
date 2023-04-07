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
// function login :

public function login(Request $request){
    $validator = Validator::make($request->all(),[
        'email'=>'required|max:191',
        'password'=>'required',
    ],
        [
            'email.required'=>'Le champ Adresse email est obligatoire.',
            'email.max'=>'La longueur de l\'adresse e-mail est trop longue. La longueur maximale est de 191',
            'password.required'=>'Le champ Mot de passe est obligatoire.',
        ]);

    if($validator->fails()){
        return response()->json([
            'validation_errors'=>$validator->errors(),
        ]);
    }
    else
    {
        $user = User::where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
           return response()->json([
               'status'=>401,
               'message'=>'Login et mot de passe incorrects, veuillez les
               vérifier.',
           ]);
        }
        else
        {
            if($user->role_as == 1)
            {
                $role = 'admin';
                $token = $user->createToken('_AdminToken',['server:admin'])->plainTextToken;
            }
            else
            {
                $role = '';
                $token = $user->createToken($user->email.'_Token',[''])->plainTextToken;
            }
            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=>$token,
                'message'=>'Connecté avec succès',
                'role'=>$role,
            ]);
        }
    }
}


   
// function logout :
    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'logged out Sucessfully',
           ]);
    }
    
}