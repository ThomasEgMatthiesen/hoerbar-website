///////////////////////////////////////
///////   BLOGPOST DATA FETCH   ///////
///////////////////////////////////////

async function fetchCasesPage() {
    const response = await fetch('/json/cases.json');
    const data = await response.json();
    cases = data;
}
  
fetchCasesPage()
    .then(() => {
    // Update the cases element after fetch
    casesButtons();
    casesHover();
});
  
///////////////////////////////////////
///////  CASES BUTTON HOVER  ///////
///////////////////////////////////////

casesElements = document.querySelectorAll('.case-lmnt');
casesHeading = document.querySelectorAll('.case-lmnt-hdng');
casesInternalLink = document.querySelectorAll('.cases-case-link');
casesTheme = document.querySelectorAll('.case-lmnt-theme');
casesElementCover = document.querySelectorAll('.case-lmnt-img-cover');
  
function casesHover() {
    casesElements.forEach((element, index) => {
        element.addEventListener("mouseover", function() {
            casesElementCover[index].classList.add("cases-img-cover-hover");
            casesHeading[index].classList.add("cases-hover-txt");
            casesTheme[index].classList.add("cases-hover-txt");
        });
        element.addEventListener("mouseout", function() {
            casesElementCover[index].classList.remove("cases-img-cover-hover");
            casesHeading[index].classList.remove("cases-hover-txt");
            casesTheme[index].classList.remove("cases-hover-txt");
        });
    });
}
  
///////////////////////////////////////
///////  POPULATE CASES ELEMENTS  /////
///////////////////////////////////////
  
function casesButtons() {
    casesElements.forEach((element, index) => {
        element.style.backgroundImage = `url(${cases[index].imgUrl})`;
        casesInternalLink[index].href = cases[index].internalLink;
        casesHeading[index].textContent = cases[index].customer;
        casesTheme[index].textContent = `// ${cases[index].theme}`;
    });
}