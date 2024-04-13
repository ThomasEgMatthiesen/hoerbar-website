//////////////////////////////
/////  HOVER PEOPLE IMG  /////
//////////////////////////////

peopleImgCover = document.querySelectorAll('.people-img-cover');
peopleDescription = document.querySelectorAll('.people-description');

peopleImgCover.forEach((element, index) => {
    element.addEventListener("mouseover", function() {
        peopleImgCover.forEach(el => {
            el.classList.remove("people-cover-hover");
        });
        peopleDescription.forEach(el => {
            el.classList.add("description-hide");
        });
        peopleDescription[index].classList.remove("description-hide");
        peopleImgCover[index].classList.add("people-cover-hover");
    });
});