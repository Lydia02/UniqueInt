const fs = require("fs");
const path = require("path");
const { startTracking, endTracking } = require("./performanceTracker");

// Function to sort unique integers from a file and output them into a new file in a specific directory
function sortUniqueIntegers(inputFilePath) {
  const directory = "sorted_sample";
  const baseName =
    path.basename(inputFilePath, path.extname(inputFilePath)) + "_result.txt";
  const outputFilePath = path.join(directory, baseName);
  const trackingData = startTracking();

  // Ensure the specified directory exists; create it if it does not
  fs.mkdir(directory, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating directory:", err);
      return;
    }

    // Read the input file
    fs.readFile(inputFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }
      // Split file content into lines
      const lines = data.split(/\r?\n/);
      // Use a set to store unique numbers
      const numbers = new Set();

      for (let line of lines) {
        line = line.trim(); // Trim whitespace from each line
        if (/^[-+]?[0-9]+$/.test(line)) {
          // Regex to check if the line is an integer
          const num = parseInt(line, 10); // Convert line to integer
          if (Number.isSafeInteger(num)) {
            // Check if it's a safe integer
            numbers.add(num); // Add to set of unique numbers
          }
        }
      }

      const sortedNumbers = Array.from(numbers).sort((a, b) => a - b); // Convert set to array and sort

      // Write sorted numbers to the output file
      fs.writeFile(outputFilePath, sortedNumbers.join("\n") + "\n", (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
        endTracking(trackingData); // End performance tracking
      });
    });
  });
}

// Usage examples to sort integers from the sample files
sortUniqueIntegers("sample_input_for_students/sample_01.txt");
// sortUniqueIntegers('sample_input_for_students/sample_02.txt');
// sortUniqueIntegers('sample_input_for_students/sample_03.txt');
// sortUniqueIntegers('sample_input_for_students/sample_04.txt');
// sortUniqueIntegers('sample_input_for_students/small_sample_input_01.txt');
// sortUniqueIntegers('sample_input_for_students/small_sample_input_02.txt');
// sortUniqueIntegers('sample_input_for_students/small_sample_input_03.txt');
sortUniqueIntegers('sample_input_for_students/small_sample_input_04.txt');
