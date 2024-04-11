const menuBar = document.getElementById('header');
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



const menuCntnr = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
const burgerLineOne = document.getElementById("burgerLineA");
const burgerLineTwo = document.getElementById("burgerLineB");
const burgerLineThree = document.getElementById("burgerLineC");
let pageLanguage = document.documentElement.lang;

// Menu open and close //

menuBtn.addEventListener("click", () => {
  if (menuToggle == 0) {
    menuCntnr.classList.add('menu-open');
    burgerLineOne.classList.add('brgr-ln-1-transform');
    burgerLineTwo.classList.add('brgr-ln-2-transform');
    burgerLineThree.classList.add('brgr-ln-3-transform');
    if (pageLanguage == "da") { menuBtn.firstElementChild.innerHTML = "LUK"; } else { menuBtn.firstElementChild.innerHTML = "CLOSE"; }
    menuBtn.firstElementChild.style.marginLeft = "8px"
    body.style.overflow = "hidden";
    menuToggle = 1;
  } else {
    menuCntnr.classList.remove('menu-open');
    burgerLineOne.classList.remove('brgr-ln-1-transform');
    burgerLineTwo.classList.remove('brgr-ln-2-transform');
    burgerLineThree.classList.remove('brgr-ln-3-transform');
    menuBtn.firstElementChild.innerHTML = "MENU";
    menuBtn.firstElementChild.style.marginLeft = "0px"
    body.style.overflow = "auto";
    menuToggle = 0;
  }
});
