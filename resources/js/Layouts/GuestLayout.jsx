import ApplicationLogo from '@/Components/ApplicationLogo';
import ConfirmModal from '@/Components/ConfirmModal';
import PrimaryButton from '@/Components/PrimaryButton';
import { ScrollToTopButton } from '@/Components/ScrollToTopButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Settings from '@/Components/Settings';
import UserDropdown from '@/Components/UserDropdown';
import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';
import { router, useForm, usePage } from '@inertiajs/react';
import {
    Email,
    Facebook,
    Instagram,
    LinkedIn,
    LocationOn,
    Phone,
    Twitter,
} from '@mui/icons-material';
import { Alert, Menu, MenuItem, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const GuestLayout = ({ children, auth, footerShown }) => {
    const [isSticky, setSticky] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { flash, serviceTypes } = usePage().props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [activeLink, setActiveLink] = useState('home');
    const { post } = useForm();
    const { paletteName } = useThemeContext();
    console.log(serviceTypes);
    const currentPalette = palette[paletteName];
    const [isSidebarOpen, setSidebarOpen] = useState(false); // State for controlling sidebar visibility

    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    useEffect(() => {
        const currentURL = window.location.href;

        if (currentURL !== `${window.location.origin}/`) {
            setSticky(true);
        } else {
            setSticky(false);
        }
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentURL = route().current('home');

            console.log(route().current());

            if (currentURL) {
                setSticky(window.scrollY > 50);
            } else if (route().current('prestations')) {
                setActiveLink('prestations');
            } else {
                setSticky(true);
            }

            const sections = ['home', 'service', 'about', 'cars', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
                        setActiveLink(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (flash && (flash.success || flash.error)) {
            setMessage(flash.success || flash.error);
            setSeverity(flash.success ? 'success' : 'error');
            setOpen(true);
        }
    }, [flash]);

    const handleClose = () => {
        setOpen(false);
    };

    const toggleMenu = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        setConfirmModal(!confirmModal);
    };

    const links = [
        { href: 'home', label: 'Accueil' },
        { href: 'service', label: 'Services' },
        { href: 'about', label: 'À propos' },
        { href: 'cars', label: 'Véhicules' },
        { href: 'contact', label: 'Contact' },
    ];

    const scrollToSection = (id) => {
        const currentURL = route().current('home');
        if (currentURL) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.visit('/', {
                data: { scrollTo: id },
                preserveScroll: false,
            });
        }

        setMenuOpen(false);
    };

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 sm:pt-0">
            <motion.header
                initial={{ y: -50 }}
                animate={{ y: isSticky ? 0 : -10 }}
                transition={{ type: 'tween', duration: 0.5 }}
                className={`fixed top-0 z-50 flex w-full items-center justify-center ${
                    isSticky
                        ? 'bg-white shadow-md dark:bg-gray-900'
                        : 'bg-transparent'
                } px-6 py-4 dark:text-white`}
            >
                <ApplicationLogo
                    className="mr-8 hidden md:flex"
                    isSticky={isSticky}
                />
                <div className="flex w-full items-center">
                    <nav className="mx-auto hidden md:flex">
                        {links.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={`relative px-4 py-2 transition-all duration-300 ${activeLink === link.href ? 'font-bold' : isSticky ? 'text-gray-600' : 'text-white'} dark:text-white dark:hover:text-gray-300`}
                                style={{
                                    color:
                                        activeLink === link.href
                                            ? currentPalette[500]
                                            : isSticky
                                              ? palette['gray'][600]
                                              : 'white',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.color = currentPalette[400]; // Change to desired hover color
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.color =
                                        activeLink === link.href
                                            ? currentPalette[500]
                                            : isSticky
                                              ? palette['gray'][600]
                                              : 'white';
                                }}
                            >
                                {link.label}
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 w-full scale-x-0 rounded-full transition-transform duration-300 ease-in-out ${
                                        activeLink === link.href
                                            ? 'scale-x-100'
                                            : ''
                                    }`}
                                    style={{
                                        backgroundColor: currentPalette[500],
                                    }}
                                ></span>
                            </button>
                        ))}

                        {serviceTypes?.length > 0 && (
                            <div>
                                <button
                                    onClick={handleOpenMenu}
                                    className={`flex items-center px-4 py-2 transition-all duration-300 ${activeLink === 'prestations' ? 'font-bold' : isSticky ? 'text-gray-600' : 'text-white'} dark:text-white dark:hover:text-gray-300`}
                                    style={{
                                        color:
                                            activeLink === 'prestations'
                                                ? currentPalette[500]
                                                : isSticky
                                                  ? palette['gray'][600]
                                                  : 'white',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color =
                                            currentPalette[400]; // Change to desired hover color
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color =
                                            activeLink === '#'
                                                ? currentPalette[500]
                                                : isSticky
                                                  ? palette['gray'][600]
                                                  : 'white';
                                    }}
                                >
                                    Prestations de services
                                    {isMenuOpen ? (
                                        <ChevronUp className="ml-2" />
                                    ) : (
                                        <ChevronDown className="ml-2" />
                                    )}
                                </button>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={isMenuOpen}
                                    onClose={handleCloseMenu}
                                    PaperProps={{
                                        style: {
                                            boxShadow: 'none',
                                            border: 'none',
                                        },
                                    }}
                                    className="mt-2 w-full"
                                >
                                    {serviceTypes?.map((service, index) => (
                                        <MenuItem
                                            key={index}
                                            onClick={() => {
                                                router.visit('/prestations', {
                                                    data: {
                                                        scrollTo: service.id,
                                                    }, // Pass the service ID to the new page
                                                    preserveScroll: false,
                                                });
                                            }}
                                        >
                                            {service.nom}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                        )}
                    </nav>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6 text-white dark:text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Settings isGuest isSticky={isSticky} />
                    {!auth?.user ? (
                        <>
                            <PrimaryButton
                                onClick={() => router.visit('/login')}
                                className="bg-gray-800 dark:bg-gray-900 dark:text-white"
                            >
                                Se connecter
                            </PrimaryButton>
                            <SecondaryButton
                                onClick={() => router.visit('/register')}
                                isSticky={isSticky}
                                className="bg-gray-800 dark:bg-gray-900 dark:text-white"
                            >
                                S'inscrire
                            </SecondaryButton>
                        </>
                    ) : (
                        <UserDropdown
                            auth={auth}
                            handleLogout={handleLogout}
                            menuItems={[
                                {
                                    label: 'Tableau de bord',
                                    action: () =>
                                        router.visit(
                                            auth.user.type == 'admin'
                                                ? '/admin/dashboard'
                                                : '/client/dashboard',
                                        ),
                                },
                                {
                                    label: 'Profil',
                                    action: () => router.visit('/profil'),
                                },
                                {
                                    label: 'Paramètres',
                                    action: () => router.visit('/parametres'),
                                },
                                {
                                    label: 'Aide',
                                    action: () => router.visit('/aide'),
                                },
                            ]}
                        />
                    )}
                </div>
            </motion.header>

            <main>{children}</main>

            <ScrollToTopButton />

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>

            <ConfirmModal
                open={confirmModal}
                onClose={() => setConfirmModal(false)}
                title="Déconnexion"
                content="Êtes-vous sûr de vouloir vous déconnecter ?"
                onConfirm={() => {
                    post(route('logout'));
                    setConfirmModal(false);
                }}
            />

            {footerShown && (
                <footer className="flex flex-col items-center bg-gray-100 text-center text-gray-800 dark:bg-gray-700 dark:text-gray-300 lg:text-left">
                    <div className="container p-6">
                        <div className="grid place-items-center gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* Informations de Contact */}
                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase text-gray-900 dark:text-gray-200">
                                    Contact
                                </h5>
                                <ul className="mb-0 list-none">
                                    <li className="flex items-center space-x-2">
                                        <Email />
                                        <span>Email :</span>
                                        <a
                                            href="mailto:contact@aynalbr.com"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            contact@aynalbr.com
                                        </a>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <Phone />
                                        <span>Téléphone :</span>
                                        <a
                                            href="tel:+123456789"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            +123 456 789
                                        </a>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <LocationOn />
                                        <span>Adresse :</span>
                                        <p>123 Rue Ayna, Ville, Pays</p>
                                    </li>
                                </ul>
                            </div>

                            {/* Liens des réseaux sociaux */}
                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase text-gray-900 dark:text-gray-200">
                                    Suivez-nous
                                </h5>
                                <ul className="mb-0 list-none space-y-2">
                                    <li className="flex items-center space-x-2">
                                        <Facebook />
                                        <a
                                            href="https://www.facebook.com/aynalbr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            Facebook
                                        </a>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <Twitter />
                                        <a
                                            href="https://www.twitter.com/aynalbr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            Twitter
                                        </a>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <Instagram />
                                        <a
                                            href="https://www.instagram.com/aynalbr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            Instagram
                                        </a>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <LinkedIn />
                                        <a
                                            href="https://www.linkedin.com/company/aynalbr"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            LinkedIn
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Liens Rapides */}
                            <div className="mb-6">
                                <h5 className="mb-2.5 font-bold uppercase text-gray-900 dark:text-gray-200">
                                    Liens rapides
                                </h5>
                                <ul className="mb-0 list-none space-y-2">
                                    <li>
                                        <a
                                            href="#home"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            Accueil
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#about"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            À Propos
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#services"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            Services
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#contact"
                                            className="text-blue-700 dark:text-blue-300"
                                        >
                                            Contact
                                        </a>
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
            )}

            {/* <CookieConsent /> */}
        </div>
    );
};

export default GuestLayout;
