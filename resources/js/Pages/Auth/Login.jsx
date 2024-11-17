import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Box, TextField, Typography } from '@mui/material';
import banner from '../../../assets/images/3.jpg';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            <div className="flex min-h-screen pt-10">
                {/* Left Section: Form */}
                <div className="flex flex-1 items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}
                        <form
                            onSubmit={submit}
                            className="rounded-md  p-6  dark:bg-gray-800"
                        >
                            <Typography
                                variant="h6"
                                className="mb-4 text-gray-700 dark:text-gray-300"
                            >
                                Connectez-vous .
                            </Typography>

                            <TextField
                                label="Email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.email}
                                helperText={errors.email}
                            />

                            <TextField
                                label="Mot de passe"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                error={!!errors.password}
                                helperText={errors.password}
                            />

                            <div className="mt-4 flex items-center justify-between">
                                <label className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                    <Checkbox
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <span className="ml-2">
                                        Se souvenir de moi
                                    </span>
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-indigo-600 hover:underline dark:text-indigo-400"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                )}
                            </div>

                            <div className="mt-6">
                                <PrimaryButton
                                    disabled={processing}
                                    type="submit"
                                    fullWidth
                                >
                                    Connexion
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Section: Image with Overlay */}
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
                            Bienvenue sur Vezo Tours ! 👋🏻
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
