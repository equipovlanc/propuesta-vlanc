
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
        
        {/* Título de Sección: Posición absoluta estándar (140px superior, 120px izquierdo) */}
        <div className="absolute top-[140px] left-[120px] z-20">
            <AnimatedSection>
                <h2 className="subtitulo1 mb-4 tracking-tighter text-vlanc-black">
                    {data?.title || "conoce a VLANC"}
                </h2>
                <div className="w-20 h-[3px] bg-vlanc-primary"></div>
            </AnimatedSection>
        </div>

        {/* Eje de Contenido: Comienza a 297px del borde superior */}
        <div className="flex w-full mt-[297px] h-full">
            
            {/* MITAD IZQUIERDA (50%): IMÁGENES
                - flex justify-end: Empuja el bloque hacia el centro.
                - pr-[30px]: El borde derecho de las fotos queda a 30px del eje central.
            */}
            <div className="w-1/2 h-full flex justify-end pr-[30px]">
                {/* Grid de fotos: gap de 60px entre columnas y filas */}
                <div className="grid grid-cols-2 gap-x-[60px] gap-y-[60px]">
                    {members.map((member, index) => (
                        <AnimatedSection key={index} className="flex flex-col w-[428px]">
                            {/* Imagen 428x264px */}
                            <div className="w-[428px] h-[264px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 rounded-[1px]">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center border border-vlanc-bg">
                                        <span className="text-[10px] text-vlanc-secondary/40 uppercase tracking-widest">Foto {member.name}</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Pie de foto: Alineado al margen DERECHO de su propia imagen */}
                            <div className="mt-4 flex justify-end items-baseline gap-2 text-right w-full">
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

            {/* MITAD DERECHA (50%): TEXTO
                - pl-[30px]: El texto comienza exactamente a 30px a la derecha del eje (total 60px de gap).
                - pr-[120px]: Margen derecho de la página.
                - text-right: Todo el texto alineado por la derecha al margen de 120px.
            */}
            <div className="w-1/2 h-full pl-[30px] pr-[120px] flex flex-col space-y-20 text-right">
                
                {/* Bloque: Nuestro propósito */}
                <AnimatedSection>
                    <h3 className="subtitulo2 mb-6">
                        {data?.purpose?.title || "Nuestro propósito"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 text-right"
                        dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                    />
                </AnimatedSection>

                {/* Bloque: Nuestra historia */}
                <AnimatedSection>
                    <h3 className="subtitulo2 mb-6">
                        {data?.history?.title || "Nuestra historia"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 font-bold text-right"
                        dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                    />
                </AnimatedSection>
            </div>

        </div>
    </section>
  );
};

export default Team;
