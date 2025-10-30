
import React from 'react';

interface HeaderProps {
  data?: {
    projectCode?: string;
    title?: string;
    clientName?: string;
    location?: string;
    company?: {
      name?: string;
      tagline?: string;
    }
  }
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  return (
    <header className="py-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex justify-between items-start">
        <div className="text-sm text-gray-600">
          <p className="font-semibold">{data?.projectCode}</p>
          <p>{data?.title}</p>
          <p className="mt-2">&gt; {data?.clientName}</p>
          <p>&gt; {data?.location}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold tracking-widest">{data?.company?.name}</h2>
          <p className="text-xs text-gray-500 tracking-wider">{data?.company?.tagline}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
