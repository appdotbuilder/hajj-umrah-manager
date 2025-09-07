<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TravelSetting>
 */
class TravelSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'travel_name' => fake()->randomElement([
                'Al-Barakah Hajj & Umrah',
                'Madinah Travel Services',
                'Sacred Journey Tours',
                'Hajj Express International',
                'Divine Path Travel'
            ]),
            'travel_logo' => null,
            'travel_address' => fake()->address(),
            'travel_email' => fake()->companyEmail(),
            'travel_phone' => fake()->phoneNumber(),
            'license_number' => fake()->regexify('[A-Z]{2}-[0-9]{6}'),
            'terms_conditions' => fake()->paragraphs(3, true),
        ];
    }
}