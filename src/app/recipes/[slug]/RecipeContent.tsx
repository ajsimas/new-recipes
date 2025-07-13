"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Recipe } from '@/lib/recipes';

interface RecipeContentProps {
  recipe: Recipe;
}

export default function RecipeContent({ recipe }: RecipeContentProps) {
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
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full hover:bg-orange-200 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Content */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div 
          className="text-gray-900 [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8 [&>h1]:text-gray-900 [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-4 [&>h2]:mt-6 [&>h2]:text-gray-900 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-3 [&>h3]:mt-5 [&>h3]:text-gray-900 [&>p]:mb-4 [&>p]:leading-relaxed [&>ul]:mb-4 [&>ol]:mb-4 [&>li]:mb-2 [&>li]:ml-4"
          style={{ 
            wordBreak: 'break-word', 
            overflowWrap: 'break-word',
            width: '100%'
          }}
          dangerouslySetInnerHTML={{ __html: recipe.content || '' }}
        />
      </div>
    </div>
  );
} 