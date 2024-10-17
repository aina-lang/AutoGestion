import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import StyledDataGrid from '@/Components/StyledDataGrid';
import { Input } from '@/components/ui/input';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { MoreHorizSharp, TableView } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import { SearchIcon } from 'lucide-react';
import React, { useState } from 'react';

const index = ({ vehicules }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [gridView, setGridView] = useState(false);

    const toggleGridView = () => {
        setGridView(!gridView);
    };

    return (
        <AdminLayout
            header={
                <MyHeader
                    title="Véhicules"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Véhicules' },
                    ]}
                    right={
                        <div className="flex space-x-4">
                            <button onClick={toggleGridView}>
                                {gridView ? (
                                    <GridAddIcon
                                        size={35}
                                        className="text-gray-500"
                                    />
                                ) : (
                                    <TableView
                                        fontSize="large"
                                        className="text-gray-500"
                                    />
                                )}
                            </button>
                            <div className="flex items-center overflow-hidden rounded-md border bg-gray-50 pr-2 dark:bg-gray-800">
                                <Input
                                    className="border-none bg-gray-50 p-2 focus:border-none dark:bg-gray-800"
                                    placeholder="Rechercher un véhicule..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                                <SearchIcon size={20} />
                            </div>
                            <PrimaryButton
                                onClick={() =>
                                    router.get('/admin/vehicules/create')
                                }
                            >
                                <GridAddIcon />
                                Nouveau Véhicule
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Véhicules" />
            <div className="mx-auto space-y-5 p-6 pt-0">
                {gridView ? (
                    <Grid container spacing={2}>
                        {vehicules.data.map((vehicule, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                lg={4}
                                key={index}
                                className="min-h-full"
                            >
                                <div className="relative flex h-full flex-col justify-between rounded-lg bg-white p-4 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 dark:text-gray-300">
                                    <div className="absolute right-4 top-4">
                                        <Link
                                            href={route(
                                                'vehicules.show',
                                                vehicule.id,
                                            )}
                                        >
                                            <MoreHorizSharp className="text-gray-200 transition hover:text-blue-500" />
                                        </Link>
                                    </div>
                                    <img
                                        src={
                                            '/storage/' +
                                            JSON.parse(vehicule.images)[0]
                                        }
                                        alt={vehicule.modele}
                                        className="h-48 w-full rounded-lg object-cover"
                                    />
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div>
                                                <h4 className="text-lg font-semibold">
                                                    {vehicule.marque}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {vehicule.modele}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-4 text-sm text-gray-700 dark:text-gray-400">
                                        {vehicule.description}
                                    </p>
                                    <div className="mb-4 flex items-center">
                                        <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300">
                                            {vehicule.kilometrage} Km/h
                                        </span>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <StyledDataGrid
                        columns={[
                            {
                                accessorKey: 'marque',
                                header: 'Marque',
                                cell: (props) => (
                                    <Link
                                        href={route(
                                            'vehicules.show',
                                            props.row.original.id,
                                        )}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {props.getValue()}
                                    </Link>
                                ),
                            },
                            {
                                accessorKey: 'modele',
                                header: 'Modèle',
                                // cell: (props) => (
                                //     <Link href={route('vehicules.show', props.row.original.id)} className="text-blue-600 hover:underline">
                                //         {props.getValue()}
                                //     </Link>
                                // ),
                            },
                            {
                                accessorKey: 'immatriculation',
                                header: 'Immatriculation',
                            },
                            {
                                accessorKey: 'categorie.nom',
                                header: 'Catégorie',
                            },
                            {
                                accessorKey: 'kilometrage',
                                header: 'Kilométrage',
                                cell: (props) => (
                                    <span className="me-2 rounded bg-yellow-100 p-2 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                        {props.getValue()} Km/h
                                    </span>
                                ),
                            },
                        ]}
                        data={vehicules}
                        filterableColumns={['motif', 'label', 'assignedTo']}
                        actionUrl={route(route().current())}
                        pdfUrl={'vehicule.pdf'}
                    />
                )}
            </div>
        </AdminLayout>
    );
};

export default index;
