<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Package>
 */
class PackageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['hajj', 'umrah']);
        $departureDate = fake()->dateTimeBetween('+1 month', '+12 months');
        $duration = $type === 'hajj' ? random_int(35, 45) : random_int(7, 21);
        $returnDate = (clone $departureDate)->modify("+{$duration} days");
        
        return [
            'name' => fake()->randomElement([
                'Premium Hajj Package 2024',
                'VIP Umrah Experience',
                'Economic Hajj Journey',
                'Luxury Umrah Package',
                'Standard Hajj Program',
                'Express Umrah 7 Days',
                'Deluxe Hajj Package',
                'Quick Umrah Trip'
            ]),
            'type' => $type,
            'description' => fake()->paragraph(3),
            'price' => fake()->randomFloat(2, 15000, 75000),
            'duration_days' => $duration,
            'departure_date' => $departureDate,
            'return_date' => $returnDate,
            'max_pilgrims' => fake()->numberBetween(20, 200),
            'available_slots' => fake()->numberBetween(5, 50),
            'itinerary' => [
                'Day 1' => 'Departure and arrival in Saudi Arabia',
                'Day 2' => 'Hotel check-in and orientation',
                'Day 3' => 'Umrah rituals or Hajj preparation',
                'Day 4' => 'Religious activities and city tour',
                'Final Day' => 'Shopping and departure'
            ],
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the package is for Hajj.
     */
    public function hajj(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'hajj',
            'duration_days' => random_int(35, 45),
            'price' => fake()->randomFloat(2, 45000, 75000),
        ]);
    }

    /**
     * Indicate that the package is for Umrah.
     */
    public function umrah(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'umrah',
            'duration_days' => random_int(7, 21),
            'price' => fake()->randomFloat(2, 15000, 35000),
        ]);
    }

    /**
     * Indicate that the package is fully booked.
     */
    public function fullBooked(): static
    {
        return $this->state(fn (array $attributes) => [
            'available_slots' => 0,
            'status' => 'full',
        ]);
    }
}