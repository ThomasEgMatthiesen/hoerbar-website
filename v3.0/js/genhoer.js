// Get all elements with the class "g-mark"
const gMarks = document.querySelectorAll('.g-mark');

// Get the element with the class "g-info"
const gInfo = document.querySelector('.g-info');

// Get the element with the class "g-locations"
const gLocations = document.querySelector('.g-locations');

// Last clicked element (and initial)
let lastClickedIndex = 0;

////////////////////////////////////
// UPDATE INFO POSITION AND LINES //
////////////////////////////////////

function updateGInfoPosition(topValue, leftValue) {
    // Check if the window width is at least 992 pixels
    if (window.innerWidth >= 992) {
        // Get the height of the ".g-info" element
        const infoHeight = parseFloat(window.getComputedStyle(gInfo).getPropertyValue('height'));

        // Get the height of the ".g-locations" element
        const locationsHeight = parseFloat(window.getComputedStyle(gLocations).getPropertyValue('height'));

        // Calculate the adjustment
        const adjustment = infoHeight / 2;

        // Calculate the new top value based on the last clicked index
        let newTopValue = topValue - adjustment;

        // Calculate height of info with top value
        let totalNewHeight = newTopValue + infoHeight;

        // Check if the new top value exceeds locationsHeight
        if (totalNewHeight > locationsHeight) {
            newTopValue = locationsHeight - infoHeight; // Set top to the maximum allowed value
        } else if (newTopValue < 0) {
            newTopValue = 0; // Ensure newTopValue is not negative
        }

        // Calculate the additional width based on the screen width
        let additionalWidth = window.innerWidth >= 1200 ? 5.125 * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : (window.innerWidth >= 992 ? 2.5 * parseFloat(window.getComputedStyle(document.documentElement).fontSize) : 0);

        // Set the top value of the ".g-info" element
        gInfo.style.top = newTopValue + 'px';

        // Set the width of the corresponding index of ".g-mark-line" with the additional width
        const gMarkLines = document.querySelectorAll('.g-mark-line');
        gMarkLines[lastClickedIndex].style.width = leftValue + additionalWidth + 'px';

        // Set the width of the rest of the ".g-mark-line" elements to 0
        for (let i = 0; i < gMarkLines.length; i++) {
            if (i !== lastClickedIndex) {
                gMarkLines[i].style.width = 0;
            }
        }
    }
}


//////////////////////////////
// ADD CLICK EVENT TO MARKS //
//////////////////////////////

gMarks.forEach((gMark, index) => {
    gMark.addEventListener('click', () => {
        // Remove the active class from all gMarks
        gMarks.forEach((otherGMark) => {
            otherGMark.classList.remove('g-mark-active');
        });

        // Add the active class to the clicked gMark
        gMark.classList.add('g-mark-active');

        updateLocationInfo(index);

        // Get the top value of the clicked ".g-mark" element
        const topValue = parseFloat(window.getComputedStyle(gMark).getPropertyValue('top'));
        const leftValue = parseFloat(window.getComputedStyle(gMark).getPropertyValue('left'));
        lastClickedIndex = index; // Update the last clicked index
        setTimeout(() => { updateGInfoPosition(topValue, leftValue); }, 50);
        setTimeout(() => { setInfoLineHeight(); }, 100);
        updateCounter();
    });
});

///////////////////////////////
// UPDATE INFO POS ON RESIZE //
///////////////////////////////

window.addEventListener('resize', () => {
    const topValue = parseFloat(window.getComputedStyle(gMarks[lastClickedIndex]).getPropertyValue('top'));
    const leftValue = parseFloat(window.getComputedStyle(gMarks[lastClickedIndex]).getPropertyValue('left'));
    updateGInfoPosition(topValue, leftValue);
});

// Call the function initially to set the position on page load
updateGInfoPosition(parseFloat(window.getComputedStyle(gMarks[lastClickedIndex]).getPropertyValue('top')), parseFloat(window.getComputedStyle(gMarks[lastClickedIndex]).getPropertyValue('left')));



/////////////////
// UPDATE INFO //
/////////////////

function updateLocationInfo(index) {
    // Fetch the JSON data from a file
    fetch('/json/genhoer-locations.json')
        .then(response => response.json())
        .then(data => {
            if (index >= 0 && index < data.locations.length) {
                const locationData = data.locations[index];
                
                // Update the HTML elements with the retrieved data
                document.getElementById('gLocation').textContent = locationData.location;
                document.getElementById('gDate').textContent = locationData.date;
                document.getElementById('gText').textContent = locationData.text;

                // Update the background image of the gImage div
                const gImageDiv = document.getElementById('gImage');
                gImageDiv.style.background = `url("${locationData.imgUrl}") no-repeat center`;
                gImageDiv.style.backgroundSize = 'cover';
            } else {
                console.log("Invalid index");
            }
        })
        .catch(error => console.error(error));
}


/////////////////////
// SET LINE HEIGHT //
/////////////////////

function setInfoLineHeight() {
    // Check if the window width is at least 992 pixels
    if (window.innerWidth >= 992) {
        // Get the first element with the class .g-info-col
        const infoCol = document.querySelector(".g-info-col");

        if (infoCol) {
            // Get all elements with the class .g-info-line
            const infoLines = document.querySelectorAll(".g-info-line");

            // Set the height of each .g-info-line element to match the height of .g-info-col
            infoLines.forEach((infoLine) => {
                infoLine.style.height = infoCol.clientHeight + "px";
            });
        }
    }
}

// Call the function to set the heights initially
setInfoLineHeight();

// Attach the function to the window's resize event
window.addEventListener("resize", setInfoLineHeight);












const controlElements = document.querySelectorAll(".g-cntrl");

document.addEventListener("DOMContentLoaded", function () {
  controlElements[0].addEventListener("click", function () {
    lastClickedIndex = (lastClickedIndex - 1 + gMarks.length) % gMarks.length;
    gMarks[lastClickedIndex].click();
    updateCounter();
  });

  controlElements[1].addEventListener("click", function () {
    lastClickedIndex = (lastClickedIndex + 1) % gMarks.length;
    gMarks[lastClickedIndex].click();
    updateCounter();
  });

  updateCounter();
});

function updateCounter() {
    const counterElement = document.querySelector(".g-counter");
    const counterText = `${lastClickedIndex + 1} / ${gMarks.length}`;
    counterElement.innerHTML = counterText;
}
