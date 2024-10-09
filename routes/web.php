<?php

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContratController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PdfController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\VehiculeController;
use App\Models\Categorie;
use App\Models\Vehicule;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Reservation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


Route::get('/', function () {
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
        $userId = Auth::id(); // Récupérer l'ID de l'utilisateur authentifié
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

            // Vérifier si le véhicule est réservé par n'importe quel utilisateur
            // $vehicle->isReservedByUser = $reservation->isNotEmpty();
        }


        // var_dump($reservation );exit;
        // var_dump($reservation->where('status', 'confirmée')->isEmpty());exit;
        // Si le véhicule a une réservation qui est confirmée, il n'est pas disponible
        $vehicle->disponible = !$reservationExists && ($reservation && $reservation->where('status', 'confirmée'));

        // var_dump(  $vehicle->disponible);exit;
        // Récupérer le statut de la réservation, s'il y en a une
        $vehicle->reservationStatus = $reservation ? $reservation->first()->status : null;

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
})->name("home");



Route::get('/allcars', function (Request $request) {
    $userId = Auth::id(); // Récupérer l'ID de l'utilisateur authentifié

    // Fetch query parameters for filtering
    $marque = $request->input('search.marque', '');
    $date_depart = $request->input('search.date_depart', '');
    $date_retour = $request->input('search.date_retour', '');
    $categorie = $request->input('search.categorie', '');

    // Build the query
    $query = Vehicule::with('categorie'); // Eager load categorie relationship

    // Apply filters based on input
    if ($marque) {
        $query->where('marque', 'like', '%' . $marque . '%');
    }
    if ($date_depart) {
        $query->where('  date_depart', '<=', $date_depart); // Replace with your actual field for availability
    }
    if ($date_retour) {
        $query->where('date_retour', '>=', $date_retour); // Replace with your actual field for availability
    }
    if ($categorie) {
        $query->where('categorie', $categorie);
    }

    // Paginate the results, 20 items per page
    $latestVehicles = $query->paginate(20)->withQueryString()->map(function ($vehicle) use ($userId) {
        // Decode the JSON images
        $vehicle->images = json_decode($vehicle->images);

        // Vérifier si le véhicule est réservé par l'utilisateur
        // $vehicle->isReservedByUser = Reservation::where('user_id', $userId)
        //     ->where('vehicule_id', $vehicle->id)
        //     ->exists();
        $reservation = Reservation::where('user_id', $userId)
            ->where('vehicule_id', $vehicle->id)
            ->first();

        // Ajouter le statut de réservation
        $vehicle->isReservedByUser = (bool)$reservation;
        $vehicle->reservationStatus = $reservation ? $reservation->status : null;

        return $vehicle;
    });

    $categories = Categorie::all();

    return Inertia::render('welcome/allCars', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'latestVehicles' => $latestVehicles,
        'categories' => $categories,
        'search' => [
            'marque' => $marque,
            'date_depart' => $date_depart,
            'date_retour' => $date_retour,
            'categorie' => $categorie,
        ], // Pass the search filters to the view
    ]);
})->name("cars.all");

Route::get('/search-cars', [VehiculeController::class, 'search'])->name('cars.filter');


Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/vehicule/{vehicule}/pdf', [PdfController::class, 'generate'])->name('vehicule.pdf');

    Route::middleware('user-access:admin|user')->group(function () {
        Route::prefix('admin')->as("admin.")->group(function () {
            Route::resource('reservations', ReservationController::class);

            // Route for approving a reservation
            Route::post('/reservations/{id}/approve', [ReservationController::class, 'approve'])->name('reservations.approve');

            Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        });

        Route::prefix('client')->as("user.")->group(function () {
            Route::resource('reservations', ReservationController::class);
            Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
        });
    });

    // Routes réservées aux administrateurs
    Route::middleware('user-access:admin')->group(function () {
        Route::prefix('admin')->group(function () {
            // CRUD pour les administrateurs
            Route::resource('vehicules', VehiculeController::class);
            Route::resource('contrats', ContratController::class);
            Route::resource('categories', CategorieController::class);
            Route::resource('clients', ClientController::class);
        });
    });

    // Routes accessibles aux utilisateurs
    Route::middleware('user-access:user')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('client/Dashboard');
        })->name('client.dashboard');
    });
});

require __DIR__ . '/auth.php';
