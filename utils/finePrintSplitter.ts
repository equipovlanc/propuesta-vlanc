
/**
 * Utility to calculate the exact pagination of FinePrint content by 
 * rendering it in a hidden DOM element and measuring its height.
 */

export interface FinePrintChunk {
    content: any[];
    points: string[];
}

export interface FinePrintResult {
    pages: FinePrintChunk[];
    fontSize: number;
}

export const calculateFinePrintSlides = (
    content: any[], 
    points: string[], 
    maxColumnHeight: number = 670
): FinePrintResult => {
    // 1. Create a tester div
    const tester = document.createElement('div');
    tester.style.width = '800px'; // Matching column width
    tester.style.lineHeight = '1.4';
    tester.style.fontFamily = 'Montserrat, sans-serif';
    tester.style.position = 'absolute';
    tester.style.visibility = 'hidden';
    tester.style.top = '-9999px';
    tester.style.whiteSpace = 'pre-line';
    tester.style.textAlign = 'justify';
    document.body.appendChild(tester);

    let fontSize = 16;
    let isTooBigAt10 = false;

    const measureContent = (fs: number, blocks: any[], pts: string[]): number => {
        tester.style.fontSize = `${fs}px`;
        if (blocks && blocks.length > 0) {
            const text = blocks
                .map((block: any) => (block.children || [])
                    .map((child: any) => child.text || "").join("")
                ).join("\n\n");
            tester.innerText = text;
        } else {
            tester.innerText = pts.join("\n\n");
        }
        return tester.scrollHeight;
    };

    // Find the ideal font size for the whole content if it were 1 page
    // (We also check if it fits in 1 page at current font size)
    let totalHeight = measureContent(fontSize, content, points);
    while (totalHeight > maxColumnHeight * 2 && fontSize > 10) {
        fontSize -= 0.5;
        totalHeight = measureContent(fontSize, content, points);
    }

    if (totalHeight > maxColumnHeight * 2) {
        isTooBigAt10 = true;
        fontSize = 10;
    }

    // Now, if it doesn't fit in 1 page at 10px, we split into pages
    const pages: FinePrintChunk[] = [];
    if (!isTooBigAt10) {
        pages.push({ content, points });
    } else {
        // Split iteratively
        let currentPageBlocks: any[] = [];
        let currentPagePoints: string[] = [];
        let currentTotalHeight = 0;

        tester.style.fontSize = `${fontSize}px`;

        const addIteration = (item: any, isBlock: boolean) => {
            const currentBlocks = isBlock ? [...currentPageBlocks, item] : currentPageBlocks;
            const currentPoints = isBlock ? currentPagePoints : [...currentPagePoints, item];
            
            // Measure this specific set
            if (currentBlocks.length > 0) {
                const text = currentBlocks
                    .map((block: any) => (block.children || [])
                        .map((child: any) => child.text || "").join("")
                    ).join("\n\n");
                tester.innerText = text;
            } else {
                tester.innerText = currentPoints.join("\n\n");
            }
            
            const h = tester.scrollHeight;
            if (h > maxColumnHeight * 2 && (currentPageBlocks.length > 0 || currentPagePoints.length > 0)) {
                // This item overflows the 2-column capacity.
                // Complete current page and start next one with this item.
                pages.push({ content: currentPageBlocks, points: currentPagePoints });
                currentPageBlocks = isBlock ? [item] : [];
                currentPagePoints = isBlock ? [] : [item];
            } else {
                if (isBlock) currentPageBlocks.push(item);
                else currentPagePoints.push(item);
            }
        };

        if (content && content.length > 0) {
            content.forEach(b => addIteration(b, true));
        } else {
            points.forEach(p => addIteration(p, false));
        }

        if (currentPageBlocks.length > 0 || currentPagePoints.length > 0) {
            pages.push({ content: currentPageBlocks, points: currentPagePoints });
        }
    }

    document.body.removeChild(tester);
    return { pages, fontSize };
};
