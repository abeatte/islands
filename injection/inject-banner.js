const fs = require('fs');
const path = require('path');

const htmlFilePath = path.join(__dirname, '../dist/index.html');
const styleContentToAdd = fs.readFileSync('injection/inject-styles.css', 'utf8') 
const bodyContentToAdd = fs.readFileSync('injection/inject-body.html', 'utf8') 
const scriptContentToAdd = fs.readFileSync('injection/inject-script.html', 'utf8') 
const gTagContentToAdd = fs.readFileSync('injection/inject-gtag.html', 'utf8') 

const args = process.argv.slice(2); // Get user-provided arguments

fs.readFile(htmlFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading HTML file:', err);
        return;
    }

    // inject Meta
    const modifiedHtml = data.replace('<head>', `<head>\n\t\t<meta name="version" content="${args[0]}">`)
    // inject Style
    .replace('<style>', `<style>\n${styleContentToAdd}`)
    // inject Script
    .replace('<script>', `<script>\n${scriptContentToAdd}`)
    // inject ga tag
    .replace('</head>', `${gTagContentToAdd}\n\t</head>`)
    // inject Body
    .replace('<body>', `<body>\n${bodyContentToAdd}`);


    fs.writeFile(htmlFilePath, modifiedHtml, 'utf8', (err) => {
        if (err) {
            console.error('Error writing HTML file:', err);
            return;
        }
        console.log('Successfully injected "New Content Banner".');
    });
});