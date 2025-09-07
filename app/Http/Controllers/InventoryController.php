<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InventoryItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = InventoryItem::latest()
            ->paginate(15)
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'sku' => $item->sku,
                    'category' => $item->category,
                    'quantity' => $item->quantity,
                    'min_stock_level' => $item->min_stock_level,
                    'unit_price' => $item->unit_price,
                    'supplier' => $item->supplier,
                    'status' => $item->status,
                ];
            });

        $summary = [
            'total_items' => InventoryItem::count(),
            'total_value' => InventoryItem::get()->sum(function ($item) {
                return $item->quantity * $item->unit_price;
            }),
            'low_stock_items' => InventoryItem::where('status', 'low_stock')->count(),
            'out_of_stock_items' => InventoryItem::where('status', 'out_of_stock')->count(),
        ];

        return Inertia::render('inventory/index', [
            'items' => $items,
            'summary' => $summary,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('inventory/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:inventory_items,sku',
            'description' => 'nullable|string',
            'category' => 'required|string|max:100',
            'quantity' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'supplier' => 'nullable|string|max:255',
        ]);

        // Determine status based on quantity
        $status = 'in_stock';
        if ($validated['quantity'] === 0) {
            $status = 'out_of_stock';
        } elseif ($validated['quantity'] <= $validated['min_stock_level']) {
            $status = 'low_stock';
        }

        $validated['status'] = $status;

        $item = InventoryItem::create($validated);

        return redirect()->route('inventory.show', $item)
            ->with('success', 'Inventory item added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(InventoryItem $inventory)
    {
        return Inertia::render('inventory/show', [
            'item' => $inventory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InventoryItem $inventory)
    {
        return Inertia::render('inventory/edit', [
            'item' => $inventory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryItem $inventory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:inventory_items,sku,' . $inventory->id,
            'description' => 'nullable|string',
            'category' => 'required|string|max:100',
            'quantity' => 'required|integer|min:0',
            'min_stock_level' => 'required|integer|min:1',
            'unit_price' => 'required|numeric|min:0',
            'supplier' => 'nullable|string|max:255',
        ]);

        // Update status based on quantity
        $status = 'in_stock';
        if ($validated['quantity'] === 0) {
            $status = 'out_of_stock';
        } elseif ($validated['quantity'] <= $validated['min_stock_level']) {
            $status = 'low_stock';
        }

        $validated['status'] = $status;

        $inventory->update($validated);

        return redirect()->route('inventory.show', $inventory)
            ->with('success', 'Inventory item updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryItem $inventory)
    {
        $inventory->delete();

        return redirect()->route('inventory.index')
            ->with('success', 'Inventory item deleted successfully.');
    }
}