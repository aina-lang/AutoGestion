<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Détails du Véhicule</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            margin: 0;
            padding: 20px;
        }
        h1 {
            text-align: center;
        }
        .vehicule-details {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Détails du Véhicule</h1>
    <div class="vehicule-details">
        <p><strong>Marque:</strong> {{ $vehicule->marque }}</p>
        <p><strong>Modèle:</strong> {{ $vehicule->modele }}</p>
        <p><strong>Immatriculation:</strong> {{ $vehicule->immatriculation }}</p>
        <p><strong>Kilométrage:</strong> {{ $vehicule->kilometrage }}</p>
        <p><strong>Prix Journalier:</strong> {{ $vehicule->prix_journalier }} €</p>
        <p><strong>Description:</strong> {{ $vehicule->description }}</p>
    </div>
</body>
</html>
