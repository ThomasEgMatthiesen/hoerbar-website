
// INITIALIZE STANDARD SETTINGS FROM MAIN.JS
getBlogpostElements();
fetchAndLogBlogposts("Lydbranding", "En introduktion til lydbranding");
parseSVG('/media/images/artikler/article_00.svg');

// BRANDING TOOL STATISTIC

function setupBrandingToolsStatistic() {
    const statBtn = document.querySelectorAll('.ietl-stat-btn');
    const statBtnTxt = document.querySelectorAll('.ietl-stat-btn h4');
    const statBars = document.querySelectorAll('.ietl-bar');
    const statText = document.querySelectorAll('.ietl-stat');
    const statPercentages = ["6", "14", "5", "24", "32", "69", "38", "39", "3", "45", "91"];
    const statTimes = ["8,53", "6,01", "2,84", "2,09", "1,67", "1,44", "1,41", "1,41", "1,20", "1,19", "1,17"];
    const statTimesPercentages = ["85.3", "60.1", "28.4", "20.9", "16.7", "14.4", "14.1", "14.1", "12.0", "11.9", "11.7"];

    statBars.forEach((bar, index) => {
        statText[index].textContent = statPercentages[index] + "%";
        bar.style.width = statPercentages[index] + "%";
    });

    statBtn[0].addEventListener('mouseover', () => { 
        statBtnTxt[0].style.color = "var(--blue)";
        statBtnTxt[0].style.textDecoration = "underline";
        statBtnTxt[1].style.color = "var(--light)";
        statBtnTxt[1].style.textDecoration = "none";
        statBars.forEach((bar, index) => {
            statText[index].textContent = statPercentages[index] + "%";
            bar.style.width = statPercentages[index] + "%";
        });
    });

    statBtn[1].addEventListener('mouseover', () => { 
        statBtnTxt[0].style.color = "var(--light)";
        statBtnTxt[0].style.textDecoration = "none";
        statBtnTxt[1].style.color = "var(--blue)";
        statBtnTxt[1].style.textDecoration = "underline";
        statBars.forEach((bar, index) => {
            statText[index].textContent = statTimes[index] + "x";
            bar.style.width = statTimesPercentages[index] + "%";
        });
    });
}

setupBrandingToolsStatistic();