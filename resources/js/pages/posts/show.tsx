import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
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

interface Props {
    post: Post;
    [key: string]: unknown;
}

export default function PostShow({ post }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <AppShell>
            <div className="container mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span>→</span>
                    <Link href="/posts" className="hover:text-blue-600">Posts</Link>
                    <span>→</span>
                    <Link href={`/categories/${post.category.slug}`} className="hover:text-blue-600">
                        {post.category.name}
                    </Link>
                    <span>→</span>
                    <span className="text-gray-900">{post.title}</span>
                </nav>

                <article className="max-w-4xl mx-auto">
                    {/* Header */}
                    <header className="mb-8">
                        <div className="mb-4">
                            <Link href={`/categories/${post.category.slug}`}>
                                <span 
                                    className="px-3 py-1 rounded-full text-white text-sm font-medium hover:opacity-80 transition-opacity"
                                    style={{ backgroundColor: post.category.color }}
                                >
                                    {post.category.name}
                                </span>
                            </Link>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            {post.title}
                        </h1>
                        
                        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                            {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                            <div className="flex items-center gap-2">
                                <span>👤</span>
                                <span className="font-medium">{post.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>📅</span>
                                <span>{formatDate(post.published_at)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>⏱️</span>
                                <span>{post.reading_time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span>👁️</span>
                                <span>{post.views_count.toLocaleString()} views</span>
                            </div>
                        </div>
                        
                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-8">
                                {post.tags.map((tag) => (
                                    <Link key={tag.slug} href={`/tags/${tag.slug}`}>
                                        <span 
                                            className="px-3 py-1 rounded-full text-sm border hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                                            style={{ borderColor: tag.color, color: tag.color }}
                                        >
                                            🏷️ {tag.name}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </header>

                    {/* Featured Image */}
                    {post.featured_image && (
                        <div className="mb-8">
                            <img 
                                src={post.featured_image} 
                                alt={post.title}
                                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                    )}

                    {/* Content */}
                    <div 
                        className="prose prose-lg max-w-none mb-12"
                        dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br>') }}
                        style={{
                            lineHeight: '1.8',
                            fontSize: '1.125rem'
                        }}
                    />

                    {/* Footer */}
                    <footer className="border-t pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Written by {post.author.name}</h3>
                                <p className="text-gray-600">
                                    Published in <Link href={`/categories/${post.category.slug}`} className="text-blue-600 hover:underline">{post.category.name}</Link> • {formatDate(post.published_at)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-gray-500">{post.views_count.toLocaleString()} views</p>
                                <p className="text-sm text-gray-500">{post.reading_time}</p>
                            </div>
                        </div>
                    </footer>
                </article>

                {/* Navigation */}
                <div className="max-w-4xl mx-auto mt-12 pt-8 border-t">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <Link href="/posts">
                            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto">
                                ← Back to All Posts
                            </button>
                        </Link>
                        <Link href={`/categories/${post.category.slug}`}>
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto">
                                More in {post.category.name} →
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}