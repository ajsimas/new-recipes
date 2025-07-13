import Link from 'next/link';
import Image from 'next/image';
import { RecipePreview } from '@/lib/types';
import RecipeMeta from './ui/RecipeMeta';
import TagList from './ui/TagList';
import { ROUTES, UI_CONFIG } from '@/lib/constants';

interface RecipeCardProps {
  recipe: RecipePreview;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link 
      href={ROUTES.recipe(recipe.slug)} 
      className="group"
      aria-label={`View recipe: ${recipe.title}`}
    >
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48 bg-gray-200">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {recipe.description}
          </p>
          <RecipeMeta 
            meta={{
              cookingTime: recipe.cookingTime,
              servings: recipe.servings,
              difficulty: recipe.difficulty
            }}
            className="mb-3"
          />
          <TagList 
            tags={recipe.tags} 
            maxDisplay={UI_CONFIG.maxTagsDisplay} 
            showCount 
            tagClassName="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          />
        </div>
      </div>
    </Link>
  );
} 