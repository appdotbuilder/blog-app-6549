<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with popular posts and categories.
     */
    public function index()
    {
        // Get popular posts (most viewed)
        $popularPosts = Post::with(['author', 'category', 'tags'])
            ->published()
            ->popular()
            ->limit(6)
            ->get();
        
        // Get recent posts
        $recentPosts = Post::with(['author', 'category', 'tags'])
            ->published()
            ->recent()
            ->limit(3)
            ->get();
        
        // Get all categories with post counts
        $categoriesQuery = Category::withCount(['posts' => function ($query) {
            $query->where('status', 'published')->whereNotNull('published_at');
        }]);
        
        $categories = $categoriesQuery->get()->filter(function ($category) {
            return $category->posts_count > 0;
        })->sortByDesc('posts_count')->take(8)->values();
        
        // Get popular tags
        $tagsQuery = Tag::withCount(['posts' => function ($query) {
            $query->where('status', 'published')->whereNotNull('published_at');
        }]);
        
        $tags = $tagsQuery->get()->filter(function ($tag) {
            return $tag->posts_count > 0;
        })->sortByDesc('posts_count')->take(12)->values();
        
        return Inertia::render('welcome', [
            'popularPosts' => $popularPosts,
            'recentPosts' => $recentPosts,
            'categories' => $categories,
            'tags' => $tags,
        ]);
    }
}