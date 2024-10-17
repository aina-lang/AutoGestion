<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use Barryvdh\DomPDF\Facade\Pdf;
use Dompdf\Options;

class PdfController extends Controller
{
    public function generate(Vehicule $vehicule)
    {

        // Charger la vue pour le PDF
        $pdf = Pdf::loadView('pdf.vehicule', compact('vehicule'));


        return $pdf->download($vehicule->modele . '.pdf');
    }
}
