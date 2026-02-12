
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SocialMedia {
    name?: string;
    url?: string;
    icon?: string;
}

interface ContactProps {
    data?: {
        location?: { title?: string; address?: string; email?: string };
        phone?: { title?: string; landline?: string; mobile?: string };
        web?: { title?: string; url?: string; displayText?: string };
        rrss?: SocialMedia[];
        image?: string;
    };
    finalLogo?: string | null;
}

// Iconos inline para asegurar que siempre se ven
const PhoneIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-vlanc-primary">
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.49-5.41-4.08-6.9-6.9l1.97-1.57c.26-.26.35-.65.24-1.01A11.36 11.36 0 018.62 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 13.81 13.81 0 0013.81 13.81c.55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z"/>
    </svg>
);

const WhatsappIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-vlanc-primary">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
);

const Contact: React.FC<ContactProps> = ({ data }) => {
    return (
        <footer className="h-screen w-full bg-vlanc-bg flex items-center justify-center pt-[150px] pb-[140px] px-[120px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center w-full max-w-7xl">
                
                {/* COLUMNA IZQUIERDA: Imagen */}
                <AnimatedSection className="flex justify-center lg:justify-end">
                    {/* Tamaño fijo solicitado: 785x691px */}
                    <div className="w-full max-w-[785px] aspect-[785/691] overflow-hidden shadow-sm relative shrink-0">
                         {data?.image ? (
                            <img src={data.image} alt="Studio" className="w-full h-full object-cover grayscale brightness-105 hover:grayscale-0 transition-all duration-1000" />
                        ) : (
                             <div className="w-full h-full bg-vlanc-secondary/5 flex items-center justify-center border border-vlanc-secondary/10">
                                <span className="text-[10px] uppercase tracking-widest text-vlanc-secondary/30 font-bold">Imagen 785x691</span>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                {/* COLUMNA DERECHA: Datos */}
                <div className="space-y-12 text-left pl-10 flex flex-col justify-center">
                    
                    {/* 1. DÓNDE ESTAMOS */}
                    <AnimatedSection>
                        <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">
                            / {data?.location?.title}
                        </h4>
                        <div className="cuerpo space-y-1 text-vlanc-secondary">
                            <p>{data?.location?.address}</p>
                            <p className="font-bold">{data?.location?.email}</p>
                        </div>
                    </AnimatedSection>

                    {/* 2. CONTÁCTANOS (Teléfonos con Iconos) */}
                    <AnimatedSection>
                        <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">
                            / {data?.phone?.title}
                        </h4>
                        <div className="cuerpo space-y-2 text-vlanc-secondary">
                            {/* Teléfono Fijo */}
                            {data?.phone?.landline && (
                                <div className="flex items-center gap-3">
                                    <div className="shrink-0"><PhoneIcon /></div>
                                    <p>{data.phone.landline}</p>
                                </div>
                            )}
                            
                            {/* Móvil / WhatsApp */}
                            {data?.phone?.mobile && (
                                <div className="flex items-center gap-3">
                                    <div className="shrink-0"><WhatsappIcon /></div>
                                    <p>{data.phone.mobile}</p>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>

                    {/* 3. WEB */}
                    <AnimatedSection>
                        <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">
                            / {data?.web?.title}
                        </h4>
                        <a href={data?.web?.url} target="_blank" className="cuerpo border-b border-vlanc-primary text-vlanc-secondary hover:text-vlanc-primary transition-colors">
                            {data?.web?.displayText}
                        </a>
                    </AnimatedSection>

                    {/* 4. RRSS (5 Iconos) */}
                    <AnimatedSection>
                         <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">
                            / RRSS
                         </h4>
                         <div className="flex gap-6 items-center">
                            {(data?.rrss ?? []).map((social, i) => (
                                <a 
                                    key={i} 
                                    href={social.url} 
                                    target="_blank" 
                                    className="hover:opacity-60 transition-opacity w-6 h-6 flex items-center justify-center"
                                    title={social.name}
                                >
                                    {social.icon ? (
                                        <img src={social.icon} alt={social.name} className="w-full h-full object-contain" />
                                    ) : (
                                        // Placeholder circular si no hay icono subido aún
                                        <div className="w-6 h-6 rounded-full bg-vlanc-secondary/20 flex items-center justify-center text-[8px] font-bold text-vlanc-secondary">
                                            {social.name ? social.name.charAt(0) : '?'}
                                        </div>
                                    )}
                                </a>
                            ))}
                         </div>
                    </AnimatedSection>
                    
                    {/* Barra decorativa (#8f4933) */}
                    <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px]"></div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
