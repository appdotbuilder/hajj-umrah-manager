<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Airline>
 */
class AirlineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $airlines = [
            ['name' => 'Saudi Arabian Airlines', 'code' => 'SVA', 'country' => 'Saudi Arabia'],
            ['name' => 'Emirates', 'code' => 'EKA', 'country' => 'UAE'],
            ['name' => 'Qatar Airways', 'code' => 'QTR', 'country' => 'Qatar'],
            ['name' => 'Etihad Airways', 'code' => 'ETD', 'country' => 'UAE'],
            ['name' => 'Fly Dubai', 'code' => 'FDB', 'country' => 'UAE'],
            ['name' => 'Air Arabia', 'code' => 'ABY', 'country' => 'UAE'],
            ['name' => 'Gulf Air', 'code' => 'GFA', 'country' => 'Bahrain'],
            ['name' => 'Turkish Airlines', 'code' => 'THY', 'country' => 'Turkey'],
        ];
        
        $airline = fake()->randomElement($airlines);
        
        return [
            'name' => $airline['name'],
            'code' => $airline['code'],
            'country' => $airline['country'],
            'contact_email' => fake()->optional(0.8)->companyEmail(),
            'contact_phone' => fake()->optional(0.7)->phoneNumber(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }
}