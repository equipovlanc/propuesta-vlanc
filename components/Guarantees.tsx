
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Guarantee {
    icon?: string;
    badgeContent?: string;
    title?: string;
    description?: string;
    note?: string;
}

interface GuaranteesProps {
    data?: {
        title?: string;
        items?: Guarantee[];
    };
}

const GuaranteeItem = ({ item }: { item: Guarantee }) => {
    // Solo mostramos el bloque visual (Icono + Rectángulo) si hay contenido real
    const hasBadge = item.badgeContent && item.badgeContent.trim().length > 0;

    return (
        <AnimatedSection className="flex flex-col items-start w-full">
            
            {/* CONJUNTO VISUAL: ICONO + RECTÁNGULO */}
            {hasBadge && (
                <div className="relative mt-8 mb-10 ml-6"> {/* Márgenes para compensar el icono absoluto */}
                    
                    {/* Icono: Posición absoluta en la esquina superior izquierda (superpuesto) */}
                    <div className="absolute -top-8 -left-8 w-[80px] h-[80px] z-10 flex items-center justify-center">
                        {item.icon ? (
                            <img 
                                src={item.icon} 
                                alt="Garantía" 
                                className="w-full h-full object-contain drop-shadow-sm" 
                            />
                        ) : (
                            <div className="w-[50px] h-[50px] bg-vlanc-bg border border-vlanc-black rounded-full flex items-center justify-center">
                                <span className="text-[8px] font-bold">ICON</span>
                            </div>
                        )}
                    </div>

                    {/* Rectángulo: Transparente con borde negro */}
                    <div className="border border-vlanc-black bg-transparent px-6 py-6 min-w-[200px] relative z-0">
                        <div 
                            className="cuerpo !text-vlanc-black text-[14px] leading-snug"
                            dangerouslySetInnerHTML={{ __html: item.badgeContent || '' }}
                        />
                    </div>
                </div>
            )}
            
            {/* TEXTOS DESCRIPTIVOS (Siempre visibles) */}
            <div className="w-full pr-4">
                {/* Título Garantía */}
                <h3 className="subtitulo2 mb-6 leading-tight">
                    / {item.title}
                </h3>
                
                {/* Descripción */}
                <div 
                    className="cuerpo mb-4"
                    dangerouslySetInnerHTML={{ __html: item.description || '' }}
                />
                
                {/* Nota al pie */}
                {item.note && (
                    <p className="text-[10px] text-vlanc-secondary/60 italic mt-8 border-t border-vlanc-secondary/10 pt-4 w-full">
                        {item.note}
                    </p>
                )}
            </div>
        </AnimatedSection>
    );
};

const Guarantees: React.FC<GuaranteesProps> = ({ data }) => {
    // Función para formatear título (saltos de línea)
    const formattedTitle = (data?.title || "nuestras garantías.").split(' ').map((word, i, arr) => (
        <React.Fragment key={i}>
            {word}
            {i < arr.length - 1 && <br />}
        </React.Fragment>
    ));

    const items = data?.items || [];
    const item1 = items[0];
    const item2 = items[1];
    const item3 = items[2];

    return (
        <section className="h-full w-full bg-vlanc-bg pt-[150px] pb-[140px] px-[120px] overflow-hidden">
            {/* GRID DE 3 COLUMNAS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 h-full">
                
                {/* COLUMNA 1: Garantía 1 */}
                <div className="flex flex-col justify-start pt-[120px]">
                    {item1 && <GuaranteeItem item={item1} />}
                </div>

                {/* COLUMNA 2: Garantía 2 */}
                <div className="flex flex-col justify-start pt-[120px]">
                    {item2 && <GuaranteeItem item={item2} />}
                </div>

                {/* COLUMNA 3: Título + Garantía 3 */}
                <div className="flex flex-col h-full">
                    {/* Título Alineado al margen superior y a la izquierda de la columna */}
                    <AnimatedSection className="mb-20">
                         <h2 className="subtitulo1 text-left">
                            {formattedTitle}
                        </h2>
                        {/* Barra decorativa actualizada (#8f4933) */}
                        <div className="w-[112px] h-[5px] bg-[#8f4933] mt-[40px]"></div>
                    </AnimatedSection>

                    {/* Garantía 3 debajo del título */}
                    {item3 && <GuaranteeItem item={item3} />}
                </div>
            </div>
        </section>
    );
};

export default Guarantees;
