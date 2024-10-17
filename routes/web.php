<?php

use App\Http\Controllers\CategorieController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContratController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
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


Route::get('/', [HomeController::class, "index"])->name("home");



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
Route::get('vehicules/{vehicule}show', [VehiculeController::class, "showall"])->name('cars.show');











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

        Route::prefix('client')->as("client.")->group(function () {
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
    Route::middleware('user-access:user')->group(function () {});
});

require __DIR__ . '/auth.php';
