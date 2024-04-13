// PAGE FADE IN
document.addEventListener("DOMContentLoaded", function() {
    body.classList.add("loaded");
});

// SELECT ELEMENTS
let body = document.querySelector("body");
let html = document.querySelector("html");
let totalPageCover = document.querySelector('#totalPageCover');
let menuBtn = document.querySelectorAll('.menu-btn');
let menuBar = document.querySelector('header');
let navLinks = document.querySelectorAll('.nav-a');
let toTopArrow = document.querySelector('.arrow-up');
let toTopLink = toTopArrow.parentNode;
let contactContainer = document.querySelector('.contact-cntnr');
let soMeBtn = document.querySelectorAll('.some-btn');
let copyrightYear = document.querySelector('#year');
let footerVideo = document.querySelector('.footer-video');
let cookieBtn = document.querySelector("#cookieBtn");
let cookieModal = document.querySelector("#cookieModal");
let cookieCloseBtn = document.querySelector("#cookieCloseBtn");
let cookieModalCover = document.querySelector("#cookieModalCover");
let cookieModalWrapper = document.querySelector("#cookieModalWrapper");
let logo = document.querySelectorAll('.logo-crcl');

// SELECT ELEMENTS FOR SPECIFIC SCRIPTS

// Index.js
let serviceButton;
let clickedService = -1;
let navDots;
let dotWrapper;
let navRings;
let casesLeftArrow;
let casesRightArrow;
let activeCase;
let cases;
let caseSort;
let caseTitle;
let caseCustomer;
let caseResume;
let caseImage;
let casePlay;
let caseInternalLink;
let blogposts;
let resumeText;
let keywordHeading;
let blogpostCover;
let blogpostButton;
let blogpostInternalLink;
let blogpostSmallHeader;

// Privatlivspolitik.js
let cookieBigBtn

// Blog.js
let blogPageElements;
let blogElements;
let blogPostElement;
let titleElement;
let dateElement;
let themeElement;
let imgElement;
let linkElement;
let blogElement;
let archiveOpenButton;
let blogPageArchiveElements;

// Services.js
let currentLargestIndex;
let elements;
let aElements;
let introBtns;
let introBtnTxt;
let introSmallTxt;

// Cases.js
let casesElements;
let casesHeading;
let casesInternalLink;
let casesTheme;
let casesElementCover;

// Kontakt.js
let isInputElementFocused = false;
let isTextareaElementFocused = false;
let inputElement;
let textareaElement;

// WRITE PLAY COMMAND TEXT

let playCommandString = "Start musik på 'space'";
let stopCommandString = "Stop musik på 'space'";
const commandElement = document.querySelector('.play-command');
let commandShown = 0;

if (window.innerWidth >= 992) {
    commandElement.textContent = playCommandString;
    setTimeout(() => {
        commandElement.style.display = 'none';
        commandElement.style.animationPlayState = 'paused';
        commandShown = 1;
    }, 5000);
}

// SET YEAR IN COPYRIGHT TEXT
copyrightYear.textContent = new Date().getFullYear();

// SET FOOTER VIDEO
footerVideo.src = "/media/video/tape_03.mp4";

// OPEN / CLOSE MENU
menuBtn[0].addEventListener("click", function() { toggleMenu(menuBar, menuBtn, false); });
menuBtn[1].addEventListener("click", function() { toggleMenu(menuBar, menuBtn, true); });
function toggleMenu(menuBar, menuBtn, isOpen) {
    menuBar.classList.toggle('menu-open', !isOpen);
    menuBtn[1].classList.toggle('hide-menu-btn', isOpen);
    menuBtn[0].classList.toggle('hide-menu-btn', !isOpen);
    if (!isOpen) { disableScroll(); } else { enableScroll(); }
}

// VIEWPORT SIZE EVENTS
window.addEventListener("resize", function() {
    toggleMenu(menuBar, menuBtn, true);
});

// HOVER IMAGE SRC-CHANGE
function hoverImage(element, src) {
    let originalSrc = element.src;
    element.addEventListener("mouseover", function() {
        element.src = src;
    });
    element.addEventListener("mouseout", function() {
        element.src = originalSrc;
    });
}

hoverImage(menuBtn[0], '/media/icons/burger_blue.png');
hoverImage(menuBtn[1], '/media/icons/close_blue.png');
hoverImage(soMeBtn[0], '/media/icons/facebook_icon_blue.png');
hoverImage(soMeBtn[1], '/media/icons/linkedin_icon_blue.png');
hoverImage(soMeBtn[2], '/media/icons/instagram_icon_blue.png');

// COOKIE MODAL
cookieBtn.addEventListener("click", function() {
    cookieModal.style.display = "flex";
    createCookieModalIframe();
    setTimeout(function() { cookieModal.style.opacity = "1"; }, 10);
});

function createCookieModalIframe() {
    if (!document.getElementById('cookieModalIframe')) {
      const iframe = document.createElement('iframe');
      iframe.id = 'cookieModalIframe';
      iframe.src = '/cookieindstillinger.html';
      cookieModalWrapper.appendChild(iframe);
    }
}

cookieCloseBtn.addEventListener("click", function() { 
    cookieModal.style.opacity = "0";  
});

cookieModalCover.addEventListener("click", function() { cookieModal.style.opacity = "0";});

cookieModal.addEventListener("transitionend", function() {
    if (cookieModal.style.opacity === "0") { 
        cookieModal.style.display = "none"; 
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.keyCode === 27) {
        if (cookieModal.style.opacity === "1") { 
            cookieCloseBtn.click();
        }   
    }
});


// LOGO HOVER AND SPACE
function toggleHover() {
    for (let i = 0; i < logo.length; i += 2) { logo[i].classList.toggle('logo-hvr'); }
}

logo[0].addEventListener('mouseover', () => {
    toggleHover();
    if (window.innerWidth >= 992 && commandShown == 1) {
        commandElement.style.display = "inline-block";
    }
});

logo[0].addEventListener('mouseout', () => {
    toggleHover();
    if (window.innerWidth >= 992 && commandShown == 1) {
        commandElement.style.display = "none";
    }
});




// Block space unless the contact form name or message is used
body.addEventListener('keydown', function(e) {
    if (isInputElementFocused == false && isTextareaElementFocused == false) {
        if (e.key === ' ' || e.code === 'Space' || e.keyCode === 32) { 
            e.preventDefault();
            for (let i = 0; i < logo.length; i++) { logo[i].classList.toggle('ani-paused'); }
            togglePlayer();
            if (logo[0].classList.contains('ani-paused')) { 
                commandElement.textContent = playCommandString; 
            } else {
                commandElement.textContent = stopCommandString; 
            }
        }
    }
});


// SCROLL LOCK AND UNLOCK

const keys = {37: 1, 38: 1, 39: 1, 40: 1};
  
function preventDefault(e) {
    e.preventDefault();
}
  
function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
}

let supportsPassive = false;
try {
    window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
      get: function () { supportsPassive = true; }
    }));
} catch(e) {}
  
const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.addEventListener(wheelEvent, preventDefault, wheelOpt);
    window.addEventListener('touchmove', preventDefault, wheelOpt);
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}



// INITIALIZE BLOGPOSTS

let postTheme;
let postDate;
let postMainImage;
let postPageTitle;
let postPageLink;

function getBlogpostElements() {
    const readMoreLinks = document.querySelectorAll('.read-more-post-link');
    postTheme = document.querySelectorAll('.post-theme-txt');
    postDate = document.querySelectorAll('.post-date-txt');
    postMainImage = document.querySelectorAll('.read-more-post-img');
    postPageTitle = document.querySelectorAll('.post-title-txt');
    postPageLink = document.querySelectorAll('.read-more-post-link');

    readMoreLinks.forEach((link, index) => {
        
      link.addEventListener('mouseover', () => {
        postDate[index].style.color = 'var(--light)';
        postTheme[index].style.color = 'var(--light)';
        postPageTitle[index].style.color = 'var(--light)';
        postMainImage[index].style.WebkitFilter = "invert(100%)";
        postMainImage[index].style.filter = "invert(100%)";
      });
      
      link.addEventListener('mouseout', () => {
        postDate[index].style.color = '';
        postTheme[index].style.color = '';
        postPageTitle[index].style.color = '';
        postMainImage[index].style.WebkitFilter = "invert(0%)";
        postMainImage[index].style.filter = "invert(0%)";
      });
    });
}

// GET BLOGPOST DATA FOR POST PAGES

async function fetchAndLogBlogposts(currentTheme, currentTitle) {
    const response = await fetch('/json/blogposts.json');
    const blogposts = await response.json();
    let x = currentTheme;
    let y = currentTitle;
  
    let themePosts = blogposts.filter(post => post.theme.toLowerCase() === x.toLowerCase());

    // If there is too few post in the theme select all posts
    if (themePosts.length < 3) { themePosts = blogposts; }
  
    // Filter out posts with the same title as current blogpost
    const filteredPosts = themePosts.filter(post => post.title.toLowerCase() !== y.toLowerCase());
  
    const randomIndexes = new Set();
    while (randomIndexes.size < 2) {
      const randomIndex = Math.floor(Math.random() * filteredPosts.length);
      randomIndexes.add(randomIndex);
    }
    
    const randomPosts = Array.from(randomIndexes).map(index => filteredPosts[index]);
  
    randomPosts.forEach((post, index) => {
        postTheme[index].textContent = post.theme;
        postDate[index].textContent = post.date;
        postMainImage[index].style.background = "url(" + post.imgUrl + ") no-repeat center";
        postMainImage[index].style.backgroundSize = "cover";
        postPageTitle[index].textContent = post.title;
        postPageLink[index].href = post.internalLink;
    });
}


// ARTICLE SVG FETCH AND ANIMATE

function drawPaths() {
    var paths = document.querySelectorAll('path');
    var aniDelay = 0;
    paths.forEach(path => {
        path.classList.add('article-svg-animate');
        path.style.animationDelay = aniDelay + 's';
        aniDelay = aniDelay + 0.01;
    });
}

function parseSVG(svgFile) {
    fetch(svgFile)
      .then(response => response.text())
      .then(svgText => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const svgElement = svgDoc.documentElement;
        const postInfoContainer = document.querySelector(".post-info-cntnr");
        postInfoContainer.parentNode.insertBefore(svgElement, postInfoContainer.nextSibling);
        drawPaths();
      })
      .catch(error => console.error(error));
}






// CURSOR CURSOR CURSOR

var cursor = document.getElementById("cursor");

body.addEventListener("mousemove", function(e) {
    if (window.innerWidth >= 992) {
        var x = e.clientX;
        var y = e.clientY;
        cursor.style.left = x + "px";
        cursor.style.top = y + "px";
    }
});

body.addEventListener('mouseover', (event) => {
    if (window.innerWidth >= 992) {
        const targetElement = event.target;
        switch(true) {
            case targetElement.classList.contains('cxs-d'):
                setCursorProperties(targetElement.clientHeight, 2, "--dark", 20);
                break;
            case targetElement.classList.contains('cs-d'):
                setCursorProperties(targetElement.clientWidth, 5, "--dark", 30);
                break;
            case targetElement.classList.contains('cm-d'):
                setCursorProperties(targetElement.clientWidth, 1, "--dark", 10);
                break;
            case targetElement.classList.contains('cl-d'):
                setCursorProperties(targetElement.clientWidth, .2, "--dark", 10);
                break;
            case targetElement.classList.contains('cxs-l'):
                setCursorProperties(targetElement.clientHeight, 2, "--light", 20);
                break;
            case targetElement.classList.contains('cs-l'):
                setCursorProperties(targetElement.clientWidth, 5, "--light", 30);
                break;
            case targetElement.classList.contains('cm-l'):
                setCursorProperties(targetElement.clientWidth, 1, "--light", 10);
                break;
            case targetElement.classList.contains('cl-l'):
                setCursorProperties(targetElement.clientWidth, .2, "--light", 10);
                break;
            default:
                resetCursorProperties();
        }
        function setCursorProperties(dim, div, color, rand=0) {
            const random = Math.floor(Math.random() * rand);
            cursor.style.width = dim / div + random + "px";
            cursor.style.height = dim / div + random + "px";
            cursor.style.borderColor = `var(${color})`;
            cursor.style.mixBlendMode = "initial";
        }
        function resetCursorProperties() {
            cursor.style.width = "";
            cursor.style.height = "";
            cursor.style.borderColor = "";
            cursor.style.mixBlendMode = "";
        }
    }
});