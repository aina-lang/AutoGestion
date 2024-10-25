import ApplicationLogo from '@/Components/ApplicationLogo';
import ConfirmModal from '@/Components/ConfirmModal';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { ScrollToTopButton } from '@/Components/ScrollToTopButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { router, useForm, usePage } from '@inertiajs/react';
import { Alert, Divider, Menu, MenuItem, Snackbar } from '@mui/material';
import { motion } from 'framer-motion';
import { Fullscreen, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Guest({ children, auth }) {
    const [isSticky, setSticky] = useState(false);
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const { flash } = usePage().props;
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [confirmModal, setConfirmModal] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [activeLink, setActiveLink] = useState('');
    const { post } = useForm();
    const sectionsRef = {
        home: useRef(null),
        service: useRef(null),
        about: useRef(null),
        cars: useRef(null),
        contact: useRef(null),
    };

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 50);

            // Vérifiez quelle section est visible
            for (const section in sectionsRef) {
                if (sectionsRef[section].current) {
                    const rect =
                        sectionsRef[section].current.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top < window.innerHeight) {
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
        // console.log(flash);
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
        setMenuOpen(!isMenuOpen);
        setAnchorEl(event.currentTarget);
    };

    const handleLogout = () => {
        post(route('logout'));
        setConfirmModal(!confirmModal);
    };

    const links = [
        { href: 'home', label: 'Accueil' },
        { href: 'service', label: 'Services' },
        { href: 'about', label: 'Apropos' },
        { href: 'cars', label: 'Véhicules' },
        { href: 'contact', label: 'Contact' },
    ];

    const scrollToSection = (id) => {
        const element = sectionsRef[id].current;
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 sm:pt-0">
            {/* Header */}
            <motion.header
                initial={{
                     opacity: 0,
                    
                     y: -50 }}
                animate={{ opacity: isSticky ? 1 : 0.9, y: isSticky ? 0 : -10 }}
                transition={{ type: 'tween', duration: 0.5 }}
                className={`fixed top-0 z-50 flex w-full items-center justify-between bg-white px-6 py-4 shadow-md`}
            >
                <div className="flex items-center">
                    <ApplicationLogo className="mr-8 hidden md:flex" />
                    <nav className="mx-auto hidden md:flex">
                        {links.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={`px-4 py-2 hover:text-blue-500 ${
                                    activeLink === link.href
                                        ? 'font-bold text-blue-500'
                                        : ''
                                }`}
                            >
                                {link.label}
                            </button>
                        ))}
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
                                />
                            </svg>
                        </button>
                        <Menu
                            open={isMenuOpen}
                            anchorEl={anchorEl}
                            onClose={() => setMenuOpen(false)}
                            className="absolute right-0 top-16 bg-white shadow-lg"
                        >
                            {links.map((link) => (
                                <MenuItem
                                    key={link.href}
                                    onClick={() => scrollToSection(link.href)}
                                >
                                    {link.label}
                                </MenuItem>
                            ))}
                        </Menu>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="rounded-full p-2 focus:outline-none">
                        <Sun className="h-5 w-5 text-yellow-500" />
                    </button>
                    <button className="hidden rounded-full p-2 focus:outline-none md:flex">
                        <Fullscreen className="h-5 w-5 text-gray-600" />
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
                            >
                                S'inscrire
                            </SecondaryButton>
                        </>
                    ) : (
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center focus:outline-none">
                                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 p-2 text-gray-600">
                                            {auth.user.nom
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content align="right">
                                    <div className="px-4 py-2 text-sm text-gray-700">
                                        Connecté en tant que:{' '}
                                        <div className="font-bold">
                                            {auth.user.nom}
                                        </div>
                                    </div>
                                    <Divider />
                                    {auth.user.type == 'client' && (
                                        <Dropdown.Link
                                            href={route('client.dashboard')}
                                        >
                                            Dashboard
                                        </Dropdown.Link>
                                    )}

                                    <Dropdown.Link
                                        href={
                                            auth.user.type == 'admin'
                                                ? route('admin.dashboard')
                                                : route('client.dashboard')
                                        }
                                    >
                                        Dashboard
                                    </Dropdown.Link>

                                    <Dropdown.Link href={route('profile.edit')}>
                                        Profil
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={'#'}
                                        onClick={(e) => e.preventDefault()}
                                        as="button"
                                        className="p-0"
                                    >
                                        <button
                                            onClick={(e) =>
                                                setConfirmModal(true)
                                            }
                                            className="min-h-full w-full py-2 text-start"
                                        >
                                            Déconnexion
                                        </button>
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    )}
                </div>
            </motion.header>

            <div className="w-full overflow-hidden">
                {flash && (
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
                )}
                <ConfirmModal
                    open={confirmModal}
                    onClose={() => setConfirmModal(!confirmModal)}
                    onConfirm={handleLogout}
                    title="Confirmer la deconxxion"
                    content="Êtes-vous sûr de vouloir vous deconnecter ?"
                />
                {children}
                <ScrollToTopButton />
            </div>
        </div>
    );
}
