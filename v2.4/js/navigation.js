let allLinks = document.querySelectorAll('.link-btn')
let url;
let updateCounter = 0;
// Get the current URL if not repeat
if (url != location.pathname) { url = location.pathname; }

// Initialize main script
repeatableMainScript();

// REPEATABLE MAIN SCRIPT

function repeatableMainScript() {
    // UPDATE ELEMENTS
    toTopArrow = document.querySelector('.arrow-up');
    toTopLink = toTopArrow.parentNode;
    navLinks = document.querySelectorAll('.nav-a');
    allLinks = document.querySelectorAll('.link-btn')

    // Scroll to top when the user clicks arrow
    toTopArrow.addEventListener("click", function() {
        // For modern browsers
        document.documentElement.scrollTop = 0; // Scroll to top of page
        // For Safari
        document.body.scrollTop = 0; // Scroll to top of page
    });

    // CLOSE MENU ON NAV CLICK
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu(menuBar, menuBtn, true);
        });
    });

    // LINK HANDLING
    allLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent the default link behavior
            event.preventDefault();
            // Page fade out
            fadePage();
            // Close menu on link click
            toggleMenu(menuBar, menuBtn, true);
            // Scroll to top
            window.scrollTo({ top: 0 });
            // Update the url if it is different and not set to nothing
            if (url != this.getAttribute('href') && this.getAttribute('href') != "") {
                // Remove last script and style
                removeSpecificScript(url);
                removeSpecificLink(url);
                // Update url
                url = this.getAttribute('href');
                // Update the URL without refreshing the page
                history.pushState(null, null, url);
                // Call content update
                updateContent();
            }
        });
        updateCounter = 0;
    });

    // SHOW TO-TOP-ARROW ON SCROLL 
    window.addEventListener("scroll", function() {
        toTopLink.classList.toggle('hide-link', window.pageYOffset < document.documentElement.clientHeight / 2);
    });

    // HOVER TO-TOP-ARROW
    hoverImage(toTopArrow, '/media/icons/arrow_up_blue.png');
}

// POPULATE PAGE CONTENT

function updateContent() {
    if (updateCounter > 0) { return; }
    if (url == "/") { url = "/index/"}
    fetch(url.slice(0, -1) + ".html")
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const htmlDoc = parser.parseFromString(data, 'text/html');

            // Get main, nav and meta content
            const mainContent = htmlDoc.querySelector('main').innerHTML;
            const navContent = htmlDoc.querySelector('nav').innerHTML;
            const title = htmlDoc.querySelector('title').textContent;
            const metaTitle = htmlDoc.querySelector('meta[name="title"]').getAttribute('content');

            // Update page content with get-file content
            document.querySelector('main').innerHTML = mainContent;
            document.querySelector('nav').innerHTML = navContent;
            document.querySelector('title').textContent = title;
            document.querySelector('meta[name="title"]').setAttribute('content', metaTitle);

            // Update the main script to work on new content
            repeatableMainScript();

            // Update the specific script and style
            addSpecificScript(url);
            addSpecificLink(url);
        })
        .catch(error => {
            console.error(error);
        });
    updateCounter++;
}


// UPDATE SCRIPTS

function addSpecificScript(url) {
    const newScript = document.createElement('script');
    newScript.type = 'text/javascript';
    let jsUrl = url.slice(0, -1) + ".js"
    if (jsUrl == '.js') { jsUrl = '/index.js'};
    newScript.src = `/js${jsUrl}`;
    document.body.appendChild(newScript);
}

function removeSpecificScript(url) {
    let jsUrl = url.slice(0, -1) + ".js"
    if (jsUrl == '.js') { jsUrl = '/index.js'};
    const scriptToRemove = document.querySelector(`script[src="/js${jsUrl}"]`);
    // Remove the <script> element if it exists
    if (scriptToRemove) {
        scriptToRemove.remove();
    }
}

// UPDATE STYLES

function addSpecificLink(url) {
    const newLink = document.createElement('link');
    newLink.rel = 'stylesheet';
    newLink.type = 'text/css';
    let cssUrl = url.slice(0, -1) + ".css";
    if (cssUrl == '.css') { cssUrl = '/index.css' };
    newLink.href = `/css${cssUrl}`;
    document.head.appendChild(newLink);
    // Fade in body on style load
    newLink.addEventListener('load', () => {
        setTimeout(function() {
            html.style.scrollBehavior = "smooth";
            body.style.transition = "opacity .2s ease-in";
            body.classList.add("loaded");
        }, 200);
    });
  }
  
  function removeSpecificLink(url) {
    let cssUrl = url.slice(0, -1) + ".css"
    if (cssUrl == '.css') { cssUrl = '/index.css' };
    const linkToRemove = document.querySelector(`link[href="/css${cssUrl}"]`);
    if (linkToRemove) {
        linkToRemove.remove();
    }
}

// POPSTATE (BACK AND FORWARD)

window.addEventListener('popstate', function() {
    // Get the new URL if not repeat
    if (url != location.pathname) {
        // Remove last script and style
        removeSpecificScript(url);
        removeSpecificLink(url);
        // Update url
        url = location.pathname;
        updateContent();
        // Page fade out
        fadePage();
    }
});


// FADE IN PAGE

function fadePage() {
    html.style.scrollBehavior = "unset";
    body.style.transition = "opacity 0s ease-in";
    body.classList.remove("loaded");
    // fallback fade in, correct is set on style load
    setTimeout(function() {
        html.style.scrollBehavior = "smooth";
        body.style.transition = "opacity .2s ease-in";
        body.classList.add("loaded");
    }, 1500);
}