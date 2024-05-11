# Unique Integer Processor

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
  - [Running the Application](#running-the-application)
  - [Comparing Output Files](#comparing-output-files)
  - [Example Terminal Output for the `diff` Command](#example-terminal-output-for-the-diff-command)
- [Contributing](#contributing)
- [License](#license)
- [Contributor](#contributor)

## Overview

The Unique Integer Processor is a Node.js application that reads input files containing integers, identifies all unique integers, sorts them, and then writes the sorted list to new files. This utility includes built-in performance tracking and is efficient for processing large datasets.

## Features

- **Unique Integer Extraction**: Extracts unique integers from provided text files.
- **Performance Metrics**: Tracks and logs execution time and memory usage.
- **Error Handling**: Robust error handling for file operations.
- **Sort and Output**: Outputs sorted unique integers to specified directory.

## Prerequisites

Ensure you have the following before starting:
- Node.js (version 12.x or higher)

## Installation

Clone the repository:

```bash
git clone https://github.com/Lydia02/UniqueInt.git
cd UniqueInt
```

## Usage

### Running the Application

To run the application, navigate to the project directory in your terminal and execute the application by passing the path to the input file:

```bash
node uniqueInt.js <path_to_input_file>
```

For example, to process a specific file:

```bash
node uniqueInt.js sample_input_for_students/small_sample_input_04.txt
```

This command processes the file, extracts and sorts unique integers, and saves them in the `sample_results` directory.

When run, you will see performance metrics displayed in the terminal:

```
Lydia@DESKTOP-5TKSJNF MINGW64 ~/Desktop/ALU/uniqueInt (master)
$ node uniqueInt.js sample_input_for_students/small_sample_input_04.txt
Execution time: 5 ms
Memory used: 45576 bytes
```

### Comparing Output Files

To compare the sorted integers in the output file against a predefined result file, use the `diff` command in the terminal:

```bash
diff sample_results/small_sample_input_01.txt_results.txt results_for_sample_inputs/small_sample_input_01.txt_result.txt
```

If there are no differences, the command will not output anything, indicating that the files are identical. If there are differences, `diff` will output the lines that do not match.

## Contributing

Contributions are welcome. Please fork the repository, create a feature branch, and submit a pull request for review.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Contributor

- **Lydia Ojoawo** - [GitHub Profile](https://github.com/Lydia02)
```
