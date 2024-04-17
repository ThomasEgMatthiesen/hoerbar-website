function getRandomPattern() {
    const randomIndex = String(Math.floor(Math.random() * 10)).padStart(2, '0');
    return `/media/patterns/pattern_${randomIndex}.svg`;
}

function drawPaths(paths) {
    let aniDelay = 0;
    paths.forEach((path, index) => {
        path.classList.add('svg-animate');
        path.style.animationDelay = aniDelay + 's';
        const randomIndex = (Math.floor(Math.random() * 10) + 1) / 100;
        aniDelay += randomIndex;
    });
}

function parseSVG(svgFile) {
    return fetch(svgFile)
        .then(response => response.text())
        .then(svgText => {
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
            const svgElement = svgDoc.documentElement;
            const postInfoContainer = document.querySelector('.here');
            postInfoContainer.parentNode.insertBefore(svgElement, postInfoContainer.nextSibling);
            return svgElement.querySelectorAll('path');
        })
        .catch(error => {
            console.error(error);
            return [];
        });
}

function setPatternContainerHeight() {
    const header = document.querySelector('header');
    const patternContainer = document.querySelector('.pattern-cntnr');

    if (header && patternContainer) {
        const headerHeight = header.offsetHeight;
        const computedStyle = getComputedStyle(patternContainer);
        const marginTopValue = parseFloat(computedStyle.marginTop);
        const windowHeight = window.innerHeight;
        patternContainer.style.height = `${windowHeight - headerHeight + Math.abs(marginTopValue)}px`;
    }
}

// Run the functions on page load and whenever the window is resized.
window.addEventListener('load', () => {
    const randomPattern = getRandomPattern();
    parseSVG(randomPattern)
        .then(paths => {
            drawPaths(paths);
            setPatternContainerHeight();
        });
});
window.addEventListener('resize', setPatternContainerHeight);
  
