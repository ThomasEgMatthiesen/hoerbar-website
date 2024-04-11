
// Landing images carousel
const landingImages = document.getElementsByClassName('lndng-img');
const landingImagesCounter = landingImages.length - 1;

for(let i = 0; i < landingImages.length; i++) {
  landingImages[i].addEventListener('click', function(){
    if (i === landingImagesCounter) {
      // If the last element is clicked show first element
      for(let i = 1; i < landingImages.length; i++) {
        landingImages[i].classList.add("out-right");
      }
      // reset the first element
      landingImages[0].classList.remove("out-right");
    } else {
      // If the element is clicked show the next in array
      landingImages[i+1].classList.remove("out-right");
    }
  }, false);
}


// Menubar appear on scroll //
const header = document.getElementsByTagName('header')[0];
const body = document.body;
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;
let menuToggle = 0;
window.addEventListener("scroll", () => {
  if (caseBoxStatus === 1) { return; }
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove(scrollUp);
    header.classList.remove('menubar-hide');
    return;
  }
  if (currentScroll > lastScroll && !body.classList.contains(scrollDown) && currentScroll > 120) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
    header.classList.add('menubar-hide');
  } else if (currentScroll < lastScroll && body.classList.contains(scrollDown) && currentScroll > 120) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
    header.classList.remove('menubar-hide');
  }
  lastScroll = currentScroll;
});



// Slide and show services info
const services = document.getElementsByClassName('srvc-btn');
const serviceInfo = document.getElementsByClassName('srvc-info');
const rightRow = document.getElementById('rightRow');
const skyRow = document.getElementById('skyRow');
let lastService;
let rowStatus = 0;

// Slide in row element from right
skyRow.addEventListener('click', function(){
  rightRow.classList.remove('row-shrink');
  skyRow.classList.remove('row-unshrink');
  rowStatus = 1;
});

skyRow.addEventListener('transitionend', (event) => {
  if (rowStatus > 0) {
    lastService.style.display = "none";
    rowStatus = 0;
  }
});

// Skybox services show hide chosen subject
for(let i = 0; i < services.length; i++) {
    services[i].addEventListener('click', function(){
      serviceInfo[i].style.display = "block";
      lastService = serviceInfo[i];
      // Slide in row element from right
      rightRow.classList.add('row-shrink');
      skyRow.classList.add('row-unshrink');
      rowStatus = 0;
  }, false);
}



// Cases carousel & cursor page indicator
const caseContainers = document.getElementsByClassName('cs-cntnr');
const caseContainerCounter = caseContainers.length - 1;
let casePageCounter;
let casePageNumber = caseContainers.length;
let casePageIndex = document.getElementById('casePageIndex');
let casePageContainer = document.getElementsByClassName('crsr-cs-pgs')[0];

for(let i = 0; i < caseContainers.length; i++) {
  caseContainers[i].addEventListener('click', function(){
    if (i === caseContainerCounter) {
      // If the last element is clicked show first element
      for(let i = 1; i < caseContainers.length; i++) {
        caseContainers[i].classList.add("cs-cntnr-hide");
      }
      caseContainers[0].classList.remove("cs-cntnr-hide");
    } else {
      // If the element is clicked show the next in array
      caseContainers[i+1].classList.remove("cs-cntnr-hide");
    }

    // Page counter for mouse
    casePageContainer.style.opacity = "1";
    casePageCounter =  i + 2;
    if (casePageCounter > caseContainers.length) { casePageCounter = 1 }
    casePageIndex.innerHTML = casePageCounter.toString() + "/" + casePageNumber.toString();
    setTimeout(() => {
      casePageContainer.style.opacity = "0";
    }, 1000)
  }, false);
}





const buttonO = document.getElementById('buttonO');
const closeX = document.getElementById('closeX');
const rightArrow = document.getElementById('rightArrow');
const reverseArrow = document.getElementById('reverseArrow');
const playLogo = document.getElementById('playLogo');
const pauseLogo = document.getElementById('pauseLogo');
const clickableElements = document.getElementsByClassName("clickable");
const closeableElements = document.getElementsByClassName("closeable");
const reverseableElements = document.getElementsByClassName("reverseable");
const slideableElements = document.getElementsByClassName("slideable");
const playableElements = document.getElementsByClassName("playable");
let videoStatus = 0;

// clickable
for(let i = 0; i < clickableElements.length; i++) {
  clickableElements[i].addEventListener('mouseover', function(){
    event.stopPropagation();
    buttonO.style.height = "0%";
    buttonO.style.width = "0%";
  }, false);
}


// closeable
for(let i = 0; i < reverseableElements.length; i++) {
  reverseableElements[i].addEventListener('mouseover', function(){
    event.stopPropagation();
    buttonO.style.height = "80%";
    buttonO.style.width = "80%";
    reverseArrow.style.display = "block";
    rightArrow.style.display = "none";
  }, false);

  closeableElements[i].addEventListener('mouseleave', function(){
    event.stopPropagation();
    buttonO.style.height = "0%";
    buttonO.style.width = "0%";
    reverseArrow.style.display = "none";
  }, false);
}

// reverseable
for(let i = 0; i < closeableElements.length; i++) {
  closeableElements[i].addEventListener('mouseover', function(){
    event.stopPropagation();
    buttonO.style.height = "80%";
    buttonO.style.width = "80%";
    closeX.style.display = "block";
    rightArrow.style.display = "none";
    reverseArrow.style.display = "none";
  }, false);

  closeableElements[i].addEventListener('mouseleave', function(){
    event.stopPropagation();
    buttonO.style.height = "0%";
    buttonO.style.width = "0%";
    closeX.style.display = "none";
  }, false);
}

// slideable
for(let i = 0; i < slideableElements.length; i++) {
  slideableElements[i].addEventListener('mouseover', function(){
    event.stopPropagation();
    buttonO.style.height = "80%";
    buttonO.style.width = "80%";
    rightArrow.style.display = "block";
    reverseArrow.style.display = "none";
  }, false);

  slideableElements[i].addEventListener('mouseleave', function(){
    event.stopPropagation();
    buttonO.style.height = "0%";
    buttonO.style.width = "0%";
    rightArrow.style.display = "none";
  }, false);
}

// playable & toggle pause/play logo
for(let i = 0; i < playableElements.length; i++) {
  playableElements[i].addEventListener('mouseover', function(){
    event.stopPropagation();
    buttonO.style.height = "80%";
    buttonO.style.width = "80%";
    closeX.style.display = "none";
    togglePlayLogo(videoStatus);
  }, false);

  playableElements[i].addEventListener('mouseleave', function(){
    event.stopPropagation();
    buttonO.style.height = "0%";
    buttonO.style.width = "0%";
    togglePlayLogo(2);
  }, false);
}

// toggle play and pause logo on click
function togglePlayLogo(x) {
  if (x === 0) {
    playLogo.style.display = "block";
    pauseLogo.style.display = "none";
  } else if (x === 1) {
    playLogo.style.display = "none";
    pauseLogo.style.display = "block";
  } else {
    playLogo.style.display = "none";
    pauseLogo.style.display = "none";
  }
}




// Call the event of the images and stop bubbling to the parent event
// Open close case box
const caseCovers = document.getElementsByClassName('cs-cover');
const caseBox = document.getElementsByClassName('cs-box')[0];
const casePageCover = document.getElementsByClassName('cs-pg-cvr')[0];
let caseBoxStatus = 0;

for(let i = 0; i < caseCovers.length; i++) {
    caseCovers[i].addEventListener('click', function(){
    event.stopPropagation();
      // hide previous box content and show new
      hideCase(lastCase);
      showCase(i);
      caseBox.classList.add('cs-box-open');
      casePageCover.classList.add('cs-pg-cvr-show');
      casePageCover.classList.add('cs-pg-cvr-in');
      header.classList.add('menubar-hide');
      caseBoxStatus = 1;
      body.classList.add('noscroll');
  }, false);
}

//close case box
caseBox.addEventListener('click', closeCaseBox);
casePageCover.addEventListener('click', closeCaseBox);
caseBox.addEventListener('transitionend', removeCaseCover);

function closeCaseBox() {
  caseBox.classList.remove('cs-box-open');
  header.classList.remove('menubar-hide');
  casePageCover.classList.remove('cs-pg-cvr-show');
  body.classList.remove('noscroll');
  caseBoxStatus = 0;
  videoStatus = 0;
  // reset video
  resetVideo();
}

function removeCaseCover() {
  if (caseBoxStatus === 0) { casePageCover.classList.remove('cs-pg-cvr-in'); }
}




// Case box content - Show new and hide previous
const cases = document.getElementsByClassName('case');
let lastCase = 0;
function showCase(x) { cases[x].classList.remove('case-hide'); lastCase = x; }
function hideCase(y) { cases[y].classList.add('case-hide'); }




// Case video controls
let video;
let currentVideo;
let videoProgress;
let videoTime;
let videoProgressInvert;
const caseVideos = document.getElementsByClassName('cs-vid');
let videoProgressBarBlue = document.getElementsByClassName('cs-vid-progress-blue');
let videoProgressBarBlack = document.getElementsByClassName('cs-vid-progress-black');

for(let i = 0; i < caseVideos.length; i++) {
    caseVideos[i].addEventListener('click', function(){
      video = caseVideos[i];
      currentVideo = i;
      event.stopPropagation();
      if (video.paused || video.ended) {
        videoStatus = 1;
        togglePlayLogo(1); // toggle to pause logo
        video.play();
        videoTime = setInterval(updateTime, 100);
      } else {
        videoStatus = 0;
        togglePlayLogo(0); // toggle to play logo
        video.pause();
        clearInterval(videoTime);
        }
    }, false);
}

function updateTime() {
  videoProgressInvert = 100 - (video.currentTime / video.duration * 100);
  videoProgress = video.currentTime / video.duration * 100;
  videoProgressBarBlue[currentVideo].style.width = videoProgress.toString() + "%";
  videoProgressBarBlack[currentVideo].style.width = videoProgressInvert.toString() + "%";
  if (videoProgress === 100) {
    clearInterval(videoTime);
    setTimeout( function() {
      videoProgressBarBlue[currentVideo].style.width = "0%";
      videoProgressBarBlack[currentVideo].style.width = "100%";
      togglePlayLogo(0); // toggle to play logo
    }, 1000);
  }
}

function resetVideo() {
  if (!video.paused) { video.pause(); }
  video.currentTime = 0;
  videoProgressBarBlue[currentVideo].style.width = "0%";
  videoProgressBarBlack[currentVideo].style.width = "100%";
}
