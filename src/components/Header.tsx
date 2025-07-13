'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookIcon } from './ui/Icons';
import { SITE_CONFIG, ROUTES } from '@/lib/constants';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-white shadow-sm border-b" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={ROUTES.home} className="flex items-center space-x-2" aria-label="Go to homepage">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <BookIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">{SITE_CONFIG.name}</span>
          </Link>
          
          <nav className="flex items-center space-x-6" role="navigation" aria-label="Main navigation">
            <Link 
              href={ROUTES.home} 
              className={`transition-colors font-medium ${
                isActive(ROUTES.home) 
                  ? 'text-orange-600' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
              aria-current={isActive(ROUTES.home) ? 'page' : undefined}
            >
              Home
            </Link>
            <Link 
              href={ROUTES.tags} 
              className={`transition-colors font-medium ${
                isActive(ROUTES.tags) 
                  ? 'text-orange-600' 
                  : 'text-gray-600 hover:text-orange-600'
              }`}
              aria-current={isActive(ROUTES.tags) ? 'page' : undefined}
            >
              Tags
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 