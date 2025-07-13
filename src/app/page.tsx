import { getAllRecipes } from '@/lib/recipes';
import RecipeRow from '@/components/RecipeRow';
import Container from '@/components/ui/Container';
import EmptyState from '@/components/ui/EmptyState';
import { DocumentIcon } from '@/components/ui/Icons';

export default function Home() {
  const recipes = getAllRecipes().sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Container>
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-200 mb-4">All Recipes</h1>
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
          description="Check back soon for new recipes!"
        />
      )}
    </Container>
  );
}
