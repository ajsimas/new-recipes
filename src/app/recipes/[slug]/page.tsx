import { getRecipeBySlug, getAllRecipes } from '@/lib/recipes';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <Link href="/recipes" className="hover:text-orange-600">
              Recipes
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">{recipe.title}</li>
        </ol>
      </nav>

      {/* Recipe Header */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="relative h-64 md:h-96">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
          <p className="text-gray-700 mb-6">{recipe.description}</p>
          
          {/* Recipe Meta */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{recipe.cookingTime}</div>
              <div className="text-sm text-gray-500">Cooking Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{recipe.servings}</div>
              <div className="text-sm text-gray-500">Servings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {new Date(recipe.date).toLocaleDateString()}
              </div>
              <div className="text-sm text-gray-500">Added</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: recipe.content || '' }}
        />
      </div>
    </div>
  );
} 