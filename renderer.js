
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

  //SUBMIT BUTTON VALIDATION
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
        errors.push("Page Frames ranging from 1 to 9 can only be accomodated in this program. Try Again.");
    }

    // Display Errors
    if (errors.length > 0) {
        errorMessage.textContent = errors.join(' ');
        errorMessage.style.opacity = '1';
    } else {
        errorMessage.textContent = 'Error-Message';
        errorMessage.style.opacity = '0';
    }
});