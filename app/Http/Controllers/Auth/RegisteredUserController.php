<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }


    public function createAdmin(): Response
    {
        return Inertia::render('Auth/RegisterAdmin');
    }
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */

    public function store(Request $request): RedirectResponse
    {
        try {
            $request->validate([
                'nom' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
                'phones' => 'nullable|array', // Validation pour le tableau de numéros de téléphone
                'phones.*' => 'string|max:15', // Validation pour chaque numéro de téléphone
            ]);

            // Créez l'utilisateur avec le tableau de numéros de téléphone
            $user = User::create([
                'nom' => $request->nom,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'phones' => json_encode($request->phones), // Encodez les numéros en JSON
            ]);

            event(new Registered($user));

            Session::flash('success', 'Votre compte a été créé avec succès !');

            return redirect(route('client.dashboard', absolute: false));
        } catch (\Exception $e) {
            Session::flash('error', 'Une erreur s\'est produite lors de la création de votre compte. <br>' . htmlspecialchars($e->getMessage()));
            return redirect()->back()->withInput();
        }
    }



    public function storeAdmin(Request $request): RedirectResponse
    {

        try {

            $request->validate([
                'nom' => 'required|string|max:255',
                'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $user = User::create([
                'nom' => $request->nom,
                'email' => $request->email,
                'type' => 1,
                'password' => Hash::make($request->password),

            ]);

            event(new Registered($user));

            Session::flash('success', 'Votre compte a été créé avec succès !');

            return redirect(route('admin.dashboard', absolute: false));
        } catch (\Exception $e) {
            Session::flash('error', 'Une erreur s\'est produite lors de la création de votre compte. <br>' . htmlspecialchars($e->getMessage()));
            return redirect()->back()->withInput();
        }
    }
}
