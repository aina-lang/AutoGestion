// Other imports remain the same
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Box,
    Grid,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {
    SpaceEvenlyVerticallyIcon,
    TransformIcon,
} from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import {
    AlignVerticalDistributeCenterIcon,
    Facebook,
    Instagram,
    Linkedin,
    Twitter,
} from 'lucide-react';
import React from 'react';
import { ReactTyped } from 'react-typed';
import banner from '../../assets/images/bgbanner.jpg';
export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    latestVehicles,
    categories,
}) {
    // console.log(auth.user.type );
    return (
        <GuestLayout auth={auth}>
            <Head title="Ayna lbr - Unlock Your Travel Experience" />
            <div className="overflow-x-hidden bg-gray-100 text-gray-800">
                {/* Hero Section with ReactTyped */}
                <main
                    id="home"
                    className="relative flex min-h-screen items-center bg-cover bg-center p-10"
                    style={{ backgroundImage: `url(${banner})` }}
                >
                    <div className="absolute inset-0 bg-black opacity-50" />
                    <div className="z-10 text-center">
                        <h1 className="mb-4 text-5xl font-bold text-white">
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
                        <p className="mx-auto mb-6 w-1/2 text-gray-300">
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
                    {/* <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, amount: 0.5 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                        }}
                        className="z-30 w-1/2 p-5"
                    >
                        <img
                            src={banner} // Replace with your actual image URL
                            alt="A propos de nous"
                            className="h-auto w-full rounded-lg shadow-md" // Add styling as needed
                        />
                    </motion.div> */}
                    <section className="absolute -bottom-12 left-0 right-0 mx-auto w-full max-w-4xl">
                        <Paper
                            elevation={3}
                            className="bg-blue-900 px-6 py-5 text-white"
                        >
                            <form>
                                <Grid
                                    container
                                    spacing={4}
                                    justifyContent="space-between items-center"
                                    className="pr-5"
                                >
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            fullWidth
                                            label="Date de départ"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className="text-gray-800"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <TextField
                                            fullWidth
                                            label="Date de retour"
                                            type="date"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            className="text-gray-800"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField
                                            fullWidth
                                            label="Catégorie de voiture"
                                            select
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
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
                                    <Grid
                                        item
                                        xs={12}
                                        md={2}
                                        className="mr-5 items-center"
                                    >
                                        <PrimaryButton className="mr-5 mt-4 h-full md:mt-0">
                                            Rechercher
                                        </PrimaryButton>
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </section>
                </main>
                {/* Section des Services */}
                <section
                    id="service"
                    className="flex min-h-screen items-center bg-white px-10"
                >
                    <div className="">
                        <h2 className="mb-8 mt-24 text-center text-3xl font-bold">
                            NOS MEILLEURS SERVICES POUR VOUS
                        </h2>
                        <div className="grid grid-cols-3 items-center justify-center gap-10">
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
                    className="mb-10 min-h-screen bg-gray-50 p-10 dark:bg-gray-800"
                >
                    <div className="mt-24">
                        <h2 className="mb-8 text-center text-3xl font-bold">
                            À PROPOS DE NOUS
                        </h2>
                    </div>
                    <div className="flex w-full">
                        <div className="w-1/2 p-5">
                            <p className="mb-4 text-gray-700">
                                Ayna lbr est votre partenaire de confiance pour
                                la location de voitures, offrant un service de
                                qualité supérieure et des véhicules fiables pour
                                rendre votre expérience de voyage inoubliable.
                            </p>
                            <p className="text-gray-700">
                                Notre mission est de rendre vos déplacements
                                faciles et accessibles, tout en garantissant
                                votre confort et votre sécurité. Ayna lbr est
                                votre partenaire de confiance pour la location
                                de voitures, offrant un service de qualité
                                supérieure et des véhicules fiables pour rendre
                                votre expérience de voyage inoubliable. Ayna lbr
                                est votre partenaire de confiance pour la
                                location de voitures, offrant un service de
                                qualité supérieure et des véhicules fiables pour
                                rendre votre expérience de voyage inoubliable.
                                Ayna lbr est votre partenaire de confiance pour
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
                            className="w-1/2 p-5"
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
                <section className="min-h-screen px-12" id="cars">
                    <div>
                        <h2 className="my-14 text-center text-3xl font-bold">
                            VOITURES DISPONIBLES
                        </h2>
                        <Grid container spacing={3}>
                            {latestVehicles.map((car, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <motion.div
                                        className="flex h-full flex-col rounded-lg border bg-white p-4 shadow-lg"
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: false, amount: 0.5 }}
                                        transition={{
                                            duration: 0.2 * index,
                                        }}
                                    >
                                        <div className="relative mb-2">
                                            {/* Display image */}
                                            <div className="relative h-48 overflow-hidden rounded-md">
                                                <img
                                                    src={
                                                        '/storage/' +
                                                        car.images[0]
                                                    }
                                                    alt={car.modele}
                                                    className="mb-4 h-48 w-full rounded-lg object-cover"
                                                />

                                                {/* Centered marque & modele */}
                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-lg font-semibold text-white">
                                                    {car.marque} {car.modele}
                                                </div>
                                            </div>

                                            {/* Disponibilité Badge */}
                                            <span
                                                className={`absolute right-2 top-2 rounded-full px-3 py-1 text-sm font-medium ${
                                                    car.disponible
                                                        ? 'bg-green-600 text-white'
                                                        : 'bg-red-600 text-white'
                                                }`}
                                            >
                                                {car.disponible
                                                    ? 'Disponible'
                                                    : 'Non disponible'}
                                            </span>
                                        </div>

                                        <Typography
                                            variant="body2"
                                            className="my-2 text-gray-600"
                                        >
                                            Prix journalier:{' '}
                                            <strong>
                                                {car.prix_journalier} Ar
                                            </strong>
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            className="mb-2 text-gray-600"
                                        >
                                            Kilométrage:{' '}
                                            <strong>
                                                {car.kilometrage} km
                                            </strong>
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            className="flex-grow text-gray-600"
                                        >
                                            {car.description}
                                        </Typography>

                                        <div className="mt-4 flex w-full items-center justify-between space-x-4">
                                            {auth?.user?.type !== 'admin' && (
                                                <PrimaryButton
                                                    onClick={() =>
                                                        handleOpenModal(car)
                                                    }
                                                    disabled={
                                                        car.isReservedByUser
                                                    }
                                                >
                                                    {car.isReservedByUser
                                                        ? 'Déjà réservé'
                                                        : 'Réserver'}
                                                </PrimaryButton>
                                            )}
                                            <SecondaryButton onClick={() => {}}>
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
                    className="my-10 flex min-h-screen items-center justify-center bg-gray-50 px-10 dark:bg-gray-800"
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

                <footer className="bg-gray-800 py-8 text-white">
                    <Box
                        sx={{
                            maxWidth: 1200,
                            mx: 'auto',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}
                    >
                        {/* Left Section */}
                        <Box
                            sx={{
                                flex: 1,
                                minWidth: '300px',
                                textAlign: 'left',
                                mb: 2,
                            }}
                        >
                            <Typography variant="body2" gutterBottom>
                                <strong>Adresse:</strong> 123 Rue Exemple,
                                Ville, Pays
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <strong>Téléphone:</strong> +123 456 7890
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <strong>Email:</strong>{' '}
                                <Link
                                    href="mailto:contact@ayna.com"
                                    color="inherit"
                                    underline="hover"
                                >
                                    contact@ayna.com
                                </Link>
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                <strong>Siège Social:</strong> 456 Rue
                                Entreprise, Ville, Pays
                            </Typography>
                        </Box>

                        {/* Right Section */}
                        <Box
                            sx={{
                                flex: 1,
                                minWidth: '300px',
                                textAlign: 'right',
                                mb: 2,
                            }}
                        >
                            <Typography variant="body2" gutterBottom>
                                &copy; {new Date().getFullYear()} Ayna lbr. Tous
                                droits réservés.
                            </Typography>
                            <Link
                                href="/privacy-policy"
                                color="inherit"
                                underline="hover"
                            >
                                Politique de confidentialité
                            </Link>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    mt: 2,
                                }}
                            >
                                <Link
                                    href="https://www.facebook.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit', mx: 1 }}
                                >
                                    <Facebook />
                                </Link>
                                <Link
                                    href="https://www.twitter.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit', mx: 1 }}
                                >
                                    <Twitter />
                                </Link>
                                <Link
                                    href="https://www.instagram.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit', mx: 1 }}
                                >
                                    <Instagram />
                                </Link>
                                <Link
                                    href="https://www.linkedin.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{ color: 'inherit', mx: 1 }}
                                >
                                    <Linkedin />
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </footer>
            </div>
        </GuestLayout>
    );
}
