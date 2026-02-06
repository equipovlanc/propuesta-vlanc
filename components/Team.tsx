
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
                <h2 className="subtitulo1 mb-4 tracking-tighter text-vlanc-black">
                    {data?.title || "conoce a VLANC"}
                </h2>
                <div className="w-20 h-[3px] bg-vlanc-primary"></div>
            </AnimatedSection>
        </div>

        {/* Bloque de Contenido: Comienza a 297px del borde superior */}
        <div className="flex w-full mt-[297px] h-full">
            
            {/* COLUMNA IZQUIERDA: Bloque de Imágenes (55.7% del ancho)
                - justify-end + pr-[30px]: Ajusta las imágenes al eje central con 30px de margen.
                - gap-x/y: 60px (margen entre fotos)
            */}
            <div className="w-[55.7%] h-full flex justify-end pr-[30px]">
                <div className="grid grid-cols-2 gap-x-[60px] gap-y-[60px]">
                    {members.map((member, index) => (
                        <AnimatedSection key={index} className="flex flex-col w-[428px]">
                            {/* Contenedor de imagen 428x264px */}
                            <div className="w-[428px] h-[264px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 rounded-[1px]">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center border-r border-b border-vlanc-bg">
                                        <span className="text-[10px] text-vlanc-secondary/40 uppercase tracking-widest">Foto {member.name}</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Info del miembro: Alineado al margen DERECHO de su imagen */}
                            <div className="mt-4 flex justify-end items-baseline gap-2 text-right w-[428px]">
                                <span className="piedefoto1 whitespace-nowrap">
                                    {member.name}
                                </span>
                                <span className="piedefoto2 whitespace-nowrap">
                                    – {member.role}
                                </span>
                            </div>
                        </AnimatedSection>
                    ))}
                </div>
            </div>

            {/* COLUMNA DERECHA: Textos (44.3% del ancho)
                - pl-[30px]: Margen desde el eje central (total 60px con el pr-30 de la izq).
                - pr-[120px]: Margen derecho de la página.
                - text-right: Alineación del texto a la derecha.
            */}
            <div className="w-[44.3%] h-full pl-[30px] pr-[120px] flex flex-col space-y-16 text-right">
                
                {/* Bloque: Nuestro propósito */}
                <AnimatedSection className="flex flex-col items-end">
                    <h3 className="subtitulo2 mb-6">
                        {data?.purpose?.title || "Nuestro propósito"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 max-w-lg"
                        dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                    />
                </AnimatedSection>

                {/* Bloque: Nuestra historia */}
                <AnimatedSection className="flex flex-col items-end">
                    <h3 className="subtitulo2 mb-6">
                        {data?.history?.title || "Nuestra historia"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 font-bold max-w-lg"
                        dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                    />
                </AnimatedSection>
            </div>

        </div>
    </section>
  );
};

export default Team;
