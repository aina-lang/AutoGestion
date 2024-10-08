import MyHeader from '@/Components/Header';
import PrimaryButton from '@/Components/PrimaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { BarChart, PieChart } from '@mui/x-charts';
import { GridAddIcon } from '@mui/x-data-grid';

export default function Dashboard() {
    return (
        <AdminLayout
            header={
                <MyHeader
                    title="Projets"
                    breadcrumbItems={[
                        { label: 'Home', href: '/' },
                        { label: 'Projets' },
                    ]}
                    right={
                        <div className="flex space-x-4">
                            <PrimaryButton
                                onClick={() => router.get('/projects/add')}
                            >
                                <GridAddIcon />
                                Nouveau Projet
                            </PrimaryButton>
                        </div>
                    }
                />
            }
        >
            <Head title="Dashboard" />

            <div className="flex-grow p-4">
                {/* Cards Section */}
                <div className="grid grid-cols-1 gap-4 text-gray-500 sm:grid-cols-2 md:grid-cols-4">
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                        <h6 className="text-lg font-semibold">Total Cars</h6>
                        <p className="text-3xl font-bold">150</p>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                        <h6 className="text-lg font-semibold">Reservations</h6>
                        <p className="text-3xl font-bold">89</p>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                        <h6 className="text-lg font-semibold">Admins</h6>
                        <p className="text-3xl font-bold">120</p>
                    </div>

                    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                        <h6 className="text-lg font-semibold">Revenue</h6>
                        <p className="text-3xl font-bold">$12,000</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Bar Chart */}
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                        <h6 className="mb-4 text-lg font-semibold">
                            Reservations per Month
                        </h6>
                        <BarChart
                            series={[
                                { data: [35, 44, 24, 34] },
                                { data: [51, 6, 49, 30] },
                                { data: [15, 25, 30, 50] },
                                { data: [60, 50, 15, 25] },
                            ]}
                            height={290}
                            xAxis={[
                                {
                                    data: ['Q1', 'Q2', 'Q3', 'Q4'],
                                    scaleType: 'band',
                                },
                            ]}
                            margin={{
                                top: 10,
                                bottom: 30,
                                left: 40,
                                right: 10,
                            }}
                        />
                    </div>

                    {/* Pie Chart */}
                    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800">
                        <h6 className="mb-4 text-lg font-semibold">
                            Car Distribution
                        </h6>
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 10, label: 'Car A' },
                                        { id: 1, value: 15, label: 'Car B' },
                                        { id: 2, value: 20, label: 'Car C' },
                                    ],
                                },
                            ]}
                            width={400}
                            height={200}
                        />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
