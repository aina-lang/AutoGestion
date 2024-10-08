<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Vehicule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Vérifier le type d'utilisateur
        if (Auth::user()->type == 'user') {
            // Récupérer uniquement les réservations de l'utilisateur actuel
            $reservations = Reservation::with(['user', 'vehicule', ])
                ->where('user_id', Auth::id())
                ->get();
                return Inertia::render('client/reservations/index', [
                    'reservations' => $reservations,
                ]);
        } else {
            // Récupérer toutes les réservations pour les administrateurs
            $reservations = Reservation::with(['user', 'vehicule', ])->get();
            return Inertia::render('admin/reservations/index', [
                'reservations' => $reservations,
            ]);
        }

       
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Récupérer les utilisateurs, véhicules et catégories
        $users = User::where('type', 'user')->get();
        $vehicules = Vehicule::all();
        $categories = Categorie::all();

        return Inertia::render('admin/reservations/create', [
            'users' => $users,
            'vehicules' => $vehicules,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation des données d'entrée
        $validator = Validator::make($request->all(), [
            'vehicule_id' => 'required|exists:vehicules,id',
            'date_depart' => 'required|date|after_or_equal:today',
            'date_retour' => 'required|date|after:date_depart',
            'motif' => 'required|string|max:255', // Validation pour le motif
            'pieces_jointes' => 'array', // Validation pour les pièces jointes
            'pieces_jointes.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048', // Chaque pièce jointe doit être un fichier valide
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Vérifier la disponibilité du véhicule
        $vehicule = Vehicule::find($request->vehicule_id);
        $existingReservations = Reservation::where('vehicule_id', $vehicule->id)
            ->where(function ($query) use ($request) {
                $query->whereBetween('date_depart', [$request->date_depart, $request->date_retour])
                    ->orWhereBetween('date_retour', [$request->date_depart, $request->date_retour])
                    ->orWhere(function ($query) use ($request) {
                        $query->where('date_depart', '<=', $request->date_depart)
                            ->where('date_retour', '>=', $request->date_retour);
                    });
            })
            ->where('status', 'confirmed') // Considérer uniquement les réservations confirmées
            ->count();

        if ($existingReservations > 0) {
            return redirect()->back()->withErrors(['vehicule_id' => 'Le véhicule est déjà réservé pour ces dates.'])->withInput();
        }

        try {
            // Determine the user_id to use
            $userId = Auth::check() && Auth::user()->type == "user"
                ? Auth::user()->id
                : $request->user_id;

            // Création de la réservation avec le statut "pending"
            $reservation = Reservation::create([
                'user_id' => $userId, // Use the determined user_id
                'vehicule_id' => $request->vehicule_id,
                'date_depart' => $request->date_depart,
                'date_retour' => $request->date_retour,
                'motif' => $request->motif, // Ajout du motif
                'pieces_jointes' => json_encode($request->pieces_jointes), // Convertir les pièces jointes en JSON
                'status' => 'pending', // Réservation en attente de confirmation
            ]);

            // Gérer le téléchargement des pièces jointes
            if ($request->hasFile('pieces_jointes')) {
                foreach ($request->file('pieces_jointes') as $file) {
                    // Vous pouvez gérer le stockage des fichiers ici
                    $path = $file->store('pieces_jointes'); // Stocke le fichier et renvoie le chemin
                    // Vous pouvez également enregistrer le chemin dans la base de données si nécessaire
                }
            }

            session()->flash('success', 'Réservation ajoutée avec succès.');
            return redirect()->route('reservations.index');
        } catch (\Exception $e) {
            session()->flash('error', 'Erreur lors de l\'ajout de la réservation : ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reservation = Reservation::with(['user', 'vehicule', 'categorie'])->findOrFail($id);
        return Inertia::render('admin/reservations/show', [
            'reservation' => $reservation,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $users = User::where('type', 'user')->get();
        $vehicules = Vehicule::all();
        $categories = Categorie::all();

        return Inertia::render('admin/reservations/edit', [
            'reservation' => $reservation,
            'users' => $users,
            'vehicules' => $vehicules,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $reservation = Reservation::findOrFail($id);

        // Validation des données
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'vehicule_id' => 'required|exists:vehicules,id',
            'date_depart' => 'required|date|after_or_equal:today',
            'date_retour' => 'required|date|after:date_depart',
            'motif' => 'required|string|max:255',
            'pieces_jointes' => 'array',
            'pieces_jointes.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
            'status' => 'required|in:pending,confirmed,cancelled', // Validation du statut
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Vérifier la disponibilité du véhicule si les dates sont modifiées
        if ($request->date_depart != $reservation->date_depart || $request->date_retour != $reservation->date_retour) {
            $existingReservations = Reservation::where('vehicule_id', $request->vehicule_id)
                ->where(function ($query) use ($request) {
                    $query->whereBetween('date_depart', [$request->date_depart, $request->date_retour])
                        ->orWhereBetween('date_retour', [$request->date_depart, $request->date_retour])
                        ->orWhere(function ($query) use ($request) {
                            $query->where('date_depart', '<=', $request->date_depart)
                                ->where('date_retour', '>=', $request->date_retour);
                        });
                })
                ->where('status', 'confirmed')
                ->where('id', '!=', $reservation->id) // Exclure la réservation actuelle
                ->count();

            if ($existingReservations > 0) {
                return redirect()->back()->withErrors(['vehicule_id' => 'Le véhicule est déjà réservé pour ces dates.'])->withInput();
            }
        }

        try {
            // Mise à jour de la réservation
            $reservation->update([
                'user_id' => $request->user_id,
                'vehicule_id' => $request->vehicule_id,
                'date_depart' => $request->date_depart,
                'date_retour' => $request->date_retour,
                'motif' => $request->motif,
                'pieces_jointes' => json_encode($request->pieces_jointes),
                'status' => $request->status,
            ]);

            // Gérer le téléchargement des pièces jointes si présentes
            if ($request->hasFile('pieces_jointes')) {
                foreach ($request->file('pieces_jointes') as $file) {
                    $path = $file->store('pieces_jointes');
                    // Optionally store the path to the database if needed
                }
            }

            session()->flash('success', 'Réservation mise à jour avec succès.');
            return redirect()->route('reservations.index');
        } catch (\Exception $e) {
            session()->flash('error', 'Erreur lors de la mise à jour de la réservation : ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::findOrFail($id);

        try {
            $reservation->delete();

            session()->flash('success', 'Réservation supprimée avec succès.');
            return redirect()->route('reservations.index');
        } catch (\Exception $e) {
            session()->flash('error', 'Erreur lors de la suppression de la réservation : ' . $e->getMessage());
            return redirect()->route('reservations.index');
        }
    }
}
