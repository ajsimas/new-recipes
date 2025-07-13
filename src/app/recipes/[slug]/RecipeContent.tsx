"use client";

import Image from 'next/image';
import { Recipe } from '@/lib/types';
import Breadcrumb from '@/components/ui/Breadcrumb';
import TagList from '@/components/ui/TagList';
import { ROUTES } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

interface RecipeContentProps {
  recipe: Recipe;
}

export default function RecipeContent({ recipe }: RecipeContentProps) {
  const breadcrumbItems = [
    { label: 'Home', href: ROUTES.home },
    { label: 'Recipes', href: ROUTES.recipes },
    { label: recipe.title }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={breadcrumbItems} />

      {/* Recipe Header */}
      <article className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <div className="relative h-64 md:h-96">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="p-6">
          <header>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
            <p className="text-gray-700 mb-6">{recipe.description}</p>
          </header>
          
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
                {formatDate(recipe.date)}
              </div>
              <div className="text-sm text-gray-500">Added</div>
            </div>
          </div>

          {/* Tags */}
          <TagList 
            tags={recipe.tags} 
            tagClassName="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full hover:bg-orange-200 transition-colors"
          />
        </div>
      </article>

      {/* Recipe Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div 
          className="prose prose-gray max-w-none"
          style={{ 
            wordBreak: 'break-word', 
            overflowWrap: 'break-word'
          }}
          dangerouslySetInnerHTML={{ __html: recipe.content || '' }}
        />
      </div>
    </div>
  );
} 