<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pilgrim>
 */
class PilgrimFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $gender = fake()->randomElement(['male', 'female']);
        
        return [
            'name' => fake()->name($gender),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'address' => fake()->address(),
            'passport_number' => fake()->unique()->regexify('[A-Z]{2}[0-9]{7}'),
            'passport_expiry' => fake()->dateTimeBetween('+1 year', '+10 years'),
            'birth_date' => fake()->dateTimeBetween('-80 years', '-18 years'),
            'gender' => $gender,
            'emergency_contact_name' => fake()->name(),
            'emergency_contact_phone' => fake()->phoneNumber(),
            'medical_conditions' => fake()->optional(0.3)->sentence(),
            'status' => fake()->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the pilgrim is male.
     */
    public function male(): static
    {
        return $this->state(fn (array $attributes) => [
            'gender' => 'male',
            'name' => fake()->name('male'),
        ]);
    }

    /**
     * Indicate that the pilgrim is female.
     */
    public function female(): static
    {
        return $this->state(fn (array $attributes) => [
            'gender' => 'female',
            'name' => fake()->name('female'),
        ]);
    }
}