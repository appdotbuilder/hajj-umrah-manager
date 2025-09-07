<?php

namespace Database\Factories;

use App\Models\Package;
use App\Models\Pilgrim;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $totalAmount = fake()->randomFloat(2, 15000, 75000);
        $paidAmount = fake()->randomFloat(2, 0, $totalAmount);
        $remainingAmount = $totalAmount - $paidAmount;
        
        $paymentStatus = 'pending';
        if ($paidAmount == 0) {
            $paymentStatus = 'pending';
        } elseif ($paidAmount >= $totalAmount) {
            $paymentStatus = 'paid';
            $remainingAmount = 0;
        } else {
            $paymentStatus = 'partial';
        }
        
        return [
            'booking_number' => 'BK' . fake()->unique()->numerify('######'),
            'package_id' => Package::factory(),
            'pilgrim_id' => Pilgrim::factory(),
            'total_amount' => $totalAmount,
            'paid_amount' => $paidAmount,
            'remaining_amount' => $remainingAmount,
            'payment_status' => $paymentStatus,
            'booking_status' => fake()->randomElement(['confirmed', 'cancelled', 'completed']),
            'booking_date' => fake()->dateTimeBetween('-6 months', 'now'),
            'notes' => fake()->optional(0.4)->sentence(),
        ];
    }

    /**
     * Indicate that the booking has unpaid balance.
     */
    public function unpaid(): static
    {
        return $this->state(fn (array $attributes) => [
            'paid_amount' => 0,
            'remaining_amount' => $attributes['total_amount'],
            'payment_status' => 'pending',
        ]);
    }

    /**
     * Indicate that the booking is fully paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'paid_amount' => $attributes['total_amount'],
            'remaining_amount' => 0,
            'payment_status' => 'paid',
        ]);
    }
}