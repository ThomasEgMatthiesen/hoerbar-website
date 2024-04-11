// Redirect page depending on browser language setting
let logo = document.getElementById("ntrLogo");
let userLang = navigator.language;

logo.addEventListener("animationend", function() {
  if (userLang == "da") {
    window.location.href = "/da";
  } else {
    window.location.href = "/en";
  }
});
