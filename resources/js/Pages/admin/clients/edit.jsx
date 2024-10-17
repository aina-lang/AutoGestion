import MyHeader from '@/Components/Header';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import AddCircle from '@mui/icons-material/AddCircle';
import { Chip, InputLabel, TextField } from '@mui/material';
import React, { useState } from 'react';

function EditClient({ client }) {
    // Supposons que vous recevez les données du client en tant que prop
    const { data, setData, put, processing, errors } = useForm({
        nom: client.nom || '',
        email: client.email || '',
        phones: client.phones || [], // Utilise les numéros de téléphone existants
    });

    const [phoneInput, setPhoneInput] = useState('');

    const submit = (e) => {
        e.preventDefault();
        put(route('clients.update', client.id)); // Utilisez la route pour mettre à jour le client
    };

    const addPhoneNumber = () => {
        if (phoneInput) {
            setData('phones', [...data.phones, phoneInput]);
            setPhoneInput('');
        }
    };

    const removePhoneNumber = (phoneToRemove) => {
        const newPhones = data.phones.filter(
            (phone) => phone !== phoneToRemove,
        );
        setData('phones', newPhones);
    };

    return (
        <AdminLayout
            header={
                <MyHeader
                    title="Modifier Client"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Clients', href: '/admin/clients' },
                        { label: 'Modifier Client' },
                    ]}
                    right={
                        <div className="flex space-x-4">
                            <PrimaryButton
                                onClick={() =>
                                    router.get('/admin/clients/create')
                                }
                                aria-label="Ajouter un nouveau client"
                            >
                                Nouveau Client
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Modifier un Client" />
            <div className="mx-auto max-w-2xl p-6">
                <h1 className="mb-4 text-xl font-bold">Modifier Client</h1>

                <form
                    onSubmit={submit}
                    className="rounded-md bg-white p-8 shadow-lg"
                >
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel htmlFor="nom" value="Nom Complet" />
                                <TextField
                                    id="nom"
                                    name="nom"
                                    value={data.nom}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('nom', e.target.value)
                                    }
                                    required
                                    error={!!errors.nom}
                                    helperText={errors.nom}
                                />
                            </div>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextField
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    required
                                    error={!!errors.email}
                                    helperText={errors.email}
                                />
                            </div>
                        </div>

                        {/* Section des Numéros de Téléphone */}
                        <div className="col-span-2">
                            <InputLabel value="Numéros de téléphone" />
                            <div className="relative mt-2 flex items-center">
                                <TextField
                                    value={phoneInput}
                                    onChange={(e) =>
                                        setPhoneInput(e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                    placeholder="Ajouter un numéro de téléphone"
                                />
                                <button
                                    className="absolute right-3 ml-2"
                                    onClick={addPhoneNumber}
                                    type="button"
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

                        <div className="flex items-center justify-between">
                            <PrimaryButton type="submit" disabled={processing}>
                                Mettre à Jour
                            </PrimaryButton>
                            <button
                                type="button"
                                onClick={() => router.get('/admin/clients')}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

export default EditClient;
