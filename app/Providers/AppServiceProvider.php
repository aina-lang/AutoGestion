<?php

namespace App\Providers;

use Illuminate\Routing\UrlGenerator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
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
    public function boot(UrlGenerator $url): void
    {

        $sourcePath = base_path('database/database.sqlite');
        $destinationPath = '/tmp/database.sqlite';

        if (File::exists($sourcePath) && !File::exists($destinationPath)) {
            File::copy($sourcePath, $destinationPath);
        }
        if (env('APP_ENV') == 'production') {
            $url->forceScheme('https');
        }
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
