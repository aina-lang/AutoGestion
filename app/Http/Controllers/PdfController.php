<?php

namespace App\Http\Controllers;

use App\Models\Vehicule;
use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Dompdf\Options;

class PdfController extends Controller
{
    public function generate(Vehicule $vehicule)
    {
        // Configurer Dompdf
        $options = new Options();
        $options->set('defaultFont', 'DejaVu Sans');
        $dompdf = new Dompdf($options);

        // Charger la vue pour le PDF
        $html = view('pdf.vehicule', compact('vehicule'))->render();

        // Charger le HTML dans Dompdf
        $dompdf->loadHtml($html);

        // (Optional) Configurer le format de la page
        $dompdf->setPaper('A4', 'portrait');

        // Rendre le PDF
        $dompdf->render();

        // Télécharger le PDF
        return $dompdf->stream($vehicule->modele . '.pdf');
    }
}
