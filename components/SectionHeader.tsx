import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, centered = false }) => {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white font-traditional mb-2 inline-block relative">
        {title}
        <span className="block h-1 w-1/2 bg-amber-500 mt-2 rounded-full mx-auto"></span>
      </h2>
      {subtitle && <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
};

export default SectionHeader;