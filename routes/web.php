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



Route::get('/allcars', [HomeController::class, "all"])->name("cars.all");

Route::get('/search-cars', [VehiculeController::class, 'search'])->name('cars.filter');
Route::get('vehicules/{vehicule}/show', [VehiculeController::class, "showall"])->name('cars.show');



Route::middleware('auth', 'verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/vehicule/{vehicule}/pdf', [PdfController::class, 'vehicule'])->name('vehicule.pdf');
    Route::get('/reservation/{reservation}/pdf', [PdfController::class, 'reservation'])->name('reservation.pdf');

    Route::middleware('user-access:admin|user')->group(function () {
        Route::prefix('admin')->as("admin.")->group(function () {
            Route::get('reservations/archived', [ReservationController::class, 'archived'])->name('archived');

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
