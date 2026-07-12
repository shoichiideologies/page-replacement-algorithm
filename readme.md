# StepAlgo

![Language JavaScript](https://img.shields.io/badge/LANGUAGE-JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![Framework Electron](https://img.shields.io/badge/FRAMEWORK-ELECTRON-47848F?style=for-the-badge&logo=electron&logoColor=ffffff)
![Runtime Node.js](https://img.shields.io/badge/RUNTIME-NODE.JS-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=ffffff)
![Markup HTML5](https://img.shields.io/badge/MARKUP-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=ffffff)
![Styles CSS3](https://img.shields.io/badge/STYLES-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=ffffff)
![MIT License](https://img.shields.io/badge/LICENSE-MIT-2E7D32?style=for-the-badge)

StepAlgo is an Electron desktop application for visualizing classic operating-system page-replacement algorithms. It lets users enter or generate a page-reference string, choose the number of page frames, and compare FIFO, LRU, and Optimal replacement behavior through an interactive simulation.

## Table of Contents

- [Preview](#preview)
- [Tech Stack](#tech-stack)
- [Repository Overview](#repository-overview)
- [Features](#features)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [Algorithm Comparison Design](#algorithm-comparison-design)
- [Documentation Assets](#documentation-assets)
- [Constraints and Future Improvements](#constraints-and-future-improvements)
- [License](#license)

## Preview

| Preview | Description |
| --- | --- |
| ![Main StepAlgo computation view](images/2%20OS-case_study-page_replacement_algorithm-ss.png) | Main simulation workspace for entering a reference string, setting frame count, running calculations, and comparing page-fault totals across FIFO, LRU, and Optimal. |
| ![StepAlgo information view](images/1%20OS-case_study-page_replacement_algorithm-ss.png) | Educational reference screen explaining the algorithms, complexity notes, and glossary terms used in the simulation. |

## Tech Stack

| Technology | Role |
| --- | --- |
| Electron | Provides the desktop shell, application window, native menu, and packaging target. |
| JavaScript | Implements reference-string generation, input validation, page-replacement simulation, page-fault counting, and UI updates. |
| HTML | Defines the computation and information screens. |
| CSS | Styles the desktop interface, algorithm panels, controls, glossary, and visual output grid. |
| Node.js and npm | Manage the development runtime, scripts, dependencies, and lockfile. |
| electron-builder | Builds distributable desktop packages for macOS, Windows, and Linux. |
| XO and ESLint | Provide the configured linting/test command used by the project and CI workflow. |

## Repository Overview

```text
.
├── index.js                  # Electron main process and BrowserWindow setup
├── index.html                # Main page-replacement computation interface
├── renderer.js               # Simulation logic for FIFO, LRU, and Optimal
├── information.html          # Educational reference and glossary screen
├── information.js            # Glossary navigation and view interactions
├── index.css                 # Main computation view styling
├── information.css           # Information view styling
├── menu.js                   # Electron application menu configuration
├── config.js                 # electron-store configuration wrapper
├── images/                   # README and project screenshots
├── documentation/            # Supporting operating-systems case-study PDFs
├── icons/, logo/, static/    # App icons and interface assets
├── package/                  # Packaged release snapshot
└── package.json              # Scripts, dependencies, and electron-builder config
```

## Features

- Visualizes FIFO, LRU, and Optimal page-replacement algorithms under the same workload.
- Accepts custom comma-separated reference strings with values from `0` to `9`.
- Generates random page-reference strings with configurable length.
- Supports page-frame counts from `1` to `9`.
- Rebuilds the simulation grid dynamically based on the reference-string length.
- Highlights page-fault events in each algorithm's frame history.
- Calculates and compares total page faults for each algorithm.
- Recommends the most efficient algorithm for the current input, including tie handling.
- Includes an information screen with algorithm explanations, complexity notes, and glossary navigation.

## Installation Guide

### Prerequisites

- Node.js 18 or newer
- npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/shoichiideologies/page-replacement-algorithm.git
   cd page-replacement-algorithm
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the desktop app:

   ```bash
   npm start
   ```

## Usage

1. Enter the number of page frames to allocate.
2. Enter a comma-separated reference string, or use the random button to generate one.
3. Adjust the reference length when generating random inputs.
4. Select **Calculate** to run FIFO, LRU, and Optimal against the same input.
5. Review the visual frame history, page-fault totals, and recommendation summary.

### Development Commands

| Command | Description |
| --- | --- |
| `npm start` | Runs the Electron app locally. |
| `npm test` | Runs the configured linting check through XO. |
| `npm run lint` | Runs XO directly. |
| `npm run pack` | Creates an unpacked local Electron build. |
| `npm run dist` | Builds distributable packages for configured platforms. |
| `npm run dist:mac` | Builds a universal macOS package. |

## Algorithm Comparison Design

The simulator is designed around side-by-side comparison rather than isolated algorithm demonstrations. Each calculation uses the same reference string and frame count for FIFO, LRU, and Optimal, then renders separate frame histories and page-fault counts.

The Optimal implementation uses future knowledge as a benchmark and selects the first available page when multiple loaded pages will never be used again. That deterministic tie-break keeps repeated runs predictable while still demonstrating the theoretical lower bound for page faults.

When multiple algorithms produce the same minimum page-fault count, the app reports the tie and chooses a practical recommendation. If all three algorithms tie, LRU is preferred because it avoids Optimal's unrealistic future knowledge while generally modeling real-world locality better than FIFO.

## Documentation Assets

The `documentation/` directory contains supporting PDFs for the operating-systems case study behind the project, including the broader virtual-memory topic and page-replacement-specific material. These files are useful for understanding the academic context and terminology reflected in the information screen.

## Constraints and Future Improvements

- The simulator currently focuses on FIFO, LRU, and Optimal; additional algorithms such as Second Chance, Clock, LFU, or MRU could broaden the comparison.
- Reference-string values are limited to single-digit pages from `0` to `9`, which keeps the interface compact but limits larger demonstrations.
- The main Electron window is fixed at `1500x900`, so responsive behavior could be improved for smaller displays.
- The app includes desktop packaging scripts, but release metadata and menu links still contain boilerplate values that should be customized before public distribution.
- Simulation output could be expanded with step-by-step playback, annotations, exportable results, and saved scenarios.
- Accessibility can be improved with stronger keyboard workflows, focus states, and screen-reader-oriented descriptions for the generated simulation grid.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
