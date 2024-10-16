<?php

namespace App\Http\Controllers;

use App\Models\Categorie;
use App\Models\Reservation;
use App\Models\Vehicule;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentDate = now(); // Récupérer la date actuelle

        $latestVehicles = Vehicule::latest()->take(6)->get()->map(function ($vehicle) use ($currentDate) {
            // Decode the JSON images
            $vehicle->images = json_decode($vehicle->images);

            // Vérifier la disponibilité du véhicule en fonction de la date actuelle
            $reservationExists = Reservation::where('vehicule_id', $vehicle->id)
                ->where(function ($query) use ($currentDate) {
                    $query->where('date_depart', '<=', $currentDate)
                        ->where('date_retour', '>=', $currentDate);
                })
                ->exists();

            // Vérifier si l'utilisateur est authentifié
            $userId = Auth::id();
            $reservation = null;

            if ($userId) {
                // Si l'utilisateur est connecté, vérifier ses réservations
                $reservation = Reservation::where('user_id', $userId)
                    ->where('vehicule_id', $vehicle->id)
                    ->first();

                // Vérifier si le véhicule est réservé par l'utilisateur
                $vehicle->isReservedByUser = $reservation ? true : false;
            } else {
                // Si l'utilisateur n'est pas connecté, récupérer toutes les réservations pour le véhicule
                $reservation = Reservation::where('vehicule_id', $vehicle->id)->get();
            }


            $vehicle->unavailableDates = Reservation::where("id", $vehicle->id)->get()->map(function ($reservation) {
                return [
                    'start' => $reservation->date_depart,
                    'end' => $reservation->date_retour,
                ];
            })->toArray();


            // dump($reservation);
            // exit;
            // Si le véhicule a une réservation qui est confirmée, il n'est pas disponible
            $vehicle->disponible = true;

            if ($reservation && $reservation->first()) {
                $vehicle->disponible = $reservationExists == false && !($reservation && $reservation->where('status', 'confirmée'));
                $vehicle->reservationStatus = $reservation && $reservation->first() ? $reservation->first()->status : null;
            }
            // var_dump(  $vehicle->disponible);exit;
            // Récupérer le statut de la réservation, s'il y en a une

            // var_dump( $vehicle->reservationStatus);exit;
            return $vehicle;
        });

        $categories = Categorie::all();
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'latestVehicles' => $latestVehicles,
            'categories' => $categories
        ]);
    }
}
