import { notFound } from 'next/navigation';
import { getRecipesByTag, getAllTags } from '@/lib/recipes';
import RecipeRow from '@/components/RecipeRow';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/ui/Breadcrumb';
import EmptyState from '@/components/ui/EmptyState';
import { DocumentIcon } from '@/components/ui/Icons';
import { BreadcrumbItem } from '@/lib/types';
import { ROUTES } from '@/lib/constants';

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

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: ROUTES.home },
    { label: 'Tags', href: ROUTES.tags },
    { label: tag }
  ];

  return (
    <Container>
      <Breadcrumb items={breadcrumbItems} />

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Recipes tagged&nbsp;<span dangerouslySetInnerHTML={{ __html: '&quot;' + tag + '&quot;' }} />
        </h1>
        <p className="text-gray-600">
          {recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} found
        </p>
      </header>

      {/* Recipes List */}
      {recipes.length > 0 ? (
        <section aria-label="Recipe list">
          {recipes.map((recipe) => (
            <RecipeRow key={recipe.slug} recipe={recipe} />
          ))}
        </section>
      ) : (
        <EmptyState
          icon={<DocumentIcon className="mx-auto h-12 w-12" />}
          title="No recipes found"
          description={'No recipes are tagged with ' + tag + '.'}
        />
      )}
    </Container>
  );
} 