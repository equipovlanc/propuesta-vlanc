
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
        
        {/* Título de Sección: Posición absoluta (140px superior, 120px izquierdo) */}
        <div className="absolute top-[140px] left-[120px] z-20">
            <AnimatedSection>
                <h2 className="subtitulo1 mb-4 tracking-tighter text-vlanc-black">
                    {data?.title || "conoce a VLANC"}
                </h2>
                <div className="w-20 h-[3px] bg-vlanc-primary"></div>
            </AnimatedSection>
        </div>

        {/* Contenedor Principal: Inicia a 297px del borde superior */}
        <div className="flex w-full mt-[297px] h-full pb-[120px]">
            
            {/* MITAD IZQUIERDA (50%): IMÁGENES
                - pl-0: Imágenes "a sangre" (borde izquierdo).
                - pr-[30px]: El grid termina a 30px del eje central.
            */}
            <div className="w-1/2 h-full pr-[30px] pl-0">
                <div className="grid grid-cols-2 gap-x-[60px] h-full items-stretch">
                    {members.map((member, index) => {
                        const isBottomRow = index >= 2;
                        return (
                            <AnimatedSection 
                                key={index} 
                                className={`flex flex-col w-full ${isBottomRow ? 'justify-end' : 'justify-start'}`}
                            >
                                {/* Imagen: Mantiene aspecto 428/264 */}
                                <div className="w-full aspect-[428/264] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 rounded-[1px]">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center border border-vlanc-bg">
                                            <span className="text-[10px] text-vlanc-secondary/40 uppercase tracking-widest">Foto {member.name}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Pie de foto: Espacio reducido a mt-2 */}
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

            {/* MITAD DERECHA (50%): TEXTO
                - pl-[30px]: El texto empieza a 30px del centro (eje vertical).
                - pr-[120px]: Margen derecho estándar.
                - flex justify-between: Separa "Propósito" de "Historia" (Historia se va al final).
            */}
            <div className="w-1/2 h-full pl-[30px] pr-[120px] flex flex-col justify-between text-left">
                
                {/* Bloque Superior: Nuestro propósito */}
                <AnimatedSection className="flex flex-col items-start">
                    <h3 className="subtitulo2 mb-6">
                        {data?.purpose?.title || "Nuestro propósito"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 text-left"
                        dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                    />
                </AnimatedSection>

                {/* Bloque Inferior: Nuestra historia (Alineado al margen inferior) 
                    CORRECCIÓN: Eliminado 'font-bold' para respetar etiquetas <strong>
                */}
                <AnimatedSection className="flex flex-col items-start pb-0">
                    <h3 className="subtitulo2 mb-6">
                        {data?.history?.title || "Nuestra historia"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 text-left"
                        dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                    />
                </AnimatedSection>
            </div>

        </div>
    </section>
  );
};

export default Team;
