const fs = require("fs");
const path = require("path");
const { startTracking, endTracking } = require("./performanceTracker");

// Initializes a boolean object for tracking unique integers
function createBooleanArray(size) {
  let booleanArray = {};
  for (let i = 0; i < size; i++) {
    booleanArray[i] = false;
  }
  return booleanArray;
}

// Adds a unique integer to the boolean object
function addToBooleanArray(booleanArray, num) {
  booleanArray[num + 1023] = true; // Adjust index for negative values
}

// Converts the boolean object into a sorted object of unique integers
function getSortedUniqueIntegers(booleanArray) {
  let result = {};
  result.length = 0;

  for (let i in booleanArray) {
    if (booleanArray.hasOwnProperty(i) && booleanArray[i]) {
      result[result.length] = parseInt(i, 10) - 1023;
      result.length++;
    }
  }

  // Custom implementation of sorting (insertion sort)
  for (let i = 1; i < result.length; i++) {
    let key = result[i];
    let j = i - 1;
    while (j >= 0 && result[j] > key) {
      result[j + 1] = result[j];
      j--;
    }
    result[j + 1] = key;
  }

  return result;
}

// Main function to process the input file, sort the integers, and write them to a new file
function UniqueInt(inputFilePath) {
  const directory = "sample_results";
  const baseName =
    path.basename(inputFilePath, path.extname(inputFilePath)) +
    ".txt_results.txt";
  const outputFilePath = path.join(directory, baseName);
  const trackingData = startTracking();

  fs.mkdir(directory, { recursive: true }, (err) => {
    if (err) {
      console.error("Error creating directory:", err);
      return;
    }

    fs.readFile(inputFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return;
      }

      let lines = "";
      for (let i = 0; i < data.length; i++) {
        lines += data[i];
      }

      lines = lines.split("\n");

      const booleanArray = createBooleanArray(2047); // Range from -1023 to 1023

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        let line = "";
        for (let i = 0; i < lines[lineIndex].length; i++) {
          line += lines[lineIndex][i];
        }

        line = line.trim();

        if (line === "") {
          continue; // Skip empty lines
        }

        let validNumber = true;
        let num = 0;
        let negative = false;
        let startIndex = 0;

        if (line[0] === '-') {
          negative = true;
          startIndex = 1;
        } else if (line[0] === '+') {
          startIndex = 1;
        }

        for (let i = startIndex; i < line.length; i++) {
          if (line[i] < '0' || line[i] > '9') {
            validNumber = false;
            break;
          }
          num = num * 10 + (line.charCodeAt(i) - '0'.charCodeAt(0));
        }

        if (validNumber) {
          if (negative) {
            num = -num;
          }
          if (num >= -1023 && num <= 1023) {
            addToBooleanArray(booleanArray, num);
          }
        }
      }

      let sortedNumbers = getSortedUniqueIntegers(booleanArray);
      
      // Create result string
      let result = "";
      for (let i = 0; i < sortedNumbers.length; i++) {
        result += sortedNumbers[i] + "\n";
      }

      fs.writeFile(outputFilePath, result, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
        endTracking(trackingData);
      });
    });
  });
}

// Usage  to sort integers from the sample files
UniqueInt("sample_input_for_students/sample_01.txt");
// UniqueInt("sample_input_for_students/sample_02.txt");
// UniqueInt("sample_input_for_students/sample_03.txt");
// UniqueInt("sample_input_for_students/sample_04.txt");
// UniqueInt("sample_input_for_students/small_sample_input_01.txt");
// UniqueInt("sample_input_for_students/small_sample_input_02.txt");
// UniqueInt("sample_input_for_students/small_sample_input_03.txt");
// UniqueInt("sample_input_for_students/small_sample_input_04.txt");
