

//////////////////////////////////////
///////    FADE IN THE PAGE    ///////
//////////////////////////////////////

function createOverlay() {
  // Create the overlay element
  const overlay = document.createElement('div');

  // Set the overlay's styles
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = '#0D111C';
  overlay.style.opacity = 1;
  overlay.style.zIndex = 20;

  // Add the overlay to the page
  document.body.appendChild(overlay);

  // Fade out the overlay over a period of 2 seconds
  fadeOut(overlay, 2000);
}

// Fade out function
function fadeOut(element, duration) {
  // Set the initial opacity
  let opacity = 1;

  // Decrement the opacity by 0.01 every 10 milliseconds
  const interval = setInterval(function() {
    if (opacity <= 0) {
      // Stop the interval when the desired opacity is reached
      clearInterval(interval);

      // Remove the element from the page
      element.parentNode.removeChild(element);
    }
    element.style.opacity = opacity;
    opacity -= 0.01;
  }, 10);
}

createOverlay();
