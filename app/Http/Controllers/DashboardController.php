<?php

// app/Http/Controllers/DashboardController.php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\User;
use App\Models\Vehicule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Fetch the data for the admin dashboard
        $totalCars = Vehicule::count();
        $totalReservations = Reservation::count();
        $totalUsers = User::where('type', '!=', 'admin')->count();
        
        // Calculate the total revenue from confirmed reservations
        $totalRevenue = Reservation::where('status', 'confirmed')->get()->sum(function ($reservation) {
            $startDate = \Carbon\Carbon::parse($reservation->date_depart);
            $endDate = \Carbon\Carbon::parse($reservation->date_arrivee);
            $numberOfDays = $endDate->diffInDays($startDate);
            return $numberOfDays * $reservation->vehicule->prix_journalier;
        });

        // Prepare chart data for Reservations per Month
        $reservationsPerMonth = Reservation::selectRaw('MONTH(date_depart) as month, COUNT(*) as count')
            ->where('status', 'confirmed')
            ->groupBy('month')
            ->orderBy('month')
            ->get();

        // Transform the data into a format suitable for the chart
        $monthlyData = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthlyData[$i] = $reservationsPerMonth->firstWhere('month', $i)->count ?? 0;
        }

        // Check the user type
        if (Auth::user()->type == "user") {
            return Inertia::render('client/Dashboard', [
                'totalCars' => $totalCars,
                'totalReservations' => $totalReservations,
                'totalUsers' => $totalUsers,
                'totalRevenue' => $totalRevenue,
                'monthlyData' => array_values($monthlyData), // Pass the data for the chart
            ]);
        } elseif (Auth::user()->type == "admin") {
            return Inertia::render('admin/Dashboard', [
                'totalCars' => $totalCars,
                'totalReservations' => $totalReservations,
                'totalUsers' => $totalUsers,
                'totalRevenue' => $totalRevenue,
                'monthlyData' => array_values($monthlyData), // Pass the data for the chart
            ]);
        }
    }
}
