<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Display search results.
     */
    public function index(Request $request)
    {
        $query = $request->get('q', '');
        $category = $request->get('category', '');
        $tag = $request->get('tag', '');
        
        $postsQuery = Post::with(['author', 'category', 'tags'])
            ->published();
        
        // Search in title, excerpt, and content
        if ($query) {
            $postsQuery->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('excerpt', 'like', "%{$query}%")
                  ->orWhere('content', 'like', "%{$query}%");
            });
        }
        
        // Filter by category
        if ($category) {
            $postsQuery->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category);
            });
        }
        
        // Filter by tag
        if ($tag) {
            $postsQuery->whereHas('tags', function ($q) use ($tag) {
                $q->where('slug', $tag);
            });
        }
        
        $posts = $postsQuery->recent()->paginate(10)->appends($request->query());
        
        // Get categories and tags for filters
        $categories = Category::orderBy('name')->get();
        $tags = Tag::orderBy('name')->get();
        
        return Inertia::render('search/index', [
            'posts' => $posts,
            'categories' => $categories,
            'tags' => $tags,
            'filters' => [
                'query' => $query,
                'category' => $category,
                'tag' => $tag,
            ]
        ]);
    }
}