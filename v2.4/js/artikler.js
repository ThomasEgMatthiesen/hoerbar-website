//////////////////////////////////////
///////      QUOTE WRITER      ///////
//////////////////////////////////////

function writeText(strings) {
    // Get the paragraph element
    var paragraph = document.getElementById("output");
  
    // Set the initial delay
    var delay = 60;
  
    // Initialize variables to keep track of the current character and string
    var i = 0;
    var stringIndex = 0;
    var usedStrings = [];
  
    // Set up a function to write the next character
    function writeNext() {
        // Get the current character
        var char = strings[stringIndex][i];
  
        // If the current character is a dash, insert a line break before it
        if (char === "-") {
            paragraph.innerHTML += "<br>";
        }
  
        // Append the current character to the paragraph
        paragraph.innerHTML += char;
  
        // Increment the index variable
        i++;
  
        // If there are more characters to write, set a timeout to write the next character
        if (i < strings[stringIndex].length) {
            setTimeout(writeNext, delay);
        } else {
            // Reset the index variable
            i = 0;
  
            // Mark the current string as used
            usedStrings.push(stringIndex);
  
            // If all of the strings have been used, reset the used strings array
            if (usedStrings.length === strings.length) {
                usedStrings = [];
            }
  
            // Set a timeout to write the next string
            setTimeout(startWriting, 20000);
        }
    }
  
    // Function to start writing the next string
    function startWriting() {
        // Select a random unused string from the array
        do {
            stringIndex = Math.floor(Math.random() * strings.length);
        } while (usedStrings.includes(stringIndex));
  
        // Clear the paragraph element
        paragraph.innerHTML = "";
  
        // Start writing the characters
        writeNext();
    }
  
    // Start writing the first string
    startWriting();
}
  
writeText(['“Without music, life would be a mistake.” - Friedrich Nietzsche',
         '“Music is the shorthand of emotion.” - Leo Tolstoy',
         '“Music is the art which is most nigh to tears and memories.” - Oscar Wilde',
         '“The sound of a kiss is not so loud as a cannon, but its echo lasts a great deal longer.” - Oliver Wendell Holmes Sr.',
         '“Silence is the ultimate weapon of power.” - Charles de Gaulle',
         '“Silence is a true friend that never betrays.” - Confucius',
         '“Silence is the sleep that nourishes wisdom.” - Francis Bacon',
         '“The final question will be: is the soundscape of the world an indeterminate composition over which we have no control, or are we its composers and performers, responsible for giving it form and beauty?” - R. Murray Schafer',
         '“For a child of five, art is life and life is art... but once the child is in school they get separated — art becomes art and life becomes life.” - R. Murray Schafer',
         '“There is no such thing as an empty space or an empty time. There is always something to see, something to hear. In fact, try as we may to make a silence, we cannot.” - John Cage',             
         '“Where words fail, music speaks.” - Hans Christian Andersen',
         '“Get rid of the shitty sound. Life’s too short.” - Hans Zimmer',
         '“Music produces a kind of pleasure which human nature cannot do without.” - Confucius',
         '“When there is noise and crowds, there is trouble; when everything is silent and perfect, there is just perfection and nothing to fill the air.” - Dejan Stojanovic',
         '“The sound is the key; audiences will accept visual discontinuity much more easily than they\'ll accept jumps in the sound. If the track makes sense, you can do almost anything visually.” - Paul Hirsch',
         '“Unlike seeing, where one can look away, one cannot \'hear away\' but must listen ... hearing implies already belonging together in such a manner that one is claimed by what is being said.” - Hans—Georg Gadamer',
         '“Men trust their ears less than their eyes.” - Herodotus',
        ]);




//////////////////////////////////////
///////  BLOG POST DATA FETCH  ///////
//////////////////////////////////////

async function fetchBlogPostsBlog() {
  const response = await fetch('/json/blogposts.json');
  const data = await response.json();
  blogPosts = data;
}

fetchBlogPostsBlog()
  .then(() => {
    // Populate the elements
    updatePostBlog(blogElements, blogPosts);
});

//////////////////////////////////////
////// BLOG PAGE ELEMENTS FETCH //////
//////////////////////////////////////

blogPageElements = document.querySelectorAll('.blog-lmnt');

blogElements = [];

for (let i = 0; i < blogPageElements.length; i++) {
  blogPostElement = blogPageElements[i];
  titleElement = blogPostElement.querySelector('.blog-lmnt-title');
  dateElement = blogPostElement.querySelector('.blog-lmnt-date');
  themeElement = blogPostElement.querySelector('.blog-lmnt-theme');
  imgElement = blogPostElement.querySelector('.blog-lmnt-img');
  linkElement = blogPostElement.querySelector('.blog-lmnt-link');

  blogElement = {
    link: linkElement,
    title: titleElement,
    date: dateElement,
    theme: themeElement,
    img: imgElement,
  };

  blogElements.push(blogElement);
}




//////////////////////////////////////
/////   POPULATE BLOG ELEMENTS   /////
//////////////////////////////////////

function updatePostBlog(elements, values) {
  for (let i = 0; i < blogPageElements.length; i++) {
    const titleH3 = document.createElement('h3');
    titleH3.textContent = values[i].title;
    titleH3.classList.add('cs-l');
    elements[i].title.appendChild(titleH3);

    const dateP = document.createElement('p');
    dateP.textContent = values[i].date;
    dateP.classList.add('cm-l');
    elements[i].date.appendChild(dateP);

    const themeP = document.createElement('p');
    themeP.textContent = values[i].keyword;
    themeP.classList.add('cm-l');
    elements[i].theme.appendChild(themeP);

    const link = elements[i].link;
    link.href = values[i].internalLink;

    const img = elements[i].img;
    img.style.backgroundImage = "url(" + values[i].imgUrl + ")";
  }
}



//////////////////////////////////////
/////   BLOG ELEMENTS HOVER FX   /////
//////////////////////////////////////

blogPageElements.forEach(blogElement => {
  blogElement.addEventListener('mouseover', () => {
    blogElement.style.backgroundColor = '#0D111C';
    const titleDiv = blogElement.querySelector('.blog-lmnt-title');
    const dateDiv = blogElement.querySelector('.blog-lmnt-date');
    const themeDiv = blogElement.querySelector('.blog-lmnt-theme');
    const blogImg = blogElement.querySelector('.blog-lmnt-img');

    if (titleDiv) {
      const title = titleDiv.querySelector('h3');
      if (title) {
        title.style.color = '#F2EEE3';
      }
    }
    if (dateDiv) {
      const date = dateDiv.querySelector('p');
      if (date) {
        date.style.color = '#F2EEE3';
      }
    }
    if (themeDiv) {
      const theme = themeDiv.querySelector('p');
      if (theme) {
        theme.style.color = '#F2EEE3';
      }
    }
    if (blogImg) {
      blogImg.style.WebkitFilter = "invert(100%)";
      blogImg.style.filter = "invert(100%)";
    }
  });
  
  blogElement.addEventListener('mouseout', () => {
    blogElement.style.backgroundColor = '#F2EEE3';
    const titleDiv = blogElement.querySelector('.blog-lmnt-title');
    const dateDiv = blogElement.querySelector('.blog-lmnt-date');
    const themeDiv = blogElement.querySelector('.blog-lmnt-theme');
    const blogImg = blogElement.querySelector('.blog-lmnt-img');

    if (titleDiv) {
      const title = titleDiv.querySelector('h3');
      if (title) {
        title.style.color = '#0D111C';
      }
    }
    if (dateDiv) {
      const date = dateDiv.querySelector('p');
      if (date) {
        date.style.color = '#0D111C';
      }
    }
    if (themeDiv) {
      const theme = themeDiv.querySelector('p');
      if (theme) {
        theme.style.color = '#0D111C';
      }
    }
    if (blogImg) {
      blogImg.style.WebkitFilter = "invert(0%)";
      blogImg.style.filter = "invert(0%)";
    }
  });
});




///////////////////////////////////////
////  POPULATE BLOG ARCHIVE LMNTS  ////
///////////////////////////////////////

// Open archive button
archiveOpenButton = document.querySelector('#arkiv h5');

archiveOpenButton.addEventListener('click', openBlogArchive);

// Get the posts from json and initalize creation and fx
function openBlogArchive() {
  // remove the event listener after it has been executed once
  archiveOpenButton.removeEventListener('click', openBlogArchive);
  // hide first word
  document.querySelector('#hide-word').style.display = "none";
  // add styling for container
  archiveOpenButton.style.backgroundColor = "var(--blue)";
  archiveOpenButton.style.color = "var(--light)";
  archiveOpenButton.style.pointerEvents = "none";
  // get blogposts
  fetchBlogPostsBlog()
  .then(() => {
    // Populate the archive elements
    populateArchive(blogPosts);
  });

  function populateArchive(values) {
    // Populate archive with a delay relative to number of posts
    let i = blogPageElements.length;
    let delay = 1000 / blogPosts.length;
    let loop = setInterval(function() {
      if (i >= blogPosts.length) {
      clearInterval(loop);
      return;
      }
      createBlogArchiveElement(values[i].title, values[i].date, values[i].internalLink);
      // Add hover eventlistener as element is created
      blogPageArchiveElements = document.querySelectorAll('.blog-arkiv-lmnt');
      addHoverEffectsToArchiveElement(blogPageArchiveElements[i - blogPageElements.length]);
      i++;
      // Run links script when all elements are loaded
      if (i == blogPosts.length) { repeatableMainScript(); }
    }, delay);
  }
}

// create element
function createBlogArchiveElement(title, date, link) {

  const container = document.createElement('div');
  container.className = 'blog-arkiv-lmnt';
  
  const anchor = document.createElement('a');
  anchor.className = 'blog-arkiv-lmnt-link link-btn cxs-l';
  anchor.href = link;
  anchor.setAttribute('role', 'button');
  anchor.setAttribute('aria-label', 'Læs dette blogindlæg');
  
  const heading = document.createElement('h4');
  heading.className = 'blog-arkiv-lmnt-title cxs-l';
  heading.textContent = title;
  
  const para = document.createElement('p');
  para.className = 'blog-arkiv-lmnt-date cxs-l';
  para.textContent = date;
  
  // append elements to container
  anchor.appendChild(heading);
  anchor.appendChild(para);
  container.appendChild(anchor);

  // append container to parent
  const parent = document.querySelector('.blog-arkiv-cntnr');
  parent.appendChild(container);
}

// add hover effect to created element
function addHoverEffectsToArchiveElement(blogElement) {
    blogElement.addEventListener('mouseover', () => {
      blogElement.style.backgroundColor = '#0D111C';
      const titleDiv = blogElement.querySelector('.blog-arkiv-lmnt-title');
      const dateDiv = blogElement.querySelector('.blog-arkiv-lmnt-date');
      if (titleDiv) {
        const title = blogElement.querySelector('h4');
        if (title) {
          title.style.color = '#F2EEE3';
        }
      }
      if (dateDiv) {
        const date = blogElement.querySelector('p');
        if (date) {
          date.style.color = '#F2EEE3';
        }
      }
    });
  
    blogElement.addEventListener('mouseout', () => {
      blogElement.style.backgroundColor = '#F2EEE3';
      const titleDiv = blogElement.querySelector('.blog-arkiv-lmnt-title');
      const dateDiv = blogElement.querySelector('.blog-arkiv-lmnt-date');
      if (titleDiv) {
        const title = blogElement.querySelector('h4');
        if (title) {
          title.style.color = '#0D111C';
        }
      }
      if (dateDiv) {
        const date = blogElement.querySelector('p');
        if (date) {
          date.style.color = '#0D111C';
        }
      }
  });
};