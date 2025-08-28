<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Post>
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(random_int(4, 8));
        $publishedAt = fake()->dateTimeBetween('-1 year', 'now');
        
        return [
            'title' => rtrim($title, '.'),
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(random_int(2, 4)),
            'content' => fake()->paragraphs(random_int(8, 20), true),
            'featured_image' => fake()->imageUrl(800, 400, 'business', true),
            'status' => fake()->randomElement(['published', 'draft']),
            'views_count' => fake()->numberBetween(0, 10000),
            'published_at' => fake()->boolean(80) ? $publishedAt : null,
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'created_at' => $publishedAt,
            'updated_at' => $publishedAt,
        ];
    }

    /**
     * Indicate that the post is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'published_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ]);
    }

    /**
     * Indicate that the post is a draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }
}