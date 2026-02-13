import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import { lecturesData } from '../data';

const Lectures: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="مكتبة المحاضرات" 
        subtitle="محاضرات عامة وندوات موسمية تناقش قضايا المجتمع" 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lecturesData.map(item => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Lectures;