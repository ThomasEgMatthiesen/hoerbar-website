window.onload = function () {
    const pageCover = document.querySelector('.page-cover');
    setTimeout(function () {
        pageCover.style.opacity = '0';
    }, 100);
    setTimeout(function () {
        pageCover.style.display = 'none';
    }, 500);
};


function addHoverEffect() {
    const imgElements = document.querySelectorAll('.prjct-img');
    const vidElements = document.querySelectorAll('.prjct-vid');
    const projectControl = document.querySelectorAll('.prjct-cntrl')

    imgElements.forEach((imgElement, index) => {
      const video = vidElements[index]; // Get the corresponding video element
      const projectControlHover = projectControl[index];
  
      imgElement.addEventListener('mouseover', () => {
        if (video) {
          video.classList.add('prjct-vid-active');
          video.play(); // Start playing the video
          projectControlHover.classList.add('prjct-cntrl-hvr');
        }
      });
  
      imgElement.addEventListener('mouseout', () => {
        if (video) {
          video.classList.remove('prjct-vid-active');
          video.pause(); // Pause the video
          projectControlHover.classList.remove('prjct-cntrl-hvr');
        }
      });
    });
  }
  
  // Check if the device has touch interaction
  const isTouchDevice = 'ontouchstart' in document.documentElement;
  
  // Only call the function if it's not a touch device
  if (!isTouchDevice) {
    addHoverEffect();
  }