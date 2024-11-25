import MyHeader from '@/Components/Header';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Chip } from '@mui/material';
import React from 'react';

function ShowClient({ client }) {
    return (
        <AdminLayout
            header={
                <MyHeader
                    title="Détails du Client"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Clients', href: '/admin/clients' },
                        { label: 'Détails' },
                    ]}
                />
            }
        >
            <Head title={`Détails de ${client.nom}`} />
            <div className="mx-auto max-w-3xl p-6">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    {client.nom} {client.prenoms}
                </h1>
                <div className="space-y-6 rounded-lg bg-white p-8 shadow-lg">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <strong>Nom:</strong>
                            <p className="text-gray-700">{client.nom}</p>
                        </div>
                        <div>
                            <strong>Prénoms:</strong>
                            <p className="text-gray-700">{client.prenoms}</p>
                        </div>
                        <div>
                            <strong>Email:</strong>
                            <p className="text-gray-700">{client.email}</p>
                        </div>
                    </div>
                    <div>
                        <strong>Numéros de téléphone:</strong>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {JSON.parse(JSON.parse(client.phones) || '[]').map(
                                (phone, index) => (
                                    <Chip
                                        key={index}
                                        label={phone}
                                        className="bg-blue-100 text-blue-800"
                                    />
                                ),
                            )}
                        </div>
                    </div>
                    <div className="flex justify-start space-x-4">
                        <a
                            href={`/admin/clients/${client.id}/edit`}
                            className="inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            Modifier
                        </a>
                        <a
                            href="/admin/clients"
                            className="inline-block rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                            Retour
                        </a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default ShowClient;
