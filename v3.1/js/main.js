
//////////////////////
////// DOM LOAD //////
//////////////////////

function isMobileDevice() {
  // Check if the user agent string matches any mobile device patterns
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

window.addEventListener('load', function() {
  iconAnimation();
  // Get the current URL parameters
  let params = new URLSearchParams(window.location.search);
  // Get the value of the 'page' parameter as a string
  let page = params.get('page');
  if (page === null || page === undefined || page === '') { page = 'index'}
  // Load the page from URL
  setTimeout(function () { loadPage(page, null); }, 2250);
  // Setup intersection image effect
  intersectionSetup();
  // Check if the device is not a mobile device
  if (!isMobileDevice()) {
    // Setup custom cursor
    cursorSetup();
  }
});

////////////////////////
//// ICON ANIMATION ////
////////////////////////

let mainElement = document.querySelector('main');
let iconContainer = document.getElementById('iconContainer');
let iconWrapper = document.getElementById('iconWrapper');
let iconLeft = document.getElementById('iconLeft');
let iconRight = document.getElementById('iconRight');

function iconAnimation() {
  if (iconWrapper && iconLeft && iconRight && iconContainer) {
    // Generate a random rotation value between 45 and 360
    let randomRotation = Math.floor(Math.random() * (360 - 45 + 1) + 45);
    // Set rotation for icon wrapper
    iconWrapper.style.transform = 'rotate(' + randomRotation + 'deg)';
    // Set 'top' for iconLeft and iconRight
    iconLeft.style.top = '-50%';
    iconRight.style.top = '100%';
    // Fade out icon wrapper
    iconWrapper.style.opacity = '0';
    // Fade out icon container
    iconContainer.style.opacity = '0';
    // Hide icon container and load page after 2.25 seconds
    setTimeout(function () { iconContainer.style.display = 'none'; }, 2250);
  }
}

////////////////////////
////// NAVIGATION //////
////////////////////////

let infoAnchor = 'index';
let portfolioScrollPos = 0;
let worksScrollPos = 0;
let infoText = document.getElementById('infoBtn').querySelector('p');

// LOAD PAGE
function loadPage(id, el) {

  // Control info window open and close
  if (id !== 'info') {
    infoAnchor = id;
  } else if (id === 'info' && infoText.textContent === 'info') {
    infoText.textContent = '←';
    scrollToPosition(0, false);
  } else {
    id = infoAnchor;
    infoText.textContent = 'info';
  }
  
  let targetPage = document.getElementById(id);

  // Update URL parameters
  let url = window.location.href.split('?')[0] + '?page=' + id;
  history.pushState({ page: id }, null, url);

  // Reset info button on logo click
  if(id === 'index') { infoText.textContent = 'info'; }

  // Show and hide the pages
  mainElement.style.opacity = '0';
  setTimeout(function () {
    mainElement.style.opacity = '1';
    document.querySelectorAll('.page').forEach(page => page.classList.add('hide-page'));
    targetPage.classList.remove('hide-page');
  }, 250);

  // Play and pause video
  videoControl(targetPage);

  updateAudio(id);

  // Auto-scroll for projects and works
  if (el) {
    if (el.classList.contains('port-lmnt')) {
      portfolioScrollPos = window.scrollY;
      scrollToPosition(0, true);
    } else if (el.classList.contains('wrk-lmnt')) {
      worksScrollPos = window.scrollY;
      scrollToPosition(0, true);
    } else if (el.classList.contains('prjct-bck-btn')) {
      scrollToPosition(portfolioScrollPos, false);
    } else if (el.classList.contains('wrk-bck-btn')) {
      scrollToPosition(worksScrollPos, false);
    }
  }
}

// SCROLL
function scrollToPosition(x, b) {
  let distance = x;
  if (b === true) {
    let rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if (window.innerWidth < 768) {
      distance = 57.5;
    } else {
      distance = rootFontSize * 5;
    }
  }
  setTimeout(function () {
    window.scrollTo({
      top: distance,
      behavior: 'auto'
    });
  }, 250);
}

// BACK AND FORWARD BROWSER BUTTON POPSTATE
window.addEventListener('popstate', function(event) {
  if (event.state) {
    loadPage(event.state.page);
  } else {
    // Handle initial state
    let params = new URLSearchParams(window.location.search);
    let page = params.get('page');
    if (page) {
      loadPage(page);
    }
  }
});

// VIDEO PLAY AND PAUSE
let videoElements = document.querySelectorAll('video');
let videoToggle = false;
function videoControl(page) {
  let video = page.querySelector('video');
  if (videoToggle) {
    videoElements.forEach(videoElement => videoElement.pause());
    videoToggle = false;
  }
  if (video) { 
    video.play();
    videoToggle = true;
  }
}

// TOGGLE AUDIO BUTTON
let audioIcon = document.getElementById('audioIcon');
let audioClick = false;
document.getElementById('audioBtn').addEventListener('click', function() {
  if (audioIcon.src.endsWith('sound_off.svg')) {
      audioIcon.src = 'media/svg/sound_on.svg';
      if (audioClick) {
        //startAudio();
      } else {
        //initializeAudio();
      }
      audioClick = true;
  } else {
      audioIcon.src = 'media/svg/sound_off.svg';
      //stopAudio();
  }
});


//////////////////////
/////// CURSOR ///////
//////////////////////

function cursorSetup() {
  // Select the custom cursor element
  const cursor = document.querySelector('.custom-cursor');

  // Track mouse movement
  document.addEventListener('mousemove', function (e) {
    // Update custom cursor position to follow the mouse
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Mouse leave
  document.addEventListener("mouseleave", () => { cursor.style.display = "none"; });
  document.addEventListener("mouseenter", () => { cursor.style.display = "block"; });

  // Add event listener for elements with class 'c-point'
  const cPointElements = document.querySelectorAll('.c-point');
  cPointElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      cursor.classList.add('c-big');
    });
    element.addEventListener('mouseleave', function() {
      cursor.classList.remove('c-big');
    });
  });
}


///////////////////////
/////// EFFECTS ///////
///////////////////////

// HOVER WORK ELEMENTS
let wrkElements = document.querySelectorAll('.wrk-lmnt');
wrkElements.forEach(element => {
  element.addEventListener('mouseenter', function() {
    let imgElement = element.querySelector('img');
    if (imgElement) {
      imgElement.classList.add('zoom-img');
    }
  });

  element.addEventListener('mouseleave', function() {
    let imgElement = element.querySelector('img');
    if (imgElement) {
      imgElement.classList.remove('zoom-img');
    }
  });
});

// INTERSECTION ELEMENTS
function intersectionSetup() {
  const intersectionImages = document.querySelectorAll('.intersection-lmnt');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };
  const callback = function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('intersected');
        observer.unobserve(entry.target); // Stop observing once the image is visible
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  intersectionImages.forEach(el => {
    observer.observe(el);
  });
}
