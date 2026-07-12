# StepAlgo

StepAlgo is an Electron-based desktop application for visualizing page-replacement algorithms in operating systems. It helps students and developers compare how FIFO, LRU, and Optimal strategies behave under the same workload by turning abstract memory-management concepts into an interactive simulation.

## Table of Contents

- [Description](#description)
- [Preview](#preview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation Guide](#installation-guide)
- [Constraints and Future Improvements](#constraints-and-future-improvements)
- [License](#license)

## Description

This project was created as an educational tool for exploring memory paging and page-fault behavior. Instead of relying only on static theory, users can define a reference string, set the number of page frames, and compare the resulting behavior of multiple replacement algorithms side by side.

The application combines a lightweight desktop interface with supporting educational context, making it suitable for coursework, demonstrations, and personal study.

## Preview

| Preview                                                                             | Description                                                                                                                                  |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| ![Main simulation view](images/2%20OS-case_study-page_replacement_algorithm-ss.png) | Shows the core comparison interface, including the reference string, page-frame input, and the simulated results for FIFO, LRU, and Optimal. |
| ![Information view](images/1%20OS-case_study-page_replacement_algorithm-ss.png)     | Presents supporting educational material about page-replacement concepts and the operating systems context behind the simulation.            |

## Tech Stack

| Technology       | Purpose                                                                   |
| ---------------- | ------------------------------------------------------------------------- |
| Electron         | Provides the desktop application shell and native runtime experience.     |
| JavaScript       | Implements the simulation logic, validation, and interactive UI behavior. |
| HTML and CSS     | Structures the interface and styles the visual layout.                    |
| Node.js          | Serves as the runtime environment for development and packaging scripts.  |
| electron-builder | Packages the app for macOS, Linux, and Windows distribution.              |

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

To package the app for local distribution, run:

```bash
npm run dist
```

## Constraints and Future Improvements

Current limitations include:

- The app focuses on three classic algorithms and does not yet include additional strategies such as Second Chance or Clock.
- The interface is functional, but it could be improved with richer explanations, animations, and stronger accessibility support.
- The current experience is centered on desktop use; a web-based version could broaden accessibility.

Potential future improvements:

- Add more replacement algorithms and comparison modes.
- Improve the educational experience with step-by-step annotations and performance explanations.
- Support saved scenarios, configurable workloads, and exportable results.
- Refine the UI for better responsiveness and usability.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
