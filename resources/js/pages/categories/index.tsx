import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    color: string;
    posts_count: number;
}

interface PaginationData {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    data: Category[];
}

interface Props {
    categories: PaginationData;
    [key: string]: unknown;
}

export default function CategoriesIndex({ categories }: Props) {
    const CategoryCard = ({ category }: { category: Category }) => (
        <Link href={`/categories/${category.slug}`}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                    <div 
                        className="w-12 h-12 rounded-full flex-shrink-0"
                        style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-gray-500">
                        {category.posts_count} {category.posts_count === 1 ? 'post' : 'posts'}
                    </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                
                {category.description && (
                    <p className="text-gray-600 line-clamp-3">{category.description}</p>
                )}
            </div>
        </Link>
    );

    return (
        <AppShell>
            <div className="container mx-auto px-6 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">📁 Browse Categories</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Explore our content organized by topics and themes. 
                        {categories.total > 0 && (
                            <span> Discover {categories.total} categories with valuable insights.</span>
                        )}
                    </p>
                </div>

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
                    <Link href="/" className="hover:text-blue-600">Home</Link>
                    <span>→</span>
                    <span className="text-gray-900">Categories</span>
                </nav>

                {/* Categories Grid */}
                {categories.data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.data.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📁</div>
                        <h2 className="text-2xl font-bold text-gray-700 mb-2">No Categories Yet</h2>
                        <p className="text-gray-600 mb-6">
                            Categories will appear here as content is organized and published.
                        </p>
                        <Link href="/posts">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                Browse All Posts
                            </button>
                        </Link>
                    </div>
                )}

                {/* Call to Action */}
                <div className="mt-16 bg-gray-50 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold mb-4">🎯 Can't Find What You're Looking For?</h2>
                    <p className="text-gray-600 mb-6 max-w-xl mx-auto">
                        Use our powerful search feature to find specific topics across all categories and posts.
                    </p>
                    <Link href="/search">
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mr-4">
                            Search Articles
                        </button>
                    </Link>
                    <Link href="/tags">
                        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white transition-colors">
                            Browse Tags
                        </button>
                    </Link>
                </div>
            </div>
        </AppShell>
    );
}