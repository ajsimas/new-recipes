import Link from 'next/link';
import { getAllTags } from '@/lib/recipes';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import { TagIcon } from '@/components/ui/Icons';
import { ROUTES } from '@/lib/constants';

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <Container>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Tags</h1>
        <p className="text-gray-600">
          Browse recipes by category
        </p>
      </header>

      {/* Tags Grid */}
      {tags.length > 0 ? (
        <section aria-label="Tag list">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tags.map(({ tag, count }) => (
              <Link
                key={tag}
                href={ROUTES.tag(tag)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-300 group"
                aria-label={`View ${count} recipe${count === 1 ? '' : 's'} tagged with ${tag}`}
              >
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {tag}
                  </h3>
                  <div className="text-2xl font-bold text-orange-600">{count}</div>
                  <div className="text-sm text-gray-500">
                    {count === 1 ? 'recipe' : 'recipes'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : (
        <EmptyState
          icon={<TagIcon className="mx-auto h-12 w-12" />}
          title="No tags found"
          description="No recipes have been tagged yet."
        />
      )}
    </Container>
  );
} 