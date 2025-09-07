<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Pilgrim;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PilgrimController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pilgrims = Pilgrim::latest()
            ->paginate(15)
            ->through(function ($pilgrim) {
                return [
                    'id' => $pilgrim->id,
                    'name' => $pilgrim->name,
                    'email' => $pilgrim->email,
                    'phone' => $pilgrim->phone,
                    'passport_number' => $pilgrim->passport_number,
                    'passport_expiry' => $pilgrim->passport_expiry->format('Y-m-d'),
                    'gender' => ucfirst($pilgrim->gender),
                    'status' => $pilgrim->status,
                ];
            });

        return Inertia::render('pilgrims/index', [
            'pilgrims' => $pilgrims,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pilgrims/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:pilgrims,email',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'passport_number' => 'required|string|unique:pilgrims,passport_number',
            'passport_expiry' => 'required|date|after:today',
            'birth_date' => 'required|date|before:today',
            'gender' => 'required|in:male,female',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_phone' => 'required|string|max:20',
            'medical_conditions' => 'nullable|string',
        ]);

        $pilgrim = Pilgrim::create($validated);

        return redirect()->route('pilgrims.show', $pilgrim)
            ->with('success', 'Pilgrim registered successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pilgrim $pilgrim)
    {
        $pilgrim->load('bookings.package');
        
        return Inertia::render('pilgrims/show', [
            'pilgrim' => [
                'id' => $pilgrim->id,
                'name' => $pilgrim->name,
                'email' => $pilgrim->email,
                'phone' => $pilgrim->phone,
                'address' => $pilgrim->address,
                'passport_number' => $pilgrim->passport_number,
                'passport_expiry' => $pilgrim->passport_expiry->format('Y-m-d'),
                'birth_date' => $pilgrim->birth_date->format('Y-m-d'),
                'gender' => $pilgrim->gender,
                'emergency_contact_name' => $pilgrim->emergency_contact_name,
                'emergency_contact_phone' => $pilgrim->emergency_contact_phone,
                'medical_conditions' => $pilgrim->medical_conditions,
                'status' => $pilgrim->status,
                'bookings' => $pilgrim->bookings->map(function ($booking) {
                    return [
                        'id' => $booking->id,
                        'booking_number' => $booking->booking_number,
                        'package_name' => $booking->package->name,
                        'package_type' => $booking->package->type,
                        'total_amount' => $booking->total_amount,
                        'payment_status' => $booking->payment_status,
                        'booking_status' => $booking->booking_status,
                        'booking_date' => $booking->booking_date->format('Y-m-d'),
                    ];
                }),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pilgrim $pilgrim)
    {
        return Inertia::render('pilgrims/edit', [
            'pilgrim' => $pilgrim,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pilgrim $pilgrim)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:pilgrims,email,' . $pilgrim->id,
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'passport_number' => 'required|string|unique:pilgrims,passport_number,' . $pilgrim->id,
            'passport_expiry' => 'required|date|after:today',
            'birth_date' => 'required|date|before:today',
            'gender' => 'required|in:male,female',
            'emergency_contact_name' => 'required|string|max:255',
            'emergency_contact_phone' => 'required|string|max:20',
            'medical_conditions' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        $pilgrim->update($validated);

        return redirect()->route('pilgrims.show', $pilgrim)
            ->with('success', 'Pilgrim updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pilgrim $pilgrim)
    {
        $pilgrim->delete();

        return redirect()->route('pilgrims.index')
            ->with('success', 'Pilgrim deleted successfully.');
    }
}