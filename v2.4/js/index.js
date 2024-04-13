//////////////////////////////////////
///////   SERVICE NAVIGATION   ///////
//////////////////////////////////////


serviceButton = document.querySelectorAll('.srvcs-li');

serviceButton.forEach((element, index) => {
    element.addEventListener("click", function() {
        clickedService = index;
    });
});

//////////////////////////////////////
///////    CASES NAVIGATION    ///////
//////////////////////////////////////

navDots = document.getElementsByClassName('cases-nav-dot');
dotWrapper = document.getElementsByClassName('cases-dot-wrapper');
navRings = document.getElementsByClassName('cases-nav-ring');
casesLeftArrow = document.querySelector('.arrow-icon-left')
casesRightArrow = document.querySelector('.arrow-icon-right')
activeCase = 0;

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

hoverImage(casesLeftArrow, "/media/icons/arrow_left_blue.png");
hoverImage(casesRightArrow, "/media/icons/arrow_right_blue.png");

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

caseSort = document.querySelector('.case-sort');
caseTitle = document.querySelector('.case-title');
caseCustomer = document.querySelector('.case-customer');
caseResume = document.querySelector('.case-resume');
caseImage = document.querySelector('.case-image');
caseInternalLink = document.querySelector('.case-internal-link');

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
    // internal link
    caseInternalLink.href = cases[i].internalLink;
}

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

resumeText = document.querySelector('.blog-blogpost-resume');
keywordHeading = document.querySelector('.blog-blogpost-keyword');
blogpostCover = document.querySelectorAll('.blog-blogpost-cover');
blogpostButton = document.querySelectorAll('.blog-blogpost-btn');
blogpostInternalLink = document.querySelectorAll('.blog-blogpost-link');
blogpostSmallHeader = document.querySelectorAll('.blog-blogpost-small-hdr');

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
        blogpostInternalLink[index].href = blogposts[index].internalLink;
        blogpostSmallHeader[index].textContent = blogposts[index].title;
    });
}