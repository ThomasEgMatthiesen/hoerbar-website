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
///////  BLOG POST DATA FETCH  ///////
//////////////////////////////////////

let blogPosts;

async function fetchBlogPosts() {
  const response = await fetch('/json/blogposts.json');
  const data = await response.json();
  blogPosts = data;
}

fetchBlogPosts()
  .then(() => {
    // Populate the elements
    updatePost(blogElements, blogPosts);
});

//////////////////////////////////////
////// BLOG PAGE ELEMENTS FETCH //////
//////////////////////////////////////

const blogPageElements = document.querySelectorAll('.blog-lmnt');

const blogElements = [];

for (let i = 0; i < blogPageElements.length; i++) {
  const blogPostElement = blogPageElements[i];
  const titleElement = blogPostElement.querySelector('.blog-lmnt-title');
  const dateElement = blogPostElement.querySelector('.blog-lmnt-date');
  const themeElement = blogPostElement.querySelector('.blog-lmnt-theme');
  const imgElement = blogPostElement.querySelector('.blog-lmnt-img');
  const subtitleElement = blogPostElement.querySelector('.blog-lmnt-subtitle');
  const linkElement = blogPostElement.querySelector('.blog-lmnt-link');

  const blogElement = {
    link: linkElement,
    title: titleElement,
    date: dateElement,
    theme: themeElement,
    img: imgElement,
    subtitle: subtitleElement,
  };

  blogElements.push(blogElement);
}


//////////////////////////////////////
/////   POPULATE BLOG ELEMENTS   /////
//////////////////////////////////////

function updatePost(elements, values) {
  for (let i = 0; i < blogPageElements.length; i++) {
    const titleH2 = document.createElement('h2');
    titleH2.textContent = values[i].title;
    elements[i].title.appendChild(titleH2);

    const subtitleH3 = document.createElement('h3');
    subtitleH3.textContent = values[i].subtitle;
    elements[i].subtitle.appendChild(subtitleH3);

    const dateP = document.createElement('p');
    dateP.textContent = values[i].date;
    elements[i].date.appendChild(dateP);

    const themeP = document.createElement('p');
    themeP.textContent = values[i].theme;
    elements[i].theme.appendChild(themeP);

    const link = elements[i].link;
    link.href = values[i].link;

    const img = elements[i].img;
    img.style.backgroundImage = "url(" + values[i].imgUrl + ")";
  }
}
