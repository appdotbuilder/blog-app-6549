import React from 'react';
import { Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image?: string;
    views_count: number;
    reading_time: string;
    published_at: string;
    author: {
        name: string;
    };
    category: {
        name: string;
        slug: string;
        color: string;
    };
    tags: Array<{
        name: string;
        slug: string;
        color: string;
    }>;
}

interface Category {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
}

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Post[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    posts: PaginationData;
    categories: Category[];
    tags: Tag[];
    filters: {
        query: string;
        category: string;
        tag: string;
    };
    [key: string]: unknown;
}

export default function SearchIndex({ posts, categories, tags, filters }: Props) {
    const [searchQuery, setSearchQuery] = React.useState(filters.query);
    const [selectedCategory, setSelectedCategory] = React.useState(filters.category);
    const [selectedTag, setSelectedTag] = React.useState(filters.tag);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params: Record<string, string> = {};
        
        if (searchQuery.trim()) params.q = searchQuery.trim();
        if (selectedCategory) params.category = selectedCategory;
        if (selectedTag) params.tag = selectedTag;
        
        router.get('/search', params);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
        setSelectedTag('');
        router.get('/search');
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const hasActiveFilters = filters.query || filters.category || filters.tag;

    const PostCard = ({ post }: { post: Post }) => (
        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {post.featured_image && (
                <div className="relative h-48">
                    <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                        <Link href={`/categories/${post.category.slug}`}>
                            <span 
                                className="px-3 py-1 rounded-full text-white text-sm font-medium hover:opacity-80 transition-opacity"
                                style={{ backgroundColor: post.category.color }}
                            >
                                {post.category.name}
                            </span>
                        </Link>
                    </div>
                </div>
            )}
            
            <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span>👤 {post.author.name}</span>
                    <span>•</span>
                    <span>📅 {formatDate(post.published_at)}</span>
                    <span>•</span>
                    <span>⏱️ {post.reading_time}</span>
                </div>
                
                <h2 className="text-xl font-bold mb-3 hover:text-blue-600 transition-colors">
                    <Link href={`/posts/${post.slug}`}>
                        {post.title}
                    </Link>
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>👁️ {post.views_count.toLocaleString()} views</span>
                    </div>
                    
                    <div className="flex gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                            <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                                <span 
                                    className="px-2 py-1 rounded-full text-xs border hover:opacity-80 transition-opacity"
                                    style={{ borderColor: tag.color, color: tag.color }}
                                >
                                    {tag.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );

    return (
        <AppShell>
            <div className="container mx-auto px-6 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">🔍 Search Results</h1>
                    <p className="text-gray-600">
                        {posts.total > 0 ? (
                            <>Found {posts.total} {posts.total === 1 ? 'result' : 'results'}</>
                        ) : (
                            'No results found'
                        )}
                        {hasActiveFilters && ' for your search criteria'}
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <form onSubmit={handleSearch} className="space-y-4">
                        {/* Search Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Query
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-3 text-gray-400">
                                    🔍
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category
                                </label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.slug} value={category.slug}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Tag Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tag
                                </label>
                                <select
                                    value={selectedTag}
                                    onChange={(e) => setSelectedTag(e.target.value)}
                                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">All Tags</option>
                                    {tags.map((tag) => (
                                        <option key={tag.slug} value={tag.slug}>
                                            {tag.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Search
                            </button>
                            {hasActiveFilters && (
                                <button 
                                    type="button"
                                    onClick={clearFilters}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Active Filters */}
                    {hasActiveFilters && (
                        <div className="mt-6 pt-6 border-t">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Active Filters:</h3>
                            <div className="flex flex-wrap gap-2">
                                {filters.query && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                        Query: "{filters.query}"
                                    </span>
                                )}
                                {filters.category && (
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                        Category: {categories.find(c => c.slug === filters.category)?.name}
                                    </span>
                                )}
                                {filters.tag && (
                                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                        Tag: {tags.find(t => t.slug === filters.tag)?.name}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Results */}
                {posts.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.data.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Results Found</h2>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your search terms or filters to find what you're looking for.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/posts">
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Browse All Posts
                                </button>
                            </Link>
                            <Link href="/categories">
                                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    Explore Categories
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}