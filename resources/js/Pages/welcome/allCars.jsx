import PrimaryButton from '@/Components/PrimaryButton';
import ReservationModal from '@/Components/ReservationModal';
import SecondaryButton from '@/Components/SecondaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, router, useForm } from '@inertiajs/react';
import SearchIcon from '@mui/icons-material/Search';
import {
    Button,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';

export default function AllCars({ auth, latestVehicles, categories }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const [query, setQuery] = useState({
        marque: '',
        date_depart: '',
        date_retour: '',
        categorie: '',
    });

    // Initialize form state with useForm
    const { setData } = useForm({
        marque: '',
        date_depart: '',
        date_retour: '',
        categorie: '',
    });

    const handleChange = (field, value) => {
        setQuery((prev) => ({ ...prev, [field]: value }));
        setData(field, value); // Also update form data for other purposes
    };

    useEffect(() => {
        const debounceSearch = _.debounce(() => {
            router.get(
                route(route().current()),
                { search: query },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 500); // Debounce time

        debounceSearch();

        return () => {
            debounceSearch.cancel(); // Clean up on component unmount
        };
    }, [query]);

    const handleOpenModal = (car) => {
        setSelectedCar(car);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCar(null);
    };

    const resetFilters = () => {
        // Reset the query state to initial values
        setQuery({
            marque: '',
            date_depart: '',
            date_retour: '',
            categorie: '',
        });
    };

    const handlePageChange = (url) => {
        router.get(
            url,
            {},
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    return (
        <GuestLayout auth={auth}>
            <Head title="Ayna lbr - Unlock Your Travel Experience" />

            <div className="flex h-screen justify-start overflow-hidden bg-gray-100 text-gray-800">
                <section className="left-0 right-0 top-0 z-30 mx-auto min-h-screen w-64">
                    <Paper
                        elevation={5}
                        className="mt-20 h-full w-full bg-white px-6 py-5 text-gray-800"
                    >
                        <h2 className="mb-4 text-lg font-semibold">
                            Recherche de Véhicules
                        </h2>
                        <div className="mt-2 flex flex-col space-y-5">
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Marque"
                                    type="text"
                                    value={query.marque}
                                    onChange={(e) =>
                                        handleChange('marque', e.target.value)
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    className="text-gray-800"
                                    InputProps={{
                                        startAdornment: (
                                            <SearchIcon className="mr-2" />
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Date de départ"
                                    type="date"
                                    value={query.date_depart}
                                    onChange={(e) =>
                                        handleChange(
                                            'date_depart',
                                            e.target.value,
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    className="text-gray-800"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Date de retour"
                                    type="date"
                                    value={query.date_retour}
                                    onChange={(e) =>
                                        handleChange(
                                            'date_retour',
                                            e.target.value,
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    className="text-gray-800"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Catégorie de voiture"
                                    select
                                    value={query.categorie}
                                    onChange={(e) =>
                                        handleChange(
                                            'categorie',
                                            e.target.value,
                                        )
                                    }
                                    InputLabelProps={{ shrink: true }}
                                    className="text-gray-800"
                                >
                                    {categories.map((option, index) => (
                                        <MenuItem
                                            key={index}
                                            value={option.value}
                                        >
                                            {option.nom}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            {/* Reset Filters Button */}
                            <Grid item xs={12}>
                                <PrimaryButton
                                    onClick={() => resetFilters()}
                                    className="mt-4 w-full rounded py-2 text-white focus:outline-none"
                                >
                                    Réinitialiser les filtres
                                </PrimaryButton>
                            </Grid>
                        </div>
                    </Paper>
                </section>

                {/* Display filtered cars */}
                <section className="mt-12 min-h-screen  w-full flex-grow overflow-auto px-12 pb-32">
                    <div>
                        <h3 className="my-14 text-3xl font-bold">
                            Derniers Véhicules Disponibles
                        </h3>
                        <Grid container spacing={3}>
                            {latestVehicles.map((car, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <motion.div
                                        className="flex h-full flex-col rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{
                                            duration: 0.2 * index,
                                        }}
                                    >
                                        <div className="relative mb-4">
                                            {/* Display image */}
                                            <div className="relative h-48 overflow-hidden rounded-md">
                                                <img
                                                    src={
                                                        '/storage/' +
                                                        car.images[0]
                                                    }
                                                    alt={car.modele}
                                                    className="h-48 w-full rounded-lg object-cover"
                                                />
                                                {/* Centered marque & modele */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 p-2 text-lg font-semibold text-white">
                                                    {car.marque}
                                                </div>
                                            </div>

                                            <span
                                                className={`absolute right-2 top-2 rounded-full bg-yellow-200 px-3 py-1 text-sm font-medium text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300`}
                                            >
                                                {car.kilometrage} km/h
                                            </span>
                                            {/* Disponibilité Badge */}
                                            {/* <span
                                                className={`absolute right-2 top-2 rounded-full px-3 py-1 text-sm font-medium ${
                                                    car.disponible
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-red-600 text-white'
                                                }`}
                                            >
                                                {car.disponible
                                                    ? 'Disponible de suite'
                                                    : 'Non disponible'}
                                            </span> */}
                                        </div>

                                        <Typography
                                            variant=""
                                            className="mb-2 flex-grow font-bold text-gray-700"
                                        >
                                            {car.modele}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            className="mb-2 flex-grow text-gray-700"
                                        >
                                            {car.description}
                                        </Typography>

                                        {/* Unavailable Dates */}
                                        {/* {car.unavailableDates.length > 0 && (
                                            <div className="my-2 rounded border border-red-300 bg-red-100 p-2">
                                                <span className="font-semibold text-red-600">
                                                    Non disponible du :
                                                </span>
                                                <ul className="list-disc pl-5">
                                                    {car.unavailableDates.map(
                                                        (dateRange, idx) => (
                                                            <li key={idx}>
                                                                {
                                                                    dateRange.start
                                                                }{' '}
                                                                à{' '}
                                                                {dateRange.end}
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            </div>
                                        )} */}

                                        <div className="mt-4 flex w-full items-center justify-between space-x-4">
                                            {auth?.user?.type !== 'admin' && (
                                                <PrimaryButton
                                                    onClick={() => {
                                                        if (
                                                            car.reservationStatus ===
                                                            'en attente'
                                                        ) {
                                                            handleCancelReservation(
                                                                car,
                                                            );
                                                        } else {
                                                            handleOpenModal(
                                                                car,
                                                            );
                                                        }
                                                    }}
                                                    disabled={
                                                        car.isReservedByUser &&
                                                        car.reservationStatus !==
                                                            'en attente'
                                                    }
                                                    className="flex-1"
                                                >
                                                    {car.isReservedByUser
                                                        ? car.reservationStatus ===
                                                          'confirmée'
                                                            ? 'Déjà réservé'
                                                            : 'Annuler la réservation'
                                                        : 'Réserver'}
                                                </PrimaryButton>
                                            )}

                                            <SecondaryButton
                                                onClick={() => {}}
                                                className="flex-1"
                                            >
                                                Voir plus
                                            </SecondaryButton>
                                        </div>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                        {/* Pagination controls */}
                        <div className="mt-6 flex justify-center">
                            {latestVehicles.prev_page_url && (
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        handlePageChange(
                                            latestVehicles.prev_page_url,
                                        )
                                    }
                                >
                                    Précédent
                                </Button>
                            )}
                            {latestVehicles.next_page_url && (
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        handlePageChange(
                                            latestVehicles.next_page_url,
                                        )
                                    }
                                    className="ml-4"
                                >
                                    Suivant
                                </Button>
                            )}

                            {/* {latestVehicles.links()} */}
                        </div>
                    </div>
                </section>
            </div>

            {selectedCar && (
                <ReservationModal
                    open={modalOpen}
                    handleClose={handleCloseModal}
                    car={selectedCar}
                    isAuthenticated={auth.user ? true : false}
                />
            )}
        </GuestLayout>
    );
}
