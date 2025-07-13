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
  difficulty?: string;
}

export interface RecipePreview {
  slug: string;
  title: string;
  cookingTime: string;
  servings: string | number;
  tags: string[];
  image: string;
  date: string;
  description: string;
  difficulty?: string;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface RecipeMeta {
  cookingTime: string;
  servings: string | number;
  difficulty?: string;
  date?: string;
} 