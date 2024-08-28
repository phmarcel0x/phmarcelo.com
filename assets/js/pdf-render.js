// pdf-render.js

// URL of the PDF file
const url = '/assets/TechPM - Resume.pdf';

// Asynchronously fetch the PDF
pdfjsLib.getDocument(url).promise.then(pdf => {
    // Loop through each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        pdf.getPage(pageNum).then(page => {
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // Append each canvas to the container
            document.getElementById('pdf-render-container').appendChild(canvas);

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            // Render the page onto the canvas
            page.render(renderContext);
        });
    }
});
