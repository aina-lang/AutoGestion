import PrimaryButton from '@/Components/PrimaryButton';
import ReservationModal from '@/Components/ReservationModal';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, router, useForm } from '@inertiajs/react';
import SearchIcon from '@mui/icons-material/Search';
import { Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

export default function AllCars({ auth, latestVehicles, categories }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);

    const [query, setQuery] = useState({
        marque: '',
        date_depart: '',
        date_retour: '',
        categorie: '',
    });
    // console.log(latestVehicles);
    // State for pagination (current page and loading status)
    const [loading, setLoading] = useState(false);
    const [cars, setCars] = useState(latestVehicles.data);
    const [page, setPage] = useState(0);
    const listRef = useRef(null);
    // Form state for filters
    const { setData } = useForm({
        marque: '',
        date_depart: '',
        date_retour: '',
        categorie: '',
    });

    const loader = useRef(null);

    // Handle form field changes
    const handleChange = (field, value) => {
        setQuery((prev) => ({ ...prev, [field]: value }));
        setData(field, value); // Also update form data for other purposes
    };

    const handleOpenModal = (car) => {
        setSelectedCar(car);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCar(null);
    };

    const resetFilters = () => {
        setQuery({
            marque: '',
            date_depart: '',
            date_retour: '',
            categorie: '',
        });
        setCars(latestVehicles.data);
        setPage(1); // Reset to the first page
    };

    const [totalPages, setTotalPages] = useState(latestVehicles.last_page);

    // Fonction pour charger plus de voitures
    const loadMoreCars = () => {
        if (loading || page >= totalPages) return; // Ne rien faire si on est déjà en train de charger ou si on est sur la dernière page
        setLoading(true);

        router.get(
            route(route().current()),
            {
                page: page + 1,
                search: query,
            },
            {
                preserveState: true,
                replace: true,
                onSuccess: (data) => {
                    setCars((prevCars) => [
                        ...prevCars,
                        ...data.props.latestVehicles.data,
                    ]);
                    setPage(data.props.latestVehicles.current_page); // Mettre à jour la page actuelle
                    setTotalPages(data.props.latestVehicles.last_page); // Mettre à jour le nombre total de pages
                    setLoading(false);
                },
            },
        );
    };

    // Gérer l'événement de scroll sur l'élément spécifique
    const handleScroll = () => {
        const scrollPosition =
            listRef.current.scrollTop + listRef.current.clientHeight;
        const bottomPosition = listRef.current.scrollHeight;

        // Si on est proche du bas de l'élément et que ce n'est pas encore en train de charger, on charge plus de données
        if (scrollPosition >= bottomPosition - 50 && !loading) {
            loadMoreCars();
        }
    };

    // Écouter le scroll de l'élément spécifique
    useEffect(() => {
        const listElement = listRef.current;
        listElement.addEventListener('scroll', handleScroll);

        return () => {
            listElement.removeEventListener('scroll', handleScroll);
        };
    }, [loading, page, totalPages]);

    return (
        <GuestLayout auth={auth} footerShown={false}>
            <Head title="Ayna lbr - Unlock Your Travel Experience" />

            <div className="flex h-screen justify-start overflow-hidden bg-gray-50 text-gray-800">
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
                                        <MenuItem key={index} value={option.id}>
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
                <section
                    className="mt-12 min-h-screen w-full flex-grow overflow-auto px-12 pb-32"
                    ref={listRef}
                >
                    <div>
                        <h3 className="my-14 text-3xl font-bold">
                            Derniers Véhicules
                        </h3>
                        <Grid container spacing={3}>
                            {cars.map((car, index) => (
                                <Grid item xs={12} sm={6} md={6} key={index}>
                                    <motion.div
                                        className="flex h-full items-center rounded-lg border border-gray-300 bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{
                                            duration: 0.2 * index,
                                        }}
                                    >
                                        {/* Image on the left */}
                                        <div className="relative mr-4 h-48 w-48 overflow-hidden rounded-md">
                                            <img
                                                src={
                                                    '/storage/' +
                                                    JSON.parse(car.images)[0]
                                                }
                                                alt={car.modele}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        {/* Car details on the right */}
                                        <div className="flex h-full flex-grow flex-col justify-between">
                                            <Typography
                                                variant="h6"
                                                className="mb-2 flex justify-between font-bold text-gray-700"
                                            >
                                                <span className="text-gray-800">
                                                    {car.marque}{' '}
                                                </span>{' '}
                                                {car.modele}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                className="mb-2 text-gray-700"
                                            >
                                                {car.description}
                                            </Typography>

                                            <div className="mt-4 flex w-full items-center justify-between space-x-4">
                                                {auth?.user?.type !==
                                                    'admin' && (
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
                                                        className="flex-1"
                                                    >
                                                        {car.reservationStatus ===
                                                        'en attente'
                                                            ? 'Réservation Annulée'
                                                            : 'Réserver'}
                                                    </PrimaryButton>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Infinite scroll loading indicator */}
                        {loading && (
                            <div className="my-8 text-center">
                                <Typography variant="h6">
                                    Chargement des véhicules...
                                </Typography>
                            </div>
                        )}
                    </div>
                </section>
                <div ref={loader} className="h-32"></div>
            </div>

            {selectedCar && (
                <ReservationModal
                    open={modalOpen}
                    handleClose={handleCloseModal}
                    car={selectedCar}
                    isAuthenticated={auth.user ? true : false}
                />
            )}
            {/* Loader trigger */}
        </GuestLayout>
    );
}
