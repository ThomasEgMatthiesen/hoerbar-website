const navbar = document.getElementsByTagName('header')[0];
const body = document.body;
const scrollUp = "scroll-up";
const scrollDown = "scroll-down";
let lastScroll = 0;
let menuToggle = 0;

const casesBackground = document.getElementById("casesBackground");
const lmntTurnBlack = document.getElementById("lmntTurnBlack");


// Menubar appear on scroll //

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= 0) {
    body.classList.remove(scrollUp);
    menuBar.style.backgroundColor = "transparent";
    menuBar.style.position = "absolute";
    menuBar.style.opacity = "1";
    menuBar.style.marginTop = "0";
    return;
  }
  if (currentScroll > lastScroll && !body.classList.contains(scrollDown) && currentScroll > 600 && menuToggle == 0) {
    // down
    body.classList.remove(scrollUp);
    body.classList.add(scrollDown);
    menuBar.style.backgroundColor = "transparent";
    menuBar.style.opacity = "0"
    menuBar.style.marginTop = "-100px";
    // Fade cases background to black //
    if (casesBackground == null && lmntTurnBlack == null) {
      return;
    } else {
      casesBackground.style.backgroundColor = "#000";
      lmntTurnBlack.style.backgroundColor = "#000";
    }
  } else if (currentScroll < lastScroll && body.classList.contains(scrollDown) && currentScroll > 600) {
    // up
    body.classList.remove(scrollDown);
    body.classList.add(scrollUp);
    menuBar.style.position = "fixed";
    menuBar.style.backgroundColor = "#000";
    menuBar.style.opacity = "1";
    menuBar.style.marginTop = "0";
  } else if (currentScroll < 600) {
    // Fade cases background to black //
    if (casesBackground == null && lmntTurnBlack == null) {
      return;
    } else {
      casesBackground.style.backgroundColor = "#fff";
      lmntTurnBlack.style.backgroundColor = "#fff";
    }
  }
  lastScroll = currentScroll;
});
