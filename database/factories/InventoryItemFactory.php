<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InventoryItem>
 */
class InventoryItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['Luggage', 'Prayer Items', 'Clothing', 'Electronics', 'Personal Care', 'Medical Supplies'];
        $category = fake()->randomElement($categories);
        
        $items = [
            'Luggage' => ['Travel Suitcase', 'Carry-on Bag', 'Duffle Bag', 'Backpack'],
            'Prayer Items' => ['Prayer Mat', 'Compass', 'Quran', 'Tasbih', 'Prayer Cap'],
            'Clothing' => ['Ihram Cloth', 'Abaya', 'Hijab', 'Sandals', 'Thobe'],
            'Electronics' => ['Power Bank', 'Phone Charger', 'Travel Adapter', 'Camera'],
            'Personal Care' => ['Toiletries Kit', 'Sunscreen', 'Hand Sanitizer', 'Towel'],
            'Medical Supplies' => ['First Aid Kit', 'Medications', 'Thermometer', 'Band-aids']
        ];
        
        $itemName = fake()->randomElement($items[$category]);
        $quantity = fake()->numberBetween(0, 500);
        $minStock = fake()->numberBetween(5, 50);
        
        $status = 'in_stock';
        if ($quantity === 0) {
            $status = 'out_of_stock';
        } elseif ($quantity <= $minStock) {
            $status = 'low_stock';
        }
        
        return [
            'name' => $itemName,
            'sku' => fake()->unique()->regexify('[A-Z]{3}-[0-9]{6}'),
            'description' => fake()->sentence(),
            'category' => $category,
            'quantity' => $quantity,
            'min_stock_level' => $minStock,
            'unit_price' => fake()->randomFloat(2, 5, 500),
            'supplier' => fake()->company(),
            'status' => $status,
        ];
    }

    /**
     * Indicate that the item is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'quantity' => 0,
            'status' => 'out_of_stock',
        ]);
    }

    /**
     * Indicate that the item has low stock.
     */
    public function lowStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'quantity' => fake()->numberBetween(1, $attributes['min_stock_level']),
            'status' => 'low_stock',
        ]);
    }
}