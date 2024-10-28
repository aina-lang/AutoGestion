// resources/js/Pages/Dashboard.jsx

import MyHeader from '@/Components/Header';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import {
    AdminPanelSettingsOutlined,
    CarRentalSharp,
} from '@mui/icons-material';
import { BarChart } from '@mui/x-charts';

import { CarIcon } from 'lucide-react';

export default function Dashboard({
    totalCars,
    totalReservations,
    totalUsers,
    rentedCarsPercentage,
    availableCarsPercentage,
    monthlyData,
    mostRentedCars,
}) {
    const handleAddProject = () => {
        router.get('/projects/add');
    };

    console.log(mostRentedCars);
    return (
        <AdminLayout
            header={
                <MyHeader
                    title="Tableau de Bord"
                    breadcrumbItems={[{ label: 'Dashboard' }]}
                    // right={
                    //     <div className="flex space-x-4">
                    //         <PrimaryButton onClick={handleAddProject}>
                    //             <GridAddIcon />
                    //             Nouveau Projet
                    //         </PrimaryButton>
                    //     </div>
                    // }
                />
            }
        >
            <Head title="Tableau de Bord" />

            <div className="flex-grow p-4 text-gray-500">
                {/* Section des Cartes */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <Card
                        title="Total de Voitures"
                        value={totalCars}
                        icon={<CarIcon className="text-white" />}
                        color="bg-gradient-to-tr from-blue-500 to-blue-300 shadow-blue-200 shadow-lg"
                    />
                    <Card
                        title="Réservations"
                        value={totalReservations}
                        icon={<CarRentalSharp className="text-white" />}
                        color="bg-gradient-to-tr from-green-500 to-green-300 shadow-green-200 shadow-lg"
                    />
                    <Card
                        title="Utilisateurs"
                        value={totalUsers}
                        icon={
                            <AdminPanelSettingsOutlined className="text-white" />
                        }
                        color="bg-gradient-to-tr from-orange-500 to-orange-300 shadow-orange-200 shadow-lg"
                    />
                    <Card
                        title="Voitures Louées (%)"
                        // value={`${rentedCarsPercentage}%`}
                        icon={<CarRentalSharp className="text-white" />}
                        color="bg-gradient-to-tr from-pink-500 to-pink-300 shadow-pink-200 shadow-lg"
                    />
                    {/* <Card
                        title="Voitures Disponibles (%)"
                        value={`${availableCarsPercentage}%`}
                        icon={<CarIcon className="text-green-500" />}
                        color="bg-green-200"
                    /> */}
                </div>

                {/* Section des Graphiques */}
                <div className="mt-16 flex space-x-4">
                    <ChartCard
                        title="Réservations par Mois"
                        chart={
                            <BarChart
                                series={[{ data: monthlyData }]}
                                height={290}
                                xAxis={[
                                    {
                                        data: [
                                            'Jan',
                                            'Fév',
                                            'Mar',
                                            'Avr',
                                            'Mai',
                                            'Juin',
                                            'Juil',
                                            'Aoû',
                                            'Sep',
                                            'Oct',
                                            'Nov',
                                            'Déc',
                                        ],
                                        scaleType: 'band',
                                    },
                                ]}
                                margin={{
                                    top: 10,
                                    bottom: 30,
                                    left: 40,
                                    right: 10,
                                }}
                                colors={[
                                    '#1976D2',
                                    '#388E3C',
                                    '#FF9800',
                                    '#9C27B0',
                                ]}
                            />
                        }
                    />
                    <div className="min-h-full rounded-md bg-white p-4 shadow-lg dark:bg-gray-800">
                        <h2 className="text-xl font-bold">
                            Top 3 Voitures les Plus Louées (3 derniers mois)
                        </h2>
                        <div className="mt-4">
                            {mostRentedCars.length > 0 ? (
                                <ul className="space-y-2">
                                    {mostRentedCars.map((car, index) => (
                                        <li
                                            key={index}
                                            className="flex justify-between rounded-lg p-4"
                                        >
                                            <span className="font-medium">
                                                {car.car.marque}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {car.rental_count} réservations
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>
                                    Aucune donnée disponible pour les trois
                                    derniers mois.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

const Card = ({ title, value, icon, color }) => (
    <div
        className={`relative space-x-4 rounded-lg bg-white p-4 py-8 pt-2 shadow-lg dark:bg-gray-800`}
    >
        <div
            className={`-top-5 h-16 w-16 ${color} absolute flex items-center justify-center rounded-xl`}
        >
            {icon}
        </div>
        <div className="flex justify-between text-3xl">
            <div className="flex-grow text-right">
                <h6 className="text-lg font-semibold">{title}</h6>
                <p className="text-3xl font-bold text-gray-600">{value}</p>
            </div>
        </div>
    </div>
);

const ChartCard = ({ title, chart }) => (
    <div className="w-2/3 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <h6 className="mb-4 text-lg font-semibold">{title}</h6>
        {chart}
    </div>
);
