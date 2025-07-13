import Link from 'next/link';
import { RecipePreview } from '@/lib/types';
import { ChevronRightIcon } from './ui/Icons';
import RecipeMeta from './ui/RecipeMeta';
import TagList from './ui/TagList';
import { ROUTES, UI_CONFIG } from '@/lib/constants';

interface RecipeRowProps {
  recipe: RecipePreview;
}

export default function RecipeRow({ recipe }: RecipeRowProps) {
  return (
    <Link 
      href={ROUTES.recipe(recipe.slug)}
      className="group block mb-4 last:mb-0"
      aria-label={`View recipe: ${recipe.title}`}
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
        <div className="flex">
          {/* Recipe Info */}
          <div className="flex-1 min-w-0 p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
              {recipe.title}
            </h3>
            <p className="text-gray-700 text-sm mb-2 line-clamp-2">
              {recipe.description}
            </p>
            
            {/* Meta Info and Tags in a row */}
            <div className="flex items-center justify-between">
              <RecipeMeta 
                meta={{
                  cookingTime: recipe.cookingTime,
                  servings: recipe.servings,
                  difficulty: recipe.difficulty
                }}
              />

              {/* Tags */}
              <TagList 
                tags={recipe.tags} 
                maxDisplay={UI_CONFIG.maxTagsDisplay} 
                showCount 
                tagClassName="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors"
                disableLinks={true}
              />
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="flex-shrink-0 p-4">
            <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
} 