import ConfirmModal from '@/Components/ConfirmModal';
import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import { StyledDataGrid } from '@/Components/StyledDataGrid';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
    Typography,
} from '@mui/material';
import {
    GridAddIcon,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
} from '@mui/x-data-grid';
import {
    CheckIcon,
    DeleteIcon,
    EditIcon,
    GridIcon,
    SearchIcon,
} from 'lucide-react';
import React, { useState } from 'react';

const Index = ({ reservations }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [gridView, setGridView] = useState(false);
    const [currentPage, setCurrentPage] = useState(reservations.current_page);
    const [itemsPerPage, setItemsPerPage] = useState(4);
    const { delete: deleteRequest ,post} = useForm();
    const [selectedRows, setSelectedRows] = useState([]);
    const [contextMenu, setContextMenu] = useState(null);
    const [currentFocusRow, setCurrentFocusRow] = useState(null);

    const filteredReservations = reservations.data.filter((reservation) =>
        `${reservation.reference} ${reservation.label} ${reservation.assignedTo}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
    );

    const paginatedReservations = filteredReservations.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    const handleEdit = (row) => router.get(`reservations/${row.id}/edit/`);

    const handleDelete = (row) => {
        setCurrentFocusRow(row);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteRequest(`/admin/reservations/${currentFocusRow.id}`, {
            onSuccess: () => console.log('deleted'),
            onError: (errors) => console.error(errors),
        });
        setDialogOpen(false);
    };

    const handleExportPDF = (row) =>
        window.open(route('reservation.pdf', row.id), '_blank');

    const handleRowRightClick = (event, row) => {
        event.preventDefault();
        setSelectedRow(row);
        setContextMenu({
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
        });
    };

    const toggleGridView = () => {
        setItemsPerPage(gridView ? 5 : 8);
        setGridView(!gridView);
    };

    const handleApprove = (row) => {
        post(`/admin/reservations/${row.id}/approve`, {
            onSuccess: () => {
                console.log('Réservation approuvée');
                // Mettre à jour l'état local ou recharger les données
            },
            onError: (errors) => console.error(errors),
        });
    };

    const handleBulkApprove = () => {
        selectedRows.forEach((row) => handleApprove(row));
    };

    const columns = [
        {
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
                    <IconButton
                        aria-label="approve"
                        color="success"
                        onClick={() => handleApprove(params.row)}
                    >
                        <CheckIcon size={20} />
                    </IconButton>
                </div>
            ),
        },
        {
            field: 'motif',
            headerName: 'Motif',
            width: 150,
            renderCell: (params) => (
                <Link
                    href={`/admin/reservations/${params.row.id}`}
                    className="flex h-full items-center text-sm"
                >
                    {params.value || 'N/A'}
                </Link>
            ),
        },
        {
            field: 'vehicule',
            headerName: 'Modèle',
            width: 150,
            renderCell: (params) => (
                <p className="flex h-full items-center text-sm">
                    {params.value.marque || 'N/A'}
                </p>
            ),
        },
        {
            field: 'user',
            headerName: 'Client',
            width: 180,
            renderCell: (params) => (
                <p className="flex h-full items-center text-sm">
                    {params.value.nom || 'N/A'}
                </p>
            ),
        },
        {
            field: 'date_depart',
            headerName: 'Date depart',
            width: 150,
            renderCell: (params) => (
                <p className="flex h-full items-center text-sm">
                    {params.value || 'N/A'}
                </p>
            ),
        },
        {
            field: 'date_retour',
            headerName: 'Date retour',
            width: 150,
            renderCell: (params) => (
                <p className="flex h-full items-center text-sm">
                    {params.value || 'N/A'}
                </p>
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (params) => (
                <div className="flex h-full items-center">
                    <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${params.value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                    >
                        {params.value}
                    </span>
                </div>
            ),
        },
    ];

    const SelectionStatus = ({ selectedRows }) => (
        <Typography className="text-gray-500">
            {selectedRows.length}{' '}
            {selectedRows.length === 1
                ? 'Ligne sélectionnée'
                : 'Lignes sélectionnées'}
        </Typography>
    );

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
                        <div className="flex space-x-4 py-5">
                            <button onClick={toggleGridView}>
                                {gridView ? (
                                    <GridIcon
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
                                    className="focus: border-none bg-gray-50 p-2 dark:bg-gray-800"
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
                                    router.get('/admin/reservations/create')
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
                        {paginatedReservations.map((reservation, index) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={6}
                                key={index}
                                className="min-h-full"
                            >
                                <div className="flex min-h-full flex-col justify-between rounded-lg bg-white p-4 shadow dark:bg-gray-800 dark:text-gray-300">
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div>
                                                <h4 className="text-lg font-semibold">
                                                    {reservation.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">
                                                    {reservation.ref}
                                                </p>
                                            </div>
                                        </div>
                                        <PrimaryButton className="bg-transparent p-0 shadow-none hover:bg-transparent">
                                            <MoreHorizSharp className="text-gray-500" />
                                        </PrimaryButton>
                                    </div>
                                    <p className="mb-4 text-sm text-gray-700 dark:text-gray-400">
                                        {reservation.description}
                                    </p>
                                    <div className="mb-4 flex items-center">
                                        <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300">
                                            On Progress
                                        </span>
                                        <span className="ml-auto text-sm text-red-500">
                                            Due date:{' '}
                                            {reservation.datee || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex space-x-2">
                                        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                                            dev web
                                        </span>
                                    </div>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Box
                        sx={{ minHeight: 300, width: '100%' }}
                        className="overflow-hidden rounded-md bg-white p-5 shadow-lg"
                    >
                        <StyledDataGrid
                            localeText={frFR}
                            slots={{
                                toolbar: () => (
                                    <GridToolbarContainer
                                        sx={{ marginBottom: 2 }}
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
                                                button: { variant: 'outlined' },
                                            }}
                                        />
                                    </GridToolbarContainer>
                                ),
                            }}
                            initialState={{
                                columns: {
                                    columnVisibilityModel: { id: false },
                                },
                            }}
                            hideFooterPagination
                            hideFooter
                            rows={paginatedReservations}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            onRowSelectionModelChange={(ids) => {
                                const selectedIDs = new Set(ids);
                                const selectedRows = reservations.data.filter(
                                    (row) => selectedIDs.has(row.id),
                                );
                                setSelectedRows(selectedRows);
                            }}
                            rowSelection
                            rowSelectionModel={selectedRows.map(
                                (row) => row.id,
                            )}
                            getRowId={(row) => row.id}
                            onRowContextMenu={(params, event) =>
                                handleRowRightClick(event, params.row)
                            }
                        />
                        <Menu
                            open={contextMenu !== null}
                            onClose={() => setContextMenu(null)}
                            anchorReference="anchorPosition"
                            anchorPosition={
                                contextMenu !== null
                                    ? {
                                          top: contextMenu.mouseY,
                                          left: contextMenu.mouseX,
                                      }
                                    : undefined
                            }
                            onClick={() => setContextMenu(null)}
                        >
                            <MenuItem
                                onClick={() =>
                                    console.log(
                                        `Edit ${selectedRow?.firstName}`,
                                    )
                                }
                            >
                                Edit
                            </MenuItem>
                            <MenuItem
                                onClick={() =>
                                    console.log(
                                        `Delete ${selectedRow?.firstName}`,
                                    )
                                }
                            >
                                Delete
                            </MenuItem>
                            <MenuItem
                                onClick={() => handleApprove(selectedRow)}
                            >
                                Approve
                            </MenuItem>
                        </Menu>
                        <Box
                            sx={{
                                mt: 2,
                                p: selectedRows.length > 0 ? 2 : 0,
                                backgroundColor: '#f5f5f5',
                                borderRadius: '8px',
                                height: selectedRows.length > 0 ? 'auto' : 0,
                                overflow: 'hidden',
                                transition:
                                    'opacity 0.3s ease, transform 0.3s ease, height 0.3s ease',
                            }}
                            className="flex items-center justify-between"
                        >
                            <DropdownMenu>
                                <DropdownMenuTrigger className="rounded border border-indigo-500 bg-white px-4 py-2 text-indigo-500">
                                    Actions en masse
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-48 border-none bg-white shadow-lg">
                                    <DropdownMenuLabel className="font-bold text-gray-900">
                                        Actions en masse
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => handleEdit(selectedRows)}
                                        className="flex items-center bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <EditIcon className="mr-2 text-blue-500" />
                                        Modifier
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() =>
                                            handleDelete(selectedRows)
                                        }
                                        className="flex items-center bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <DeleteIcon className="mr-2 text-red-500" />
                                        Supprimer
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={handleBulkApprove}
                                        className="flex items-center bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <CheckIcon className="mr-2 text-green-500" />
                                        Approuver
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => {}}
                                        className="flex items-center bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <PictureAsPdf className="mr-2 text-gray-500" />
                                        Générer PDF
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <SelectionStatus selectedRows={selectedRows} />
                        </Box>
                    </Box>
                )}
                <Pagination
                    count={reservations.last_page}
                    page={currentPage}
                    onChange={(_, value) => {
                        setCurrentPage(value);
                        router.visit(`${reservations.path}?page=${value}`);
                    }}
                    lang="fr"
                />
            </div>
            <ConfirmModal
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmer la suppresion"
                content="Êtes-vous sûr de vouloir supprimer ce véhicule ?"
            />
        </AdminLayout>
    );
};

export default Index;
