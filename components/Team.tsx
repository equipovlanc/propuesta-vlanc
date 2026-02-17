
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface TeamMember {
    name?: string;
    role?: string;
    image?: { src: string; opacity?: number };
}

interface TeamProps {
    data?: {
        title?: string;
        purpose?: {
            title?: string;
            description?: string;
        };
        history?: {
            title?: string;
            description?: string;
        };
        members?: TeamMember[];
    }
}

const Team: React.FC<TeamProps> = ({ data }) => {
  const members = data?.members || [];

  return (
    <section className="h-screen w-full bg-vlanc-bg flex flex-col relative overflow-hidden">
        
        {/* Título de Sección (J1) */}
        <div className="absolute top-[150px] left-[120px] z-20">
            <AnimatedSection hierarchy={1}>
                <h2 className="subtitulo1 text-vlanc-black">
                    {data?.title || "conoce a VLANC"}
                </h2>
                <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]"></div>
            </AnimatedSection>
        </div>

        {/* Contenedor Principal */}
        <div className="flex w-full mt-[297px] h-[calc(100vh-297px)] pb-[140px]">
            
            {/* MITAD IZQUIERDA (50%): IMÁGENES (J3) */}
            <div className="w-1/2 h-full pr-[30px] pl-0">
                <div className="grid grid-cols-2 gap-x-[50px] h-full items-stretch content-between">
                    {members.map((member, index) => {
                        const isBottomRow = index >= 2;
                        const imgSrc = member.image?.src;
                        const imgOpacity = member.image?.opacity ?? 15;

                        return (
                            <AnimatedSection 
                                key={index} 
                                hierarchy={3}
                                className={`flex flex-col w-full ${isBottomRow ? 'justify-end' : 'justify-start'}`}
                            >
                                {/* Imagen */}
                                <div className="w-full aspect-[428/264] overflow-hidden rounded-[1px] relative">
                                    {imgSrc ? (
                                        <div className="w-full h-full relative group">
                                            <img src={imgSrc} alt={member.name} className="w-full h-full object-cover" />
                                            {/* Overlay estático */}
                                            <div 
                                                className="absolute inset-0 bg-[#8f4933] pointer-events-none transition-opacity duration-300 group-hover:opacity-0"
                                                style={{ opacity: imgOpacity / 100 }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center border border-vlanc-bg">
                                            <span className="text-[10px] text-vlanc-secondary/40 uppercase tracking-widest">Foto {member.name}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Pie de foto */}
                                <div className="mt-2 flex justify-end items-baseline gap-2 text-right w-full">
                                    <span className="piedefoto1 whitespace-nowrap">
                                        {member.name}
                                    </span>
                                    <span className="piedefoto2 whitespace-nowrap">
                                        – {member.role}
                                    </span>
                                </div>
                            </AnimatedSection>
                        );
                    })}
                </div>
            </div>

            {/* MITAD DERECHA (50%): TEXTO (J2) */}
            <div className="w-1/2 h-full pl-[50px] pr-[120px] flex flex-col justify-between text-left">
                
                {/* Bloque Superior: Nuestro propósito */}
                <AnimatedSection className="flex flex-col items-start" hierarchy={2}>
                    <h3 className="subtitulo2 mb-6">
                        {data?.purpose?.title || "Nuestro propósito"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 text-left"
                        dangerouslySetInnerHTML={{ __html: (data?.purpose?.description || '').trim() }}
                    />
                </AnimatedSection>

                {/* Bloque Inferior: Nuestra historia */}
                <AnimatedSection className="flex flex-col items-start pb-0 shrink-0" hierarchy={2}>
                    <h3 className="subtitulo2 mb-6">
                        {data?.history?.title || "Nuestra historia"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 text-left [&>p:last-child]:mb-0"
                        dangerouslySetInnerHTML={{ __html: (data?.history?.description || '').trim() }}
                    />
                </AnimatedSection>
            </div>

        </div>
    </section>
  );
};

export default Team;
