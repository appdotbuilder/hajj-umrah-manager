import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Al-Barakah Hajj & Umrah Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="relative px-6 py-4">
                    <nav className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white text-xl">🕌</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Al-Barakah Travel</h1>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Hajj & Umrah Management</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors dark:text-gray-300"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="px-6 py-16">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="mb-8">
                            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                🕋 Complete Hajj & Umrah Travel Management
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Comprehensive business management system for Hajj and Umrah travel agencies. 
                                Manage packages, pilgrims, bookings, inventory, and financial operations all in one place.
                            </p>
                        </div>

                        {/* Feature Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                            {/* Dashboard */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-white text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Dashboard</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Track sales trends, package distribution, and payment status with interactive charts and analytics
                                </p>
                            </div>

                            {/* Package Management */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-white text-2xl">📦</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Package Management</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Create and manage Hajj & Umrah packages with detailed itineraries, pricing, and availability
                                </p>
                            </div>

                            {/* Pilgrim Management */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-white text-2xl">👥</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Pilgrim Database</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Comprehensive pilgrim profiles with passport details, medical info, and emergency contacts
                                </p>
                            </div>

                            {/* Inventory Management */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-white text-2xl">🎒</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Inventory Control</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Track luggage, prayer items, clothing, and travel essentials with automated stock alerts
                                </p>
                            </div>

                            {/* Financial Management */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-white text-2xl">💰</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Financial Reports</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Complete accounting with journal entries, balance sheets, income statements, and cash flow
                                </p>
                            </div>

                            {/* Supplier Network */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                    <span className="text-white text-2xl">🤝</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Supplier Network</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Manage relationships with hotels, airlines, transportation, and service providers
                                </p>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">✨ Complete Business Solution</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🏢 Multi-User System</h3>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <li>• Owner with full system access</li>
                                        <li>• Admin roles with customizable permissions</li>
                                        <li>• Secure user management and authentication</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">🎨 Responsive Design</h3>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <li>• Mobile-first responsive interface</li>
                                        <li>• Three color themes (Purple, Green, Blue)</li>
                                        <li>• Modern and intuitive user experience</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">📈 Advanced Analytics</h3>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <li>• Sales package trend graphs</li>
                                        <li>• Package distribution charts</li>
                                        <li>• Payment tracking and overdue alerts</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">⚙️ Professional Tools</h3>
                                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                        <li>• LA Simulation calculator for cost planning</li>
                                        <li>• Automated invoice generation</li>
                                        <li>• Travel identity customization</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        {!auth.user && (
                            <div className="mt-16 text-center">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Ready to Transform Your Travel Business?
                                </h2>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                                    Join thousands of travel agencies already using our comprehensive management system
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105"
                                    >
                                        🚀 Start Free Trial
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        📧 Sign In
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="px-6 py-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="max-w-7xl mx-auto text-center">
                        <p className="text-gray-600 dark:text-gray-400">
                            Built with ❤️ for the Hajj & Umrah travel industry | 
                            <span className="ml-2 font-medium">Al-Barakah Travel Management System</span>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}