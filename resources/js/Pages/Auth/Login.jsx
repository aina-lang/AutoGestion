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

                        <form onSubmit={submit} className="rounded-md p-8">
                            <Typography variant="h5" gutterBottom>
                                Connectez-vous à votre compte
                            </Typography>

                            <TextField
                                label="Email"
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                error={!!errors.email}
                                helperText={errors.email}
                            />

                            <TextField
                                label="Password"
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                error={!!errors.password}
                                helperText={errors.password}
                            />

                            <div className="mt-4 block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                'remember',
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        Me rappeler
                                    </span>
                                </label>
                            </div>

                            <div className="mt-4 flex items-center justify-end">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="mr-3 rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                                    >
                                        Mot de passe oublié?
                                    </Link>
                                )}

                                <PrimaryButton
                                    className="ms-4"
                                    disabled={processing}
                                    type="submit"
                                >
                                    S'identifier
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
