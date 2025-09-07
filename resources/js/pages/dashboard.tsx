import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface DashboardData {
    salesTrend: Array<{
        month_name: string;
        bookings: number;
        revenue: number;
    }>;
    packageDistribution: Array<{
        type: string;
        count: number;
        revenue: number;
    }>;
    unpaidBookings: Array<{
        id: number;
        booking_number: string;
        pilgrim_name: string;
        package_name: string;
        total_amount: number;
        remaining_amount: number;
        payment_status: string;
    }>;
    statistics: {
        total_packages: number;
        total_pilgrims: number;
        total_bookings: number;
        pending_payments: number;
        inventory_items: number;
        low_stock_items: number;
        out_of_stock_items: number;
    };
}

interface Props extends DashboardData {
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ 
    salesTrend, 
    packageDistribution, 
    unpaidBookings, 
    statistics 
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard - Hajj & Umrah Management" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🕋 Travel Management Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Welcome to your Hajj & Umrah business control center</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Packages</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{statistics.total_packages}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pilgrims</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{statistics.total_pilgrims}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Bookings</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{statistics.total_bookings}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📋</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending Payments</p>
                                <p className="text-3xl font-bold text-red-600 dark:text-red-400">${statistics.pending_payments.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sales Trend */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📈 Sales Trend (Last 12 Months)</h3>
                        <div className="space-y-2">
                            {salesTrend.slice(0, 6).map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.month_name}</span>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm text-blue-600 dark:text-blue-400">{item.bookings} bookings</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">${item.revenue.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Package Distribution */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📊 Package Distribution</h3>
                        <div className="space-y-4">
                            {packageDistribution.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-4 h-4 rounded-full ${item.type === 'Hajj' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                        <span className="text-gray-900 dark:text-white font-medium">{item.type} Packages</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.count} packages</div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">${item.revenue.toLocaleString()}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Inventory Alert */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🎒 Inventory Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">{statistics.inventory_items}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Items</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">{statistics.low_stock_items}</div>
                            <div className="text-sm text-yellow-700 dark:text-yellow-300">Low Stock</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 dark:bg-red-900 rounded-lg">
                            <div className="text-2xl font-bold text-red-800 dark:text-red-200">{statistics.out_of_stock_items}</div>
                            <div className="text-sm text-red-700 dark:text-red-300">Out of Stock</div>
                        </div>
                    </div>
                </div>

                {/* Unpaid Bookings Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">⚠️ Pilgrims with Pending Payments</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Bookings that require payment follow-up</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Booking #</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pilgrim</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Package</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Remaining</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {unpaidBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            {booking.booking_number}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {booking.pilgrim_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            {booking.package_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                            ${booking.total_amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600 dark:text-red-400">
                                            ${booking.remaining_amount.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                booking.payment_status === 'pending' 
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}>
                                                {booking.payment_status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">🚀 Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link 
                            href={route('packages.create')}
                            className="flex items-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
                        >
                            <span className="text-2xl mr-3">➕</span>
                            <div>
                                <div className="font-medium text-blue-900 dark:text-blue-100">Add Package</div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">Create new Hajj/Umrah package</div>
                            </div>
                        </Link>

                        <Link 
                            href={route('pilgrims.create')}
                            className="flex items-center p-4 bg-green-50 dark:bg-green-900 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors"
                        >
                            <span className="text-2xl mr-3">👤</span>
                            <div>
                                <div className="font-medium text-green-900 dark:text-green-100">Add Pilgrim</div>
                                <div className="text-sm text-green-700 dark:text-green-300">Register new pilgrim</div>
                            </div>
                        </Link>

                        <Link 
                            href={route('inventory.create')}
                            className="flex items-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors"
                        >
                            <span className="text-2xl mr-3">📦</span>
                            <div>
                                <div className="font-medium text-purple-900 dark:text-purple-100">Add Inventory</div>
                                <div className="text-sm text-purple-700 dark:text-purple-300">Add inventory item</div>
                            </div>
                        </Link>

                        <Link 
                            href={route('packages.index')}
                            className="flex items-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-800 transition-colors"
                        >
                            <span className="text-2xl mr-3">📊</span>
                            <div>
                                <div className="font-medium text-orange-900 dark:text-orange-100">View Reports</div>
                                <div className="text-sm text-orange-700 dark:text-orange-300">Business analytics</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}