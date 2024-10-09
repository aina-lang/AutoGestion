<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicule extends Model
{
    use HasFactory;

    protected $fillable = [
        'marque',
        'modele',
        'immatriculation',
        'categorie_id',
        'prix_journalier',
        // 'disponible',
        'kilometrage',
        'date_ajout',
        'description',
        'images',
    ];

    // Définir la relation avec Categorie
    public function categorie()
    {
        return $this->belongsTo(Categorie::class);
    }


    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
