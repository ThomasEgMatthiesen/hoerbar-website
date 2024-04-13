
////////////////////////////
/////   CONTACT FORM   /////
////////////////////////////

document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    var form = document.getElementById("contact-form");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/php/sendmail.php", true);
    xhr.onreadystatechange = function() {
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        document.getElementById("returnMessage").innerHTML = this.responseText;
        returnMessage.style.left = "-2px";
        form.reset(); // Clear the form after submission
      }
    };
    xhr.send(new FormData(form)); // Send the form data as the request body
});




/////////////////////////////////
/////  ALLOW SPACE IN FORM  /////
/////////////////////////////////

inputElement = document.getElementById('name');
textareaElement = document.getElementById('message');

inputElement.addEventListener('focus', () => {
  isInputElementFocused = true;
});

inputElement.addEventListener('blur', () => {
  isInputElementFocused = false;
});

textareaElement.addEventListener('focus', () => {
  isTextareaElementFocused = true;
});

textareaElement.addEventListener('blur', () => {
  isTextareaElementFocused = false;
});




///////////////////////////
/////   WRITE WORDS   /////
///////////////////////////

function writeText(strings) {
    // Get the paragraph element
    var paragraph = document.getElementById("contactOutput");
  
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
            setTimeout(startWriting, 3000);
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
  
writeText(["Interaktionsdesign", "Museumsudstillinger", "Restauranter", "Podcasts", "Butikker", "Apps", "Branding", "Teater", "Audio-guides", "Annoncering"]);