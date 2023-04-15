<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class CategoryController extends Controller
{
       
               // index : pour afficher les données de la table categories
               public function index()
               {
                // all() : get all from categories table
                   $category = Category::all();
                   return response()->json([
                       'status'=>200,
                       'category'=>$category,
                   ]);
               }


                // ----------------------------------------------------
                //la fonction store pour ajouter les données de la catégorie à la base de données
                public function store(Request $request){
                    
                    //systeme de validation des inputs :
                    $validator = Validator::make($request->all(),[
                        'slug'=>'required|max:191',
                        'name'=>'required|max:191',
                    ],
                    [
                        'slug.required'=>'Le champ Slug est obligatoire.',
                        'slug.max'=>'La longueur du Slug est trop longue. La longueur maximale est de 191.',
                        'name.required'=>'Le champ Nom est obligatoire.',
                        'name.max'=>'La longueur du nom est trop longue. La longueur maximale est de 191.',
                    ]);

                    // si les champs invalide : 
                    if($validator->fails()){
                        return response()->json([
                            'status'=>400,
                            // getMessageBag() : Obtenez tous les messages d'erreur de validation.
                            'errors'=>$validator->getMessageBag(),
                        ]);
                    }
                    else
                    {
                        $category = new Category;
                        $category->slug = $request->input('slug');
                        $category->name = $request->input('name');
                        $category->description = $request->input('description');
                        $category->status = $request->input('status') == true ? '1':'0';
                        $category->save();
                        return response()->json([
                            'status'=>200,
                            'message'=>'Catégorie ajoutée avec succès',
                        ]);
                    }
                }


                public function edit($id)
                {
                    $category = Category::find($id);
                    if($category)
                    {
                        return response()->json([
                            'status'=>200,
                            'category'=>$category
                        ]);
                    }
                    else
                    {
                        return response()->json([
                            'status'=>404,
                            'message'=>'Catégorie non trouvé!'
                        ]);
                    }
                }



                public function update(Request $request, $id){
                    $validator = Validator::make($request->all(), [
                        'slug'=>'required|max:191',
                        'name'=>'required|max:191',
                    ],
                    [
                        'slug.required'=>'Le champ Slug est obligatoire.',
                        'slug.max'=>'La longueur du Slug est trop longue. La longueur maximale est de 191.',
                        'name.required'=>'Le champ Nom est obligatoire.',
                        'name.max'=>'La longueur du nom est trop longue. La longueur maximale est de 191.',
                    ]);
                
                    if($validator->fails())
                    {
                        return response()->json([
                            'status'=>422,
                            'errors'=>$validator->getMessageBag(),
                        ]);
                    }
                    else
                    {
                        $category = Category::find($id);
                        if($category)
                        {
                            $category->slug = $request->input('slug');
                            $category->name = $request->input('name');
                            $category->description = $request->input('description');
                            $category->save();
                            return response()->json([
                                'status'=>200,
                                'message'=>'Catégorie mise à jour avec succès',
                            ]);
                        }
                        else
                        {
                            return response()->json([
                                'status'=>404,
                                'message'=>'Catégorie non trouvé!'
                            ]);
                        }
                    }
                }


// la fontion destroy pour supprimer une categorie dans la base de donnes
               public function destroy($id)
    {
        
       
        $category = Category::find($id);
        
        if($category)
        {
            $category->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Catégorie supprimée avec succès',
            ]);
        }
        else
        {
            return response()->json([
                'status'=>404,
                'message'=>'Catégorie non trouvé!',
            ]);
        }
        
    }
              
          
}
