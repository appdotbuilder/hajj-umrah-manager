<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create default users
        User::factory()->create([
            'name' => 'Owner',
            'email' => 'owner@travel.com',
        ]);

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@travel.com',
        ]);

        // Seed travel management data
        $this->call([
            TravelManagementSeeder::class,
        ]);
    }
}
