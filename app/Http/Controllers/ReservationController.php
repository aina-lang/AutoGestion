<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Vehicule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Auth;

class ReservationController extends Controller
{
    /**
     * Afficher la liste des ressources.
     */
    public function index()
    {
        try {
            // Vérifier le type d'utilisateur
            if (Auth::user()->type == 'user') {
                // Récupérer uniquement les réservations de l'utilisateur actuel
                $reservations = Reservation::with(['user', 'vehicule'])
                    ->where('user_id', Auth::id())
                    ->paginate(5);
                return Inertia::render('client/reservations/index', [
                    'reservations' => $reservations,
                ]);
            } else {
                // Récupérer toutes les réservations pour les administrateurs
                $reservations = Reservation::with(['user', 'vehicule'])->paginate(5);
                return Inertia::render('admin/reservations/index', [
                    'reservations' => $reservations,
                ]);
            }
        } catch (Exception $e) {
            session()->flash('error', 'Erreur lors de la récupération des réservations : ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Afficher le formulaire de création d'une nouvelle ressource.
     */
    public function create()
    {
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
     * Enregistrer une nouvelle ressource dans le stockage.
     */
    public function store(Request $request)
    {
        // Validation des données d'entrée
        $validator = Validator::make($request->all(), [
            'vehicule_id' => 'required|exists:vehicules,id',
            'date_depart' => 'required|date|after_or_equal:today',
            'date_retour' => 'required|date|after:date_depart',
            'motif' => 'required|string|max:255',
            'type_voyage' => 'required|in:circuit,boucle,transfert', // Validation du type de voyage
            'pieces_jointes' => 'array',
            'pieces_jointes.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Vérification de la disponibilité du véhicule
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
            ->where('status', 'confirmée')
            ->count();

        if ($existingReservations > 0) {
            return redirect()->back()->withErrors(['vehicule_id' => 'Le véhicule est déjà réservé pour ces dates.'])->withInput();
        }

        try {
            // Déterminer le user_id
            $userId = Auth::check() && Auth::user()->type == "user"
                ? Auth::user()->id
                : $request->user_id;

            // Création de la réservation avec le statut "en attente"
            $reservation = Reservation::create([
                'user_id' => $userId,
                'vehicule_id' => $request->vehicule_id,
                'date_depart' => $request->date_depart,
                'date_retour' => $request->date_retour,
                'motif' => $request->motif,
                'type_voyage' => $request->type_voyage, // Ajout du type de voyage
                'pieces_jointes' => json_encode($request->pieces_jointes),
                // 'status' => 'en_attente',
            ]);

            session()->flash('success', 'Réservation ajoutée avec succès.');
            return redirect()->route('reservations.index');
        } catch (Exception $e) {
            // var_dump($e->getMes);exit;
            session()->flash('error', 'Erreur lors de l\'ajout de la réservation : ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Afficher la ressource spécifiée.
     */
    public function show(string $id)
    {
        $reservation = Reservation::with(['user', 'vehicule',])->findOrFail($id);
        return Inertia::render('admin/reservations/show', [
            'reservation' => $reservation,
        ]);
    }

    /**
     * Afficher le formulaire d'édition de la ressource spécifiée.
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
     * Mettre à jour la ressource spécifiée dans le stockage.
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
            'type_voyage' => 'required|in:circuit,boucle,transfert', // Validation du type de voyage
            'pieces_jointes' => 'array',
            'pieces_jointes.*' => 'file|mimes:jpg,jpeg,png,pdf|max:2048',
            'status' => 'required|in:en_attente,confirmée,annulée',
        ]);

        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }

        // Vérification de la disponibilité du véhicule si les dates sont modifiées
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
                ->where('status', 'confirmée')
                ->where('id', '!=', $reservation->id)
                ->count();

            if ($existingReservations > 0) {
                return redirect()->back()->withErrors(['vehicule_id' => 'Le véhicule est déjà réservé pour ces dates.'])->withInput();
            }
        }

        try {
            $reservation->update([
                'user_id' => $request->user_id,
                'vehicule_id' => $request->vehicule_id,
                'date_depart' => $request->date_depart,
                'date_retour' => $request->date_retour,
                'motif' => $request->motif,
                'type_voyage' => $request->type_voyage, // Mise à jour du type de voyage
                'pieces_jointes' => json_encode($request->pieces_jointes),
                'status' => $request->status,
            ]);

            session()->flash('success', 'Réservation mise à jour avec succès.');
            return redirect()->route('reservations.index');
        } catch (Exception $e) {
            session()->flash('error', 'Erreur lors de la mise à jour de la réservation : ' . $e->getMessage());
            return redirect()->back()->withInput();
        }
    }

    /**
     * Supprimer la ressource spécifiée du stockage.
     */
    public function destroy(string $id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        session()->flash('success', 'Réservation supprimée avec succès.');
        return redirect()->route('reservations.index');
    }


    /**
     * Approuver la ressource spécifiée.
     */
    public function approve(string $id)
    {
        try {
            $reservation = Reservation::findOrFail($id);

            if ($reservation->status == 'confirmée') {
                $reservation->status = 'en attente';
            } else if ($reservation->status == 'en attente') {
                $reservation->status = 'confirmée';
            }

            $reservation->save();

            session()->flash('success', 'Réservation ' . $reservation->status . ' avec succès.');
        } catch (Exception $e) {
            session()->flash('error', 'Erreur lors de la confirmation de la réservation : ' . $e->getMessage());
        }

        return redirect()->back();
    }

    /**
     * Annuler la ressource spécifiée.
     */
    public function cancel(string $id)
    {
        try {
            $reservation = Reservation::findOrFail($id);
            $reservation->status = 'annulée';
            $reservation->save();

            session()->flash('success', 'Réservation annulée avec succès.');
        } catch (Exception $e) {
            session()->flash('error', 'Erreur lors de l\'annulation de la réservation : ' . $e->getMessage());
        }

        return redirect()->route('reservations.index');
    }
}
