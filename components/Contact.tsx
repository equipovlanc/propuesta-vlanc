
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
        image?: string;
    };
    finalLogo?: string | null;
}

const Contact: React.FC<ContactProps> = ({ data, finalLogo }) => {
    return (
        <footer className="h-screen w-full bg-vlanc-bg flex flex-col pt-[150px] pb-[140px] px-[120px]">
            {/* GRID DE 2 COLUMNAS: Ajustado a 60% / 40% */}
            <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] w-full h-full">
                
                {/* COLUMNA IZQUIERDA: Logo Final (60%) */}
                <AnimatedSection className="flex items-center justify-center h-full w-full">
                    {/* MOVIDO 100px A LA IZQUIERDA (-translate-x-[100px]) */}
                    <div className="w-full max-w-[785px] aspect-[785/691] flex items-center justify-center overflow-hidden relative p-4 -translate-x-[100px]">
                         {finalLogo ? (
                            <img src={finalLogo} alt="VLANC Final Logo" className="w-full h-full object-contain" />
                        ) : (
                             <div className="w-full h-full bg-vlanc-secondary/5 flex items-center justify-center border border-vlanc-secondary/10">
                                <span className="text-[10px] uppercase tracking-widest text-vlanc-secondary/30 font-bold">Logo Final</span>
                            </div>
                        )}
                    </div>
                </AnimatedSection>

                {/* COLUMNA DERECHA: Datos (40%) */}
                <div className="flex items-center justify-center h-full w-full pl-10">
                    {/* Bloque de texto con ancho controlado, alineado a la izquierda internamente */}
                    {/* MOVIDO 100px A LA DERECHA (translate-x-[100px]) */}
                    <div className="flex flex-col space-y-12 text-left w-full max-w-md translate-x-[100px]">
                        
                        {/* 1. DÓNDE ESTAMOS */}
                        <AnimatedSection>
                            <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">
                                / {data?.location?.title}
                            </h4>
                            {/* INDENTADO pl-6 para alinear con el texto del título (saltando la barra) */}
                            <div className="cuerpo space-y-1 text-vlanc-secondary pl-6">
                                <p>{data?.location?.address}</p>
                                <p className="font-bold">{data?.location?.email}</p>
                            </div>
                        </AnimatedSection>

                        {/* 2. CONTÁCTANOS (Con Iconos) */}
                        <AnimatedSection>
                            <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">
                                / {data?.phone?.title}
                            </h4>
                            {/* INDENTADO pl-6 */}
                            <div className="cuerpo space-y-4 text-vlanc-secondary pl-6">
                                {/* Teléfono Fijo */}
                                {data?.phone?.landline?.number && (
                                    <div className="flex items-center gap-4">
                                        <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                                            {data.phone.landline.icon ? (
                                                <img src={data.phone.landline.icon} alt="Tel" className="w-full h-full object-contain" />
                                            ) : (
                                                <div className="w-4 h-4 bg-vlanc-secondary/20 rounded-full"></div>
                                            )}
                                        </div>
                                        <p className="text-[15px]">{data.phone.landline.number}</p>
                                    </div>
                                )}
                                
                                {/* Móvil / WhatsApp */}
                                {data?.phone?.mobile?.number && (
                                    <div className="flex items-center gap-4">
                                        <div className="shrink-0 w-5 h-5 flex items-center justify-center">
                                            {data.phone.mobile.icon ? (
                                                <img src={data.phone.mobile.icon} alt="Mobile" className="w-full h-full object-contain" />
                                            ) : (
                                                <div className="w-4 h-4 bg-vlanc-secondary/20 rounded-full"></div>
                                            )}
                                        </div>
                                        <p className="text-[15px]">{data.phone.mobile.number}</p>
                                    </div>
                                )}
                            </div>
                        </AnimatedSection>

                        {/* 3. WEB */}
                        <AnimatedSection>
                            <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">
                                / {data?.web?.title}
                            </h4>
                            {/* INDENTADO pl-6 */}
                            <div className="pl-6">
                                <a href={data?.web?.url} target="_blank" className="cuerpo border-b border-vlanc-primary text-vlanc-secondary hover:text-vlanc-primary transition-colors">
                                    {data?.web?.displayText}
                                </a>
                            </div>
                        </AnimatedSection>

                        {/* 4. RRSS */}
                        <AnimatedSection>
                             <h4 className="subtitulo2 font-bold not-italic mb-4 text-vlanc-black">
                                / RRSS
                             </h4>
                             {/* INDENTADO pl-6 */}
                             <div className="flex gap-6 items-center pl-6">
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
                                            <div className="w-6 h-6 rounded-full bg-vlanc-secondary/20 flex items-center justify-center text-[10px] font-bold text-vlanc-secondary">
                                                {social.name ? social.name.charAt(0) : '?'}
                                            </div>
                                        )}
                                    </a>
                                ))}
                             </div>
                        </AnimatedSection>
                        
                        {/* Barra decorativa - Indentada también para mantener consistencia visual */}
                        <div className="w-[112px] h-[5px] bg-[#8f4933] mt-4 ml-6"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
