<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = User::where("type", 0)->paginate(5); // Retrieve all clients
        return Inertia::render('admin/clients/index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/clients/add'); // Render the form for creating a new client
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'nom' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'phone' => 'nullable|string|max:15',
                // 'status' => 'required|string|in:active,inactive,pending',
            ]);

            // Create the new client
            User::create([
                'nom' => $validatedData['nom'],
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'phone' => $validatedData['phone'],
                // 'status' => $validatedData['status'],
                'type' => 0, // Assuming 'type' is used to distinguish client types
            ]);

            return redirect()->route('admin.clients.index')->with('success', 'Client ajouté avec succès.');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput(); // Handle validation errors
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de l\'ajout du client.')->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = User::findOrFail($id); // Fetch the client by ID or fail
        return Inertia::render('admin/clients/show', [
            'client' => $client,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $client = User::findOrFail($id); // Fetch the client by ID or fail
        return Inertia::render('admin/clients/edit', [
            'client' => $client,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validatedData = $request->validate([
                'nom' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $id,
                'phone' => 'nullable|string|max:15',
                // 'status' => 'required|string|in:active,inactive,pending',
            ]);

            // Find the client and update the data
            $client = User::findOrFail($id);
            $client->update($validatedData);

            return redirect()->route('admin.clients.index')->with('success', 'Client mis à jour avec succès.');
        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput(); // Handle validation errors
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de la mise à jour du client.')->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $client = User::findOrFail($id); // Fetch the client by ID or fail
            $client->delete();

            return redirect()->route('admin.clients.index')->with('success', 'Client supprimé avec succès.');
        } catch (\Exception $e) {
            return back()->with('error', 'Erreur lors de la suppression du client.');
        }
    }
}
