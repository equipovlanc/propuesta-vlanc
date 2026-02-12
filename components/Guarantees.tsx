
import React from 'react';
import AnimatedSection from './AnimatedSection';

interface Guarantee {
    icon?: string;
    badgeTitle?: string;
    badgeSubtitle?: string;
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
    return (
        <AnimatedSection className="flex flex-col items-start w-full">
            {/* CONJUNTO VISUAL: ICONO + RECTÁNGULO NEGRO */}
            <div className="flex flex-col items-start mb-10 gap-4">
                {/* Icono (SVG subido) */}
                <div className="w-[80px] h-[80px] flex items-center justify-start">
                    {item.icon ? (
                        <img 
                            src={item.icon} 
                            alt={item.title || "Icono Garantía"} 
                            className="w-full h-full object-contain" 
                        />
                    ) : (
                        <div className="w-[60px] h-[60px] border border-vlanc-black/20 rounded-full flex items-center justify-center">
                            <span className="text-[8px]">ICON</span>
                        </div>
                    )}
                </div>

                {/* Rectángulo Negro (Badge) */}
                {(item.badgeTitle || item.badgeSubtitle) && (
                    <div className="bg-vlanc-black text-white px-5 py-3 rounded-[1px] min-w-[200px] flex flex-col justify-center">
                        {item.badgeTitle && (
                            <span className="boton1 text-white mb-1">
                                {item.badgeTitle}
                            </span>
                        )}
                        {item.badgeSubtitle && (
                            <span className="boton2 text-white/80 text-[12px]">
                                {item.badgeSubtitle}
                            </span>
                        )}
                    </div>
                )}
            </div>
            
            {/* TEXTOS DESCRIPTIVOS */}
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
