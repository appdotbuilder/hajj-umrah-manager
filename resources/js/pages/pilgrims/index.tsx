import React from 'react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface PilgrimData {
    id: number;
    name: string;
    email: string;
    phone: string;
    passport_number: string;
    passport_expiry: string;
    gender: string;
    status: string;
}

interface Props {
    pilgrims: {
        data: PilgrimData[];
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
    { title: 'Pilgrims', href: '/pilgrims' },
];

export default function PilgrimsIndex({ pilgrims }: Props) {
    const getGenderIcon = (gender: string) => {
        return gender === 'Male' ? '👨' : '👩';
    };

    const isPassportExpiringSoon = (expiryDate: string) => {
        const expiry = new Date(expiryDate);
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
        return expiry <= sixMonthsFromNow;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pilgrims - Hajj & Umrah Management" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">👥 Pilgrim Database</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage pilgrim information and documents</p>
                    </div>
                    <Link
                        href={route('pilgrims.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                    >
                        <span className="mr-2">👤</span>
                        Register Pilgrim
                    </Link>
                </div>

                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pilgrims</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{pilgrims.data.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Male Pilgrims</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {pilgrims.data.filter(p => p.gender === 'Male').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👨</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Female Pilgrims</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {pilgrims.data.filter(p => p.gender === 'Female').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">👩</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Status</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                    {pilgrims.data.filter(p => p.status === 'active').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pilgrims Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pilgrim</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Passport</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Expiry</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {pilgrims.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-6xl mb-4">👥</span>
                                                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No pilgrims found</p>
                                                <p className="text-gray-400 dark:text-gray-500 mb-4">Start by registering your first pilgrim</p>
                                                <Link
                                                    href={route('pilgrims.create')}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                                >
                                                    Register Pilgrim
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    pilgrims.data.map((pilgrim) => (
                                        <tr key={pilgrim.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <span className="text-2xl mr-3">{getGenderIcon(pilgrim.gender)}</span>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{pilgrim.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{pilgrim.gender}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900 dark:text-white">{pilgrim.email}</div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">{pilgrim.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                                                    {pilgrim.passport_number}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                <div className="flex items-center">
                                                    <span>{new Date(pilgrim.passport_expiry).toLocaleDateString()}</span>
                                                    {isPassportExpiringSoon(pilgrim.passport_expiry) && (
                                                        <span className="ml-2 text-red-500" title="Passport expires within 6 months">⚠️</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    pilgrim.status === 'active' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                }`}>
                                                    {pilgrim.status === 'active' ? '✅' : '❌'} {pilgrim.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-3">
                                                    <Link
                                                        href={route('pilgrims.show', pilgrim.id)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('pilgrims.edit', pilgrim.id)}
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

                {/* Passport Alerts */}
                {pilgrims.data.filter(p => isPassportExpiringSoon(p.passport_expiry)).length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">⚠️</span>
                            <div>
                                <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Passport Expiry Alerts</h3>
                                <p className="text-red-700 dark:text-red-300 mb-2">
                                    The following pilgrims have passports expiring within 6 months:
                                </p>
                                <ul className="text-red-700 dark:text-red-300">
                                    {pilgrims.data
                                        .filter(p => isPassportExpiringSoon(p.passport_expiry))
                                        .map(p => (
                                            <li key={p.id}>
                                                • {p.name} - Expires: {new Date(p.passport_expiry).toLocaleDateString()}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}