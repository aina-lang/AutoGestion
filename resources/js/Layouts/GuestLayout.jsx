import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link as InertiaLink, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { ScrollToTopButton } from '@/Components/ScrollToTopButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Settings from '@/Components/Settings';
import { palette } from '@/constants/palette';
import { useThemeContext } from '@/contexts/ThemeContext';
import { router } from '@inertiajs/react';
import { Alert, Divider, Menu, MenuItem, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { Fullscreen, Moon, Sun } from 'lucide-react';

export default function Guest({ children, auth }) {
    const [isSticky, setSticky] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = (event) => {
        if (isMenuOpen) {
            setMenuOpen(false);
            setAnchorEl(null);
        } else {
            setMenuOpen(true);
            setAnchorEl(event.currentTarget);
        }
    };
    const { paletteName } = useThemeContext(); // Obtenez le nom de la palette

    // Accédez à la palette actuelle
    const currentPalette = palette[paletteName];

    const { flash, url } = usePage().props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    useEffect(() => {
        // console.log(flash);
        if (flash) {
            if (flash.success) {
                setMessage(flash.success);
                setSeverity('success');
                setOpen(true);
            } else if (flash.error) {
                setMessage(flash.error);
                setSeverity('error');
                setOpen(true);
            }
        }
    }, [flash]);

    const handleClose = () => {
        setOpen(false);
    };
    const [isFullScreen, setIsFullScreen] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('dark-mode') === 'true';
    });

    useEffect(() => {
        const darkMode = localStorage.getItem('dark-mode');

        if (darkMode === 'false' || !darkMode) {
            document.querySelector('html').classList.remove('dark');
            document.documentElement.style.colorScheme = 'light';
        } else {
            document.querySelector('html').classList.add('dark');
            document.documentElement.style.colorScheme = 'dark';
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('dark-mode', newMode.toString());
            return newMode;
        });
    };

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }

        setIsFullScreen(!isFullScreen);
    };

    function getInitials(name) {
        return name
            .split(' ')
            .map((part) => part.charAt(0).toUpperCase())
            .join('');
    }
    return (
        <div className="min-h-screen bg-gray-100 pt-6 dark:bg-gray-900 sm:pt-0">
            {/* Header */}
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{
                    opacity: isSticky ? 1 : 0.9,
                    y: isSticky ? 0 : -10,
                }}
                transition={{ type: 'tween', duration: 0.5 }}
                className={`fixed top-0 z-50 flex w-full items-center justify-between bg-white px-6 py-4 shadow-md`}
            >
                <div className="flex items-center">
                    <ApplicationLogo />
                    <nav className="ml-8 hidden md:flex">
                        <InertiaLink
                            href="/"
                            className="px-4 py-2 hover:text-blue-500"
                        >
                            Accueil
                        </InertiaLink>
                        <InertiaLink
                            href="#service"
                            className="px-4 py-2 hover:text-blue-500"
                        >
                            Services
                        </InertiaLink>
                        <InertiaLink
                            href="#about"
                            className="px-4 py-2 hover:text-blue-500"
                        >
                            Apropos
                        </InertiaLink>
                        <InertiaLink
                            href="#cars"
                            className="px-4 py-2 hover:text-blue-500"
                        >
                            Véhicules
                        </InertiaLink>
                        <InertiaLink
                            href="#contact"
                            className="px-4 py-2 hover:text-blue-500"
                        >
                            Contact
                        </InertiaLink>
                    </nav>
                    {/* Hamburger Menu for Mobile */}
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
                                ></path>
                            </svg>
                        </button>
                        <Menu
                            open={isMenuOpen}
                            anchorEl={anchorEl}
                            onClose={() => {
                                setMenuOpen(false);
                                setAnchorEl(null);
                            }}
                            className="absolute right-0 top-16 bg-white shadow-lg"
                        >
                            <MenuItem onClick={() => setMenuOpen(false)}>
                                <InertiaLink
                                    href="/"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Accueil
                                </InertiaLink>
                            </MenuItem>
                            <MenuItem onClick={() => setMenuOpen(false)}>
                                <InertiaLink
                                    href="#Services"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Services
                                </InertiaLink>
                            </MenuItem>
                            <MenuItem onClick={() => setMenuOpen(false)}>
                                <InertiaLink
                                    href="#Apropos"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Apropos
                                </InertiaLink>
                            </MenuItem>
                            <MenuItem onClick={() => setMenuOpen(false)}>
                                <InertiaLink
                                    href="#contact"
                                    className="block px-4 py-2 hover:bg-gray-100"
                                >
                                    Contact
                                </InertiaLink>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleDarkMode}
                        className="rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                    >
                        {isDarkMode ? (
                            <Sun className="h-5 w-5 text-yellow-500" />
                        ) : (
                            <Moon className="h-5 w-5 text-gray-800" />
                        )}
                    </button>

                    {/* Fullscreen Toggle */}
                    <button
                        onClick={toggleFullScreen}
                        className="rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600"
                    >
                        <Fullscreen className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <span
                        className="mr-4"
                        style={{ color: currentPalette[500] }}
                    >
                        +261 34 64 925 37
                    </span>
                    {!auth?.user ? (
                        <>
                            <PrimaryButton
                                onClick={() => {
                                    router.visit('allcars');
                                }}
                            >
                                Réserver
                            </PrimaryButton>
                            <SecondaryButton
                                onClick={() => router.get('/register')}
                            >
                                S'inscrire
                            </SecondaryButton>
                        </>
                    ) : (
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center focus:outline-none">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 p-2 text-gray-600 dark:bg-gray-600 dark:text-gray-300">
                                            {getInitials(auth.user.nom)}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right">
                                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                        Connecté en tant que:
                                        <div className="font-bold">
                                            {auth.user.nom}
                                        </div>
                                    </div>
                                    <Divider />
                                    <Dropdown.Link
                                        href={
                                            auth.user.type == 'user'
                                                ? route('client.dashboard')
                                                : route('admin.dashboard')
                                        }
                                    >
                                        Dashboard
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profil
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Déconnexion
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    )}
                </div>
            </motion.header>
            <div className="w-full overflow-hidden">
                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    className="cursor-pointer shadow-lg"
                >
                    <Alert onClose={handleClose} severity={severity}>
                        <span dangerouslySetInnerHTML={{ __html: message }} />
                    </Alert>
                </Snackbar>
                {children}
                <Settings />
                <ScrollToTopButton />
            </div>
        </div>
    );
}
