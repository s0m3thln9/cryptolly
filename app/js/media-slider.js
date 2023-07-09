let mediaSlider = document.querySelector(".media__slider");
let mediaSliderItem = document.querySelector(".media__slider-item");
let companyCircles = document.querySelectorAll(".media__company-circle");
let styles = window.getComputedStyle(mediaSlider);
let mediaSliderLeft = 0;
let currentCompany = 0;
let previousCompany;



const mediaSliderToLeft = () => {
    if (mediaSliderLeft + mediaSliderItem.offsetWidth <= 0) {
        mediaSliderLeft += mediaSliderItem.offsetWidth;
        mediaSlider.style.left = `${mediaSliderLeft}px`;
        previousCompany = currentCompany;
        currentCompany--;
        companyCircles[currentCompany].style.color = "#CC2229";
        companyCircles[previousCompany].style.color = "#7D7D7D";
        companyCircles[currentCompany].querySelector(".media__company-inner-circle").style.width = "calc(100% - 4px)";
        companyCircles[currentCompany].querySelector(".media__company-inner-circle").style.height = "calc(100% - 4px)";
        companyCircles[previousCompany].style.color = "#7D7D7D";
        companyCircles[previousCompany].style.background = "#21232B";
        companyCircles[currentCompany].style.background = "#1A82FF";
        companyCircles[previousCompany].querySelector(".media__company-inner-circle").style.width = "102%";
        companyCircles[previousCompany].querySelector(".media__company-inner-circle").style.height = "102%";
    }
}
const mediaSliderToRight = () => {
    if (mediaSliderLeft - mediaSliderItem.offsetWidth >= -3 * mediaSliderItem.offsetWidth) {
        mediaSliderLeft -= mediaSliderItem.offsetWidth;
        mediaSlider.style.left = `${mediaSliderLeft}px`;
        previousCompany = currentCompany;
        currentCompany++;
        if(currentCompany == companyCircles.length) {
            currentCompany = 0;
        }
        companyCircles[currentCompany].style.color = "#CC2229";
        companyCircles[previousCompany].style.color = "#7D7D7D";
        companyCircles[currentCompany].querySelector(".media__company-inner-circle").style.width = "calc(100% - 4px)";
        companyCircles[currentCompany].querySelector(".media__company-inner-circle").style.height = "calc(100% - 4px)";
        companyCircles[previousCompany].style.color = "#7D7D7D";
        companyCircles[previousCompany].style.background = "#21232B";
        companyCircles[currentCompany].style.background = "#1A82FF";
        companyCircles[previousCompany].querySelector(".media__company-inner-circle").style.width = "102%";
        companyCircles[previousCompany].querySelector(".media__company-inner-circle").style.height = "102%";
    }
}
