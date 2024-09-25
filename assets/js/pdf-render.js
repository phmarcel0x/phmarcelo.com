// pdf-render.js
const url = '/docs/pdfs/website-resume.pdf'; // Path to your PDF

const renderPDF = async () => {
    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;

    // Get the container for the rendered pages
    const container = document.getElementById('pdf-render-container');

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 }); // Increase scale for better quality

        // Create a div for each page
        const pageContainer = document.createElement('div');
        pageContainer.className = 'pdf-page';
        pageContainer.style.width = `${viewport.width}px`;
        pageContainer.style.height = `${viewport.height}px`;
        container.appendChild(pageContainer);

        // Create and render the canvas for the page
        const canvas = document.createElement('canvas');
        canvas.className = 'canvas-layer';
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        pageContainer.appendChild(canvas);

        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        await page.render(renderContext).promise;

        // Create and render the text layer
        // const textLayerDiv = document.createElement('div');
        // textLayerDiv.className = 'pdf-text-layer';
        // textLayerDiv.style.width = `${viewport.width}px`;
        // textLayerDiv.style.height = `${viewport.height}px`;
        // pageContainer.appendChild(textLayerDiv);

        const textContent = await page.getTextContent();
        pdfjsLib.renderTextLayer({
            textContent: textContent,
            container: textLayerDiv,
            viewport: viewport,
            textDivs: [],
            enhanceTextSelection: true, // Improves text selection and highlightability
        });
    }
};

renderPDF();
