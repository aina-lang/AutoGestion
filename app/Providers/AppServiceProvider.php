<?php

namespace App\Providers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Tighten\Ziggy\Ziggy;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // dd(Auth::user());
        Vite::prefetch(concurrency: 3);
        
        Inertia::share([
            'auth' => [
                'user' => Auth::user(),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => Auth::url(),
            ],
            'flash' => [
                'success' => session()->get('success'),
                'error' => session()->get('error'),
                'warning' => session()->get('warning'),
            ]
        ]);
    }
}
