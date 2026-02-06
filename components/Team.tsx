
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

        {/* Contenedor Principal: Inicia a 297px del borde superior y termina a 120px del inferior */}
        <div className="flex w-full mt-[297px] mb-[120px] h-full overflow-hidden">
            
            {/* MITAD IZQUIERDA (50%): IMÁGENES
                - pl-0: Imágenes "a sangre" (tocan el borde izquierdo).
                - pr-[30px]: El contenido termina a 30px del eje central.
                - flex justify-end: Alinea el grid hacia el eje central.
            */}
            <div className="w-1/2 h-full flex justify-end pr-[30px] pl-0">
                {/* Grid de fotos: gap de 60px entre ellas */}
                <div className="grid grid-cols-2 gap-x-[60px] gap-y-[60px] w-full">
                    {members.map((member, index) => (
                        <AnimatedSection key={index} className="flex flex-col w-full h-full">
                            {/* Contenedor de imagen: adaptable para cubrir hasta el borde izquierdo */}
                            <div className="w-full aspect-[428/264] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 rounded-[1px]">
                                {member.image ? (
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-vlanc-secondary/10 flex items-center justify-center border border-vlanc-bg">
                                        <span className="text-[10px] text-vlanc-secondary/40 uppercase tracking-widest">Foto {member.name}</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Pie de foto: Alineado al margen derecho de cada imagen individual */}
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
                - pl-[30px]: Comienza a 30px a la derecha del eje (60px total de gap central).
                - pr-[120px]: Margen derecho de la página.
                - text-left: Texto y subtítulos alineados a la izquierda.
            */}
            <div className="w-1/2 h-full pl-[30px] pr-[120px] flex flex-col space-y-20 text-left">
                
                {/* Bloque: Nuestro propósito */}
                <AnimatedSection className="flex flex-col items-start">
                    <h3 className="subtitulo2 mb-6">
                        {data?.purpose?.title || "Nuestro propósito"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 text-left"
                        dangerouslySetInnerHTML={{ __html: data?.purpose?.description || '' }}
                    />
                </AnimatedSection>

                {/* Bloque: Nuestra historia */}
                <AnimatedSection className="flex flex-col items-start">
                    <h3 className="subtitulo2 mb-6">
                        {data?.history?.title || "Nuestra historia"}
                    </h3>
                    <div 
                        className="cuerpo2 space-y-4 font-bold text-left"
                        dangerouslySetInnerHTML={{ __html: data?.history?.description || '' }}
                    />
                </AnimatedSection>
            </div>

        </div>
    </section>
  );
};

export default Team;
