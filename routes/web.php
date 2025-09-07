<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PilgrimController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Packages management
    Route::resource('packages', PackageController::class);
    
    // Pilgrims management
    Route::resource('pilgrims', PilgrimController::class);
    
    // Inventory management
    Route::resource('inventory', InventoryController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
