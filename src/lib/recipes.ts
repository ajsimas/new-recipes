import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { Recipe, RecipePreview, TagCount } from './types';

const recipesDirectory = path.join(process.cwd(), 'src/content/recipes');

export function getAllRecipes(): RecipePreview[] {
  try {
    const fileNames = fs.readdirSync(recipesDirectory);
    const allRecipesData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(recipesDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);

        return {
          slug,
          ...(matterResult.data as Omit<RecipePreview, 'slug'>),
        };
      });

    return allRecipesData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading recipes:', error);
    return [];
  }
}

export function getRecipeBySlug(slug: string): Recipe | null {
  try {
    const fullPath = path.join(recipesDirectory, `${slug}.md`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      slug,
      content: matterResult.content,
      ...(matterResult.data as Omit<Recipe, 'slug' | 'content'>),
    };
  } catch (error) {
    console.error(`Error reading recipe ${slug}:`, error);
    return null;
  }
}

export function getAllTags(): TagCount[] {
  try {
    const recipes = getAllRecipes();
    const tagCounts: Record<string, number> = {};

    recipes.forEach((recipe) => {
      recipe.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    return Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
  } catch (error) {
    console.error('Error getting tags:', error);
    return [];
  }
}

export function getRecipesByTag(tag: string): RecipePreview[] {
  try {
    const recipes = getAllRecipes();
    return recipes
      .filter((recipe) => recipe.tags.includes(tag))
      .sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error(`Error getting recipes for tag ${tag}:`, error);
    return [];
  }
}

export function getRecipeSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(recipesDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error getting recipe slugs:', error);
    return [];
  }
}

 