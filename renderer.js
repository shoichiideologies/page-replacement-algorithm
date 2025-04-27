
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
    const inputElement = document.getElementById('reference-page-string');
    
    if (inputElement) {
      inputElement.value = referenceString;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const randomImage = document.getElementById('random-image');
    if (randomImage) {
      randomImage.addEventListener('click', displayReferenceString);
    }
  });

// SUBMIT BUTTON VALIDATION + ALGORITHM SIMULATION
document.getElementById('submit-button').addEventListener('click', function() {
  const referenceInput = document.getElementById('reference-page-string');
  const pageFramesInput = document.getElementById('page-frames');
  const errorMessage = document.getElementById('error-message');
  const referenceString = referenceInput.value.trim();
  const pageFramesValue = pageFramesInput.value.trim();
  let errors = [];

  // Validate Reference String
  const validFormat = /^(\d,){19}\d$/;
  if (!validFormat.test(referenceString)) {
      errors.push('Reference String must have exactly 20 numbers (0-9) separated by commas, no letters or spaces.');
  } else {
      const numbers = referenceString.split(',').map(Number);
      if (numbers.length !== 20 || numbers.some(n => isNaN(n) || n < 0 || n > 9)) {
          errors.push('Reference String values must be numbers between 0 and 9.');
      }
  }

  // Validate Page Frames
  const pageFramesNumber = Number(pageFramesValue);
  if (isNaN(pageFramesNumber) || pageFramesNumber < 1 || pageFramesNumber > 9) {
      errors.push("Page Frames ranging from 1 to 9 can only be accommodated in this program. Try Again.");
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
      simulations.forEach(simulation => {
          const stringContainer = simulation.querySelector('.string-container');
          const stringDivs = stringContainer.querySelectorAll('.string');

          stringDivs.forEach((div, index) => {
              div.textContent = numbers[index];
          });
      });

      // Now simulate algorithms
      simulateAlgorithms(numbers, pageFramesNumber);
  }
});

function simulateAlgorithms(referenceString, frameCount) {
  const simulations = document.querySelectorAll('.simulation');

  fifoQueue = [];
  fifoPageFaults = 0;
  lruPageFaults = 0;
  optimalPageFaults = 0;

  simulations.forEach(simulation => {
    const algoId = simulation.id;
    const pageContainer = simulation.querySelector('.page-container');
    const pageDivs = pageContainer.querySelectorAll('.page');

    pageDivs.forEach(pageDiv => pageDiv.innerHTML = '');

    let frames = [];

    referenceString.forEach((pageNumber, index) => {
      let pageFault = false;

      if (algoId === 'fifo') {
        pageFault = simulateFIFO(frames, frameCount, pageNumber);
      } else if (algoId === 'lru') {
        pageFault = simulateLRU(frames, frameCount, pageNumber, referenceString.slice(0, index));
      } else if (algoId === 'optimal') {
        pageFault = simulateOptimal(frames, frameCount, pageNumber, referenceString.slice(index + 1));
      }

      const pageDiv = pageDivs[index];

      if (pageFault) {
        frames.forEach(framePage => {
          const pageResult = document.createElement('div');
          pageResult.className = 'page-results';
          pageResult.textContent = framePage;
          pageResult.style.width = '100%';
          pageResult.style.height = `calc(100% / ${frameCount})`;
          pageResult.style.borderRadius = 'inherit';
          pageDiv.appendChild(pageResult);
        });
      }
      // Otherwise, leave blank for page hits
    });

    // 👇 After loop, update page fault result
    if (algoId === 'fifo') {
      document.getElementById('fifo-page-faults-result').textContent = fifoPageFaults;
      document.getElementById('fifo-page-fault').textContent = fifoPageFaults;
    }else if (algoId === 'lru') {
      document.getElementById('lru-page-faults-result').textContent = lruPageFaults;
      document.getElementById('lru-page-fault').textContent = lruPageFaults;
    }else if (algoId === 'optimal') {
      document.getElementById('optimal-page-faults-result').textContent = optimalPageFaults;
      document.getElementById('optimal-page-fault').textContent = optimalPageFaults;
    }
  });

  // Compare the page faults to find the best algorithm
  let bestAlgo = '';
  let minFaults = Math.min(fifoPageFaults, lruPageFaults, optimalPageFaults);

  if (minFaults === fifoPageFaults) {
    bestAlgo = ' FIFO';
  } else if (minFaults === lruPageFaults) {
    bestAlgo = ' LRU';
  } else {
    bestAlgo = ' Optimal';
  }

  // Display the best algorithm and its minimum page faults in the #efficient-algo element
    document.getElementById('efficient-algo').textContent = ` ${bestAlgo} with ${minFaults} page faults`;
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
      for (let page of frames) {
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

      frames.forEach(page => {
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
      });

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
    stringContainer.appendChild(stringDiv);
  }

  for (let i = 0; i < 20; i++) {
    const pageDiv = document.createElement('div');
    pageDiv.className = 'page'; // Use class, not id
    pageContainer.appendChild(pageDiv);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const simulations = document.querySelectorAll('.simulation');
  simulations.forEach(simulation => {
    createSimulationDivs(simulation);
  });
});