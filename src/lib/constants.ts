export const SITE_CONFIG = {
  name: 'Recipe Book',
  description: 'Delicious Recipes for Every Occasion',
  url: 'http://localhost:3000',
} as const;

export const ROUTES = {
  home: '/',
  recipes: '/recipes',
  tags: '/tags',
  recipe: (slug: string) => `/recipes/${slug}`,
  tag: (tag: string) => `/tags/${tag}`,
} as const;

export const UI_CONFIG = {
  maxTagsDisplay: 3,
  defaultImageHeight: 48,
  defaultImageWidth: 400,
} as const;

export const SORT_OPTIONS = {
  title: 'title',
  date: 'date',
  cookingTime: 'cookingTime',
} as const; 