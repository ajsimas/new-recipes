import Link from 'next/link';
import { getAllTags } from '@/lib/recipes';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200 mb-4">All Tags</h1>
        <p className="text-gray-400">
          Browse recipes by category
        </p>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300 group"
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {tag}
              </h3>
              <div className="text-2xl font-bold text-blue-600">{count}</div>
              <div className="text-sm text-gray-500">
                {count === 1 ? 'recipe' : 'recipes'}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {tags.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tags found</h3>
          <p className="text-gray-600">No recipes have been tagged yet.</p>
        </div>
      )}
    </div>
  );
} 