const fs = require("fs").promises; // Use promise-based filesystem functions
const path = require("path");
const { startTracking, endTracking } = require("./performanceTracker");

// Async function to process unique integers from a file
async function UniqueInt(inputFilePath) {
  const directory = "sample_results";
  const baseName =
    path.basename(inputFilePath, path.extname(inputFilePath)) + ".txt_results.txt";
  const outputFilePath = path.join(directory, baseName);
  const trackingData = startTracking(); // Start performance tracking

  try {
    // Ensure the directory exists; create it if it does not
    await fs.mkdir(directory, { recursive: true });

    // Read the input file
    const data = await fs.readFile(inputFilePath, "utf8");
    const lines = data.split(/\r?\n/); // Split data into lines
    const numbers = new Set(); // Use a set to store unique numbers

    // Process each line, parse integers, and add to set if valid and safe
    for (let line of lines) {
      line = line.trim(); // Trim whitespace
      if (/^[-+]?[0-9]+$/.test(line)) {
        // Check if the line contains a valid integer
        const num = parseInt(line, 10);
        if (Number.isSafeInteger(num)) {
          // Check if the integer is safe to use
          numbers.add(num); // Add the integer to the set of unique numbers
        }
      }
    }

    // Convert the set to an array, sort the numbers, and write to file
    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
    await fs.writeFile(outputFilePath, sortedNumbers.join("\n") + "\n");
  } catch (err) {
    console.error("Error:", err); // Log any errors that occur
  } finally {
    endTracking(trackingData); // End performance tracking
  }
}

// Usage examples to sort integers from the sample files
// UniqueInt("sample_input_for_students/sample_01.txt");
// UniqueInt('sample_input_for_students/sample_02.txt');
// UniqueInt('sample_input_for_students/sample_03.txt');
// UniqueInt('sample_input_for_students/sample_04.txt');
// UniqueInt('sample_input_for_students/small_sample_input_01.txt');
// UniqueInt('sample_input_for_students/small_sample_input_02.txt');
// UniqueInt('sample_input_for_students/small_sample_input_03.txt');
UniqueInt("sample_input_for_students/small_sample_input_04.txt");
