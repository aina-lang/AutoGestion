import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { GridAddIcon } from '@mui/x-data-grid';
import React from 'react';

function EditReservation() {
    return (
        <AdminLayout
            header={
                <MyHeader
                    title="Modifier un Véhicule"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Véhicules' },
                        { label: 'Modifier un Véhicule' },
                    ]}
                    right={
                        <div className="flex space-x-4 py-5">
                            <PrimaryButton
                                onClick={() => router.get('/vehicules')}
                            >
                                <GridAddIcon />
                                Retour aux Véhicules
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Modifier un Véhicule" />
            <div className="mx-auto space-y-5 p-6 pt-0"></div>
        </AdminLayout>
    );
}

export default EditReservation;
