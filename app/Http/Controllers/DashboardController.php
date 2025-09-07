<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\InventoryItem;
use App\Models\Package;
use App\Models\Pilgrim;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        // Sales trend data (last 12 months) - using database agnostic approach
        $salesTrend = Booking::where('booking_date', '>=', now()->subMonths(12))
            ->where('booking_status', '!=', 'cancelled')
            ->get()
            ->groupBy(function ($booking) {
                return $booking->booking_date->format('Y-m');
            })
            ->map(function ($bookings, $key) {
                [$year, $month] = explode('-', $key);
                return [
                    'month' => (int) $month,
                    'year' => (int) $year,
                    'month_name' => date('M Y', mktime(0, 0, 0, (int) $month, 1, (int) $year)),
                    'bookings' => $bookings->count(),
                    'revenue' => $bookings->sum('total_amount'),
                ];
            })
            ->values();

        // Package distribution
        $packageDistribution = Package::all()
            ->groupBy('type')
            ->map(function ($packages, $type) {
                return [
                    'type' => ucfirst($type),
                    'count' => $packages->count(),
                    'revenue' => $packages->sum(function ($package) {
                        return $package->price * ($package->max_pilgrims - $package->available_slots);
                    }),
                ];
            })
            ->values();

        // Unpaid bookings
        $unpaidBookings = Booking::with(['pilgrim', 'package'])
            ->where('payment_status', '!=', 'paid')
            ->orderBy('booking_date', 'desc')
            ->take(10)
            ->get()
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'booking_number' => $booking->booking_number,
                    'pilgrim_name' => $booking->pilgrim->name,
                    'package_name' => $booking->package->name,
                    'total_amount' => $booking->total_amount,
                    'paid_amount' => $booking->paid_amount,
                    'remaining_amount' => $booking->remaining_amount,
                    'payment_status' => $booking->payment_status,
                    'booking_date' => $booking->booking_date->format('Y-m-d'),
                ];
            });

        // Summary statistics
        $statistics = [
            'total_packages' => Package::count(),
            'total_pilgrims' => Pilgrim::count(),
            'total_bookings' => Booking::count(),
            'pending_payments' => Booking::where('payment_status', '!=', 'paid')->sum('remaining_amount'),
            'inventory_items' => InventoryItem::count(),
            'low_stock_items' => InventoryItem::where('status', 'low_stock')->count(),
            'out_of_stock_items' => InventoryItem::where('status', 'out_of_stock')->count(),
        ];

        return Inertia::render('dashboard', [
            'salesTrend' => $salesTrend,
            'packageDistribution' => $packageDistribution,
            'unpaidBookings' => $unpaidBookings,
            'statistics' => $statistics,
        ]);
    }
}