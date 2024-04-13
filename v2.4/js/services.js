currentLargestIndex = -1;
// Get all elements with the 'srvc-cntnr' class
elements = document.querySelectorAll('.srvc-cntnr');
// Get all 'a' elements within '.srvcs-box-top'
aElements = document.querySelectorAll('.srvcs-box-top a');

function logElementInView() {
  // Initialize variables to keep track of the largest element and its size
  let largestElement = null;
  let largestSize = 0;

  // Loop through all elements and check which one takes up the most of the viewport
  elements.forEach((element, index) => {
    // Get the element's bounding rectangle
    const rect = element.getBoundingClientRect();

    // Calculate the element's size as a percentage of the viewport height
    const size = ((rect.bottom - rect.top) / window.innerHeight) * 100;

    // If this element is larger than the previous largest and it's in view, update the variables
    if (size > largestSize && rect.bottom >= window.innerHeight / 2 && rect.top <= window.innerHeight / 2) {
      largestElement = element;
      largestSize = size;

      // Update the current largest index if the largest element has changed
      if (currentLargestIndex !== index) {
        currentLargestIndex = index;

        // Add the 'active-box-a' class to the corresponding 'a' element and remove it from all others
        aElements.forEach((aElement, index) => {
          if (index === currentLargestIndex) {
            aElement.classList.add('active-box-a');
            
          } else {
            aElement.classList.remove('active-box-a');
          }
        });
      }
    }
  });
}

// Attach the function to the 'scroll' event of the window
window.addEventListener('scroll', logElementInView);


// Go to element clicked on frontpage
if (clickedService > -1) {
  setTimeout(function() { 
    aElements[clickedService].click();
    clickedService = -1;
  }, 200);
}



// get all elements with class 'srvcs-intro-btn'
introBtns = document.querySelectorAll('.srvcs-intro-btn');
introBtnTxt = document.querySelectorAll('.srvcs-intro-btn h3');
introSmallTxt = document.querySelectorAll('.intro-sml-txt');

// add click event listener to each button
introBtns.forEach((button, index) => {
  button.addEventListener('click', () => {
    // remove 'intro-btn-active' class from all buttons
    introBtns.forEach((button) => {
      button.classList.remove('intro-btn-active');
    });

    introBtnTxt.forEach((txt) => {
      txt.classList.remove('intro-big-txt');
    });
    
    introSmallTxt.forEach((txt) => {
      txt.classList.remove('show-sml-txt');
    });

    // add 'intro-btn-active' class to clicked button
    button.classList.add('intro-btn-active');
    introBtnTxt[index].classList.add('intro-big-txt');
    introSmallTxt[index].classList.add('show-sml-txt');
  });

  button.addEventListener('mouseover', () => {
    button.classList.add('intro-btn-hvr');
    introBtnTxt[index].classList.add('intro-big-txt-hvr');
  });

  button.addEventListener('mouseout', () => {
    button.classList.remove('intro-btn-hvr');
    introBtnTxt[index].classList.remove('intro-big-txt-hvr');
  });
});