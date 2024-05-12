const fs = require("fs");
const path = require("path");
const { startTracking, endTracking } = require("./performanceTracker");

// Initializes a collection object for storing unique integers
function createCollection() {
  return {};
}

// Adds a unique integer to the collection if it is not already present
function addToCollection(collection, key, value) {
  if (collection[key] === undefined) {
    // Checks for uniqueness before adding
    collection[key] = value;
  }
}

// Converts the keys of the collection object into an array-like structure without using array methods
function getKeys(collection) {
  let result = {};
  result.length = 0; // Maintains a custom 'length' property for tracking

  for (let key in collection) {
    if (collection.hasOwnProperty(key)) {
      result[result.length] = parseInt(key); // Stores keys as integer values in a custom structure
      result.length++; // Increments length manually
    }
  }

  // Manually converts the custom structure into an array for sorting
  let arrayResult = [];
  for (let i = 0; i < result.length; i++) {
    arrayResult[i] = result[i];
  }
  return arrayResult;
}

// Sorts an array of integers using the insertion sort algorithm
function sortKeys(keys) {
  for (let i = 1; i < keys.length; i++) {
    let key = keys[i];
    let j = i - 1;
    while (j >= 0 && keys[j] > key) {
      keys[j + 1] = keys[j]; // Shifts elements in the array to the right
      j--;
    }
    keys[j + 1] = key; // Inserts the key at the correct sorted position
  }
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

      const lines = data.split(/\r?\n/);
      const uniqueNumbers = createCollection();

      for (let line of lines) {
        line = line.trim();
        if (/^[-+]?[0-9]+$/.test(line)) {
          const num = parseInt(line, 10);
          if (Number.isSafeInteger(num)) {
            addToCollection(uniqueNumbers, num, true);
          }
        }
      }

      let sortedNumbers = getKeys(uniqueNumbers);
      sortKeys(sortedNumbers); // Applies custom sorting to the array of numbers

      let result = sortedNumbers.join("\n") + "\n";

      fs.writeFile(outputFilePath, result, (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
        endTracking(trackingData);
      });
    });
  });
}

// Usage examples to sort integers from the sample files
// UniqueInt("sample_input_for_students/sample_01.txt");
// UniqueInt('sample_input_for_students/sample_02.txt');
// UniqueInt("sample_input_for_students/sample_03.txt");
// UniqueInt('sample_input_for_students/sample_04.txt');
// UniqueInt('sample_input_for_students/small_sample_input_01.txt');
// UniqueInt('sample_input_for_students/small_sample_input_02.txt');
// UniqueInt('sample_input_for_students/small_sample_input_03.txt');
UniqueInt("sample_input_for_students/small_sample_input_04.txt");
