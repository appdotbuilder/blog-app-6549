<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@blog.com',
        ]);

        // Create regular users
        $users = User::factory(5)->create();
        $allUsers = $users->push($admin);

        // Create categories
        $categories = Category::factory(8)->create();

        // Create tags
        $tags = Tag::factory(15)->create();

        // Create posts
        $posts = Post::factory(50)
            ->recycle($allUsers)
            ->recycle($categories)
            ->published()
            ->create();

        // Attach random tags to posts
        $posts->each(function ($post) use ($tags) {
            $post->tags()->attach(
                $tags->random(random_int(1, 5))->pluck('id')->toArray()
            );
        });

        // Create some draft posts
        Post::factory(10)
            ->recycle($allUsers)
            ->recycle($categories)
            ->draft()
            ->create()
            ->each(function ($post) use ($tags) {
                $post->tags()->attach(
                    $tags->random(random_int(1, 3))->pluck('id')->toArray()
                );
            });
    }
}
