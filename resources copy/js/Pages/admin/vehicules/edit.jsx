import ConfirmModal from '@/Components/ConfirmModal';
import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { GridAddIcon } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';

function EditVehicule({ vehicule, categories }) {
    const { data, setData, post, processing, setError, errors } = useForm({
        marque: vehicule.marque,
        modele: vehicule.modele,
        immatriculation: vehicule.immatriculation,
        categorie: vehicule.categorie.id,
        kilometrage: vehicule.kilometrage,
        description: vehicule.description,
        new_images: [],
        delete_images: [],
    });

    const [confirmModal, setConfirmModal] = useState(false);
    const [imagePreviews, setImagePreviews] = useState(
        vehicule.images
            ? JSON.parse(vehicule.images).map((image) => `/storage/${image}`)
            : [],
    );
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);

    useEffect(() => {
        const decodedImages = vehicule.images
            ? JSON.parse(vehicule.images)
            : [];
        const previews = decodedImages.map((image) => `/storage/${image}`);
        setImagePreviews(previews);
    }, [vehicule.images]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // Only store the files in new_images
        setData((prevData) => ({
            ...prevData,
            new_images: [...prevData.new_images, ...files], // Append new files
        }));

        // Update image previews (URLs)
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prevImages) => [
            ...prevImages.filter(
                (_, index) => index < JSON.parse(vehicule.images).length,
            ), // Keep existing images
            ...newImages, // Add new images
        ]);
    };

    useEffect(() => {
        console.log('yes');
        setData((prevData) => ({
            ...prevData,
        }));
        console.log(data);
    }, [data.new_images]);

    const handleRemoveImage = (index) => {
        setSelectedImageIndex(index);
        setConfirmModal(true);
    };

    const handleConfirmRemoveImage = () => {
        if (selectedImageIndex !== null) {
            const updatedPreviews = imagePreviews.filter(
                (_, i) => i !== selectedImageIndex,
            );
            setImagePreviews(updatedPreviews);

            const isExistingImage =
                selectedImageIndex < JSON.parse(vehicule.images).length;
            if (isExistingImage) {
                const deletedImage = JSON.parse(vehicule.images)[
                    selectedImageIndex
                ];
                console.log(JSON.parse(vehicule.images), deletedImage);
                setData((prevData) => ({
                    ...prevData,
                    delete_images: [...prevData.delete_images, deletedImage],
                }));
            } else {
                setData((prevData) => ({
                    ...prevData,
                    new_images: prevData.new_images.filter(
                        (_, i) =>
                            i !==
                            selectedImageIndex -
                                JSON.parse(vehicule.images).length,
                    ),
                }));
            }

            setConfirmModal(false);
            setSelectedImageIndex(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting data:', data);

        // fetch(`/admin/vehicules/${vehicule.id}`, {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify([1, 2, 3]),
        // })
        //     .then((resp) => console.log(resp))
        //     .catch((err) => console.log(err));

        post(`/admin/vehicules/${vehicule.id}`, {
            data,
            onSuccess: () => {
                setData('new_images', []);
                setData('delete_images', []);
            },
            onError: (errors) => {
                console.error(errors); // Log any errors
            },
        });
    };

    // Handle errors for the form
    // useEffect(() => {
    //     if (errors) {
    //         Object.keys(errors).forEach((field) => {
    //             setError(field, { type: 'manual', message: errors[field][0] });
    //         });
    //     }
    // }, [errors, setError]);

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
            <div className="mx-auto space-y-5 p-6 pt-0">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 gap-4"
                >
                    <div className="mb-4 h-full rounded-md bg-white p-5 shadow-lg">
                        <div className="mb-4 grid grid-cols-2 gap-4">
                            <TextField
                                label="Marque"
                                value={data.marque}
                                onChange={(e) =>
                                    setData('marque', e.target.value)
                                }
                                error={!!errors.marque}
                                helperText={errors.marque}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Modèle"
                                value={data.modele}
                                onChange={(e) =>
                                    setData('modele', e.target.value)
                                }
                                error={!!errors.modele}
                                helperText={errors.modele}
                                fullWidth
                                variant="outlined"
                            />
                            <TextField
                                label="Immatriculation"
                                value={data.immatriculation}
                                onChange={(e) =>
                                    setData('immatriculation', e.target.value)
                                }
                                error={!!errors.immatriculation}
                                helperText={errors.immatriculation}
                                fullWidth
                                variant="outlined"
                            />
                            <FormControl
                                fullWidth
                                error={!!errors.categorie}
                                variant="outlined"
                            >
                                <InputLabel>Catégorie</InputLabel>
                                <Select
                                    value={data.categorie}
                                    onChange={(e) =>
                                        setData('categorie', e.target.value)
                                    }
                                    label="Catégorie"
                                >
                                    {categories.map((category) => (
                                        <MenuItem
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.nom}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.categorie && (
                                    <p className="text-red-600">
                                        {errors.categorie?.message}{' '}
                                        {/* Accédez au message d'erreur */}
                                    </p>
                                )}
                            </FormControl>
                            <TextField
                                label="Kilométrage"
                                type="number"
                                value={data.kilometrage}
                                onChange={(e) =>
                                    setData('kilometrage', e.target.value)
                                }
                                error={!!errors.kilometrage}
                                helperText={errors.kilometrage}
                                fullWidth
                                variant="outlined"
                                inputProps={{
                                    min: 10, // Set the minimum value to 10
                                }}
                            />
                        </div>
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                            error={!!errors.description}
                            helperText={errors.description}
                            fullWidth
                            variant="outlined"
                        />
                    </div>
                    <div className="flex h-full flex-col rounded-md bg-white p-5 shadow-lg">
                        <div className="mt-4 flex-grow">
                            <label className="block text-sm font-medium text-gray-700">
                                Images du Véhicule
                            </label>
                            <div
                                onClick={() =>
                                    document
                                        .getElementById('file-upload')
                                        .click()
                                }
                                className="mt-1 flex cursor-pointer justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5"
                            >
                                <div className="space-y-1 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H20v12H8v8h12v12h8V28h12v-8H28V8z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex cursor-pointer text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload des fichiers</span>
                                            <input
                                                id="file-upload"
                                                name="images"
                                                type="file"
                                                className="sr-only"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                        <p className="pl-1">
                                            ou glisser-déposer
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG jusqu'à 10MB
                                    </p>
                                </div>
                            </div>

                            {imagePreviews.length > 0 && (
                                <div className="mt-4 grid grid-cols-8 gap-2">
                                    {imagePreviews.map((image, index) => (
                                        <div
                                            key={index}
                                            className="relative h-28 w-28 overflow-hidden rounded-lg bg-gray-100"
                                        >
                                            <img
                                                src={image}
                                                alt={`Aperçu ${index}`}
                                                className="h-full w-full object-cover"
                                            />
                                            <button
                                                onClick={() =>
                                                    handleRemoveImage(index)
                                                }
                                                type="button"
                                                className="absolute right-0 top-0 mr-1 mt-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-700"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-5 flex justify-end">
                        <PrimaryButton
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white"
                        >
                            {processing ? 'Enregistrement...' : 'Enregistrer'}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
            <ConfirmModal
                open={confirmModal}
                onClose={() => setConfirmModal(false)}
                onConfirm={handleConfirmRemoveImage}
                title="Confirmer la Suppression"
                message="Êtes-vous sûr de vouloir supprimer cette image ?"
            />
        </AdminLayout>
    );
}

export default EditVehicule;
