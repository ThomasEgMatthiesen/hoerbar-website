////////////////////////////////////////////////////////////////////////////
////////////////////         SUBPAGE PLAYER LOGO        ////////////////////
////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////
///////   SMALL LOGO EFFECTS   ///////
//////////////////////////////////////

// Logo elements
const logo = document.getElementsByClassName("logo-crcl");

// Hover effect on logo
logo[0].addEventListener("mouseover", function() {
  event.stopPropagation();
  logo[0].classList.add('logo-hvr');
  logo[2].classList.add('logo-hvr');
  logo[4].classList.add('logo-hvr');
}, false);

logo[0].addEventListener("mouseout", function() {
  event.stopPropagation();
  logo[0].classList.remove('logo-hvr');
  logo[2].classList.remove('logo-hvr');
  logo[4].classList.remove('logo-hvr');
}, false);

// Start/stop the logo animation
logo[0].addEventListener("click", function() {
  event.stopPropagation();
  animateLogo();
}, false);

function animateLogo() {
  for(let i = 0; i < logo.length; i++) {
    logo[i].classList.toggle('ani-paused');
  }
}

// Turn player on/off logo
document.body.onkeyup = function(e) {
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    logo[0].click();
  }
}

//////////////////////////////////////
///////       SCROLL LOCK      ///////
//////////////////////////////////////

// prevent spacebar from scrolling
window.addEventListener('keydown', function(e) {
  if(e.keyCode === 32 && e.target === document.body) {
    e.preventDefault();
  }
});

////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////
///////    CASES DATA FETCH    ///////
//////////////////////////////////////

let cases;

async function fetchCases() {
  const response = await fetch('/json/cases.json');
  const data = await response.json();
  cases = data;
}

fetchCases()
  .then(() => {
    // Initiate the case control after fetch
    //controlCaseActivation(elements);
    // Update the cases after fetch
    updateCases()
  });


//////////////////////////////////////
/////   POPULATE CASES ELEMENTS   ////
//////////////////////////////////////

// When using this for sorting all elements should be deleted first

function updateCases() {
  // Get the wrapper for the cases elements
  let casesWrapper = document.getElementsByClassName('cases-cases-wrpr')[0];
  // Go through the json file array
  for (let i = 0; i < cases.length; i++) {

    // Container
    let caseDiv = document.createElement('div');
    caseDiv.classList.add('cases-case-cntnr');
    // Add dark class to even numbers
    if (i % 2 == 0) { caseDiv.classList.add('case-dark'); }
    casesWrapper.appendChild(caseDiv);

    // Year
    let caseYear = document.createElement('h4');
    caseYear.textContent = cases[i].year;
    caseDiv.appendChild(caseYear);

    // Subtitle
    let caseSubtitle = document.createElement('h2');
    caseSubtitle.textContent = cases[i].subtitle;
    caseDiv.appendChild(caseSubtitle);



  }

  // Lastly add the footer to the page
  let caseFootr = document.createElement('div');
  caseFootr.classList.add('cases-footr');
  casesWrapper.appendChild(caseFootr);
  // When done updating cases then load them to array
  elements = document.querySelectorAll('.cases-case-cntnr');
  // Then launch the control of which case is active
  controlCaseActivation(elements);
}

//////////////////////////////////////
///////  REGISTER ACTIVE CASE  ///////
//////////////////////////////////////

let elements;
let currentElementIndex;
const sortYearContainer = document.getElementsByClassName('cases-sort-year-cntnr')[0];

function controlCaseActivation(elements) {

  // Create an array to keep track of whether each element has reached 60% of the viewport height
  let hasReached60Percent = [];

  // Listen for scroll events on the window
  window.addEventListener('scroll', function() {
    // Get the height of the viewport
    const viewportHeight = window.innerHeight;


    // Loop through the elements
    elements.forEach((element, index) => {
      // Get the top position of the element
      const elementTop = element.offsetTop;

      // If the element hasn't reached 60% of the viewport height yet and the top of the element is now at or below 60% of the viewport height, log a message
      if (!hasReached60Percent[index] && window.scrollY + (0.6 * viewportHeight) >= elementTop) {
        // Hide year-sorting-box if the first element is activated
        if (index === 0) { sortYearContainer.classList.add('sort-year-cntnr-hdn'); }
        // Set the flag for this element to true so that we don't log the message again
        hasReached60Percent[index] = true;
        // Set the case heading to the right text
        writeTextToElement(index);
        // Update the progress fill
        updateProgressFill();
        // Update element index to be used in controls
        currentElementIndex = index;
      }
      // If the element has reached 60% of the viewport height and the top of the element is now above 80% of the viewport height, reset the flag for this element
      else if (hasReached60Percent[index] && window.scrollY + (0.8 * viewportHeight) < elementTop) {
        // Show year-sorting-box if the first element is de-activated
        if (index === 0) { sortYearContainer.classList.remove('sort-year-cntnr-hdn'); }
        hasReached60Percent[index] = false;
        // Set the index to previous case, unless it is the first case
        index = index - 1;
        // Set the case heading to the previous text
        writeTextToElement(index);
        // Update element index to be used in controls
        currentElementIndex = index;
        // Update the progress fill
        updateProgressFill();
      }
      // Set fill height on scroll
      setHeightOnScroll();
    });
  });
}


//////////////////////////////////////
///////   CASE PROGRESS FILL   ///////
//////////////////////////////////////


const casesHeading = document.getElementsByClassName('cases-hdng')[0];
let element;

function setHeightOnScroll() {
  // Get the active case element
  element = elements[currentElementIndex];
  // If no element is active then return
  if (element == null || element == undefined) { return; }
  // Data for calculations
  let elementHeight = element.offsetHeight / 100 * 80;
  let elementOffsetTop = element.offsetTop;
  let headingHeight = casesHeading.offsetHeight;
  let scrollPosHdr = window.scrollY + headingHeight;
  let elementScrollPos = scrollPosHdr - elementOffsetTop;
  let elementScrollPercentage = elementScrollPos / elementHeight * 40;
  // Stick to positive numbers
  if (elementScrollPercentage < 0) { elementScrollPercentage = 0; }
  let percentageToString = String(elementScrollPercentage);
  // Set height of fill
  progressFill.style.height = percentageToString + "%";
}

//////////////////////////////////////
///////   PROGRESS FILL COLOR   //////
//////////////////////////////////////

const progressFill = document.getElementsByClassName('cases-progress-fill')[0];
const casesHeaderContainer = document.getElementsByClassName('cases-case-hdr')[0];
let fillColors = ['#F2EEE3', '#0D111C'];
let colorCounter = 0;

function updateProgressFill(direction) {
  // set fill to first color
  progressFill.style.backgroundColor = fillColors[colorCounter];

  colorCounter++;
  if (colorCounter >= fillColors.length) { colorCounter = 0 };
  // cancel function if at sorting elements
  if (currentElementIndex < 0 || currentElementIndex == undefined) { return; }
  // set background to second color
  casesHeaderContainer.style.backgroundColor = fillColors[colorCounter];
};


//////////////////////////////////////
///////   WRITE CASE HEADER    ///////
//////////////////////////////////////

const caseHeading = document.getElementById('caseHeading');

function writeTextToElement(index) {
  // Clear the element's innerHTML and cancel the previous timeout
  caseHeading.innerHTML = "";
  clearTimeout(writeTextToElement.timeoutId);
  let text;
  let i = 0;

  // Select the text input from array of cases, if it is under 0 then nothing is used
  if (index === -1 ) { text = "..."; } else { text = cases[index].title; }

  function write() {
    if (i < text.length) {
      caseHeading.innerHTML += text.charAt(i);
      i++;
      // Get random number between 50-200 for writing delay
      const randomNumber = Math.floor(Math.random() * 151) + 50;
      writeTextToElement.timeoutId = setTimeout(write, randomNumber);
    }
  }
  // Schedule the write function to be called after 100 milliseconds
  writeTextToElement.timeoutId = setTimeout(write, 200);
}



//////////////////////////////////////
///////   UP / DOWN CONTROLS   ///////
//////////////////////////////////////

const caseUpBtn = document.getElementById('casesUp');
const caseDownBtn = document.getElementById('casesDown');

caseUpBtn.addEventListener('click', function() {
  scrollToElement(currentElementIndex, 0);
});

caseDownBtn.addEventListener('click', function() {
  scrollToElement(currentElementIndex, 1);
});

function scrollToElement(index, direction) {
  let nextElement;

  // Get the previous or next same-level element
  if (direction === 0) { nextElement = elements[index].previousElementSibling; }
  else { nextElement = elements[index].nextElementSibling; }

  // If there is a next element, scroll to it with a 10em gap
  if (nextElement) {
    // Calculate the distance from the top of the next element to the top of the viewport
    const top = nextElement.getBoundingClientRect().top;

    // Scroll the viewport so that the top of the element is 10em from the top
    window.scrollTo(0, window.pageYOffset + top - 10 * 16);
  } else if ( direction === 1 ) {
    // If the last case is active but no fully scrolled then scroll to bottom of page
    window.scrollTo(0, document.body.scrollHeight);
  }
}
