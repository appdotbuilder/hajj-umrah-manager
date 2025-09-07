<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $packages = Package::latest()
            ->paginate(10)
            ->through(function ($package) {
                return [
                    'id' => $package->id,
                    'name' => $package->name,
                    'type' => ucfirst($package->type),
                    'price' => $package->price,
                    'duration_days' => $package->duration_days,
                    'departure_date' => $package->departure_date->format('Y-m-d'),
                    'available_slots' => $package->available_slots,
                    'max_pilgrims' => $package->max_pilgrims,
                    'status' => $package->status,
                ];
            });

        return Inertia::render('packages/index', [
            'packages' => $packages,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('packages/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:hajj,umrah',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration_days' => 'required|integer|min:1',
            'departure_date' => 'required|date|after:today',
            'return_date' => 'required|date|after:departure_date',
            'max_pilgrims' => 'required|integer|min:1',
            'available_slots' => 'required|integer|min:0|lte:max_pilgrims',
        ]);

        $package = Package::create($validated);

        return redirect()->route('packages.show', $package)
            ->with('success', 'Package created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Package $package)
    {
        $package->load('bookings.pilgrim');
        
        return Inertia::render('packages/show', [
            'package' => [
                'id' => $package->id,
                'name' => $package->name,
                'type' => $package->type,
                'description' => $package->description,
                'price' => $package->price,
                'duration_days' => $package->duration_days,
                'departure_date' => $package->departure_date->format('Y-m-d'),
                'return_date' => $package->return_date->format('Y-m-d'),
                'max_pilgrims' => $package->max_pilgrims,
                'available_slots' => $package->available_slots,
                'itinerary' => $package->itinerary,
                'status' => $package->status,
                'bookings' => $package->bookings->map(function ($booking) {
                    return [
                        'id' => $booking->id,
                        'booking_number' => $booking->booking_number,
                        'pilgrim_name' => $booking->pilgrim->name,
                        'total_amount' => $booking->total_amount,
                        'payment_status' => $booking->payment_status,
                        'booking_status' => $booking->booking_status,
                    ];
                }),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Package $package)
    {
        return Inertia::render('packages/edit', [
            'package' => $package,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Package $package)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:hajj,umrah',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration_days' => 'required|integer|min:1',
            'departure_date' => 'required|date',
            'return_date' => 'required|date|after:departure_date',
            'max_pilgrims' => 'required|integer|min:1',
            'available_slots' => 'required|integer|min:0|lte:max_pilgrims',
            'status' => 'required|in:active,inactive,full',
        ]);

        $package->update($validated);

        return redirect()->route('packages.show', $package)
            ->with('success', 'Package updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        $package->delete();

        return redirect()->route('packages.index')
            ->with('success', 'Package deleted successfully.');
    }
}