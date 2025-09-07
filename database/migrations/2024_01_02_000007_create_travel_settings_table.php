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
        Schema::create('travel_settings', function (Blueprint $table) {
            $table->id();
            $table->string('travel_name');
            $table->string('travel_logo')->nullable();
            $table->text('travel_address');
            $table->string('travel_email');
            $table->string('travel_phone');
            $table->string('license_number')->nullable();
            $table->text('terms_conditions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('travel_settings');
    }
};