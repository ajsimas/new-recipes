import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const recipesDirectory = path.join(process.cwd(), 'src/content/recipes');

export interface Recipe {
  slug: string;
  title: string;
  cookingTime: string;
  servings: string | number;
  tags: string[];
  image: string;
  date: string;
  description: string;
  content?: string;
}

export interface RecipePreview {
  slug: string;
  title: string;
  cookingTime: string;
  servings: string | number;
  difficulty?: string;
  tags: string[];
  image: string;
  date: string;
  description: string;
}

export function getAllRecipes(): RecipePreview[] {
  // Get file names under /recipes
  const fileNames = fs.readdirSync(recipesDirectory);
  const allRecipesData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(recipesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the slug
      return {
        slug,
        ...(matterResult.data as Omit<RecipePreview, 'slug'>),
      };
    });

  // Sort recipes by date
  return allRecipesData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRecipeBySlug(slug: string): Recipe | null {
  try {
    const fullPath = path.join(recipesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = remark()
      .use(html)
      .processSync(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and content
    return {
      slug,
      content: contentHtml,
      ...(matterResult.data as Omit<Recipe, 'slug' | 'content'>),
    };
  } catch {
    return null;
  }
}

 