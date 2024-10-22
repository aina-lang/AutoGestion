import PrimaryButton from '@/Components/PrimaryButton';
import ReservationModal from '@/Components/ReservationModal';
import GuestLayout from '@/Layouts/GuestLayout'; // Assurez-vous que le chemin est correct
import { Head } from '@inertiajs/react';
import { Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';

function Showvehicule({ vehicule, auth }) {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reservationModalOpen, setReservationModalOpen] = useState(false);

    const handleOpenReservationModal = (car) => {
        setReservationModalOpen(true);
    };

    const handleCloseReservationModal = () => {
        setReservationModalOpen(false);
    };

    const handleCancelReservation = async (car) => {
        // Ajoutez la logique pour annuler la réservation
    };

    useEffect(() => {
        if (vehicule.images) {
            const decodedImages = JSON.parse(vehicule.images);
            const previews = decodedImages.map((image) => `/storage/${image}`);
            setImagePreviews(previews);
        }
    }, [vehicule.images]);

    const openImageModal = (index) => {
        setCurrentImageIndex(index);
        setImageModalOpen(true);
    };

    const closeImageModal = () => {
        setImageModalOpen(false);
    };

    const showPrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imagePreviews.length - 1 : prevIndex - 1,
        );
    };

    const showNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imagePreviews.length - 1 ? 0 : prevIndex + 1,
        );
    };

    return (
        <GuestLayout auth={auth}>
            <Head title={`Véhicule ${vehicule.marque} ${vehicule.modele}`} />
            <ReservationModal
                open={reservationModalOpen}
                handleClose={handleCloseReservationModal}
                car={vehicule}
                isAuthenticated={auth.user ? true : false}
            />

            <div className="mx-auto space-y-5 bg-gray-50 p-6 py-24">
                <div className="rounded-lg  p-6  transition-transform duration-300">
                    <div className="flex">
                        <img
                            src={`/storage/${JSON.parse(vehicule.images)[0]}`}
                            alt={`Image du véhicule`}
                            className="w-2/3 rounded-md object-cover shadow-md hover:shadow-lg"
                        />
                        <div className="w-1/3 p-2 pl-4">
                            <h2 className="mb-4 text-3xl font-bold text-gray-800">
                                {vehicule.marque} / {vehicule.modele}
                            </h2>
                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                                <div className="col-span-2 flex justify-between">
                                    <p>
                                        <strong>Immatriculation:</strong>
                                    </p>
                                    <p>{vehicule.immatriculation}</p>
                                </div>
                                <div className="col-span-2 flex justify-between">
                                    <p>
                                        <strong>Kilométrage:</strong>
                                    </p>
                                    <p>{vehicule.kilometrage} km/h</p>
                                </div>
                                <div className="col-span-2 flex justify-between">
                                    <p>
                                        <strong>Catégorie:</strong>
                                    </p>
                                    <p>
                                        {vehicule.categorie
                                            ? vehicule.categorie.nom
                                            : 'Non définie'}
                                    </p>
                                </div>
                            </div>
                            <Divider sx={{ marginTop: 2 }} />
                            <p className="mt-4 text-gray-600">
                                {vehicule.description}
                            </p>
                            <div className="mt-4 flex w-full items-center justify-between space-x-4">
                                {auth?.user?.type !== 'admin' && (
                                    <PrimaryButton
                                        onClick={() => {
                                            if (
                                                vehicule.reservationStatus ===
                                                'en attente'
                                            ) {
                                                handleCancelReservation(
                                                    vehicule,
                                                );
                                            } else {
                                                handleOpenReservationModal(
                                                    vehicule,
                                                );
                                            }
                                        }}
                                        disabled={
                                            vehicule.isReservedByUser &&
                                            vehicule.reservationStatus !==
                                                'en attente'
                                        }
                                        className="flex-1"
                                    >
                                        {vehicule.isReservedByUser
                                            ? vehicule.reservationStatus ===
                                              'confirmée'
                                                ? 'Déjà réservé'
                                                : 'Annuler la réservation'
                                            : 'Réserver'}
                                    </PrimaryButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {imagePreviews.length > 1 && (
                    <div className="my-4">
                        <h3 className="mb-4 text-lg font-medium text-gray-700">
                            Images du véhicule
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {imagePreviews.map((image, index) => (
                                <div key={index} className="group relative">
                                    <img
                                        src={image}
                                        alt={`Image ${index}`}
                                        className="h-48 w-full cursor-pointer rounded-md object-cover shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                                        onClick={() => openImageModal(index)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {vehicule.unavailableDates &&
                    vehicule.unavailableDates.length > 0 && (
                        <div className="my-4 rounded-md border border-red-300 bg-red-100 p-4">
                            <h4 className="font-semibold text-red-600">
                                Non disponible du :
                            </h4>
                            <ul className="list-disc pl-6 text-gray-700">
                                {vehicule.unavailableDates.map(
                                    (dateRange, idx) => (
                                        <li key={idx}>
                                            {dateRange.start} à {dateRange.end}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    )}
            </div>

            {imageModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="relative w-2/3 rounded-lg bg-white p-4 shadow-lg">
                        <button
                            onClick={closeImageModal}
                            className="absolute right-6 top-6 text-2xl text-gray-800 hover:text-gray-500"
                        >
                            ✕
                        </button>
                        <img
                            src={imagePreviews[currentImageIndex]}
                            alt={`Image ${currentImageIndex}`}
                            className="h-full w-full rounded-md"
                        />
                        <button
                            onClick={showPrevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition hover:bg-gray-200"
                        >
                            ◀
                        </button>
                        <button
                            onClick={showNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-2 shadow-md transition hover:bg-gray-200"
                        >
                            ▶
                        </button>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
}

export default Showvehicule;
