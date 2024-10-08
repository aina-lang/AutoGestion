import ConfirmModal from '@/Components/ConfirmModal';
import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import { StyledDataGrid } from '@/Components/StyledDataGrid';
import { Input } from '@/components/ui/input';
import { frFR } from '@/constants/local';

import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { MoreHorizSharp, PictureAsPdf, TableView } from '@mui/icons-material';
import {
    Box,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Pagination,
} from '@mui/material';
import {
    GridAddIcon,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import {
    CheckIcon,
    DeleteIcon,
    EditIcon,
    GridIcon,
    SearchIcon,
} from 'lucide-react';
import React, { useState } from 'react';

function Index({ categories }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [gridView, setGridView] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const { delete: deleteRequest } = useForm();
    const [selectedRows, setSelectedRows] = useState([]);

    console.log(categories);
    // Toggle between grid and table view
    const toggleGridView = () => {
        setItemsPerPage(gridView ? 5 : 8);
        setGridView(!gridView);
    };

    const filteredCategories = categories.filter((category) =>
        category.nom.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const arrayfields = {
        id: { checked: true },
        nom: { checked: true },
        description: { checked: true },
    };

    const generateColumns = (fields) => {
        return Object.keys(fields)
            .map((key) => {
                switch (key) {
                    case 'nom':
                        return {
                            field: 'nom',
                            headerName: 'Nom',
                            width: 150,
                            renderCell: (params) => (
                                <Link
                                    href={'/admin/categories/' + params.row.id}
                                    className="flex h-full items-center text-sm"
                                >
                                    {params.value || 'N/A'}
                                </Link>
                            ),
                        };
                    case 'description':
                        return {
                            field: 'description',
                            headerName: 'Description',
                            width: 200,
                            renderCell: (params) => (
                                <p className="flex h-full items-center truncate text-sm">
                                    {params.value || 'N/A'}
                                </p>
                            ),
                        };
                    default:
                        return null;
                }
            })
            .filter((column) => column !== null);
    };

    const columns = generateColumns(arrayfields);

    columns.unshift({
        field: 'actions',
        headerName: 'Actions',
        width: 150,
        sortable: false,
        renderCell: (params) => (
            <div className="flex h-full w-full space-x-2 text-sm">
                <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(params.row)}
                >
                    <EditIcon size={18} />
                </IconButton>
                <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleDelete(params.row)}
                >
                    <DeleteIcon size={20} />
                </IconButton>
                <IconButton
                    aria-label="pdf"
                    color="info"
                    onClick={() => handleExportPDF(params.row)}
                >
                    <PictureAsPdf sx={{ width: 20 }} />
                </IconButton>
            </div>
        ),
    });

    return (
        <AdminLayout
            header={
                <MyHeader
                    title="Véhicules et Catégories"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Véhicules' },
                    ]}
                    right={
                        <div className="flex space-x-4 py-5">
                            <button onClick={toggleGridView}>
                                {gridView ? (
                                    <GridIcon size={35} className="text-gray-500" />
                                ) : (
                                    <TableView fontSize="large" className="text-gray-500" />
                                )}
                            </button>
                            <div className="flex items-center overflow-hidden rounded-md border bg-gray-50 pr-2 dark:bg-gray-800">
                                <Input
                                    className="focus: border-none bg-gray-50 p-2 dark:bg-gray-800"
                                    placeholder="Rechercher une catégorie..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <SearchIcon size={20} />
                            </div>
                            <PrimaryButton onClick={() => router.get('/admin/categories/create')}>
                                <GridAddIcon />
                                Nouveau Véhicule
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Véhicules et Catégories" />
            <div className="mx-auto space-y-5 p-6 pt-0">
                {gridView ? (
                    <Grid container spacing={2}>
                        {paginatedCategories.map((categorie, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <div className="flex flex-col p-4 rounded-lg shadow bg-white dark:bg-gray-800 dark:text-gray-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <h4 className="text-lg font-semibold">{categorie.nom}</h4>
                                        <PrimaryButton className="bg-transparent p-0 shadow-none">
                                            <MoreHorizSharp className="text-gray-500" />
                                        </PrimaryButton>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">
                                        {categorie.description}
                                    </p>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box sx={{ minHeight: 300, width: '100%' }} className="overflow-hidden rounded-md border p-5 bg-white">
                        <StyledDataGrid
                            localeText={frFR}
                            rows={paginatedCategories}
                            slots={{
                                toolbar: () => (
                                    <GridToolbarContainer
                                        sx={{ marginBottom: 2 }}
                                        // className="text-indigo-500"
                                    >
                                        <GridToolbarColumnsButton />
                                        <GridToolbarDensitySelector
                                            slotProps={{
                                                tooltip: {
                                                    title: 'Change density',
                                                },
                                            }}
                                        />
                                        <Box sx={{ flexGrow: 1 }} />

                                        <GridToolbarExport
                                            slotProps={{
                                                tooltip: {
                                                    title: 'Export data',
                                                },
                                                button: {
                                                    variant: 'outlined',
                                                },
                                            }}
                                        />
                                    </GridToolbarContainer>
                                ),
                            }}
                            initialState={{
                                columns: {
                                    columnVisibilityModel: {
                                        id: false,
                                    },
                                },
                            }}
                            columns={columns}
                            pageSize={itemsPerPage}
                            // rowsPerPageOptions={[5, 10]}
                            hideFooterPagination
                            hideFooter
                            checkboxSelection
                            onRowSelectionModelChange={(ids) => {
                                const selectedIDs = new Set(ids);
                                setSelectedRows(categories.filter((row) => selectedIDs.has(row.id)));
                            }}
                            rowSelectionModel={selectedRows.map((row) => row.id)}
                        />
                    </Box>
                )}
                {/* Pagination */}
                <Pagination
                    count={Math.ceil(filteredCategories.length / itemsPerPage)}
                    page={currentPage}
                    onChange={(_, page) => setCurrentPage(page)}
                />
            </div>
        </AdminLayout>
    );
}

export default Index;
