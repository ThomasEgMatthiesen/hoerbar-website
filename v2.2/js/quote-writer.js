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
