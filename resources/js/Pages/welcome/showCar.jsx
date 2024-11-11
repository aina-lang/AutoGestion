import PrimaryButton from '@/Components/PrimaryButton';
import ReservationModal from '@/Components/ReservationModal';
import GuestLayout from '@/Layouts/GuestLayout'; // Assurez-vous que le chemin est correct
import { Head, useForm } from '@inertiajs/react';
import { Divider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

function Showvehicule({ vehicule, auth }) {
    const [imagePreviews, setImagePreviews] = useState([]);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reservationModalOpen, setReservationModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        note: 0,
        commentaire: '',
    });

    const [avis, setAvis] = useState([]);

    console.log(vehicule);
    // Simulate fetching reviews from the database (Firebase, API, etc.)
    useEffect(() => {
        // Fetch reviews for this vehicle, e.g., from Firebase or an API
        setAvis([
            {
                id: 1,
                note: 4,
                commentaire: 'Très bon véhicule!',
                auteur: 'John',
            },
            {
                id: 2,
                note: 5,
                commentaire: 'Excellent état, je recommande!',
                auteur: 'Marie',
            },
        ]);
    }, [vehicule.id]);

    // Function to handle form submission
    const handleSubmitAvis = async (e) => {
        e.preventDefault();

        if (!data.commentaire || data.note === 0) {
            alert('Veuillez remplir le formulaire correctement.');
            return;
        }

        // Post the form data (in this case, to the server or API)
        post(route('avis.store', vehicule.id), {
            onSuccess: () => {
                setAvis([
                    ...avis,
                    { ...data, id: avis.length + 1, auteur: 'Current User' }, // Replace 'Current User' with the actual user
                ]);
                reset(); // Reset form fields
            },
            onError: (errors) => {
                console.error('Error submitting review:', errors);
                alert('Une erreur est survenue. Veuillez réessayer.');
            },
        });
    };

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
        <GuestLayout auth={auth} footerShown={false}>
            <Head title={`Véhicule ${vehicule.marque} ${vehicule.modele}`} />
            <ReservationModal
                open={reservationModalOpen}
                handleClose={handleCloseReservationModal}
                car={vehicule}
                isAuthenticated={auth.user ? true : false}
            />

            <div className="mx-auto space-y-5 bg-gray-50 p-6 py-24">
                <div className="rounded-lg p-6 transition-transform duration-300">
                    <div className="flex h-full flex-col">
                        <div className="mb-6 flex">
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

                                {/* Display the rating (moyenne de la note) */}
                                <div className="mt-4 flex items-center">
                                    <span className="font-semibold text-gray-600">
                                        Note:{' '}
                                    </span>
                                    <span className="ml-2 text-yellow-500">
                                        {vehicule.avis.length > 0 ? (
                                            // Calculate the average rating
                                            (() => {
                                                const totalRating =
                                                    vehicule.avis.reduce(
                                                        (acc, avisItem) =>
                                                            acc + avisItem.note,
                                                        0,
                                                    );
                                                const averageRating =
                                                    totalRating /
                                                    vehicule.avis.length;
                                                const roundedRating =
                                                    averageRating.toFixed(1); // Round to 1 decimal place

                                                // Display the stars for the average rating
                                                const fullStars =
                                                    Math.floor(roundedRating); // Number of full stars
                                                const emptyStars =
                                                    5 - fullStars; // Number of empty stars
                                                return (
                                                    <span>
                                                        {'★'.repeat(fullStars)}
                                                        {'☆'.repeat(emptyStars)}
                                                        <span className="ml-2 text-gray-600">
                                                            ({roundedRating})
                                                        </span>
                                                    </span>
                                                );
                                            })()
                                        ) : (
                                            <p>
                                                Aucun avis disponible pour ce
                                                véhicule.
                                            </p>
                                        )}
                                    </span>
                                </div>

                                {/* Button always at the bottom */}
                                <div className="mt-auto flex w-full items-center justify-between space-x-4">
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

            <div className="bg-white p-5">
                <div className="bg-white p-5">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Avis sur le véhicule
                    </h3>
                    <div className="mt-4">
                        {vehicule.avis.length > 0 ? (
                            vehicule.avis.map((avisItem) => (
                                <div
                                    key={avisItem.id}
                                    className="border-b py-3"
                                >
                                    <div className="flex justify-between">
                                        <span className="font-semibold">
                                            {avisItem.user.nom}
                                        </span>
                                        <span className="text-yellow-500">
                                            {'★'.repeat(avisItem.note)}
                                            {'☆'.repeat(5 - avisItem.note)}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-600">
                                        {avisItem.commentaire}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p>Aucun avis disponible pour ce véhicule.</p>
                        )}
                    </div>
                </div>
                {/* <Divider />{' '} */}
                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                        Laisser un avis
                    </h3>

                    <div className="mt-2">
                        <TextField
                            label="Commentaire"
                            multiline
                            rows={4}
                            value={data.commentaire}
                            onChange={(e) =>
                                setData('commentaire', e.target.value)
                            } // Use setData to update form data
                            fullWidth
                            error={errors.commentaire}
                            helperText={errors.commentaire} // Show validation errors
                        />
                    </div>

                    <div className="mt-2">
                        <label className="block text-gray-700">Note</label>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => setData('note', value)} // Use setData for note field
                                    className={`${
                                        data.note >= value
                                            ? 'text-yellow-500'
                                            : 'text-gray-400'
                                    } text-2xl`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <PrimaryButton
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitAvis}
                            disabled={processing} // Disable button while submitting
                        >
                            {processing ? 'Envoi...' : "Soumettre l'avis"}
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}

export default Showvehicule;
