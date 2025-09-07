<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['hajj', 'umrah']);
            $table->text('description')->nullable();
            $table->decimal('price', 15, 2);
            $table->integer('duration_days');
            $table->date('departure_date');
            $table->date('return_date');
            $table->integer('max_pilgrims');
            $table->integer('available_slots');
            $table->json('itinerary')->nullable();
            $table->enum('status', ['active', 'inactive', 'full'])->default('active');
            $table->timestamps();
            
            $table->index(['type', 'status']);
            $table->index('departure_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};