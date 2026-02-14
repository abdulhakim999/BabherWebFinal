import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-3">
          <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4" />

        {/* Description */}
        <div className="space-y-2 flex-grow">
          <div className="h-3 w-full bg-gray-100 dark:bg-gray-700/50 rounded" />
          <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-700/50 rounded" />
          <div className="h-3 w-2/3 bg-gray-100 dark:bg-gray-700/50 rounded" />
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 mt-4">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
};

interface SkeletonGridProps {
  count?: number;
}

export const SkeletonGrid: React.FC<SkeletonGridProps> = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
};

export default SkeletonCard;
