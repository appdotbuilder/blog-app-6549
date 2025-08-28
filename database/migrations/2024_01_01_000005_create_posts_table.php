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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('Post title');
            $table->string('slug')->unique()->comment('URL-friendly post identifier');
            $table->text('excerpt')->comment('Post summary');
            $table->longText('content')->comment('Post content');
            $table->string('featured_image')->nullable()->comment('Featured image path');
            $table->enum('status', ['draft', 'published'])->default('draft')->comment('Post publication status');
            $table->integer('views_count')->default(0)->comment('Number of post views');
            $table->timestamp('published_at')->nullable()->comment('Post publication date');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('slug');
            $table->index('status');
            $table->index('published_at');
            $table->index(['status', 'published_at']);
            $table->index('views_count');
            $table->index('category_id');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};