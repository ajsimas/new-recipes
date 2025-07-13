import { ClockIcon, UsersIcon, LightningIcon } from './Icons';
import { RecipeMeta as RecipeMetaType } from '@/lib/types';

interface RecipeMetaProps {
  meta: RecipeMetaType;
  showDate?: boolean;
  className?: string;
}

export default function RecipeMeta({ meta, showDate = false, className = '' }: RecipeMetaProps) {
  return (
    <div className={`flex items-center space-x-4 text-sm text-gray-600 ${className}`}>
      <span className="flex items-center">
        <ClockIcon className="w-4 h-4 mr-1" />
        {meta.cookingTime}
      </span>
      <span className="flex items-center">
        <UsersIcon className="w-4 h-4 mr-1" />
        {meta.servings}
      </span>
      {meta.difficulty && (
        <span className="flex items-center">
          <LightningIcon className="w-4 h-4 mr-1" />
          {meta.difficulty}
        </span>
      )}
      {showDate && meta.date && (
        <span className="flex items-center">
          {new Date(meta.date).toLocaleDateString()}
        </span>
      )}
    </div>
  );
} 