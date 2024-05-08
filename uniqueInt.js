const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '/sample_input_for_students/');
const outputDir = path.join(__dirname, '/results_for_sample_inputs/');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Read and process each file in the input directory
fs.readdir(inputDir, (err, files) => {
    if (err) {
        console.error("Failed to list directory", err);
        return;
    }
    
    files.forEach(file => {
        if (file.endsWith('.txt')) {
            const filePath = path.join(inputDir, file);
            processFile(filePath, file);
        }
    });
});

function processFile(filePath, fileName) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Failed to read file: ${filePath}`, err);
            return;
        }
        
        const lines = data.split(/\r?\n/);
        const uniqueIntegers = new Set();
        
        lines.forEach(line => {
            line = line.trim();
            if (line && !isNaN(line) && parseInt(line) === parseFloat(line)) {
                uniqueIntegers.add(parseInt(line));
            }
        });
        
        const sortedIntegers = Array.from(uniqueIntegers).sort((a, b) => a - b);
        writeResults(sortedIntegers, fileName);
    });
}

function writeResults(integers, fileName) {
    const outputPath = path.join(outputDir, fileName.replace('.txt', '_results.txt'));
    const data = integers.join('\n');
    
    fs.writeFile(outputPath, data, 'utf8', (err) => {
        if (err) {
            console.error(`Failed to write to file: ${outputPath}`, err);
            return;
        }
        console.log(`Results written to ${outputPath}`);
        console.log(outputPath);
    });
}
