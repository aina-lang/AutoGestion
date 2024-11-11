<?php

// app/Models/Avis.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;

    protected $fillable = ['vehicule_id', 'user_id', 'note', 'commentaire'];

    public function vehicule()
    {
        return $this->belongsTo(Vehicule::class);  // Relation avec le Véhicule
    }

    public function user()
    {
        return $this->belongsTo(User::class);  // Relation avec l'utilisateur
    }
}
