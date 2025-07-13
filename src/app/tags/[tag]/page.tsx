import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRecipesByTag, getAllTags } from '@/lib/recipes';
import RecipeRow from '@/components/RecipeRow';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map(({ tag }) => ({
    tag: tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const recipes = getRecipesByTag(tag);

  // Check if tag exists
  const allTags = getAllTags();
  const tagExists = allTags.some((t) => t.tag === tag);

  if (!tagExists) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/tags" className="hover:text-orange-600">
              Tags
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">{tag}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200 mb-4">
          Recipes tagged "{tag}"
        </h1>
        <p className="text-gray-400">
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
        </p>
      </div>

      {/* Recipes List */}
      <div>
        {recipes.map((recipe) => (
          <RecipeRow key={recipe.slug} recipe={recipe} />
        ))}
      </div>

      {/* Empty State */}
      {recipes.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No recipes found</h3>
          <p className="text-gray-600">No recipes are tagged with "{tag}".</p>
        </div>
      )}
    </div>
  );
} 