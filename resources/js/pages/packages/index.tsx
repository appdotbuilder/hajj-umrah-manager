import React from 'react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface PackageData {
    id: number;
    name: string;
    type: string;
    price: number;
    duration_days: number;
    departure_date: string;
    available_slots: number;
    max_pilgrims: number;
    status: string;
}

interface Props {
    packages: {
        data: PackageData[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            current_page: number;
            last_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Packages', href: '/packages' },
];

export default function PackagesIndex({ packages }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Packages - Hajj & Umrah Management" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">📦 Package Management</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage your Hajj and Umrah packages</p>
                    </div>
                    <Link
                        href={route('packages.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                    >
                        <span className="mr-2">➕</span>
                        Add New Package
                    </Link>
                </div>

                {/* Packages Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Package</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Departure</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Availability</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {packages.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-6xl mb-4">📦</span>
                                                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No packages found</p>
                                                <p className="text-gray-400 dark:text-gray-500 mb-4">Start by creating your first Hajj or Umrah package</p>
                                                <Link
                                                    href={route('packages.create')}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                                >
                                                    Create Package
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    packages.data.map((pkg) => (
                                        <tr key={pkg.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{pkg.name}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    pkg.type === 'Hajj' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                }`}>
                                                    {pkg.type === 'Hajj' ? '🕋 Hajj' : '🌙 Umrah'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                ${pkg.price.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {pkg.duration_days} days
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {new Date(pkg.departure_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                {pkg.available_slots}/{pkg.max_pilgrims}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    pkg.status === 'active' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : pkg.status === 'full'
                                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                }`}>
                                                    {pkg.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-3">
                                                    <Link
                                                        href={route('packages.show', pkg.id)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('packages.edit', pkg.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400"
                                                    >
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Package Types Summary */}
                {packages.data.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">🕋</span>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Hajj Packages</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {packages.data.filter(p => p.type === 'Hajj').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">🌙</span>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Umrah Packages</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {packages.data.filter(p => p.type === 'Umrah').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">✅</span>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Packages</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {packages.data.filter(p => p.status === 'active').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border">
                            <div className="flex items-center">
                                <span className="text-2xl mr-3">🎯</span>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Slots</p>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                        {packages.data.reduce((sum, p) => sum + p.max_pilgrims, 0)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}