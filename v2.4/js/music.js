// Functional variables
let audioContext;         // for context
let toggleCount = 0;      // for counting toggle
let duration = 0;         // duration of buffer for timeout
let startTime = 0;        // timestamp for starting or resuming playback
let stopTime = 0;         // timestamp for stopping playback
let offsetTime;           // for calculating buffer playback progress
let indexPiano = 0;       // index of piano a, b, c array
let randomPiano;          // for random piano file selection
let timeoutPiano;         // timeoutID for next playback
const overlapTime = 0.24 ; // 240ms crossfade

// Tracks
let master = {gain: null, gainValue: 1};
let reverb = {convolver: null, gain: null, gainValue: 1}
let piano = {buffer: null, gain: null, gainValue: 1, send: null, sendValue: 1};
let soundscape = {buffer: null, gain: null, gainValue: 0.5, send: null, sendValue: 1};
let tape = [piano, soundscape];

// Array of piano files
const sourcePiano = [['/media/audio/piano/piano_a_0.wav', '/media/audio/piano/piano_a_1.wav', '/media/audio/piano/piano_a_2.wav', '/media/audio/piano/piano_a_3.wav', '/media/audio/piano/piano_a_4.wav', '/media/audio/piano/piano_a_5.wav', '/media/audio/piano/piano_a_6.wav', '/media/audio/piano/piano_a_7.wav'],
                     ['/media/audio/piano/piano_b_0.wav', '/media/audio/piano/piano_b_1.wav', '/media/audio/piano/piano_b_2.wav', '/media/audio/piano/piano_b_3.wav', '/media/audio/piano/piano_b_4.wav', '/media/audio/piano/piano_b_5.wav', '/media/audio/piano/piano_b_6.wav', '/media/audio/piano/piano_b_7.wav'],
                     ['/media/audio/piano/piano_c_0.wav', '/media/audio/piano/piano_c_1.wav', '/media/audio/piano/piano_c_2.wav', '/media/audio/piano/piano_c_3.wav', '/media/audio/piano/piano_c_4.wav', '/media/audio/piano/piano_c_5.wav', '/media/audio/piano/piano_c_6.wav', '/media/audio/piano/piano_c_7.wav']];

// Array of forest files
const sourceForest = ['/media/audio/forest/forest_0.wav', '/media/audio/forest/forest_1.wav', '/media/audio/forest/forest_2.wav', '/media/audio/forest/forest_3.wav'];


// Toggle
async function togglePlayer() {
  if (toggleCount === 0) { 
    await initializeAudio();
    startPlayback();
  } else if (toggleCount % 2 === 0) {
    resumePlayback();
  } else {  
    stopPlayback();
  }
  toggleCount++;
}

// Start audio
async function startPlayback() {
  // Initial audio bounce
  await bounceAudio(sourcePiano[indexPiano][0], tape[0]);
  // Start piano loop
  playPiano();
}

// Resume audio
function resumePlayback() {
  // Check if the AudioContext is suspended and resume it if necessary
  if (audioContext.state === 'suspended') { audioContext.resume(); }
  // Set offset time for new timeout
  offsetTime = duration - (stopTime - startTime);
  // Check if offset is below 0 and set to crossfade time
  offsetTime = (offsetTime < 0) ? overlapTime : offsetTime;
  // Set new timeout
  timeoutPiano = setTimeout(playPiano, (offsetTime - overlapTime) * 1000);
}

// Stop audio
function stopPlayback() {
  // Set stop timestamp
  stopTime = audioContext.currentTime;
  // Suspend context
  audioContext.suspend();
  // Remove timeout
  clearTimeout(timeoutPiano);
}

// Initialize audio
function initializeAudio() {
  return new Promise(function(resolve, reject) {
    try {
      // Create AudioContext
      audioContext = new AudioContext();
      // Route audio
      signalRouting();
      resolve();      
    } catch (error) {
      reject(error);
    }
  });
}

// Routing
async function signalRouting() {
  // Master setup
  master.gain = audioContext.createGain();
  master.gain.gain.value = master.gainValue;
  master.gain.connect(audioContext.destination);

  // Reverb setup
  reverb.convolver = audioContext.createConvolver();
  reverb.convolver.buffer = await fetch('/media/audio/impulse/steinman_hall.wav')
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer));

  // Create reverb low cut filter
  let lowCut = audioContext.createBiquadFilter();
  lowCut.type = "highpass";
  lowCut.frequency.value = 500;

  // Create reverb high cut filter
  let highCut = audioContext.createBiquadFilter();
  highCut.type = "lowpass";
  highCut.frequency.value = 15000;

  // Create reverb gain
  reverb.gain = audioContext.createGain();
  reverb.gain.gain.value = reverb.gainValue;

  // Connect reverb
  reverb.convolver.connect(lowCut);
  lowCut.connect(highCut);
  highCut.connect(reverb.gain);
  reverb.gain.connect(audioContext.destination);

  // Tape track to master
  tape.forEach(function(track) {
    // Send setup
    track.send = audioContext.createGain();
    track.send.gain.value = track.sendValue;
    track.send.connect(reverb.convolver);
    // Gain setup
    track.gain = audioContext.createGain();
    track.gain.gain.value = track.gainValue;
    track.gain.connect(master.gain);
  });
}


function playPiano() {
  // Set start or resume timestamp
  startTime = audioContext.currentTime;
  // Play bounce
  tape[0].buffer.start(0);
  // Get previous duration
  duration = tape[0].buffer.buffer.duration;
  // Set timeout for new bounce
  timeoutPiano = setTimeout(playPiano, (duration - overlapTime) * 1000);
  // Set play index of piano
  indexPiano = (indexPiano + 1) % 3;
  // Set random number for piano file selection
  randomPiano = Math.floor(Math.random() * sourcePiano[indexPiano].length);
  // Bounce new source to buffer
  bounceAudio(sourcePiano[indexPiano][randomPiano], tape[0]);
}

// Load audio
function audioLoad(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      audioContext.decodeAudioData(request.response, function(buffer) {
        const audio = audioContext.createBufferSource();
        audio.buffer = buffer;
        resolve(audio);
      }, function() { reject('Error decoding audio data'); });
    };
    request.onerror = function() { reject('Error loading audio file'); };
    request.send();
  });
}

// Audio to track buffer 
async function bounceAudio(url, track) {
  return new Promise(async function(resolve, reject) {
    try {
      track.buffer = await audioLoad(url);
      // Connect to gain
      track.buffer.connect(track.gain);
      // Connect to send (post-fader)
      track.buffer.connect(track.send);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}