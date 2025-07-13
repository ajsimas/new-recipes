import { getRecipeBySlug, getRecipeSlugs } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import RecipeContent from './RecipeContent';

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getRecipeSlugs();
  return slugs.map((slug) => ({
    slug,
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