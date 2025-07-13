'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/constants';

interface TagListProps {
  tags: string[];
  maxDisplay?: number;
  showCount?: boolean;
  className?: string;
  tagClassName?: string;
  onClick?: (tag: string) => void;
  disableLinks?: boolean;
}

export default function TagList({ 
  tags, 
  maxDisplay = 3, 
  showCount = false, 
  className = '',
  tagClassName = 'px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors',
  onClick,
  disableLinks = false
}: TagListProps) {
  const displayTags = tags.slice(0, maxDisplay);
  const remainingCount = tags.length - maxDisplay;

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    if (onClick) {
      e.preventDefault();
      e.stopPropagation();
      onClick(tag);
    }
  };

  return (
    <div className={`flex flex-wrap gap-1 ${className}`}>
      {displayTags.map((tag) => (
        disableLinks ? (
          <span
            key={tag}
            className={tagClassName}
          >
            {tag}
          </span>
        ) : (
          <Link
            key={tag}
            href={ROUTES.tag(tag)}
            className={tagClassName}
            onClick={(e) => handleTagClick(e, tag)}
          >
            {tag}
          </Link>
        )
      ))}
      {showCount && remainingCount > 0 && (
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
          +{remainingCount}
        </span>
      )}
    </div>
  );
} 