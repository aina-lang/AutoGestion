// resources/js/Pages/Dashboard.jsx

import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import ClientLayout from '@/Layouts/ClientLayout';
import { Head, router } from '@inertiajs/react';
import {
    AdminPanelSettingsOutlined,
    CarRentalSharp,
    Money,
} from '@mui/icons-material';
import { BarChart, PieChart } from '@mui/x-charts';
import { GridAddIcon } from '@mui/x-data-grid';
import { CarIcon } from 'lucide-react';

export default function Dashboard({
    totalCars,
    totalReservations,
    totalUsers,
    totalRevenue,
    monthlyData,
}) {
    const handleAddProject = () => {
        router.get('/projects/add');
    };

    return (
        <ClientLayout
            header={
                <MyHeader
                    title="Tableau de Bord"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Projets' },
                    ]}
                    right={
                        <div className="flex space-x-4">
                            <PrimaryButton onClick={handleAddProject}>
                                <GridAddIcon />
                                Nouveau Projet
                            </PrimaryButton>
                        </div>
                    }
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
                        icon={<CarIcon className="text-blue-500" />}
                        color="bg-blue-200"
                    />
                    <Card
                        title="Réservations"
                        value={totalReservations}
                        icon={<CarRentalSharp className="text-green-500" />}
                        color="bg-green-200"
                    />
                    <Card
                        title="Users"
                        value={totalUsers}
                        icon={
                            <AdminPanelSettingsOutlined className="text-orange-500" />
                        }
                        color="bg-orange-200"
                    />
                    <Card
                        title="Revenus"
                        value={`$${totalRevenue}`}
                        icon={<Money className="text-purple-500" />}
                        color="bg-purple-200"
                    />
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
                                ]} // Couleurs personnalisées pour les barres
                            />
                        }
                    />
                    <ChartCard
                        title="Distribution des Voitures"
                        chart={
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 10, label: 'Voiture A' },
                                            { id: 1, value: 15, label: 'Voiture B' },
                                            { id: 2, value: 20, label: 'Voiture C' },
                                        ],
                                    },
                                ]}
                                width={400}
                                height={200}
                                colors={['#FF6384', '#36A2EB', '#FFCE56']} // Couleurs personnalisées pour le graphique circulaire
                            />
                        }
                    />
                </div>
            </div>
        </ClientLayout>
    );
}

const Card = ({ title, value, icon, color }) => (
    <div
        className={`space-x-4 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800`}
    >
        <div className="flex justify-between text-3xl">
            <div
                className={`h-10 w-10 ${color} flex items-center justify-center rounded-full`}
            >
                {icon}
            </div>
            <div className="flex-grow text-right">
                <h6 className="text-lg font-semibold">{title}</h6>
                <p className="text-3xl font-bold">{value}</p>
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
