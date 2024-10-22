// Other imports remain the same
import PrimaryButton from '@/Components/PrimaryButton';
import ReservationModal from '@/Components/ReservationModal';
import SecondaryButton from '@/Components/SecondaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, router } from '@inertiajs/react';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import {
    SpaceEvenlyVerticallyIcon,
    TransformIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { AlignVerticalDistributeCenterIcon } from 'lucide-react';
import React, { useState } from 'react';
import { ReactTyped } from 'react-typed';
import banner from '../../assets/images/bgbanner.jpg';
export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    latestVehicles,
    categories,
}) {
    console.log(latestVehicles);

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const handleOpenModal = (car) => {
        setSelectedCar(car);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedCar(null);
    };

    const handleCancelReservation = async (car) => {};
    return (
        <GuestLayout auth={auth}>
            <Head title="Vezo Tours - Unlock Your Travel Experience" />
            <div className="overflow-x-hidden bg-gray-100 text-gray-800">
                {/* Hero Section with ReactTyped */}
                <main
                    id="home"
                    className="relative flex min-h-screen items-center bg-cover bg-center md:p-10"
                    style={{ backgroundImage: `url(${banner})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <div className="z-10 text-center">
                        <h1 className="mb-4 text-xl font-bold text-white md:text-5xl">
                            <ReactTyped
                                strings={[
                                    'TROUVEZ FACILEMENT UNE VOITURE',
                                    'VOYAGEZ PARTOUT A MADAGASCAR',
                                ]}
                                typeSpeed={100}
                                loop
                                backSpeed={50}
                                cursorChar="|"
                                showCursor={true}
                            />
                        </h1>
                        <p className="mx-auto mb-6 p-5 text-gray-300 md:w-1/2 md:p-0">
                            Notre plateforme vous permet de réserver rapidement
                            et simplement une voiture pour vos déplacements à
                            travers tout Madagascar. Que ce soit pour un voyage
                            d'affaires, des vacances ou une simple escapade,
                            nous avons la solution idéale pour répondre à vos
                            besoins. Avec un large choix de véhicules et des
                            options flexibles
                        </p>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.5 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                            }}
                        >
                            <PrimaryButton
                                onClick={() => {
                                    router.visit('allcars');
                                }}
                            >
                                réserver maintenant
                            </PrimaryButton>
                        </motion.div>
                    </div>

                    <section className="absolute -bottom-12 left-0 right-0 mx-auto hidden w-full justify-center md:flex">
                        <div className="flex items-center justify-center rounded-md bg-white px-6 py-5 pr-0 shadow-xl">
                            <form>
                                <Grid className="grid grid-cols-4 justify-center gap-4">
                                    <div className="flex">
                                        {' '}
                                        <Grid item xs={12} md={3}>
                                            <TextField
                                                fullWidth
                                                label="Date de départ"
                                                type="date"
                                                variant="standard"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    style: {
                                                        outline: 'none',
                                                    },
                                                }}
                                                className="text-gray-800" // Additional class for text color
                                            />
                                        </Grid>
                                        <div className="mx-5 hidden border-l border-gray-300 md:block" />{' '}
                                    </div>
                                    <div className="flex">
                                        {/* Separator */}
                                        <Grid item xs={12} md={3}>
                                            <TextField
                                                fullWidth
                                                label="Date de retour"
                                                type="date"
                                                variant="standard"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                InputProps={{
                                                    disableUnderline: true,
                                                    style: {
                                                        outline: 'none',
                                                    },
                                                }}
                                                className="text-gray-800"
                                            />
                                        </Grid>
                                        <div className="mx-5 hidden border-l border-gray-300 md:block" />{' '}
                                    </div>{' '}
                                    {/* Separator */}
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Catégorie de voiture"
                                            select
                                            variant="standard"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                                style: {
                                                    outline: 'none',
                                                },
                                            }}
                                            className="text-gray-800"
                                        >
                                            {categories.map((option, index) => (
                                                <MenuItem
                                                    key={index}
                                                    selected={index == 0}
                                                    value={option.value}
                                                >
                                                    {option.nom}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    {/* Separator */}
                                    <Grid
                                        item
                                        xs={12}
                                        md={2}
                                        className="flex items-center justify-center"
                                    >
                                        <PrimaryButton className="mt-4 h-full md:mt-0">
                                            Rechercher
                                        </PrimaryButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </div>
                    </section>
                </main>
                {/* Section des Services */}
                <section
                    id="service"
                    className="flex min-h-screen items-center bg-white px-10"
                >
                    <div className="p-6">
                        <h2 className="mb-8 mt-24 text-center text-3xl font-bold">
                            NOS MEILLEURS SERVICES POUR VOUS
                        </h2>
                        <div className="grid items-center justify-center gap-10 md:grid-cols-3">
                            {[
                                {
                                    name: 'RÉSERVATION EN LIGNE',
                                    icon: (
                                        <AlignVerticalDistributeCenterIcon fontSize="large" />
                                    ),
                                    description:
                                        'Notre service de location de voitures en ligne offre une expérience de réservation fluide...',
                                },
                                {
                                    name: 'TRANSPORT EN VILLE',
                                    icon: <TransformIcon fontSize="large" />,
                                    description:
                                        'Des services de transport fiables à travers la ville pour votre confort.',
                                },
                                {
                                    name: 'ÉVÉNEMENTS SPÉCIAUX',
                                    icon: (
                                        <SpaceEvenlyVerticallyIcon fontSize="large" />
                                    ),
                                    description:
                                        'Des services de transport personnalisés pour des occasions spéciales.',
                                },
                            ].map((service, index) => (
                                <motion.div
                                    key={index}
                                    className="rounded-lg border bg-white p-6 text-center shadow-lg"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.2,
                                    }}
                                >
                                    <div className="mx-auto mb-4 flex w-full items-center justify-center text-center">
                                        {service.icon}
                                    </div>
                                    <h3 className="mb-2 text-xl font-semibold">
                                        {service.name}
                                    </h3>
                                    <p className="mb-4 text-gray-600">
                                        {service.description}
                                    </p>
                                    {/* <PrimaryButton >
                        Voir plus
                    </PrimaryButton> */}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section
                    id="about"
                    className="min-h-screen bg-gray-50 p-10 dark:bg-gray-800"
                >
                    <div className="mt-24">
                        <h2 className="mb-8 text-center text-3xl font-bold">
                            À PROPOS DE NOUS
                        </h2>
                    </div>
                    <div className="flex w-full">
                        <div className="p-5 text-center md:w-1/2 md:text-left">
                            <p className="mb-4 text-gray-700">
                                Vezo Tours est votre partenaire de confiance
                                pour la location de voitures, offrant un service
                                de qualité supérieure et des véhicules fiables
                                pour rendre votre expérience de voyage
                                inoubliable.
                            </p>
                            <p className="text-gray-700">
                                Notre mission est de rendre vos déplacements
                                faciles et accessibles, tout en garantissant
                                votre confort et votre sécurité. Vezo Toursest
                                votre partenaire de confiance pour la location
                                de voitures, offrant un service de qualité
                                supérieure et des véhicules fiables pour rendre
                                votre expérience de voyage inoubliable. Ayna lbr
                                est votre partenaire de confiance pour la
                                location de voitures, offrant un service de
                                qualité supérieure et des véhicules fiables pour
                                rendre votre expérience de voyage inoubliable.
                                Vezo Toursest votre partenaire de confiance pour
                                la location de voitures, offrant un service de
                                qualité supérieure et des véhicules fiables pour
                                rendre votre expérience de voyage inoubliable.
                            </p>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.5,
                            }}
                            className="hidden w-1/2 p-5 md:flex"
                        >
                            <img
                                src={banner} // Replace with your actual image URL
                                alt="A propos de nous"
                                className="h-auto w-full rounded-lg shadow-md" // Add styling as needed
                            />
                        </motion.div>
                    </div>
                </section>

                {/* Available Cars Section */}
                <section
                    className="min-h-screen bg-gray-50 px-12 py-10"
                    id="cars"
                >
                    <div>
                        <h2 className="my-14 mt-0 text-center text-3xl font-bold text-gray-800">
                            VOITURES RECENTES
                        </h2>
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
                                                onClick={() => {
                                                    router.visit(
                                                        route(
                                                            'cars.show',
                                                            car.id,
                                                        ),
                                                    );
                                                }}
                                                className="flex-1"
                                            >
                                                Voir plus
                                            </SecondaryButton>
                                        </div>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                    <div className="mx-auto mt-8 flex items-center justify-center">
                        <SecondaryButton
                            onClick={() => {
                                router.visit('allcars');
                            }}
                        >
                            Voir plus
                        </SecondaryButton>
                    </div>
                </section>

                {/* Contact Section */}
                <section
                    id="contact"
                    className="flex min-h-screen items-center justify-center bg-gray-50 px-10 py-10 dark:bg-gray-800"
                >
                    <div className="w-full">
                        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
                            CONTACTEZ-NOUS
                        </h2>
                        <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
                            Pour toute question ou information supplémentaire,
                            n'hésitez pas à nous contacter. Notre équipe est à
                            votre disposition pour vous aider.
                        </p>
                        <div className="mt-2 flex flex-col items-center md:flex-row">
                            <form className="mx-auto mt-6 w-full rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900 md:w-1/2">
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    variant="outlined"
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    fullWidth
                                    label="Message"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    sx={{ marginBottom: 2 }}
                                />
                                <PrimaryButton type="submit" className="w-full">
                                    Envoyer
                                </PrimaryButton>
                            </form>
                            <div className="mt-6 w-full md:ml-6 md:mt-0 md:w-1/2">
                                {/* <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509849!2d144.95373631531612!3d-37.81720997975141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0d4993%3A0x5045675218ceed30!2sYour%20Location!5e0!3m2!1sen!2sus!4v1614682410000!5m2!1sen!2sus" // Replace with your Google Maps iframe URL
                                    width="100%"
                                    height="350"
                                    className="rounded-lg shadow-md"
                                    allowFullScreen=""
                                    loading="lazy"
                                    title="Google Maps Location"
                                ></iframe> */}
                            </div>
                        </div>
                    </div>
                </section>

                {selectedCar && (
                    <ReservationModal
                        open={modalOpen}
                        handleClose={handleCloseModal}
                        car={selectedCar}
                        isAuthenticated={auth.user ? true : false}
                    />
                )}

                <footer className="text-surface flex flex-col items-center bg-zinc-50 text-center dark:bg-neutral-700 dark:text-white lg:text-left">
                    <div className="container p-6">
                        <div className="grid place-items-center md:grid-cols-2 lg:grid-cols-4">
                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase">
                                    Links
                                </h5>

                                <ul className="mb-0 list-none">
                                    <li>
                                        <a href="#!">Link 1</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 2</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 3</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 4</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase">
                                    Links
                                </h5>

                                <ul className="mb-0 list-none">
                                    <li>
                                        <a href="#!">Link 1</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 2</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 3</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 4</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase">
                                    Links
                                </h5>

                                <ul className="mb-0 list-none">
                                    <li>
                                        <a href="#!">Link 1</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 2</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 3</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 4</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase">
                                    Links
                                </h5>

                                <ul className="mb-0 list-none">
                                    <li>
                                        <a href="#!">Link 1</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 2</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 3</a>
                                    </li>
                                    <li>
                                        <a href="#!">Link 4</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-black/5 p-4 text-center">
                        &copy; {new Date().getFullYear()} Ayna lbr. Tous droits
                        réservés.
                    </div>
                </footer>
            </div>
        </GuestLayout>
    );
}
