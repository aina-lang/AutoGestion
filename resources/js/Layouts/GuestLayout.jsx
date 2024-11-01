import ApplicationLogo from '@/Components/ApplicationLogo';
import ConfirmModal from '@/Components/ConfirmModal';
import PrimaryButton from '@/Components/PrimaryButton';
import { ScrollToTopButton } from '@/Components/ScrollToTopButton';
import SecondaryButton from '@/Components/SecondaryButton';
import UserDropdown from '@/Components/UserDropdown';
import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';
import { router, useForm, usePage } from '@inertiajs/react';
import { Alert, Menu, MenuItem, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Fullscreen, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const GuestLayout = ({ children, auth }) => {
    const [isSticky, setSticky] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { flash } = usePage().props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [activeLink, setActiveLink] = useState('home');
    const { post } = useForm();
    const { paletteName } = useThemeContext();

    const currentPalette = palette[paletteName];

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

            console.log(currentURL);
            if (currentURL) {
                setSticky(window.scrollY > 50);
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
                    isSticky ? 'bg-white shadow-md' : 'bg-transparent'
                } px-6 py-4`}
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
                                className={`relative px-4 py-2 transition-all duration-300 ${activeLink === link.href ? 'font-bold' : isSticky ? 'text-gray-600' : 'text-white'}`}
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
                        <div>
                            <button
                                onClick={handleOpenMenu}
                                className={`flex items-center px-4 py-2 transition-all duration-300 ${activeLink === '#' ? 'font-bold' : isSticky ? 'text-gray-600' : 'text-white'}`}
                                style={{
                                    color:
                                        activeLink === '#'
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
                                <MenuItem
                                    onClick={() => scrollToSection('service1')}
                                >
                                    Service 1
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('service2')}
                                >
                                    Service 2
                                </MenuItem>
                                <MenuItem
                                    onClick={() => scrollToSection('service3')}
                                >
                                    Service 3
                                </MenuItem>
                            </Menu>
                        </div>
                    </nav>
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
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
                    <button className="rounded-full p-2 focus:outline-none">
                        <Sun className="h-5 w-5 text-yellow-500" />
                    </button>
                    <button className="hidden rounded-full p-2 focus:outline-none md:flex">
                        <Fullscreen
                            className={`h-5 w-5 ${isSticky ? 'text-gray-600' : 'text-white'}`}
                        />
                    </button>
                    {!auth?.user ? (
                        <>
                            <PrimaryButton
                                onClick={() => router.visit('/login')}
                            >
                                Se connecter
                            </PrimaryButton>
                            <SecondaryButton
                                onClick={() => router.visit('/register')}
                                isSticky={isSticky}
                            >
                                S'inscrire
                            </SecondaryButton>
                        </>
                    ) : (
                        <UserDropdown
                            auth={auth}
                            handleLogout={handleLogout}
                            menuItems={[
                                { label: 'Profil', action: () => {} },
                                { label: 'Paramètres', action: () => {} },
                                { label: 'Aide', action: () => {} },
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
                message="Êtes-vous sûr de vouloir vous déconnecter ?"
                onConfirm={() => {
                    post(route('logout'));
                    setConfirmModal(false);
                }}
            />
        </div>
    );
};

export default GuestLayout;
