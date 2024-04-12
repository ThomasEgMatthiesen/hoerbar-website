
//////////////////////////////////////
///////  ARROW + PROGRESS LINE  ////////
//////////////////////////////////////

function moveAndResizeDivOnScroll() {
  // Get the fixed div element
  const fixedDiv = document.querySelector('#back-arrow');

  // Get the a element
  const link = document.querySelector('#arrow-link');

  // Get the div element
  const div = document.querySelector('#status-line');

  // Get the height of the viewport
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

  // Get the current scroll position of the page and the height of the entire page
  const { scrollTop, scrollHeight } = document.documentElement;

  // Calculate the scroll percentage
  const scrollPercent = scrollTop / (scrollHeight - viewportHeight);

  // Calculate the new top position of the fixed div based on the scroll percentage
  const newTop = (viewportHeight - fixedDiv.offsetHeight) * scrollPercent;

  // Calculate the new height of the div based on the scroll percentage
  const newHeight = 100 - (100 * scrollPercent);

  // Use requestAnimationFrame to animate the position and size changes
  requestAnimationFrame(() => {
    // Set the top position of the fixed div to the new calculated value
    fixedDiv.style.top = `${newTop}px`;

    // Set the height of the div to the new calculated value
    div.style.height = `${newHeight}%`;
  });

  // Rotate the div and change link, but only if the scroll percentage is greater than 10%
  if (scrollPercent > 0.1) {
    // Smoothly transition the rotation of the div over 1 second
    fixedDiv.style.transition = 'transform 0.5s';
    // Rotate the div by 90 degrees
    fixedDiv.style.transform = 'rotate(90deg)';
    // Change the href of the a element
    link.href = '#top';
  } else {
    // Reset the rotation
    fixedDiv.style.transform = 'rotate(0deg)';
    // Change the href of the a element
    link.href = '/da/blog.html';
  }
}

// Call the MoveAndResizeDivOnScroll function when the page is scrolled
window.addEventListener('scroll', moveAndResizeDivOnScroll);
