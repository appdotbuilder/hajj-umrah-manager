<?php

namespace Database\Seeders;

use App\Models\Airline;
use App\Models\Booking;
use App\Models\InventoryItem;
use App\Models\Package;
use App\Models\Pilgrim;
use App\Models\Supplier;
use App\Models\TravelSetting;
use Illuminate\Database\Seeder;

class TravelManagementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create travel settings
        TravelSetting::factory()->create([
            'travel_name' => 'Al-Barakah Hajj & Umrah Services',
            'travel_email' => 'info@albarakah-travel.com',
            'travel_phone' => '+966 11 234 5678',
            'license_number' => 'SA-HAJ001',
        ]);

        // Create packages
        $hajjPackages = Package::factory()->hajj()->count(5)->create();
        $umrahPackages = Package::factory()->umrah()->count(8)->create();

        // Create pilgrims
        $pilgrims = Pilgrim::factory()->count(50)->create();

        // Create bookings
        $packages = Package::all();
        foreach ($pilgrims->take(30) as $pilgrim) {
            $package = $packages->random();
            Booking::factory()->create([
                'package_id' => $package->id,
                'pilgrim_id' => $pilgrim->id,
                'total_amount' => $package->price,
            ]);
        }

        // Create some unpaid bookings for dashboard
        Booking::factory()->unpaid()->count(10)->create();

        // Create inventory items
        InventoryItem::factory()->count(50)->create();
        InventoryItem::factory()->lowStock()->count(5)->create();
        InventoryItem::factory()->outOfStock()->count(3)->create();

        // Create suppliers
        Supplier::factory()->count(20)->create();
        Supplier::factory()->hotel()->count(3)->create();
        Supplier::factory()->transportation()->count(3)->create();

        // Create airlines
        Airline::factory()->count(8)->create();
    }
}