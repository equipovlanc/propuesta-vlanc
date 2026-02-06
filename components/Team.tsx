
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface TeamMember {
    name?: string;
    role?: string;
    image?: string;
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
        
        {/* Título de Sección: Alineado al margen superior (140px) e izquierdo (120px) */}
        <div className="absolute top-[140px] left-[120px] z-20">
            <AnimatedSection>
                <h2 className="subtitulo1 mb-4 tracking-tighter">
                    {data?.title || "conoce a VLANC"}
                </h2>
                <div className="w-20 h-[3px] bg-vlanc-primary"></div>
            </AnimatedSection>
        </div>

        {/* Bloque de Contenido: Comienza a 297px del borde superior */}
        <div className="flex w-full mt-[297px] h-full">
            
            {/* COLUMNA IZQUIERDA: Imágenes (55.7% del ancho) 
                - Las imágenes de la izquierda van a sangre (margin-left: 0)
            */}
            <div className="w-[55.7%] h-full flex justify-start">
                <div className="grid grid-cols-2 gap-0">
                    {members.map((member, index) => (
                        <AnimatedSection key={index} className="flex flex-col">
                            {/* Contenedor de imagen con tamaño exacto 428x264px */}
                            <div className="w-[428px] h-[264px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center border-r border-b border-vlanc-bg">
                                        <span className="text-[10px] text-vlanc-secondary/40 uppercase tracking-widest">Foto {member.name}</span>
                                    </div>
                                )}
                            </div>
                            {/* Info del miembro debajo de la foto: Nombre y Cargo en la misma línea */}
                            <div className="mt-4 px-0 flex items-baseline gap-2">
                                <span className="piedefoto1">
                                    {member.name}
                                </span>
                                <span className="piedefoto2">
                                    – {member.role}
                                </span>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>

            {/* COLUMNA DERECHA: Textos (44.3% del ancho) 
                - El margen central entre imágenes y texto se ajusta a 60px (pl-[60px])
                - Se mantiene el margen derecho de 120px (pr-[120px])
            */}
            <div className="w-[44.3%] h-full pl-[60px] pr-[120px] flex flex-col space-y-12">
                
                {/* Bloque: Nuestro propósito */}
                <AnimatedSection>
                    <h3 className="subtitulo2 mb-6">
                        {data?.purpose?.title || "Nuestro propósito"}
                    </h3>
                    <div 
                        className="cuerpo space-y-4"
                        dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                    />
                </AnimatedSection>

                {/* Bloque: Nuestra historia */}
                <AnimatedSection>
                    <h3 className="subtitulo2 mb-6">
                        {data?.history?.title || "Nuestra historia"}
                    </h3>
                    <div 
                        className="cuerpo space-y-4 font-bold"
                        dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                    />
                </AnimatedSection>
            </div>

        </div>
    </section>
  );
};

export default Team;
