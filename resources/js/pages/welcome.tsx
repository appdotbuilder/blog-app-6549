import React from 'react';
import { router, Link } from '@inertiajs/react';
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
    posts_count: number;
}

interface Tag {
    id: number;
    name: string;
    slug: string;
    color: string;
    posts_count: number;
}

interface Props {
    popularPosts: Post[];
    recentPosts: Post[];
    categories: Category[];
    tags: Tag[];
    [key: string]: unknown;
}

export default function Welcome({ popularPosts, recentPosts, categories, tags }: Props) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/search', { q: searchQuery });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const PostCard = ({ post, featured = false }: { post: Post; featured?: boolean }) => (
        <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${featured ? 'md:col-span-2' : ''}`}>
            {post.featured_image && (
                <div className={`relative ${featured ? 'h-64' : 'h-48'}`}>
                    <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                        <span 
                            className="px-3 py-1 rounded-full text-white text-sm font-medium"
                            style={{ backgroundColor: post.category.color }}
                        >
                            {post.category.name}
                        </span>
                    </div>
                </div>
            )}
            <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span>👤 {post.author.name}</span>
                    <span>•</span>
                    <span>📅 {formatDate(post.published_at)}</span>
                </div>
                
                <h3 className={`font-bold mb-2 hover:text-blue-600 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
                    <Link href={`/posts/${post.slug}`}>
                        {post.title}
                    </Link>
                </h3>
                
                <p className={`text-gray-600 mb-4 ${featured ? 'line-clamp-3' : 'line-clamp-2'}`}>
                    {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>👁️ {post.views_count.toLocaleString()}</span>
                        <span>⏱️ {post.reading_time}</span>
                    </div>
                    
                    <div className="flex gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                            <span 
                                key={tag.slug} 
                                className="px-2 py-1 rounded-full text-xs border"
                                style={{ borderColor: tag.color, color: tag.color }}
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppShell>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            📚 Discover Amazing Stories & Ideas
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Explore our collection of insightful articles, tutorials, and stories. 
                            Find exactly what you're looking for with our powerful search and filtering options.
                        </p>
                        
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 mb-8">
                            <div className="relative flex-1">
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
                            <button 
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Search
                            </button>
                        </form>
                        
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/posts">
                                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2">
                                    📖 Browse All Posts
                                </button>
                            </Link>
                            <Link href="/categories">
                                <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                                    📁 Explore Categories
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-12">
                {/* Popular Posts Section */}
                {popularPosts.length > 0 && (
                    <section className="mb-16">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">🔥 Popular Posts</h2>
                                <p className="text-gray-600">Most viewed articles this month</p>
                            </div>
                            <Link href="/posts">
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    View All →
                                </button>
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularPosts.slice(0, 6).map((post, index) => (
                                <PostCard 
                                    key={post.id} 
                                    post={post} 
                                    featured={index === 0}
                                />
                            ))}
                        </div>
                    </section>
                )}

                {/* Categories Section */}
                {categories.length > 0 && (
                    <section className="mb-16">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">📁 Browse by Category</h2>
                                <p className="text-gray-600">Find articles by topic</p>
                            </div>
                            <Link href="/categories">
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    View All →
                                </button>
                            </Link>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {categories.map((category) => (
                                <Link key={category.id} href={`/categories/${category.slug}`}>
                                    <div className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                                        <div 
                                            className="w-12 h-12 rounded-full mx-auto mb-3"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <h3 className="font-semibold mb-1">{category.name}</h3>
                                        <p className="text-sm text-gray-600">
                                            {category.posts_count} {category.posts_count === 1 ? 'post' : 'posts'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recent Posts Section */}
                {recentPosts.length > 0 && (
                    <section className="mb-16">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">⚡ Latest Posts</h2>
                                <p className="text-gray-600">Fresh content just published</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recentPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Popular Tags */}
                {tags.length > 0 && (
                    <section>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold mb-2">🏷️ Popular Tags</h2>
                            <p className="text-gray-600">Discover content by tags</p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-3">
                            {tags.map((tag) => (
                                <Link key={tag.id} href={`/tags/${tag.slug}`}>
                                    <span 
                                        className="px-4 py-2 rounded-full hover:shadow-md transition-shadow cursor-pointer inline-flex items-center gap-1"
                                        style={{ 
                                            backgroundColor: tag.color + '20',
                                            color: tag.color,
                                            border: `1px solid ${tag.color}40`
                                        }}
                                    >
                                        🏷️ {tag.name} ({tag.posts_count})
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

                {/* Call to Action for Registration */}
                <section className="mt-20 bg-gray-50 rounded-xl p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">✍️ Ready to Start Writing?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Join our community of writers and share your knowledge with the world. 
                        Create engaging content and connect with readers who share your interests.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/register">
                            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                                Join Our Community
                            </button>
                        </Link>
                        <Link href="/login">
                            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors font-semibold">
                                Sign In
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </AppShell>
    );
}