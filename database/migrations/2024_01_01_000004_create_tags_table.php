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
        Schema::create('tags', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Tag name');
            $table->string('slug')->unique()->comment('URL-friendly tag identifier');
            $table->string('color', 7)->default('#10B981')->comment('Tag display color');
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
        Schema::dropIfExists('tags');
    }
};