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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Category name');
            $table->string('slug')->unique()->comment('URL-friendly category identifier');
            $table->text('description')->nullable()->comment('Category description');
            $table->string('color', 7)->default('#6B7280')->comment('Category display color');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('slug');
            $table->index('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};