
// RANDOM PAGE-REFERENCE-STRING
function generateReferenceString(length = 20, pageRange = 10) {
	const reference = [];
	for (let i = 0; i < length; i++) {
		const page = Math.floor(Math.random() * pageRange);
		reference.push(page);
	}

	return reference;
}

function displayReferenceString() {
	const referenceArray = generateReferenceString();
	const referenceString = referenceArray.join(',');
	const inputElement = document.querySelector('#reference-page-string');

	if (inputElement) {
		inputElement.value = referenceString;
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const randomImage = document.querySelector('#random-image');
	if (randomImage) {
		randomImage.addEventListener('click', displayReferenceString);
	}
});

// SUBMIT BUTTON VALIDATION + ALGORITHM SIMULATION
document.querySelector('#submit-button').addEventListener('click', () => {
	const referenceInput = document.querySelector('#reference-page-string');
	const pageFramesInput = document.querySelector('#page-frames');
	const errorMessage = document.querySelector('#error-message');
	const referenceString = referenceInput.value.trim();
	const pageFramesValue = pageFramesInput.value.trim();
	const errors = [];

	// Validate Reference String
	const validFormat = /^(\d,){19}\d$/;
	if (validFormat.test(referenceString)) {
		const numbers = referenceString.split(',').map(Number);
		if (numbers.length !== 20 || numbers.some(n => isNaN(n) || n < 0 || n > 9)) {
			errors.push('Reference String values must be numbers between 0 and 9.');
		}
	} else {
		errors.push('Reference String must have exactly 20 numbers (0-9) separated by commas, no letters or spaces.');
	}

	// Validate Page Frames
	const pageFramesNumber = Number(pageFramesValue);
	if (isNaN(pageFramesNumber) || pageFramesNumber < 1 || pageFramesNumber > 19) {
		errors.push('Page Frames ranging from 1 to 19 can only be accommodated in this program. Try Again.');
	}

	// Display Errors
	if (errors.length > 0) {
		errorMessage.textContent = errors.join(' ');
		errorMessage.style.opacity = '1';
	} else {
		errorMessage.textContent = 'Error-Message';
		errorMessage.style.opacity = '0';

		const numbers = referenceString.split(',').map(Number);

		// Display the reference string
		const simulations = document.querySelectorAll('.simulation');
		for (const simulation of simulations) {
			const stringContainer = simulation.querySelector('.string-container');
			const stringDivs = stringContainer.querySelectorAll('.string');

			for (const [index, div] of stringDivs.entries()) {
				div.textContent = numbers[index];
			}
		}

		// Now simulate algorithms
		const displayPageFrame = document.querySelector('#display-page-frame');
		displayPageFrame.textContent = pageFramesNumber;
		simulateAlgorithms(numbers, pageFramesNumber);
	}
});

function simulateAlgorithms(referenceString, frameCount) {
	const simulations = document.querySelectorAll('.simulation');

	fifoQueue = [];
	fifoPageFaults = 0;
	lruPageFaults = 0;
	optimalPageFaults = 0;

	for (const simulation of simulations) {
		const algoId = simulation.id;
		const pageContainer = simulation.querySelector('.page-container');
		const pageDivs = pageContainer.querySelectorAll('.page');

		for (const pageDiv of pageDivs) {
			pageDiv.innerHTML = '';
		}

		const frames = [];

		for (const [index, pageNumber] of referenceString.entries()) {
			let pageFault = false;

			switch (algoId) {
				case 'fifo': {
					pageFault = simulateFIFO(frames, frameCount, pageNumber);
					break;
				}

				case 'lru': {
					pageFault = simulateLRU(frames, frameCount, pageNumber, referenceString.slice(0, index));
					break;
				}

				case 'optimal': {
					pageFault = simulateOptimal(frames, frameCount, pageNumber, referenceString.slice(index + 1));
					break;
				}
				// No default
			}

			const pageDiv = pageDivs[index];

			if (pageFault) {
				for (const framePage of frames) {
					const pageResult = document.createElement('div');
					pageResult.className = 'page-results';
					pageResult.textContent = framePage;
					pageResult.style.width = '100%';
					pageResult.style.height = '30px';
					pageResult.style.borderRadius = 'inherit';
					pageResult.style.backgroundColor = framePage === pageNumber ? 'rgba(153, 188, 133, 0.7)' : 'rgba(153, 188, 133, 0.3)';
					pageDiv.append(pageResult);
				}
			}
		}

		// 👇 After loop, update page fault result
		switch (algoId) {
		case 'fifo': {
			document.querySelector('#fifo-page-faults-result').textContent = fifoPageFaults;
			document.querySelector('#fifo-page-fault').textContent = fifoPageFaults;

			break;
		}

		case 'lru': {
			document.querySelector('#lru-page-faults-result').textContent = lruPageFaults;
			document.querySelector('#lru-page-fault').textContent = lruPageFaults;

			break;
		}

		case 'optimal': {
			document.querySelector('#optimal-page-faults-result').textContent = optimalPageFaults;
			document.querySelector('#optimal-page-fault').textContent = optimalPageFaults;

			break;
		}
		// No default
		}
	}

	// Compare the page faults to find the best algorithm
	determineBestAlgorithm();
}

function determineBestAlgorithm() {
	const results = {
		FIFO: fifoPageFaults,
		LRU: lruPageFaults,
		Optimal: optimalPageFaults,
	};

	const minFaults = Math.min(...Object.values(results));

	// Find all algorithms that have the minimum fault count
	const bestAlgorithms = Object.entries(results)
		.filter(([_, faults]) => faults === minFaults)
		.map(([algo]) => algo);

	const outputElement = document.querySelector('#efficient-algo');

	if (bestAlgorithms.length === 1) {
		outputElement.textContent = `${bestAlgorithms[0]} is the most efficient with ${minFaults} page faults.`;
	} else if (bestAlgorithms.length === 3) {
		// All tied — compare by complexity
		outputElement.textContent
      = `All algorithms have ${minFaults} page faults. Based on time and space complexity, `
      + 'LRU is preferred because it performs well in practice and does not require future knowledge like Optimal.';
	} else {
		// Tie between 2 algorithms
		const list = bestAlgorithms.join(' and ');
		let recommended = '';

		if (bestAlgorithms.includes('LRU')) {
			recommended = 'LRU is preferred due to better practical efficiency.';
		} else if (bestAlgorithms.includes('FIFO')) {
			recommended = 'FIFO is preferred for its simplicity.';
		} else {
			recommended = 'Optimal is theoretically best, but not practical in real-world systems.';
		}

		outputElement.textContent
      = `${list} are tied with ${minFaults} page faults. ${recommended}`;
	}
}

let fifoQueue = []; // FIFO queue for arrival order
let fifoPageFaults = 0; // Counter for page faults

function simulateFIFO(frames, frameCount, currentPage) {
	let changed = false;

	if (!frames.includes(currentPage)) {
		changed = true; // It is a page fault
		fifoPageFaults++;

		if (frames.length < frameCount) {
			frames.push(currentPage);
			fifoQueue.push(currentPage);
		} else {
			const oldestPage = fifoQueue.shift(); // Remove oldest
			const oldestIndex = frames.indexOf(oldestPage); // Find where it is
			frames[oldestIndex] = currentPage; // Replace at same spot
			fifoQueue.push(currentPage);
		}
	}

	return changed; // Return whether page fault occurred
}

let lruPageFaults = 0; // Counter for LRU faults (declare global like fifoPageFaults)

function simulateLRU(frames, frameCount, currentPage, pastPages) {
	let changed = false;

	if (!frames.includes(currentPage)) {
		changed = true; // It is a page fault
		lruPageFaults++;

		if (frames.length < frameCount) {
			frames.push(currentPage);
		} else {
			// Find the least recently used page
			let lruIndex = -1;
			let lruPage = null;
			for (const page of frames) {
				const lastUsed = pastPages.lastIndexOf(page);
				if (lruIndex === -1 || lastUsed < lruIndex) {
					lruIndex = lastUsed;
					lruPage = page;
				}
			}

			const replaceIndex = frames.indexOf(lruPage);
			frames[replaceIndex] = currentPage; // Replace LRU page in same position
		}
	}

	return changed; // Return true if page fault occurred
}

let optimalPageFaults = 0; // Counter for Optimal faults (global)

function simulateOptimal(frames, frameCount, currentPage, futurePages) {
	let changed = false;

	if (!frames.includes(currentPage)) {
		changed = true;
		optimalPageFaults++;

		if (frames.length < frameCount) {
			frames.push(currentPage);
		} else {
			let farthestIndex = -1;
			let pageToReplace = null;

			for (const page of frames) {
				const nextUse = futurePages.indexOf(page);

				if (nextUse === -1) {
					// This page is never used again → best to replace
					farthestIndex = Infinity;
					pageToReplace = page;
				} else if (nextUse > farthestIndex) {
					// Find page used farthest in future
					farthestIndex = nextUse;
					pageToReplace = page;
				}
			}

			const replaceIndex = frames.indexOf(pageToReplace);
			frames[replaceIndex] = currentPage; // Replace at the same slot
		}
	}

	return changed; // Return whether page fault occurred
}

// CREATE 20 PAGES PROPERLY
function createSimulationDivs(simulation) {
	const stringContainer = simulation.querySelector('.string-container');
	const pageContainer = simulation.querySelector('.page-container');

	stringContainer.innerHTML = ''; // Clear only inside container
	pageContainer.innerHTML = '';

	for (let i = 0; i < 20; i++) {
		const stringDiv = document.createElement('div');
		stringDiv.className = 'string'; // Use class, not id
		stringContainer.append(stringDiv);
	}

	for (let i = 0; i < 20; i++) {
		const pageDiv = document.createElement('div');
		pageDiv.className = 'page'; // Use class, not id
		pageContainer.append(pageDiv);
	}
}

globalThis.addEventListener('DOMContentLoaded', () => {
	const simulations = document.querySelectorAll('.simulation');
	for (const simulation of simulations) {
		createSimulationDivs(simulation);
	}
});

const navParagraphs = document.querySelectorAll('nav p');

for (const p of navParagraphs) {
	p.addEventListener('click', () => {
		// Remove 'active' class from all nav p elements
		for (const item of navParagraphs) {
			item.classList.remove('active');
		}

		// Add 'active' class to the clicked p
		p.classList.add('active');
	});
}
