# Recipe Book

A beautiful recipe website built with Next.js that displays recipes stored in markdown files. Features a modern, responsive design with filtering by categories and a clean, user-friendly interface.

## Features

- 📖 **Markdown-based recipes** - Store recipes in easy-to-edit markdown files
- 🏷️ **Category filtering** - Browse recipes by tags and categories
- 📱 **Responsive design** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast performance** - Built with Next.js for optimal speed
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 🔍 **Search functionality** - Find recipes quickly and easily

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd new-recipes
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── categories/         # Category pages
│   ├── recipes/           # Recipe pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Site header
│   └── RecipeCard.tsx     # Recipe preview card
├── content/              # Content files
│   └── recipes/          # Recipe markdown files
└── lib/                  # Utility functions
    └── recipes.ts        # Recipe processing utilities
```

## Adding Recipes

To add a new recipe:

1. Create a new markdown file in `src/content/recipes/`
2. Use the following front matter format:

```markdown
---
title: "Recipe Title"
cookingTime: "30 minutes"
servings: 4
difficulty: "Easy"
tags: ["category1", "category2"]
image: "/images/recipe-image.jpg"
date: "2024-01-15"
description: "Brief description of the recipe"
---

# Recipe Title

Recipe description...

## Ingredients

- Ingredient 1
- Ingredient 2

## Instructions

1. Step 1
2. Step 2
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **gray-matter** - Markdown front matter parsing
- **remark** - Markdown processing
- **date-fns** - Date utilities

## License

This project is open source and available under the [MIT License](LICENSE).
