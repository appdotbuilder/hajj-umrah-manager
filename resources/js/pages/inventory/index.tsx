import React from 'react';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface InventoryItem {
    id: number;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    min_stock_level: number;
    unit_price: number;
    supplier: string | null;
    status: string;
}

interface Props {
    items: {
        data: InventoryItem[];
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
    summary: {
        total_items: number;
        total_value: number;
        low_stock_items: number;
        out_of_stock_items: number;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Inventory', href: '/inventory' },
];

export default function InventoryIndex({ items, summary }: Props) {
    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'in_stock':
                return '✅';
            case 'low_stock':
                return '⚠️';
            case 'out_of_stock':
                return '❌';
            default:
                return '📦';
        }
    };

    const getCategoryIcon = (category: string) => {
        const icons: { [key: string]: string } = {
            'Luggage': '🎒',
            'Prayer Items': '🤲',
            'Clothing': '👕',
            'Electronics': '📱',
            'Personal Care': '🧴',
            'Medical Supplies': '💊',
        };
        return icons[category] || '📦';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory - Hajj & Umrah Management" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🎒 Inventory Management</h1>
                        <p className="text-gray-600 dark:text-gray-400">Track travel essentials and supplies</p>
                    </div>
                    <Link
                        href={route('inventory.create')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center"
                    >
                        <span className="mr-2">➕</span>
                        Add Item
                    </Link>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Items</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">{summary.total_items}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Value</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">${summary.total_value.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Low Stock</p>
                                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{summary.low_stock_items}</p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">⚠️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Out of Stock</p>
                                <p className="text-3xl font-bold text-red-600 dark:text-red-400">{summary.out_of_stock_items}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">❌</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Inventory Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">SKU</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Unit Price</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                {items.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-6xl mb-4">🎒</span>
                                                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No inventory items found</p>
                                                <p className="text-gray-400 dark:text-gray-500 mb-4">Start by adding your first inventory item</p>
                                                <Link
                                                    href={route('inventory.create')}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                                >
                                                    Add Item
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    items.data.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <span className="text-2xl mr-3">{getCategoryIcon(item.category)}</span>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</div>
                                                        <div className="text-sm text-gray-500 dark:text-gray-400">{item.supplier || 'No supplier'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                                                    {item.sku}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                <div className="flex items-center">
                                                    <span className="font-medium">{item.quantity}</span>
                                                    {item.quantity <= item.min_stock_level && item.quantity > 0 && (
                                                        <span className="ml-2 text-yellow-500" title="Low stock">⚠️</span>
                                                    )}
                                                    {item.quantity === 0 && (
                                                        <span className="ml-2 text-red-500" title="Out of stock">❌</span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    Min: {item.min_stock_level}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                ${item.unit_price.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    item.status === 'in_stock' 
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : item.status === 'low_stock'
                                                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                    {getStatusIcon(item.status)} {item.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-3">
                                                    <Link
                                                        href={route('inventory.show', item.id)}
                                                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400"
                                                    >
                                                        View
                                                    </Link>
                                                    <Link
                                                        href={route('inventory.edit', item.id)}
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
            </div>
        </AppLayout>
    );
}