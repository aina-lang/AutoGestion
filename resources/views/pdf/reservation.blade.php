<!DOCTYPE html>
<html>
<head>
    <title>Détails de la Réservation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>

<h1>Détails de la Réservation</h1>

<table>
    <tr>
        <th>ID</th>
        <td>{{ $reservation->id }}</td>
    </tr>
    <tr>
        <th>Nom du Client</th>
        <td>{{ $reservation->user->name }}</td>
    </tr>
    <tr>
        <th>Véhicule</th>
        <td>{{ $reservation->vehicule->modele }}</td>
    </tr>
    <tr>
        <th>Date de Début</th>
        <td>{{ $reservation->date_debut }}</td>
    </tr>
    <tr>
        <th>Date de Retour</th>
        <td>{{ $reservation->date_retour }}</td>
    </tr>
    <tr>
        <th>Statut</th>
        <td>{{ $reservation->status }}</td>
    </tr>
</table>

</body>
</html>
