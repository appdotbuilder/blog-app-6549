import React from 'react';
import { Link } from '@inertiajs/react';
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
    description?: string;
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
    category: Category;
    posts: PaginationData;
    [key: string]: unknown;
}

export default function CategoryShow({ category, posts }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const PostCard = ({ post }: { post: Post }) => (
        <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {post.featured_image && (
                <div className="relative h-48">
                    <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
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

    const Pagination = ({ links }: { links: PaginationData['links'] }) => (
        <nav className="flex justify-center items-center gap-2 mt-8">
            {links.map((link, index) => {
                if (!link.url) {
                    return (
                        <span 
                            key={index}
                            className="px-3 py-2 text-gray-400"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }
                
                return (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-3 py-2 rounded-lg transition-colors ${
                            link.active
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </nav>
    );

    return (
        <AppShell>
            <div className="container mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span>→</span>
                    <Link href="/categories" className="hover:text-blue-600">Categories</Link>
                    <span>→</span>
                    <span className="text-gray-900">{category.name}</span>
                </nav>

                {/* Category Header */}
                <header className="text-center mb-12">
                    <div className="inline-flex items-center gap-4 mb-6">
                        <div 
                            className="w-16 h-16 rounded-full"
                            style={{ backgroundColor: category.color }}
                        />
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900">{category.name}</h1>
                            {category.description && (
                                <p className="text-lg text-gray-600 mt-2">{category.description}</p>
                            )}
                        </div>
                    </div>
                    
                    <p className="text-gray-600">
                        {posts.total} {posts.total === 1 ? 'post' : 'posts'} in this category
                    </p>
                </header>

                {/* Posts */}
                {posts.data.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.data.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                        
                        {/* Pagination */}
                        {posts.last_page > 1 && (
                            <Pagination links={posts.links} />
                        )}
                    </>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Posts Yet</h2>
                        <p className="text-gray-600 mb-6">
                            There are no published posts in this category yet. Check back later for new content!
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/posts">
                                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Browse All Posts
                                </button>
                            </Link>
                            <Link href="/categories">
                                <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    Other Categories
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Related Actions */}
                <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">📚 Explore More Content</h2>
                    <p className="text-gray-600 mb-6">
                        Discover more articles and insights across different topics.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/search">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Search Articles
                            </button>
                        </Link>
                        <Link href="/tags">
                            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors">
                                Browse by Tags
                            </button>
                        </Link>
                        <Link href="/categories">
                            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors">
                                All Categories
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}