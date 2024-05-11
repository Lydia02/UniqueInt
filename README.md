
# Unique Integer Processor

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Comparing Output Files](#comparing-output-files)
- [Example Terminal Output for the `diff` Command](#example-terminal-output-for-the-diff-command)
- [Contributing](#contributing)
- [License](#license)
- [Contributor](#contributor)

![Unique Integer Processor](path_to_image/unique_integer_processor_banner.jpg)

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

Run the application with the path to the input file:

```bash
node uniqueInt.js <path_to_input_file>
```

For example, to process a specific file:

```bash
node uniqueInt.js sample_input_for_students/small_sample_input_04.txt
```

This command processes the file, extracts and sorts unique integers, and saves them in the `sample_results` directory.

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

### Example Terminal Output for the `diff` Command

If you use the `diff` command as described in the README to compare the results, here's what you might see in the terminal:

1. **No Differences Found:**
   - Terminal Output: _<no output>_
   - This means the files are identical.

2. **Differences Found:**
   - Terminal Output:
     ```
     3c3
     < 12345
     ---
     > 12346
     ```
   - This output shows that on line 3, the expected file has "12345" while the generated file has "12346".

## Contributor

- **Lydia Ojoawo** - [GitHub Profile](https://github.com/Lydia02)

```

