import { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export default function EmptyState({ icon, title, description, className = '' }: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-gray-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
} 