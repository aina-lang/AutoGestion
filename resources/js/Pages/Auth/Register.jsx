import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { AddCircle } from '@mui/icons-material';
import { Box, TextField, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import banner from '../../../assets/images/2.jpg';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        nom: '',
        email: '',
        password: '',
        password_confirmation: '',
        phones: [], // Initialize an array for phone numbers
    });

    const [phoneInput, setPhoneInput] = useState(''); // State to manage the current phone input

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    const addPhoneNumber = () => {
        if (phoneInput) {
            setData('phones', [...data.phones, phoneInput]); // Add new phone number to the array
            setPhoneInput(''); // Clear the input field
        }
    };

    const removePhoneNumber = (phoneToRemove) => {
        const newPhones = data.phones.filter(
            (phone) => phone !== phoneToRemove,
        );
        setData('phones', newPhones); // Update the phones array
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div className="flex min-h-screen pt-10">
                {/* Left Section: Form */}
                <div className="flex flex-1 items-center justify-center p-8">
                    <div className="w-full">
                        <form
                            onSubmit={submit}
                            className="p-8 md:grid-cols-2 grid grid-cols-1 gap-4 rounded-md" // Grid layout
                        >
                            <div>
                                <TextField
                                    label={'Nom Complet'}
                                    id="nom"
                                    name="nom"
                                    value={data.nom}
                                    className="mt-1 block w-full"
                                    autoComplete="nom"
                                    // isFocused={true}
                                    onChange={(e) =>
                                        setData('nom', e.target.value)
                                    }
                                    required
                                    error={!!errors.nom} // Set error state
                                    helperText={errors.nom} // Show error message
                                />
                            </div>

                            <div>
                                <TextField
                                    id="email"
                                    type="email"
                                    name="email"
                                    label={'Email'}
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                    error={!!errors.email} // Set error state
                                    helperText={errors.email} // Show error message
                                />
                            </div>

                            <div>
                                <TextField
                                    id="password"
                                    type="password"
                                    name="password"
                                    label={'Mot de passe'}
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password', e.target.value)
                                    }
                                    required
                                    error={!!errors.password} // Set error state
                                    helperText={errors.password} // Show error message
                                />
                            </div>

                            <div>
                                <TextField
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    label={'Confirmer mot de passe'}
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            'password_confirmation',
                                            e.target.value,
                                        )
                                    }
                                    required
                                    error={!!errors.password_confirmation} // Set error state
                                    helperText={errors.password_confirmation} // Show error message
                                />
                            </div>

                            {/* Phone Numbers Section */}
                            <div className="col-span-2">
                                <div className="relative mt-2 flex items-center">
                                    <TextField
                                        value={phoneInput}
                                        onChange={(e) =>
                                            setPhoneInput(e.target.value)
                                        }
                                        className="mt-1 block w-full"
                                        label="Ajouter un numéro de téléphone"
                                    />
                                    <button
                                        className="absolute right-3 ml-2"
                                        onClick={addPhoneNumber}
                                        type="button"
                                        // Ajoutez l'icône ici
                                    >
                                        <AddCircle />
                                    </button>
                                </div>
                                <div className="mt-2">
                                    {data.phones.map((phone, index) => (
                                        <Chip
                                            key={index}
                                            label={phone}
                                            onDelete={() =>
                                                removePhoneNumber(phone)
                                            }
                                            className="mr-2 mt-2"
                                        />
                                    ))}
                                </div>
                                {errors.phones && (
                                    <InputError
                                        message={errors.phones.join(', ')}
                                        className="mt-2"
                                    />
                                )}
                            </div>

                            <div className="col-span-2 mt-4 flex items-center justify-end">
                                <Link
                                    href={route('login')}
                                    className="mr-3 rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                >
                                    Déjà inscrit ?
                                </Link>
                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                    type="submit"
                                >
                                    S'inscrire
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Section: Image */}
                <div className="relative hidden flex-1 items-center justify-center lg:flex">
                    <img
                        src={banner}
                        alt="Login Illustration"
                        className="h-[80%] w-[90%] rounded-xl object-cover" // Added rounded-xl class
                        style={{ filter: 'brightness(0.5)' }}
                    />
                    <Box
                        position="absolute"
                        color="white"
                        textAlign="center"
                        px={2}
                    >
                        <Typography variant="h4" gutterBottom>
                            Bienvenue sur notre plateforme
                        </Typography>
                        <Typography variant="body1">
                            Connectez-vous pour découvrir toutes nos
                            fonctionnalités.
                        </Typography>
                    </Box>
                </div>
            </div>
        </GuestLayout>
    );
}
