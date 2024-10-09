// app/Components/ReservationDetails.jsx

import AdminLayout from '@/Layouts/AdminLayout';
import { usePage } from '@inertiajs/react';
import { Button, Typography } from '@mui/material';
import React from 'react';

const ReservationDetails = () => {
    const { reservation } = usePage().props;

    return (
        <AdminLayout header={<h1>Détails de la Réservation</h1>}>
            <div className="p-4">
                <Typography variant="h4" className="mb-4">
                    Détails de la Réservation
                </Typography>

                <Typography variant="h5" className="mb-4">
                    Informations sur le véhicule
                </Typography>
                <Typography variant="body1" className="mb-2">
                    <strong>Marque:</strong> {reservation.vehicule.marque}
                </Typography>
                <Typography variant="body1" className="mb-2">
                    <strong>Modèle:</strong> {reservation.vehicule.modele}
                </Typography>
                <Typography variant="body1" className="mb-2">
                    <strong>Prix Journalier:</strong>{' '}
                    {reservation.vehicule.prix_journalier} Ar
                </Typography>
                <Typography variant="body1" className="mb-4">
                    <strong>Kilométrage:</strong>{' '}
                    {reservation.vehicule.kilometrage} km
                </Typography>

                <Typography variant="h5" className="mb-4">
                    Informations sur l'utilisateur
                </Typography>
                <Typography variant="body1" className="mb-2">
                    <strong>Nom:</strong> {reservation.user.nom}
                </Typography>
                <Typography variant="body1" className="mb-2">
                    <strong>Email:</strong> {reservation.user.email}
                </Typography>
                <Typography variant="body1" className="mb-4">
                    <strong>Téléphone:</strong> {reservation.user.telephone}
                </Typography>

                <Typography variant="h5" className="mb-4">
                    Détails de la Réservation
                </Typography>
                <Typography variant="body1" className="mb-2">
                    <strong>Date de départ:</strong> {reservation.date_depart}
                </Typography>
                <Typography variant="body1" className="mb-2">
                    <strong>Date de retour:</strong> {reservation.date_retour}
                </Typography>
                <Typography variant="body1" className="mb-2">
                    <strong>Status:</strong> {reservation.status}
                </Typography>
                <Typography variant="body1" className="mb-2">
                    <strong>Motif:</strong> {reservation.motif}
                </Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.get('/projects')} // Redirect to the projects page
                >
                    Retour à la liste des réservations
                </Button>
            </div>
        </AdminLayout>
    );
};

export default ReservationDetails;
