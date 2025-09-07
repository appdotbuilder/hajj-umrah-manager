<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $businessTypes = [
            'Hotel & Accommodation',
            'Transportation',
            'Food & Catering',
            'Travel Equipment',
            'Islamic Products',
            'Medical Services',
            'Currency Exchange',
            'Insurance'
        ];
        
        return [
            'name' => fake()->company(),
            'email' => fake()->unique()->companyEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'contact_person' => fake()->name(),
            'business_type' => fake()->randomElement($businessTypes),
            'services_offered' => fake()->sentence(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the supplier provides hotel services.
     */
    public function hotel(): static
    {
        return $this->state(fn (array $attributes) => [
            'business_type' => 'Hotel & Accommodation',
            'services_offered' => 'Hotel booking, room service, accommodation management',
        ]);
    }

    /**
     * Indicate that the supplier provides transportation.
     */
    public function transportation(): static
    {
        return $this->state(fn (array $attributes) => [
            'business_type' => 'Transportation',
            'services_offered' => 'Bus rental, airport transfers, local transportation',
        ]);
    }
}