
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface SocialMedia {
    name?: string;
    url?: string;
    icon?: string;
}

interface PhoneDetails {
    number?: string;
    icon?: string;
}

interface ContactProps {
    data?: {
        location?: { title?: string; address?: string; email?: string };
        phone?: { title?: string; landline?: PhoneDetails; mobile?: PhoneDetails };
        web?: { title?: string; url?: string; displayText?: string };
        rrss?: SocialMedia[];
        image?: string; // Mantenemos la interfaz
    };
    finalLogo?: string | null;
}

const Contact: React.FC<ContactProps> = ({ data, finalLogo }) => {
    return (
        <footer className="h-screen w-full bg-vlanc-bg flex items-center justify-center pt-[150px] pb-[140px] px-[120px]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-stretch w-full max-w-7xl h-full">
                
                {/* COLUMNA IZQUIERDA: Logo Final */}
                {/* Centrado total (vertical y horizontal) */}
                <AnimatedSection className="flex items-center justify-center h-full">
                    {/* Tamaño fijo solicitado: 785x691px */}
                    <div className="w-full max-w-[785px] aspect-[785/691] flex items-center justify-center overflow-hidden relative shrink-0">
                         {finalLogo ? (
                            // Usamos object-contain para que el logo se vea entero sin recortes, centrado en el área
                            <img src={finalLogo} alt="VLANC Final Logo" className="w-full h-full object-contain" />
                        ) : (
                             <div className="w-full h-full bg-vlanc-secondary/5 flex items-center justify-center border border-vlanc-secondary/10">
                                <span className="text-[10px] uppercase tracking-widest text-vlanc-secondary/30 font-bold">Logo Final 785x691</span>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                {/* COLUMNA DERECHA: Datos */}
                {/* Centrado vertical del bloque completo */}
                <div className="flex flex-col justify-center h-full pl-10 space-y-12 text-left">
                    
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

                    {/* 2. CONTÁCTANOS (Teléfonos con Iconos CMS) */}
                    <AnimatedSection>
                        <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">
                            / {data?.phone?.title}
                        </h4>
                        <div className="cuerpo space-y-2 text-vlanc-secondary">
                            {/* Teléfono Fijo */}
                            {data?.phone?.landline?.number && (
                                <div className="flex items-center gap-3">
                                    <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                                        {data.phone.landline.icon ? (
                                            <img src={data.phone.landline.icon} alt="Tel" className="w-full h-full object-contain" />
                                        ) : (
                                            // Fallback si no hay icono subido
                                            <div className="w-3 h-3 bg-vlanc-secondary/20 rounded-full"></div>
                                        )}
                                    </div>
                                    <p>{data.phone.landline.number}</p>
                                </div>
                            )}
                            
                            {/* Móvil / WhatsApp */}
                            {data?.phone?.mobile?.number && (
                                <div className="flex items-center gap-3">
                                    <div className="shrink-0 w-4 h-4 flex items-center justify-center">
                                        {data.phone.mobile.icon ? (
                                            <img src={data.phone.mobile.icon} alt="Mobile" className="w-full h-full object-contain" />
                                        ) : (
                                            // Fallback si no hay icono subido
                                            <div className="w-3 h-3 bg-vlanc-secondary/20 rounded-full"></div>
                                        )}
                                    </div>
                                    <p>{data.phone.mobile.number}</p>
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
