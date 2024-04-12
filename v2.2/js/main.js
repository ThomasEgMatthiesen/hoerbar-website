

//////////////////////////////////////
//////       INITIALIZING      ///////
//////////////////////////////////////

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


//////////////////////////////////////
//////       LANDING PAGE      ///////
//////////////////////////////////////


// logo
const logo = document.getElementsByClassName("logo-crcl");
const overlays = document.querySelectorAll(".logo-olay");
const headingLetters = document.getElementsByClassName("hdng-letr");
const guideText = document.querySelector(".guide-text");


logo[0].addEventListener("mouseover", function() {
  event.stopPropagation();
  overlays.forEach(overlay => overlay.classList.toggle('logo-hvr'));
  guideText.classList.toggle('guide-text-hidn');
}, false);

logo[0].addEventListener("mouseout", function() {
  event.stopPropagation();
  overlays.forEach(overlay => overlay.classList.toggle('logo-hvr'));
  guideText.classList.toggle('guide-text-hidn');
}, false);

logo[0].addEventListener("click", function() {
  event.stopPropagation();
  animateLogo();
  // Toggle guide text on play
  if (logo[0].classList.contains('ani-paused')) {
    guideText.innerHTML = "START AFSPILNING (MELLEMRUMSTAST)";
  } else {
    guideText.innerHTML = "STOP AFSPILNING (MELLEMRUMSTAST)";
  }
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

// Heading letters
for(let i = 0; i < headingLetters.length; i++) {
  headingLetters[i].addEventListener("click", function() {
    event.stopPropagation();
    headingLetters[i].classList.toggle('hdng-active');
  }, false);

  headingLetters[i].addEventListener("mouseover", function() {
    event.stopPropagation();
    headingLetters[i].classList.toggle('hdng-letr-hvr');
  }, false);

  headingLetters[i].addEventListener("mouseout", function() {
    event.stopPropagation();
    headingLetters[i].classList.toggle('hdng-letr-hvr');
  }, false);
}

// Pause and play landing page videos on scroll
let servicesSection = document.getElementsByClassName("srvcs-sctn")[0];
let landingPageVideos = document.getElementsByClassName('lndng-scnt-vid');
function toggleLandingVideo() {
  if (scrollPos > servicesSection.offsetTop && !landingPageVideos[5].paused) {
    for (let i = 0; i < landingPageVideos.length; i++) {
      landingPageVideos[i].pause();
    }
  } else if (scrollPos < servicesSection.offsetTop && landingPageVideos[5].paused) {
    for (let i = 0; i < landingPageVideos.length; i++) {
      landingPageVideos[i].play();
    }
  }
}


//////////////////////////////////////
//////       CUSTOM CURSOR      //////
//////////////////////////////////////

// custom cursor
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
refreshClickable();
const clickCursor = document.getElementsByClassName('click-cursor')[0];

function refreshClickable() {
  let clickableElements = document.getElementsByClassName('clickable');
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
const body = document.body;
let documentHeight
let windowHeight;
let scrollPercentage;

window.addEventListener('scroll', () => {
  scrollPos = document.documentElement.scrollTop;
  windowHeight = window.innerHeight;
  documentHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  scrollPercentage = (scrollPos + windowHeight) / documentHeight * 100;
  toggleLandingVideo(); // pause and play landing page videos
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
    // SFX
    if (audioContextStatus === 1) {
      shotSample(samples[7], 0, 7);
    }
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
  // SFX
  if (audioContextStatus === 1) {
    shotSample(samples[8], 0, 8);
  }
}, false);

srvcsInfo.addEventListener("click", function() {
  if (largeDevice.matches) { return; }
  srvcsInfo.classList.toggle('in-from-right')
}, false);





//////////////////////////////////////
///////       SCROLL LOCK      ///////
//////////////////////////////////////

// prevent spacebar from scrolling
window.addEventListener('keydown', function(e) {
  if(e.keyCode === 32 && e.target === document.body) {
    e.preventDefault();
  }
});

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
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

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

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










//////////////////////////////////////
//////       AUDIO CONTEXT      //////
//////////////////////////////////////


// Create an audio context
let audioContext = new AudioContext();
// Create the master gain node
let masterGainNode = audioContext.createGain();
// Set the master gain to 0 (mute audio)
masterGainNode.gain.setValueAtTime(0, audioContext.currentTime);
// Connect master gain to audio destination
masterGainNode.connect(audioContext.destination);


const button = logo[0];
let clickCount = 0;

button.addEventListener("click", function() {
  if (clickCount === 0) {
    // check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    // Fade in the master channel at initialization
    masterGainNode.gain.setTargetAtTime(1, audioContext.currentTime, 10);
    // Start playing piano
    playPiano();
    // Start playing forest
    playForest();
    clickCount = 1;
    console.log("Audio context initialized");
  } else if (clickCount === 1) {
    clickCount = 2;
    pauseContext();
    console.log("Audio context paused");
  } else {
    clickCount = 1;
    resumeContext();
    console.log("Audio context resumed");
  }
});

function playPiano() {
  let randomNumber = Math.floor(Math.random() * 7);
  if (pianoSampleCount === 0) {
    playBuffer(audioContext, pianoBuffersA[randomNumber], 'piano', 0.8, 0.1, 0.1672);
    pianoSampleCount++;
  } else if (pianoSampleCount === 1) {
    playBuffer(audioContext, pianoBuffersB[randomNumber], 'piano', 0.8, 0.1, 0.1672);
    pianoSampleCount++;
  } else {
    playBuffer(audioContext, pianoBuffersC[randomNumber], 'piano', 0.8, 0.1, 0.1672);
    pianoSampleCount = 0;
  }
}

function playForest() {
  let randomNumber = Math.floor(Math.random() * 4);
  playBuffer(audioContext, forestBuffers[randomNumber], 'forest', 0.1, 0.2, 2.5);
}


function pauseContext() {
  // Fade out the master channel
  masterGainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.2);
  // pause context
  if (audioContext.state === "running") {
  setTimeout(() => {
      audioContext.suspend().then(() => {
        console.log("Paused context");
      });
  }, 200)
  }
}

function resumeContext() {
  // Fade in the master channel
  masterGainNode.gain.setTargetAtTime(1, audioContext.currentTime, 0.2);
  // resume context
  if (audioContext.state === "suspended") {
    audioContext.resume().then(() => {
      console.log("Resumed context");
    });
  }
}




//////////////////////////////////////
//////       AUDIO BUFFERS      //////
//////////////////////////////////////

// Arrays to store the audio buffers for each category
let pianoBuffersA = [];
let pianoBuffersB = [];
let pianoBuffersC = [];
let forestBuffers = [];

// Counter to check which number of sample is played
let pianoSampleCount = 0;

// Load the audio files
loadAudioFiles(audioContext,
  ["/media/audio/piano/piano_a_0.wav", "/media/audio/piano/piano_a_1.wav", "/media/audio/piano/piano_a_2.wav", "/media/audio/piano/piano_a_3.wav", "/media/audio/piano/piano_a_4.wav", "/media/audio/piano/piano_a_5.wav", "/media/audio/piano/piano_a_6.wav", "/media/audio/piano/piano_a_7.wav",
   "/media/audio/piano/piano_b_0.wav", "/media/audio/piano/piano_b_1.wav", "/media/audio/piano/piano_b_2.wav", "/media/audio/piano/piano_b_3.wav", "/media/audio/piano/piano_b_4.wav", "/media/audio/piano/piano_b_5.wav", "/media/audio/piano/piano_b_6.wav", "/media/audio/piano/piano_b_7.wav",
   "/media/audio/piano/piano_c_0.wav", "/media/audio/piano/piano_c_1.wav", "/media/audio/piano/piano_c_2.wav", "/media/audio/piano/piano_c_3.wav", "/media/audio/piano/piano_c_4.wav", "/media/audio/piano/piano_c_5.wav", "/media/audio/piano/piano_c_6.wav", "/media/audio/piano/piano_c_7.wav",
   "/media/audio/forest/forest_0.wav", "/media/audio/forest/forest_1.wav", "/media/audio/forest/forest_2.wav", "/media/audio/forest/forest_3.wav",
  ], function(pianoBuffersA, pianoBuffersB, pianoBuffersC, forestBuffers) {
  // The audio buffers are now available to be played
  console.log('Audio files loaded');
});

function loadAudioFiles(audioContext, audioFileURLs, callback) {

  // Counter for the number of audio files that have been loaded
  let loadCount = 0;

  // Load the audio files
  audioFileURLs.forEach(function(audioFileURL, index) {
    // Create a new request to load the audio file
    let request = new XMLHttpRequest();
    request.open("GET", audioFileURL, true);
    request.responseType = "arraybuffer";

    // Decode the audio data asynchronously
    request.onload = function() {
      audioContext.decodeAudioData(request.response, function(buffer) {
        // Add the audio buffer to the appropriate array based on its name
        if (audioFileURLs[index].includes('piano_a')) {
          pianoBuffersA.push(buffer);
        } else if (audioFileURLs[index].includes('piano_b')) {
          pianoBuffersB.push(buffer);
        } else if (audioFileURLs[index].includes('piano_c')) {
          pianoBuffersC.push(buffer);
        } else if (audioFileURLs[index].includes('forest')) {
          forestBuffers.push(buffer);
        }

        // Increment the load count
        loadCount++;

        // If all audio files have been loaded, call the callback function
        if (loadCount == audioFileURLs.length) {
          callback(pianoBuffersA, pianoBuffersB, pianoBuffersC, forestBuffers);
        }
      });
    };

    // Send the request to load the audio file
    request.send();
  });
}






//////////////////////////////////////
//////       SAMPLE PLAYER      //////
//////////////////////////////////////


function playBuffer(audioContext, audioBuffer, name, gain, fade, startNext) {

  // Create a gain node
  const gainNode = audioContext.createGain();

  // Set the gain to 0 (mute the audio)
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);

  // Create a new audio buffer source node
  var source = audioContext.createBufferSource();

  // Set the audio buffer for the source node
  source.buffer = audioBuffer;

  // Connect the source node to the master gain and then audio context's destination
  source.connect(gainNode).connect(masterGainNode);

  // Start playing the audio
  source.start();

  // gradually increase the gain to gain-value over 0.1672 seconds (fade in the audio)
  gainNode.gain.setTargetAtTime(gain, audioContext.currentTime, fade);

  // Gradually decrease the gain to 0 over 0.1672 seconds (fade out the audio)
  gainNode.gain.setTargetAtTime(0, audioContext.currentTime + audioBuffer.duration - fade, fade);

  // Call the next function at startNext before the end of the audio file
  if (name.includes('piano')) {
    setTimeout(playPiano, (audioBuffer.duration - startNext) * 1000);
  } else if (name.includes('forest')) {
    setTimeout(playForest, (audioBuffer.duration - startNext) * 1000);
  }
}
