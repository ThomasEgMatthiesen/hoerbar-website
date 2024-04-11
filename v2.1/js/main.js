

// media queries
const largeDevice = window.matchMedia("(max-width: 992px)")

// :active pseudo-class working on iOS Safari
document.addEventListener("touchstart", function() {},false);

// detect browser
function detectBrowser() {
  let isMobile = window.matchMedia("(any-pointer:coarse)").matches;
  if (isMobile) {
    cursorDisplayOff();
    hoverCssOf();
  }
}

// logo
const circleAll = document.getElementsByClassName("logo-crcl");
const circleOne = document.getElementsByClassName("one")[0];
const circleTwo = document.getElementsByClassName("two")[0];
const circleThree = document.getElementsByClassName("three")[0];
const circleFour = document.getElementsByClassName("four")[0];
const circleFive = document.getElementsByClassName("five")[0];

// footer logo
const footrCircleAll = document.getElementsByClassName("footr-crcl");
const footrCircleOne = document.getElementsByClassName("footr-one")[0];
const footrCircleTwo = document.getElementsByClassName("footr-two")[0];
const footrCircleThree = document.getElementsByClassName("footr-three")[0];
const footrCircleFour = document.getElementsByClassName("footr-four")[0];
const footrCircleFive = document.getElementsByClassName("footr-five")[0];


circleAll[0].addEventListener("mouseover", function() {
  event.stopPropagation();
  toggleLogoColor();
}, false);

circleAll[0].addEventListener("mouseout", function() {
  event.stopPropagation();
  toggleLogoColor();
}, false);

circleAll[0].addEventListener("click", function() {
  event.stopPropagation();
  animateLogos();
}, false);

footrCircleAll[0].addEventListener("mouseover", function() {
  event.stopPropagation();
  footrToggleLogoColor();
}, false);

footrCircleAll[0].addEventListener("mouseout", function() {
  event.stopPropagation();
  footrToggleLogoColor();
}, false);

footrCircleAll[0].addEventListener("click", function() {
  event.stopPropagation();
  animateLogos();
}, false);

function toggleLogoColor() {
  for(let i = 0; i < circleAll.length; i = i + 2) {
    circleAll[i].classList.toggle('hvr-logo');
  }
}

function footrToggleLogoColor() {
  for(let i = 0; i < footrCircleAll.length; i = i + 2) {
    footrCircleAll[i].classList.toggle('footr-hvr-logo');
  }
}

function animateLogos() {
  for(let i = 0; i < circleAll.length - 1; i++) {
    circleAll[i].classList.toggle('ani-paused');
  }
  for(let i = 0; i < footrCircleAll.length - 1; i++) {
    footrCircleAll[i].classList.toggle('ani-paused');
  }
}





// custom mouse
let mouseCursor = document.getElementsByClassName("cursor")[0];
window.addEventListener("mousemove", cursor);
window.addEventListener('scroll', cursor);
document.addEventListener('mouseleave', cursorDisplayOff);
document.addEventListener('mouseenter', cursorDisplayOn);

function cursor(e) {
  mouseCursor.style.top = e.clientY + "px";
  mouseCursor.style.left = e.clientX + "px";
}

function cursorDisplayOff() { mouseCursor.style.display = "none"; }
function cursorDisplayOn() { mouseCursor.style.display = "flex"; }

// clickable elements
const clickableElements = document.getElementsByClassName('clickable');
const clickCursor = document.getElementsByClassName('click-cursor')[0];
for(let i = 0; i < clickableElements.length; i++) {
  clickableElements[i].addEventListener("mouseover", function() {
    event.stopPropagation();
    clickCursor.classList.add('cc-shrink')
    mouseCursor.classList.add('c-half-expand')
  }, false);
  clickableElements[i].addEventListener("mouseout", function() {
    event.stopPropagation();
    clickCursor.classList.remove('cc-shrink')
    mouseCursor.classList.remove('c-half-expand')
  }, false);
}

// clickable elements for big screen only
const responsiveClickable = document.getElementsByClassName('res-clickable');
for(let i = 0; i < responsiveClickable.length; i++) {
  responsiveClickable[i].addEventListener("mouseover", function() {
    if (largeDevice.matches) { return; } // block if desktop size
    clickCursor.classList.add('cc-shrink')
    mouseCursor.classList.add('c-half-expand')
  }, false);
  responsiveClickable[i].addEventListener("mouseout", function() {
    if (largeDevice.matches) { return; } // block if desktop size
    clickCursor.classList.remove('cc-shrink')
    mouseCursor.classList.remove('c-half-expand')
  }, false);
}

// slideable elements
const slideableElements = document.getElementsByClassName('slideable');
const slideCursor = document.getElementsByClassName('slide-cursor')[0];
for(let i = 0; i < slideableElements.length; i++) {
  slideableElements[i].addEventListener("mouseover", function() {
    if (largeDevice.matches) { return; } // block if desktop size
    slideCursor.classList.add('c-icon-show')
    mouseCursor.classList.add('c-full-expand')
  }, false);
  slideableElements[i].addEventListener("mouseout", function() {
    if (largeDevice.matches) { return; } // block if desktop size
    slideCursor.classList.remove('c-icon-show')
    mouseCursor.classList.remove('c-full-expand')
  }, false);
}

// reversible elements
const reversibleElements = document.getElementsByClassName('reversible');
const reverseCursor = document.getElementsByClassName('reverse-cursor')[0];
for(let i = 0; i < reversibleElements.length; i++) {
  reversibleElements[i].addEventListener("mouseover", function() {
    if (largeDevice.matches) { return; } // block if desktop size
    reverseCursor.classList.add('c-icon-show')
    mouseCursor.classList.add('c-full-expand')
  }, false);
  reversibleElements[i].addEventListener("mouseout", function() {
    if (largeDevice.matches) { return; } // block if desktop size
    reverseCursor.classList.remove('c-icon-show')
    mouseCursor.classList.remove('c-full-expand')
  }, false);
}



// scrolling effects
let scrollPos;
let html = document.documentElement;
let documentHeight
let windowHeight;
let scrollPercentage;

window.addEventListener('scroll', () => {
  scrollPos = document.documentElement.scrollTop;
  windowHeight = window.innerHeight;
  documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  scrollPercentage = (scrollPos + windowHeight) / documentHeight * 100;
}, false);



// open & close menu
const menuBtn = document.getElementsByClassName('ham')[0];
const header = document.getElementsByTagName('header')[0];

menuBtn.addEventListener("click", function() {
  menuBtn.classList.toggle('activeBtn')
  header.classList.toggle('open');
  if (header.classList.contains('open')) { disableScroll(); }
  else { enableScroll(); }
}, false);


// nav buttons close
const navBtn = document.getElementsByTagName('li');

for(let i = 0; i < navBtn.length; i++) {
  navBtn[i].addEventListener("click", function() {
    menuBtn.classList.toggle('activeBtn')
    header.classList.toggle('open');
    header.classList.add('header-hide');
    enableScroll();
  }, false);
}


// menubar appear on scroll //
const body = document.body;
let currentScroll;
let lastScroll;

window.addEventListener("scroll", () => {
  if (caseShowOpen === 1) { return; }
  currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove('scroll-up');
    header.classList.remove('header-hide');
    return;
  }
  if (currentScroll > lastScroll && !body.classList.contains('scroll-down') && currentScroll > 120) {
    // down
    body.classList.remove('scroll-up');
    body.classList.add('scroll-down');
    header.classList.add('header-hide');
  } else if (currentScroll < lastScroll && body.classList.contains('scroll-down') && currentScroll > 120) {
    // up
    body.classList.add('scroll-up');
    body.classList.remove('scroll-down');
    header.classList.remove('header-hide');
  }
  lastScroll = currentScroll;
});

// hide header on resize / orientation change
window.addEventListener('resize', () => {
  if (scrollPos < 580 || scrollPos == null) { return; }
  body.classList.remove('scroll-up');
  body.classList.add('scroll-down');
  header.classList.add('header-hide');
}, false);


// services buttons
const srvcsBtn = document.getElementsByClassName('srvcs-btn');
const srvcsCont = document.getElementsByClassName('srvcs-cont');
const srvcsInfo = document.getElementsByClassName('srvcs-info')[0];

for(let i = 0; i < srvcsBtn.length; i++) {
  srvcsBtn[i].addEventListener("click", function() {
    resetSrvcsCont();
    srvcsInfo.classList.toggle('in-from-right')
    srvcsCont[i].classList.toggle('hidden');
  }, false);
}


// add hidden to all services cont
function resetSrvcsCont() {
  for(let i = 0; i < srvcsCont.length; i++) {
    if (!srvcsCont[i].classList.contains('hidden')) {
      srvcsCont[i].classList.add('hidden');
    }
  }
}


// services close
const srvcsCls = document.getElementsByClassName('srvcs-cls-x')[0];
srvcsCls.addEventListener("click", function() {
  event.stopPropagation();
  srvcsInfo.classList.toggle('in-from-right')
}, false);

srvcsInfo.addEventListener("click", function() {
  if (largeDevice.matches) { return; }
  srvcsInfo.classList.toggle('in-from-right')
}, false);


// slide cases
const casesPages = document.getElementsByClassName('cases-wrpr');
for(let i = 0; i < casesPages.length; i++) {
  casesPages[i].addEventListener("click", function() {
    if (i === casesPages.length - 1) {
      // If the last element is clicked show first element
      for(let i = 1; i < casesPages.length; i++) {
        casesPages[i].classList.add("cases-hidden");
      }
      casesPages[0].classList.remove("cases-hidden");
    } else {
      // If the element is clicked show the next in array
      casesPages[i+1].classList.remove("cases-hidden");
    }
  }, false);
}


// cases buttons
const casesBtn = document.getElementsByClassName('cases-img');
const casesCont = document.getElementsByClassName('cases-cont');
const casesCover = document.getElementsByClassName('cases-cover')[0];
const casesShow = document.getElementsByClassName('cases-show')[0];
let caseShowOpen = 0;
let activeCase = 0;

for(let i = 0; i < casesBtn.length; i++) {
  casesBtn[i].addEventListener("click", function() {
    event.stopPropagation();
    caseShowOpen = 1;
    resetCasesCont();
    body.classList.add('no-scroll');
    header.classList.add('header-hide');
    casesCover.classList.toggle('cover-fade-in')
    casesCover.classList.toggle('in-from-left')
    casesShow.classList.toggle('in-from-left')
    casesCont[i].classList.toggle('hidden');
    activeCase = i;
  }, false);
}


// add hidden to all cases cont
const casesVideo = document.getElementsByClassName('cases-cont-vid');

function resetCasesCont() {
  for(let i = 0; i < casesCont.length; i++) {
    if (!casesCont[i].classList.contains('hidden')) {
      casesCont[i].classList.add('hidden');
    }
  }
}


// case close and video reset
const casesCls = document.getElementsByClassName('cases-cls-x')[0];
casesCls.addEventListener("click", function() { closeCasesShow(); }, false);
casesCover.addEventListener("click", function() { closeCasesShow(); }, false);

function closeCasesShow() {
  casesVideo[activeCase].pause();
  casesVideo[activeCase].currentTime = 0;
  casesCover.classList.toggle('cover-fade-in')
  casesShow.classList.toggle('in-from-left')
  setTimeout(() => { casesCover.classList.toggle('in-from-left') }, 500) // delay cover to left
  body.classList.add('scroll-down');
  body.classList.remove('scroll-up');
  body.classList.remove('no-scroll');
  caseShowOpen = 0;
}

// toggle cases left & right
const casesArrowLeft = document.getElementsByClassName('cases-arrow-left')[0];
const casesArrowRight = document.getElementsByClassName('cases-arrow-right')[0];
const casesContainer = document.getElementsByClassName('cases-cntnr')[0];
const casesElements = document.getElementsByClassName('cases-lmnt');
let elementWidth;
let ceilNumber = 0;
let floorNumber = 0;

casesArrowLeft.addEventListener("click", function() {
  elementWidth = casesElements[0].offsetWidth + 30;
  floorNumber = Math.floor((casesContainer.scrollLeft - elementWidth) / elementWidth) * elementWidth;
  casesContainer.scrollLeft = floorNumber;
}, false);

casesArrowRight.addEventListener("click", function() {
  elementWidth = casesElements[0].offsetWidth + 30;
  ceilNumber = Math.ceil((casesContainer.scrollLeft + elementWidth) / elementWidth) * elementWidth;
  casesContainer.scrollLeft = ceilNumber;
}, false);



// lock scroll

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}
