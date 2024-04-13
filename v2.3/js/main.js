// Determine which element is in viewport

const topArrow = document.querySelector('.arrow-icon-up');
const caseShowAll = document.querySelector('.cases-show-all-cntnr')
const blogGoTo = document.querySelector('.blog-go-to-cntnr')

// get navigation buttons
const navButtons = document.querySelectorAll('.nav-a');

// get all sections you want to check
const sections = document.querySelectorAll('.section');

// calculate the viewport height
let viewportHeight = window.innerHeight;

// create a function that checks the visibility of an element
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  return visibleHeight > 0 ? visibleHeight / viewportHeight : 0;
}

// create the scroll event listener
window.addEventListener('scroll', function() {
  let elementWithMaxVisibility = sections[0];
  let maxVisibility = 0;

  // loop through all sections
  sections.forEach(element => {
    // calculate the element's visibility
    const visibility = isInViewport(element);

    // update the element with max visibility if the current element has more visibility
    if (visibility > maxVisibility) {
      maxVisibility = visibility;
      elementWithMaxVisibility = element;
    }
  });

  // log the index of the element with the maximum visibility
  let index = Array.prototype.indexOf.call(sections, elementWithMaxVisibility);
  for (i = 0; i < navButtons.length; i++) {
    navButtons[i].classList.remove('nav-a-active');
    }
  if (index >= 1) {
    // show to-the-top-arrow
    topArrow.classList.add('show-arrow');
    index = index - 1;
    navButtons[index].classList.add('nav-a-active');
  } else {
    // hide to-the-top-arrow
    topArrow.classList.remove('show-arrow');
  }

    // CASES
    // hide + show all-cases-button
    if (index == 1 && !caseShowAll.classList.contains('cases-all-show')) {
        caseShowAll.classList.add('cases-all-show');
    } else if (index != 1 && caseShowAll.classList.contains('cases-all-show')) {
        caseShowAll.classList.remove('cases-all-show');
    }

    // BLOG
    // hide + show go-to-blog-button
    if (index == 2 && !blogGoTo.classList.contains('blog-go-to-show')) {
        blogGoTo.classList.add('blog-go-to-show');
    } else if (index != 2 && blogGoTo.classList.contains('blog-go-to-show')) {
        blogGoTo.classList.remove('blog-go-to-show');
    }
});



// Set container top margin to the height of sections

const container = document.querySelector('.container');
let height = 0;
for (i = 0; i < sections.length; i++) { height = height + sections[i].offsetHeight; }
height = height * -1;
container.style.marginTop = height + 'px';

window.addEventListener('resize', function() {
    height = 0;
    for (i = 0; i < sections.length; i++) { height = height + sections[i].offsetHeight; }
    height = height * -1;
    container.style.marginTop = height + 'px';
    // update viewport height for nav letter scaling
    viewportHeight = window.innerHeight;
});



// SET TO-TOP-ARROW ON HOVER

let topArrowContainer = document.querySelector('.nav-arrow')

function hoverImage(element, container, src) {
    let originalSrc = element.src;
    container.addEventListener("mouseover", function() {
      element.src = src;
    });
    container.addEventListener("mouseout", function() {
      element.src = originalSrc;
    });
}

hoverImage(topArrow, topArrowContainer, "/media/icons/arrow_up_blue.png");




// CONTROL SERVICES SLIDER

function toggleService(index) {
    const info = document.querySelector(".srvcs-info");
    info.classList.toggle("srvcs-out-right");
  
    const contentArray = document.querySelectorAll(".srvcs-content");
    contentArray.forEach((content, i) => {
        if (i === index) {
            content.classList.remove("srvcs-hidden");
         } else {
            content.classList.add("srvcs-hidden");
        }
    });
}
  
const buttons = document.querySelectorAll(".srvcs-btn");
buttons.forEach((button, index) => {
    button.addEventListener("click", () => toggleService(index));
});
  
const close = document.querySelector(".srvcs-cls");
close.addEventListener("click", () => {
    const info = document.querySelector(".srvcs-info");
    info.classList.add("srvcs-out-right");
});

// SET SERVICES CLOSE ON HOVER

let servicesCloseContainer = document.querySelector('.srvcs-cls')
let srvcsX = document.querySelector('.srvcs-cls-x')
hoverImage(srvcsX, servicesCloseContainer, "/media/icons/close_light.png");








//////////////////////////////////////
///////    CASES NAVIGATION    ///////
//////////////////////////////////////

let navDots = document.getElementsByClassName('cases-nav-dot');
let dotWrapper = document.getElementsByClassName('cases-dot-wrapper');
let navRings = document.getElementsByClassName('cases-nav-ring');
let casesLeftArrow = document.querySelector('.arrow-icon-left')
let casesRightArrow = document.querySelector('.arrow-icon-right')
let activeCase = 0;

Array.from(dotWrapper).forEach((wrapper, i) => {
    wrapper.addEventListener("click", function() {
        Array.from(navRings).forEach((ring) => { 
            ring.classList.remove('cases-nav-ring-active');
        });
        navRings[i].classList.add('cases-nav-ring-active');
        activeCase = i;
        fadeInCase();
        updateCases(i);
    });
    Array.from(dotWrapper).forEach((wrapper, i) => { 
        wrapper.addEventListener("mouseover", function() {
            if (navRings[i].classList.contains('cases-nav-ring-active')) { return; }
            navDots[i].classList.add('cases-nav-dot-hvr');
        });
        wrapper.addEventListener("mouseout", function() {
           navDots[i].classList.remove('cases-nav-dot-hvr');
        });
    });
});

hoverImage(casesLeftArrow, casesLeftArrow, "/media/icons/arrow_left_blue.png");
hoverImage(casesRightArrow, casesRightArrow, "/media/icons/arrow_right_blue.png");

casesLeftArrow.addEventListener("click", function() {
    activeCase--;
    if (activeCase < 0) { activeCase = 5 }
    dotWrapper[activeCase].click();
});

casesRightArrow.addEventListener("click", function() {
    activeCase++;
    if (activeCase > 5) { activeCase = 0 }
    dotWrapper[activeCase].click();
});

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
    // Update the cases after fetch
    updateCases(0);
});


///////////////////////////////////////
/////  CASES UPDATE CASE SECTION  /////
///////////////////////////////////////

let caseSort = document.querySelector('.case-sort');
let caseTitle = document.querySelector('.case-title');
let caseCustomer = document.querySelector('.case-customer');
let caseResume = document.querySelector('.case-resume');
let caseImage = document.querySelector('.case-image');

function updateCases(i) {
    // theme and year
    caseSort.textContent = cases[i].theme + " // " + cases[i].year;
    // title
    caseTitle.textContent = cases[i].title;
    // image
    caseImage.style.backgroundImage = "url(" + cases[i].imgUrl + ")";
    // customer
    caseCustomer.textContent = cases[i].customer;
    // resume
    caseResume.textContent = cases[i].resume;
}


///////////////////////////////////////
//////   CASES PLAY ICON HOVER   //////
///////////////////////////////////////

let casePlay = document.querySelector('.case-play-icon')
hoverImage(casePlay, casePlay, "/media/icons/play_blue.png");



///////////////////////////////////////
///////   CASES FADE IN COVER   ///////
///////////////////////////////////////

function fadeInCase() {
    const casesFadeCover = document.querySelector('.cases-fade-cover');
    casesFadeCover.style.display = 'block';
    casesFadeCover.classList.add('cases-fade-cover-show');
  
    setTimeout(() => {
        casesFadeCover.classList.remove('cases-fade-cover-show');
        setTimeout(() => {
            casesFadeCover.style.display = 'none';
        }, 400);
    }, 100);
}
// initial fade out of cover
fadeInCase();





///////////////////////////////////////
///////   BLOGPOST DATA FETCH   ///////
///////////////////////////////////////

let blogposts;

async function fetchBlogposts() {
  const response = await fetch('/json/blogposts.json');
  const data = await response.json();
  blogposts = data;
}

fetchBlogposts()
  .then(() => {
    // Update the blogpost element after fetch
    blogpostButtons();
    blogpostHover();
});

///////////////////////////////////////
///////  BLOGPOST BUTTON HOVER  ///////
///////////////////////////////////////

const resumeText = document.querySelector('.blog-blogpost-resume');
const keywordHeading = document.querySelector('.blog-blogpost-keyword');
const blogpostCover = document.querySelectorAll('.blog-blogpost-cover');
const blogpostButton = document.querySelectorAll('.blog-blogpost-btn');

function blogpostHover() {
    blogpostButton.forEach((element, index) => {
        element.addEventListener("mouseover", function() {
            blogpostCover.forEach(el => {
                el.classList.remove("blog-blogpost-cover-hvr");
            });
            blogpostCover[index].classList.add("blog-blogpost-cover-hvr");
            keywordHeading.textContent = blogposts[index].keyword;
            resumeText.textContent = blogposts[index].resume;
        });
    });
}

///////////////////////////////////////
///// BLOGPOST BUTTON IMG + LINK  /////
///////////////////////////////////////

function blogpostButtons() {
    blogpostButton.forEach((element, index) => {
        element.style.backgroundImage = `url(${blogposts[index].imgUrl})`;
    });
}





////////////////////////////////////////
/////    FOOTER SOME ICON HOVER    /////
////////////////////////////////////////

let someIcons = document.querySelectorAll('.some-icon');
hoverImage(someIcons[0], someIcons[0], "/media/icons/facebook_icon_blue.png");
hoverImage(someIcons[1], someIcons[1], "/media/icons/linkedin_icon_blue.png");
hoverImage(someIcons[2], someIcons[2], "/media/icons/instagram_icon_blue.png");
