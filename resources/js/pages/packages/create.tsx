import React from 'react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Packages', href: '/packages' },
    { title: 'Create Package', href: '/packages/create' },
];

export default function CreatePackage() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        type: 'umrah',
        description: '',
        price: '',
        duration_days: '',
        departure_date: '',
        return_date: '',
        max_pilgrims: '',
        available_slots: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('packages.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Package - Hajj & Umrah Management" />
            
            <div className="max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">➕ Create New Package</h1>
                        <p className="text-gray-600 dark:text-gray-400">Add a new Hajj or Umrah package to your offerings</p>
                    </div>
                    <Link
                        href={route('packages.index')}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                        ← Back to Packages
                    </Link>
                </div>

                {/* Form */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Package Details</h2>
                        <p className="text-gray-600 dark:text-gray-400">Fill in the information below to create your package</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Basic Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Package Name *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., Premium Hajj Package 2024"
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Package Type *
                                </label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value as 'hajj' | 'umrah')}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                >
                                    <option value="umrah">🌙 Umrah</option>
                                    <option value="hajj">🕋 Hajj</option>
                                </select>
                                {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                placeholder="Describe your package details, inclusions, and highlights..."
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Pricing and Duration */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Package Price (USD) *
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., 25000"
                                />
                                {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Duration (Days) *
                                </label>
                                <input
                                    type="number"
                                    value={data.duration_days}
                                    onChange={(e) => setData('duration_days', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder={data.type === 'hajj' ? 'e.g., 40' : 'e.g., 14'}
                                />
                                {errors.duration_days && <p className="mt-1 text-sm text-red-600">{errors.duration_days}</p>}
                            </div>
                        </div>

                        {/* Travel Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Departure Date *
                                </label>
                                <input
                                    type="date"
                                    value={data.departure_date}
                                    onChange={(e) => setData('departure_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.departure_date && <p className="mt-1 text-sm text-red-600">{errors.departure_date}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Return Date *
                                </label>
                                <input
                                    type="date"
                                    value={data.return_date}
                                    onChange={(e) => setData('return_date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                />
                                {errors.return_date && <p className="mt-1 text-sm text-red-600">{errors.return_date}</p>}
                            </div>
                        </div>

                        {/* Capacity */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Maximum Pilgrims *
                                </label>
                                <input
                                    type="number"
                                    value={data.max_pilgrims}
                                    onChange={(e) => setData('max_pilgrims', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., 100"
                                />
                                {errors.max_pilgrims && <p className="mt-1 text-sm text-red-600">{errors.max_pilgrims}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Available Slots *
                                </label>
                                <input
                                    type="number"
                                    value={data.available_slots}
                                    onChange={(e) => setData('available_slots', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g., 100"
                                />
                                {errors.available_slots && <p className="mt-1 text-sm text-red-600">{errors.available_slots}</p>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex items-center justify-end space-x-4 pt-6">
                            <Link
                                href={route('packages.index')}
                                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Creating...' : '✅ Create Package'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Tips */}
                <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">💡 Package Creation Tips</h3>
                    <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                        <li>• Hajj packages typically range from 35-45 days</li>
                        <li>• Umrah packages usually range from 7-21 days</li>
                        <li>• Set available slots equal to max pilgrims for new packages</li>
                        <li>• Include detailed descriptions to help pilgrims understand what's included</li>
                    </ul>
                </div>
            </div>
        </AppLayout>
    );
}