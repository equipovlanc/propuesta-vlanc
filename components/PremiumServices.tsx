
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface DescriptionBlock {
    text: string;
    style: 'normal' | 'title';
    isNumbered?: boolean;
    number?: string;
    hasSeparator?: boolean;
}

interface Service {
    title?: string;
    subtitle?: string;
    price?: string;
    description?: DescriptionBlock[];
    note?: string;
}

interface PremiumServicesProps {
    data?: Service;
    image?: { src: string; opacity?: number };
    index?: number;
}

const PremiumServices: React.FC<PremiumServicesProps> = ({ data, image, index = 0 }) => {
    const imageSrc = image?.src;
    const imageOpacity = image?.opacity ?? 15;

    // Helper para renderizar cada bloque de descripción según sus flags
    const renderDescriptionBlock = (block: DescriptionBlock, key: number, allBlocks: DescriptionBlock[]) => {
        const isTitle = block.style === 'title';
        const nextBlock = allBlocks[key + 1];
        
        // Lógica de espaciado:
        // Si el actual es numerado y el siguiente también, reducimos el margen a 5px (visual grouping).
        // En caso contrario (títulos o texto normal), mantenemos el estándar h-5 (20px) para simular un salto de línea normal.
        const isConsecutiveNumbered = block.isNumbered && nextBlock?.isNumbered;
        const marginBottomClass = isConsecutiveNumbered ? "h-[5px]" : "h-5";

        return (
            <div key={key} className="w-full">
                
                {/* Contenido Principal */}
                {isTitle ? (
                    // CASO 1: Estilo Título (Bajada)
                    // mb-0 para que el espaciado lo dicte únicamente el contenedor separador (h-5 o marginBottomClass), igualando al texto normal.
                    <h4 className="subtitulo4 mb-0">
                        <span dangerouslySetInnerHTML={{ __html: block.text }} />
                    </h4>
                ) : (
                    // CASO 2: Estilo Normal (Puede ser numerado o no)
                    <div className="flex flex-row items-start gap-4">
                        {/* Badge de Número si aplica */}
                        {block.isNumbered && block.number && (
                            // Tamaño fijo 35x20px, Texto 14px
                            <div className="shrink-0 w-[35px] h-[20px] bg-[#8f4933] text-white flex items-center justify-center rounded-[1px] mt-0.5">
                                <span className="text-[14px] font-bold tracking-widest leading-none">
                                    {block.number}
                                </span>
                            </div>
                        )}
                        
                        {/* Texto */}
                        <p 
                            className="cuerpo"
                            dangerouslySetInnerHTML={{ __html: block.text }} 
                        />
                    </div>
                )}

                {/* Separador Opcional */}
                {block.hasSeparator && (
                    // CAMBIO: Aumentado de mt-2 mb-2 a mt-3 mb-3
                    <div className="w-full h-[1px] bg-[#8f4933] mt-3 mb-3 opacity-30"></div>
                )}
                
                {/* Si no hay separador, añadimos espacio */}
                {!block.hasSeparator && <div className={marginBottomClass}></div>}
            </div>
        );
    };

    return (
        <section className="h-full w-full flex flex-row">
            {/* Left Column: Fixed 888px width, vlanc-bg (#efe8e1) */}
            <div className="w-[888px] h-full bg-vlanc-bg flex flex-col justify-between pl-[120px] pr-10 pt-[150px] pb-[140px] shrink-0 overflow-y-auto no-scrollbar relative z-10">
                
                {/* 1. Cabecera Principal (Arriba) */}
                <div className="shrink-0">
                    <AnimatedSection>
                        <h2 className="subtitulo1">
                            {index === 0 ? (
                                <>servicios<br />premium.</>
                            ) : (
                                "servicios premium."
                            )}
                        </h2>
                        {/* Barra decorativa (#8f4933) */}
                        <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[27px]"></div>
                    </AnimatedSection>
                </div>
                
                {/* 2. Contenido del Servicio (Abajo) */}
                <div className="flex flex-col justify-end max-w-xl">
                    <AnimatedSection>
                        
                        {/* Nombre Servicio (Subtítulo 2) */}
                        {/* CAMBIO: Añadido font-bold */}
                        <h3 className="subtitulo2 not-italic font-bold mb-8">
                            / {data?.subtitle}
                        </h3>

                        {/* Bajada Principal (Subtítulo 4) */}
                        {/* mb-5 para igualar el salto de línea normal (20px) */}
                        <h4 className="subtitulo4 mb-5">
                            {data?.title}
                        </h4>

                        {/* Descripción Dinámica (Iteramos bloques) */}
                        <div className="w-full">
                            {(data?.description ?? []).map((block, i, arr) => renderDescriptionBlock(block, i, arr))}
                        </div>
                        
                        {/* Notas */}
                        {data?.note && (
                            <div className="mt-4">
                                <p 
                                    className="text-[10px] text-vlanc-secondary/60 italic tracking-wider w-full whitespace-pre-line [&>strong]:font-bold [&>strong]:text-vlanc-secondary"
                                    dangerouslySetInnerHTML={{ __html: data.note }}
                                />
                            </div>
                        )}
                        
                        {/* Botón Precio (Posicionado en el padding inferior mediante h-0 absolute) */}
                        {data?.price && (
                            <div className="relative h-0 w-full">
                                <div className="absolute top-8 left-0 bg-[#8f4933] text-white px-8 py-3 rounded-[1px] shadow-sm flex items-center justify-center cursor-default whitespace-nowrap">
                                    <span className="boton1 text-white tracking-[0.1em]">{data.price}</span>
                                </div>
                            </div>
                        )}
                    </AnimatedSection>
                </div>
            </div>

            {/* Right Column: Rest of width, white bg */}
            <div className="flex-grow h-full bg-white flex flex-col justify-end items-center pb-[140px] relative overflow-hidden z-0">
                <AnimatedSection>
                    <div className="w-[827px] h-[709px] relative shrink-0">
                        {imageSrc ? (
                            <div className="w-full h-full relative">
                                <img src={imageSrc} alt={data?.title} className="w-full h-full object-cover" />
                                <div 
                                    className="absolute inset-0 bg-[#8f4933] pointer-events-none" 
                                    style={{ opacity: imageOpacity / 100 }}
                                />
                            </div>
                        ) : (
                            <div className="w-full h-full bg-vlanc-black/5 flex items-center justify-center">
                                <span className="text-[10px] uppercase tracking-widest text-vlanc-black/20">Imagen 827x709</span>
                            </div>
                        )}
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default PremiumServices;
