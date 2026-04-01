export interface FinePrintResult {
    totalPages: number;
    fontSize: number;
}

export const calculateFinePrintSlides = (
    content: any[], 
    points: string[], 
    containerHeight: number = 660
): FinePrintResult => {
    // Evitamos cálculos si no estamos en el cliente
    if (typeof document === 'undefined') return { totalPages: 1, fontSize: 16 };

    const tester = document.createElement('div');
    tester.style.columnWidth = '800px';
    tester.style.columnGap = '80px';
    tester.style.columnFill = 'auto';
    tester.style.height = `${containerHeight}px`; // Altura exacta del contenedor de texto
    tester.style.fontFamily = 'Montserrat, sans-serif';
    tester.style.position = 'absolute';
    tester.style.visibility = 'hidden';
    tester.style.top = '-9999px';
    tester.style.textAlign = 'justify';
    
    document.body.appendChild(tester);

    let fontSize = 16;

    const measurePages = (fs: number): number => {
        tester.style.fontSize = `${fs}px`;
        tester.style.lineHeight = '1.4';
        
        tester.innerHTML = '';
        const wrapper = document.createElement('div');
        wrapper.style.fontSize = 'inherit';
        wrapper.style.lineHeight = 'inherit';
        
        let html = '';
        if (content && content.length > 0) {
            html = content.map((block: any) => {
                // Soportar negritas rudimentario o simplemente texto plano
                const text = (block.children || []).map((c: any) => c.text || "").join("");
                return `<p style="margin-bottom: 0; min-height: 1.4em;">${text}</p>`;
            }).join("");
        } else if (points && points.length > 0) {
            html = points.map(p => `<p style="margin-bottom: 0; min-height: 1.4em;">${p}</p>`).join("");
        }
        wrapper.innerHTML = html;
        tester.appendChild(wrapper);
        
        // Calculamos la altura que ocupa todo el texto en una sola columna de 800px
        const totalHeight = tester.scrollHeight;
        
        // Cada página tiene 2 columnas, por tanto el espacio vertical disponible por página es containerHeight * 2
        return Math.max(1, Math.ceil(totalHeight / (containerHeight * 2)));
    };

    let totalPages = measurePages(fontSize);
    
    // Reducimos tamaño de fuente si necesitamos más de 1 página, hasta un mínimo de 10px.
    while (totalPages > 1 && fontSize > 10) {
        fontSize -= 0.5;
        totalPages = measurePages(fontSize);
    }
    
    document.body.removeChild(tester);
    return { totalPages, fontSize };
};
