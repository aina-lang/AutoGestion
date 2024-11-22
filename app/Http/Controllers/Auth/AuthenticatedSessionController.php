<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        try {
            $credentials = $request->only('email', 'password');

            // Vérifier si l'utilisateur existe
            $user = User::where('email', $credentials['email'])->first();
            if (!$user) {
                Session::flash('error', 'Aucun utilisateur trouvé avec cet email.');
                return back()->withErrors([
                    'email' => 'Aucun utilisateur trouvé avec cet email.',
                ])->withInput();
            }

            // Vérifier le mot de passe
            if (!Hash::check($credentials['password'], $user->password)) {
                Session::flash('error', 'Le mot de passe est incorrect.');
                return back()->withErrors([
                    'password' => 'Le mot de passe est incorrect.',
                ])->withInput();
            }

            // Authentifier l'utilisateur
            Auth::login($user);
            $request->session()->regenerate();

            // Ajouter un message de succès
            Session::flash('success', 'Authentification avec succès !');

            // Rediriger selon le type d'utilisateur
            if ($user->type === 'admin') {
                return redirect()->route('admin.dashboard');
            }

            return redirect()->route('home');
        } catch (\Exception $e) {
            // En cas d'erreur inattendue
            Session::flash('error', 'Une erreur inattendue est survenue. Veuillez réessayer plus tard.');
            return back()->withInput();
        }
    }


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
