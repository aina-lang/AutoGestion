<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Vehicule; // Assurez-vous que le modèle Vehicule est importé
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class VehiculeController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        // Start the query with the relation to 'categorie'
        $query = Vehicule::with('categorie');
        // var_dump($query);
        // exit;
        // Check if there are search parameters
        if ($request->filled('marque') || $request->filled('categorie') || ($request->filled('date_depart') && $request->filled('date_retour'))) {

            // Filter by marque
            if ($request->filled('marque')) {
                $query->where('marque', 'like', '%' . $request->marque . '%');
            }

            // Filter by category
            if ($request->filled('categorie')) {
                $query->where('categorie_id', $request->categorie); // Use the correct foreign key for the category
            }

            // Filter by date range for availability
            if ($request->filled('date_depart') && $request->filled('date_retour')) {
                $query->whereDoesntHave('reservations', function ($q) use ($request) {
                    $q->where(function ($query) use ($request) {
                        $query->whereBetween('date_depart', [$request->date_depart, $request->date_retour])
                            ->orWhereBetween('date_retour', [$request->date_depart, $request->date_retour])
                            ->orWhere(function ($query) use ($request) {
                                $query->where('date_depart', '<=', $request->date_depart)
                                    ->where('date_retour', '>=', $request->date_retour);
                            });
                    });
                });
            }

            // Retrieve the filtered vehicles with their categories
            $vehicles = $query->get();


            // Return the filtered results
            return inertia('welcome/allCars', [
                'latestVehicles' => $vehicles,
            ]);
        }

        // If no search parameters are provided, return all vehicles
        $vehicules = Vehicule::with('categorie')->paginate(5); // Retrieve all vehicles

        return inertia('admin/vehicules/index', [
            'vehicules' => $vehicules,
        ]); // Return to the view with all vehicle data
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Récupération des catégories depuis la base de données
        $categories = Categorie::all();

        // Renvoyer à la vue avec les catégories
        return Inertia::render('admin/vehicules/add', [
            'categories' => $categories
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des données
        $validator = Validator::make($request->all(), [
            'marque' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'immatriculation' => 'required|string|max:50|unique:vehicules',
            'categorie' => 'required|exists:categories,id',
            'prix_journalier' => 'required|numeric',
            'kilometrage' => 'required|numeric',
            'description' => 'required|string|max:500',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:30720', // Validation des images (optionnel)
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        try {
            // Gestion du stockage des images
            $imagePaths = []; // Initialiser le tableau pour les chemins d'images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    // Déplacer l'image vers le dossier de stockage
                    $path = $image->store('vehicules', 'public'); // Stockage local
                    $imagePaths[] = $path; // Ajouter le chemin à l'array
                }
            }

            // Création du véhicule
            Vehicule::create([
                'marque' => $request->marque,
                'modele' => $request->modele,
                'immatriculation' => $request->immatriculation,
                'categorie_id' => $request->categorie,
                'prix_journalier' => $request->prix_journalier,
                // 'disponible' => 1,   
                'kilometrage' => $request->kilometrage,
                'description' => $request->description,
                'images' => json_encode($imagePaths), // Stocker les chemins d'image au format JSON, même si vide
            ]);

            session()->flash('success', 'Véhicule ajouté avec succès.');
            return redirect()->route('vehicules.index');
        } catch (\Exception $e) {
            session()->flash('error', 'Erreur lors de l\'ajout du véhicule : ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Eager load the category with the vehicle
        $vehicule = Vehicule::with('categorie')->findOrFail($id);

        return Inertia::render('admin/vehicules/show', [
            'vehicule' => $vehicule,
        ]);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $vehicule = Vehicule::with('categorie')->findOrFail($id); // Récupérer le véhicule ou générer une erreur 404
        $categories = Categorie::all();


        return Inertia::render('admin/vehicules/edit', [
            'vehicule' => $vehicule,
            'categories' => $categories
        ]); // Renvoyer à la vue pour éditer
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $vehicule = Vehicule::findOrFail($id);

        // Validation des données
        $validator = Validator::make($request->all(), [
            'marque' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'immatriculation' => 'required|string|max:50|unique:vehicules,immatriculation,' . $vehicule->id,
            'categorie' => 'required|exists:categories,id',
            'prix_journalier' => 'required|numeric',
            // 'disponible' => 'required|boolean',
            'kilometrage' => 'required|numeric',
            'description' => 'required|string|max:500',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:30720', // Validation des images (optionnel)
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        try {
            // Gestion du stockage des nouvelles images
            $imagePaths = json_decode($vehicule->images, true) ?? []; // Récupérer les anciennes images

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('vehicules', 'public');
                    $imagePaths[] = $path;
                }
            }

            // Gérer la suppression des images sélectionnées
            if ($request->has('images_to_delete')) {
                foreach ($request->images_to_delete as $imageToDelete) {
                    Storage::disk('public')->delete($imageToDelete);
                    $imagePaths = array_diff($imagePaths, [$imageToDelete]);
                }
            }

            // Mise à jour du véhicule
            $vehicule->update([
                'marque' => $request->marque,
                'modele' => $request->modele,
                'immatriculation' => $request->immatriculation,
                'categorie_id' => $request->categorie,
                'prix_journalier' => $request->prix_journalier,
                // 'disponible' => $request->disponible,
                'kilometrage' => $request->kilometrage,
                'description' => $request->description,
                'images' => json_encode($imagePaths), // Mettre à jour les chemins d'image au format JSON
            ]);

            session()->flash('success', 'Véhicule mis à jour avec succès.');
            return redirect()->route('vehicules.index');
        } catch (\Exception $e) {
            session()->flash('error', 'Erreur lors de la mise à jour du véhicule : ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }





    public function destroy(string $id)
    {
        $vehicule = Vehicule::findOrFail($id); // Récupérer le véhicule

        try {
            // Suppression des images de stockage
            $imagePaths = json_decode($vehicule->images, true);
            if ($imagePaths) {
                foreach ($imagePaths as $imagePath) {
                    Storage::disk('public')->delete($imagePath); // Supprimer les images du stockage
                }
            }

            // Suppression du véhicule
            $vehicule->delete();
            session()->flash('success', 'Véhicule supprimé avec succès.'); // Message de succès
            return redirect()->route('vehicules.index');
        } catch (\Exception $e) {
            session()->flash('error', 'Erreur lors de la suppression du véhicule : ' . $e->getMessage()); // Message d'erreur
            return redirect()->back();
        }
    }















    public function search(Request $request)
    {

        // var_dump($request->all());
        // exit;
        // Start the query with eager loading of categories

    }
}
