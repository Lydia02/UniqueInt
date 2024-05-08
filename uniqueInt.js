const fs = require('fs');
const path = require('path');
const { startTracking, endTracking } = require('./performanceTracker');

function sortUniqueIntegers(inputFilePath) {
    const directory = 'sorted_sample';
    const baseName = path.basename(inputFilePath, path.extname(inputFilePath)) + '_result.txt';
    const outputFilePath = path.join(directory, baseName);

    const trackingData = startTracking();  // Start tracking

    fs.readFile(inputFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const numbers = new Set(data.split(/\r?\n/).map(line => parseInt(line, 10)).filter(num => !isNaN(num)));
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        fs.writeFile(outputFilePath, sortedNumbers.join('\n') + '\n', (err) => {
            if (err) {
                console.error('Error writing file:', err);
            }
            endTracking(trackingData);  // End tracking
        });
    });
}

// Example usage for a sample file
sortUniqueIntegers('sample_input_for_students/small_sample_input_01.txt');
