<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\InventoryItem
 *
 * @property int $id
 * @property string $name
 * @property string $sku
 * @property string|null $description
 * @property string $category
 * @property int $quantity
 * @property int $min_stock_level
 * @property float $unit_price
 * @property string|null $supplier
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereMinStockLevel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereSku($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereSupplier($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|InventoryItem whereUpdatedAt($value)
 * @method static \Database\Factories\InventoryItemFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class InventoryItem extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'sku',
        'description',
        'category',
        'quantity',
        'min_stock_level',
        'unit_price',
        'supplier',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'unit_price' => 'decimal:2',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}