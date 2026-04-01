
/**
 * Splits PortableText blocks into pages based on a maximum height.
 * Each "page" is a two-column layout of a specific width and height.
 */
export function splitPortableTextIntoPages(
    content: any[], 
    maxPageHeight: number = 670, // Height of ONE column
    columns: number = 2,
    fontSize: number = 10,
    lineHeight: number = 1.4,
    width: number = 800 // Width of the column/container
): any[][] {
    if (!content || content.length === 0) return [[]];
    if (typeof document === 'undefined') return [content]; // SSR fallback

    const totalMaxHeight = maxPageHeight * columns;
    const pages: any[][] = [[]];
    let currentPageHeight = 0;

    // Create a tester element to measure block heights
    const tester = document.createElement('div');
    tester.style.position = 'absolute';
    tester.style.visibility = 'hidden';
    tester.style.width = `${width}px`;
    tester.style.fontSize = `${fontSize}px`;
    tester.style.lineHeight = `${lineHeight}`;
    tester.style.fontFamily = 'Montserrat, sans-serif';
    tester.style.whiteSpace = 'pre-wrap';
    tester.style.textAlign = 'justify';
    document.body.appendChild(tester);

    for (const block of content) {
        // Measure this block
        // Simplification: we use text content for measurement
        // For more accuracy, we could use PortableText renderer, but let's start with this.
        const text = (block.children || [])
            .map((child: any) => child.text || "")
            .join("");
        
        // Add existing block text to tester to see how it affects height
        // We measure each block individually first to know its contribution
        const blockTester = document.createElement('div');
        blockTester.style.marginBottom = '0px'; // Matching FinePrint.tsx where mb-0
        blockTester.innerText = text;
        tester.appendChild(blockTester);
        
        const blockHeight = blockTester.offsetHeight;
        
        // If adding this block exceeds the total capacity of the page
        if (currentPageHeight + blockHeight > totalMaxHeight && pages[pages.length - 1].length > 0) {
            pages.push([block]);
            currentPageHeight = blockHeight;
        } else {
            pages[pages.length - 1].push(block);
            currentPageHeight += blockHeight;
        }
    }

    document.body.removeChild(tester);
    return pages;
}
