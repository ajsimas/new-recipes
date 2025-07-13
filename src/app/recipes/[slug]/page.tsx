import { getRecipeBySlug, getAllRecipes } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import RecipeContent from './RecipeContent';

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  return <RecipeContent recipe={recipe} />;
} 