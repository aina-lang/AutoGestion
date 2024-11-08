import ReservationModal from '@/Components/ReservationModal';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
import { CalendarCheckIcon } from 'lucide-react';
import React, { useState } from 'react';

function Services({ services, categories, auth }) {


    return (
        <GuestLayout auth={auth} footerShown={true}>
            <Head title="Services" />
            <div className="mx-auto space-y-5 bg-gray-50 p-6 py-24 pt-32 min-h-screen">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="space-y-3 rounded-lg border bg-white p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="flex items-center space-x-3">
                            {/* Add a category icon */}
                            <div className="text-3xl text-blue-500">
                                {category.nom }
                            </div>
                            <div className="text-3xl text-blue-500">
                                {category.description }
                            </div>
                        </div>
                        <div className="grid grid-cols-1  gap-4 mt-4">
                            {services
                                .filter((service) => service.service_type_id === category.id)
                                .map((service) => (
                                    <div
                                        key={service.id}
                                        className="flex items-start p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                                        onClick={() => handleReserveClick(service)}
                                    >
                                        {/* Service Icon */}
                                        <div className="text-xl text-yellow-500 mr-4">
                                            <CalendarCheckIcon />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium">{service.nom}</h3>
                                            <p className="text-sm text-gray-600">{service.description}</p>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}
            </div>

        </GuestLayout>
    );
}

export default Services;
