<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Category;
use App\Models\Post;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with(['author', 'category', 'tags'])
            ->published()
            ->recent()
            ->paginate(10);
            
        return Inertia::render('posts/index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::orderBy('name')->get();
        $tags = Tag::orderBy('name')->get();
        
        return Inertia::render('posts/create', [
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();
        $validated['user_id'] = auth()->id();
        
        if ($validated['status'] === 'published' && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }
        
        $tags = $validated['tags'] ?? [];
        unset($validated['tags']);
        
        $post = Post::create($validated);
        
        if (!empty($tags)) {
            $post->tags()->attach($tags);
        }

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        $post->load(['author', 'category', 'tags']);
        
        // Increment views count
        $post->incrementViews();
        
        return Inertia::render('posts/show', [
            'post' => $post
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        $post->load('tags');
        $categories = Category::orderBy('name')->get();
        $tags = Tag::orderBy('name')->get();
        
        return Inertia::render('posts/edit', [
            'post' => $post,
            'categories' => $categories,
            'tags' => $tags
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $validated = $request->validated();
        
        if ($validated['status'] === 'published' && !$post->published_at) {
            $validated['published_at'] = now();
        }
        
        $tags = $validated['tags'] ?? [];
        unset($validated['tags']);
        
        $post->update($validated);
        
        $post->tags()->sync($tags);

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return redirect()->route('posts.index')
            ->with('success', 'Post deleted successfully.');
    }
}