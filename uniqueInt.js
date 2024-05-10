const fs = require('fs');
const path = require('path');
const { startTracking, endTracking } = require('./performanceTracker');

function sortUniqueIntegers(inputFilePath) {
    const directory = 'sorted_sample';
    const baseName = path.basename(inputFilePath, path.extname(inputFilePath)) + '_result.txt';
    const outputFilePath = path.join(directory, baseName);

    const trackingData = startTracking();  // Start tracking

    // Ensure the directory exists before proceeding
    fs.mkdir(directory, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating directory:', err);
            return;
        }

        fs.readFile(inputFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }

            const lines = data.split(/\r?\n/);
            const numbers = new Set();

            for (let line of lines) {
                line = line.trim(); // Trim whitespace from start and end
                if (/^[-+]?[0-9]+$/.test(line)) {
                    const num = parseInt(line, 10);
                    if (Number.isSafeInteger(num)) {
                        numbers.add(num);
                    }
                }
            }

            const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

            // Write the file after ensuring the directory is ready
            fs.writeFile(outputFilePath, sortedNumbers.join('\n') + '\n', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                }
                endTracking(trackingData);  // End tracking
            });
        });
    });
}

// Example usage for a sample file
sortUniqueIntegers('sample_input_for_students/small_sample_input_04.txt');
// sortUniqueIntegers('sample_input_for_students/sample_04.txt');
