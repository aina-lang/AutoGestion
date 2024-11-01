// Other imports remain the same
import PrimaryButton from '@/Components/PrimaryButton';
import ReservationModal from '@/Components/ReservationModal';
import SecondaryButton from '@/Components/SecondaryButton';
import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    BookOnlineTwoTone,
    CarRentalOutlined,
    EventRounded,
    TravelExplore,
} from '@mui/icons-material';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { ReloadIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { CarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ReactTyped } from 'react-typed';
import banner from '../../assets/images/bgbanner.jpg';
export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    latestVehicles,
    categories,
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedCar, setSelectedCar] = useState(null);
    const { paletteName } = useThemeContext();

    const currentPalette = palette[paletteName];
    // useEffect(() => {
    //     // Récupérer tous les <span> dans le <h2>
    //     const spans = document.querySelectorAll('h2 span');

    //     // Ajouter dynamiquement la classe highlight avec la couleur actuelle
    //     spans.forEach((span) => {
    //         span.classList.add(
    //             `highlight`,
    //             `highlight-[${currentPalette[500]}]`,
    //         );
    //     });
    // }, [currentPalette]);

    const { data, setData, post, processing, errors } = useForm({
        nom: auth?.user ? auth?.user?.nom : '',
        email: auth?.user ? auth?.user?.email : '',
        message: '', // Initialize an array for phone numbers
    });
    const { scrollTo } = usePage().props; // Access the passed data

    useEffect(() => {
        if (scrollTo) {
            const element = document.getElementById(scrollTo); // Get the element by ID
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' }); // Scroll to the element
            }
        }
    }, [scrollTo]);

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.submit'));
    };

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
                        <p className="mx-auto mb-6 p-5 text-gray-200 md:w-1/2 md:p-0">
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
                                <CarRentalOutlined className="mr-2" />
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
                    className="flex min-h-screen items-center bg-gray-100 px-6 py-10"
                >
                    <div className="h-full p-6">
                        <div className="mb-8 text-center">
                            <h2 className="mb-2 mt-24 text-3xl font-bold text-gray-700">
                                NOS MEILLEURS SERVICES
                            </h2>
                            <span className="text-gray-600">
                                Des solutions sur mesure pour vos besoins de
                                location
                            </span>
                        </div>

                        <div
                            className="grid h-full items-center justify-center gap-6 rounded-3xl p-8 py-10 md:grid-cols-3"
                            // style={{ backgroundC}}
                        >
                            {[
                                {
                                    name: 'RÉSERVATION EN LIGNE',
                                    icon: (
                                        <BookOnlineTwoTone
                                            fontSize="large"
                                            className="text-yellow-600"
                                        />
                                    ),
                                    description:
                                        'Notre service de location de voitures en ligne offre une expérience de réservation fluide',
                                },
                                {
                                    name: 'TRANSPORT EN VILLE',
                                    icon: (
                                        <TravelExplore
                                            fontSize="large"
                                            className="text-green-600"
                                        />
                                    ),
                                    description:
                                        'Des services de transport fiables à travers la ville pour votre confort.',
                                },
                                {
                                    name: 'ÉVÉNEMENTS SPÉCIAUX',
                                    icon: (
                                        <EventRounded
                                            fontSize="large"
                                            className="text-purple-600"
                                        />
                                    ),
                                    description:
                                        'Des services de transport personnalisés pour des occasions spéciales.',
                                },
                            ].map((service, index) => (
                                <motion.div
                                    key={index}
                                    className="[border border-gray-300] h-full rounded-lg bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-xl"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.5 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: index * 0.2,
                                    }}
                                >
                                    <div className="mx-auto mb-4 flex w-full items-center justify-center text-center text-5xl">
                                        {service.icon}
                                    </div>
                                    <h3
                                        className="mb-2 text-2xl font-semibold text-gray-700"
                                        // style={{ color: currentPalette[900] }}
                                    >
                                        {service.name}
                                    </h3>
                                    <p className="mb-4 text-gray-600">
                                        {service.description}
                                    </p>
                                    {/* Uncomment if needed */}
                                    {/* <PrimaryButton>
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
                    className="min-h-screen bg-gray-50 p-5 dark:bg-gray-800"
                >
                    <div className="mb-8 text-center">
                        <h2 className="mb-2 mt-12 text-3xl font-bold uppercase text-gray-700">
                            À propos de Vezo Tours
                        </h2>
                        <span className="text-gray-600">
                            Votre partenaire de confiance pour la location de
                            voitures
                        </span>
                    </div>
                    <div className="flex w-full">
                        <div className="p-5 py-10 text-center md:w-1/2 md:text-left">
                            <p className="mb-4 text-gray-700">
                                Fondée en 2020,{' '}
                                <span className="p-2 highlight highlight-amber-500">
                                    Vezo Tours
                                </span>{' '}
                                a été créée par des passionnés de voyages qui
                                souhaitaient offrir une expérience de location
                                de voitures de premier ordre. Depuis nos débuts,
                                nous nous sommes engagés à fournir un service
                                exceptionnel à nos clients.
                            </p>

                            <p className="mb-4 text-gray-700">
                                Notre mission est de rendre vos déplacements
                                aussi agréables que possible. Nous croyons que
                                la qualité de service et la sécurité doivent
                                toujours être nos priorités.
                            </p>

                            <p className="mb-4 text-gray-700">
                                Nous nous engageons à sélectionner uniquement
                                des véhicules de haute qualité, répondant à nos
                                normes strictes de sécurité et de confort.
                            </p>

                            <h3 className="mb-2 mt-3 text-xl font-semibold">
                                Nos Avantages
                            </h3>
                            <ul className="ml-4 space-y-4">
                                <li className="flex items-center">
                                    <CarIcon className="mr-2 text-blue-500" />{' '}
                                    {/* Remplacez par l'icône appropriée */}
                                    <span>
                                        Véhicules fiables et bien entretenus
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <CarIcon className="mr-2 text-blue-500" />{' '}
                                    {/* Remplacez par l'icône appropriée */}
                                    <span>
                                        Assurance complète pour votre
                                        tranquillité d'esprit
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <CarIcon className="mr-2 text-blue-500" />{' '}
                                    {/* Remplacez par l'icône appropriée */}
                                    <span>
                                        Service client exceptionnel 24/7
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <CarIcon className="mr-2 text-blue-500" />{' '}
                                    {/* Remplacez par l'icône appropriée */}
                                    <span>
                                        Réservation facile et rapide en ligne
                                    </span>
                                </li>
                            </ul>
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
                                src={banner} // Remplacez par l'URL de votre image
                                alt="À propos de nous"
                                className="h-auto w-full rounded-lg shadow-md"
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
                        <div className="mb-12 text-center">
                            <h2 className="mb-2 mt-24 text-center text-3xl font-bold text-gray-700">
                                NOS VOITURES RÉCENTES
                            </h2>
                            <span className="text-gray-600">
                                Découvrez notre flotte moderne et bien
                                entretenue
                            </span>
                        </div>

                        <Grid container spacing={3}>
                            {latestVehicles.map((car, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <motion.div
                                        className="flex h-full flex-col rounded-lg bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
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
                                                className={`absolute left-0 top-0 rounded-full px-3 py-1 text-sm font-medium text-white dark:bg-yellow-800 dark:text-yellow-300`}
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
                                                    // disabled={
                                                    //     car.isReservedByUser &&
                                                    //     car.reservationStatus !==
                                                    //         'en attente'
                                                    // }
                                                    className="flex-1"
                                                >
                                                    {/* {car.isReservedByUser
                                                        ? car.reservationStatus ===
                                                          'confirmée'
                                                            ? 'Déjà réservé'
                                                            : 'Annuler la réservation'
                                                        : 'Réserver'} */}
                                                    Réserver
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
                                                isSticky={true}
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
                            isSticky={true}
                        >
                            <ReloadIcon className='mr-2' />
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
                        <h2 className="mb-2 text-center text-3xl font-bold text-gray-700 dark:text-white">
                            CONTACTEZ-NOUS
                        </h2>
                        <p className="mb-4 text-center text-gray-700 dark:text-gray-300">
                            Pour toute question ou information supplémentaire,
                            n'hésitez pas à nous contacter. Notre équipe est à
                            votre disposition pour vous aider.
                        </p>
                        <div className="mt-2 flex flex-col items-center md:flex-row">
                            <form
                                className="mx-auto mt-6 w-full rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900 md:w-1/2"
                                onSubmit={submit}
                            >
                                <TextField
                                    fullWidth
                                    label="Nom"
                                    variant="outlined"
                                    value={data.nom}
                                    sx={{ marginBottom: 2 }}
                                    onChange={(e) =>
                                        setData('nom', e.target.value)
                                    }
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={data.email}
                                    sx={{ marginBottom: 2 }}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                />
                                <TextField
                                    fullWidth
                                    label="Message"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    sx={{ marginBottom: 2 }}
                                    value={data.message}
                                    onChange={(e) =>
                                        setData('message', e.target.value)
                                    }
                                />
                                <PrimaryButton
                                    type="submit"
                                    className="w-full"
                                    disabled={auth?.user?.type == 'admin'}
                                >
                                    {auth?.user?.type == 'admin'
                                        ? "vous etes l'administrateur "
                                        : ' Envoyer'}
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
                <footer className="text-surface flex flex-col items-center bg-zinc-100 text-center dark:bg-neutral-700 dark:text-white lg:text-left">
                    <div className="container p-6">
                        <div className="grid place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Contact Information */}
                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase">
                                    Contact
                                </h5>
                                <ul className="mb-0 list-none">
                                    <li>
                                        <span>Email: </span>
                                        <a href="mailto:contact@aynalbr.com">
                                            contact@aynalbr.com
                                        </a>
                                    </li>
                                    <li>
                                        <span>Phone: </span>
                                        <a href="tel:+123456789">
                                            +123 456 789
                                        </a>
                                    </li>
                                    <li>
                                        <span>Address: </span>
                                        <p>123 Ayna Street, City, Country</p>
                                    </li>
                                </ul>
                            </div>

                            {/* Social Media Links */}
                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase">
                                    Follow Us
                                </h5>
                                <ul className="mb-0 list-none">
                                    <li>
                                        <a
                                            href="https://www.facebook.com/aynalbr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.twitter.com/aynalbr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Twitter
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.instagram.com/aynalbr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="https://www.linkedin.com/company/aynalbr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Quick Links */}
                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase">
                                    Quick Links
                                </h5>
                                <ul className="mb-0 list-none">
                                    <li>
                                        <a href="#home">Home</a>
                                    </li>
                                    <li>
                                        <a href="#about">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#services">Services</a>
                                    </li>
                                    <li>
                                        <a href="#contact">Contact</a>
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
