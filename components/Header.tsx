
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
    <header className="py-10 px-4 md:px-8 lg:px-16 bg-transparent">
      <div className="max-w-7xl mx-auto flex justify-between items-start">
        <div className="text-[10px] font-bold tracking-widest text-vlanc-black/60 uppercase font-sans">
          <p className="text-vlanc-primary font-bold mb-1">{data?.projectCode}</p>
          <p className="mb-3">{data?.title}</p>
          <div className="space-y-1 opacity-100 text-vlanc-black">
            <p className="flex items-center gap-2"><span className="text-vlanc-primary font-bold">/</span> {data?.clientName}</p>
            <p className="flex items-center gap-2"><span className="text-vlanc-primary font-bold">/</span> {data?.location}</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-[28px] font-serif font-bold tracking-[0.3em] text-vlanc-black leading-none">{data?.company?.name}</h2>
          <p className="text-[9px] text-vlanc-primary font-bold tracking-[0.4em] mt-2 uppercase">{data?.company?.tagline}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
