<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Clé étrangère vers users
            $table->foreignId('vehicule_id')->constrained()->onDelete('cascade'); // Clé étrangère vers vehicles
            $table->string('motif')->nullable();
            $table->date('date_depart'); // Date de départ
            $table->date('date_retour'); // Date de retour
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending'); // Enum pour le statut
            $table->enum('type_voyage', ['circuit', 'boucle', 'transfert']); // Ajout du type de voyage
            $table->boolean('retard')->default(false);
            $table->json('pieces_jointes')->nullable(); // Champ pour les pièces jointes au format JSON
            $table->timestamps(); // Ajout des colonnes created_at et updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};
