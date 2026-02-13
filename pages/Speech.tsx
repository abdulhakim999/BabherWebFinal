import React from 'react';
import SectionHeader from '../components/SectionHeader';
import ContentCard from '../components/ContentCard';
import { speechesData } from '../data';

const Speech: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeader 
        title="مكتبة الخطب" 
        subtitle="خطب الجمعة والأعياد والمناسبات الدينية" 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {speechesData.map(item => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Speech;