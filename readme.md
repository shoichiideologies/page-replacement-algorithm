# StepAlgo

StepAlgo is an interactive desktop application for visualizing common page-replacement algorithms in operating systems. It helps students and developers understand how memory management decisions behave under different workload patterns by simulating FIFO, LRU, and Optimal replacement strategies.

## Table of Contents

- [Description](#description)
- [Preview](#preview)
- [Tech Stack](#tech-stack)
- [Repository Overview](#repository-overview)
- [Features](#features)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [Constraints and Future Improvements](#constraints-and-future-improvements)
- [License](#license)

## Description

This project was built as an educational tool for exploring memory paging behavior. Instead of relying only on static theory, users can enter a reference string, adjust the number of page frames, and compare how different algorithms respond to the same workload.

The application is packaged as an Electron desktop app and includes both a computational simulation view and supporting documentation for the operating systems concepts behind the algorithms.

## Preview

| View             | Description                                                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| Computation view | Displays the page-reference string and visualizes FIFO, LRU, and Optimal simulations side by side. |
| Information view | Provides supporting educational context and explains the underlying operating systems concepts.    |

![Computation view](images/2%20OS-case_study-page_replacement_algorithm-ss.png)

![Information view](images/1%20OS-case_study-page_replacement_algorithm-ss.png)

## Tech Stack

- Electron: Desktop application framework for packaging the app as a native experience.
- JavaScript: Core simulation logic and UI interactions.
- HTML and CSS: Structure and styling for the visual interface.
- Node.js: Runtime for the Electron application and local packaging scripts.
- electron-builder: Production packaging and distribution workflow.

## Repository Overview

The repository is organized around a small Electron app:

- index.html and index.css: Main application layout and styling.
- renderer.js: Simulation logic for the page-replacement algorithms.
- information.html and information.js: Educational content and supplementary information view.
- menu.js and config.js: Application menu and configuration handling.
- images/, logo/, static/, and icons/: Assets used by the UI and packaging process.
- documentation/: Case-study and reference materials related to the operating systems topic.

## Features

- Simulate FIFO, LRU, and Optimal page-replacement algorithms.
- Compare page-fault counts for the same reference string and frame count.
- Generate random reference strings for experimentation.
- Display a visual breakdown of frame allocation across the simulation.
- Provide supporting educational information in a dedicated information view.

## Installation Guide

### Prerequisites

- Node.js 18 or newer
- npm

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/shoichiideologies/page-replacement-algorithm.git
   cd page-replacement-algorithm
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application locally:
   ```bash
   npm start
   ```

### Build for distribution

To package the app for local distribution:

```bash
npm run dist
```

## Usage

1. Open the application and enter the number of page frames.
2. Provide or generate a reference page string.
3. Click Calculate to run the simulations.
4. Review the visual results and the page-fault comparison table to evaluate which algorithm performs best for the current input.

## Constraints and Future Improvements

Current limitations include:

- The app focuses on three classic algorithms and does not yet include additional replacement strategies.
- The interface is functional but could be improved with richer explanations, animations, and accessibility enhancements.
- The current workflow is centered on desktop use; a web-based version could broaden accessibility.

Potential future improvements:

- Add more algorithms such as Second Chance and Clock.
- Improve the educational experience with step-by-step annotations and performance explanations.
- Provide saved scenarios, configurable workloads, and exportable results.
- Refine the UI for improved responsiveness and usability.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
