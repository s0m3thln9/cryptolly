let slider = document.querySelector(".slider");
let sliderCover = document.querySelector(".slider__cover");

let gap = 24;
const sliderLength = (slider.offsetWidth + gap) / 2;
slider.style.left = -sliderLength + gap + "px";
let left = parseInt(slider.style.left);
let isTouch = false;
const offset = 20;
let velocity = 0;
const velocityMultiplier = 0.9;
const velocityMode = 3;
let delta = 0;
let previousOffset = 0;
let velocityInterval;
let autoscrollInterval;


const mousedownHandler = (e) => {
    isTouch = true;
    clearInterval(velocityInterval);
}

const mouseupHandler = (e) => {
    isTouch = false;
    if (delta != 0) {
        velocity = delta * velocityMode;
        while(Math.abs(velocity) > 1000) {
            velocity /= 10;
        }
        velocityInterval = setInterval(velocityFunction, 20);
    }
    delta = 0;
}

const documentMouseupHandler = (e) => {
    isTouch = false;
    delta = 0;
}

const mousemoveHandler = (e) => {
    if(isTouch === true) {
        delta = e.offsetX - previousOffset;
        let left = parseInt(slider.style.left) + delta;
        if (left < -offset && left > -sliderLength - offset) {
            slider.style.left = `${left}px`;
        } else if (left >= -offset) {
            left -= sliderLength;
            slider.style.left = `${left}px`;
        } else if (left <= -sliderLength -offset) {
            left += sliderLength;
            slider.style.left = `${left}px`;
        }
    }
    previousOffset = e.offsetX;
}

const touchmoveHandler = (e) => {
    e.preventDefault();
    delta = e.touches[0].clientX - previousOffset;
    let left = parseInt(slider.style.left) + delta;
    if (left < -offset && left > -sliderLength - offset) {
        slider.style.left = `${left}px`;
    } else if (left >= -offset) {
        left -= sliderLength;
        slider.style.left = `${left}px`;
    } else if (left <= -sliderLength -offset) {
        left += sliderLength;
        slider.style.left = `${left}px`;
    }
    previousOffset = e.touches[0].clientX;
}

const autoScroll = () => {
    if (isTouch === false) {
        let left = parseInt(slider.style.left) - 1;
        slider.style.left = `${left}px`;
        if (left < -offset && left > -sliderLength - offset) {
            slider.style.left = `${left}px`;
        } else if (left >= -offset) {
            left -= sliderLength;
            slider.style.left = `${left}px`;
        } else if (left <= -sliderLength -offset) {
            left += sliderLength;
            slider.style.left = `${left}px`;
        }
    }
};
autoscrollInterval = setInterval(autoScroll, 20)

const velocityFunction = () => {
    velocity *= velocityMultiplier;
    left = parseInt(slider.style.left) + velocity;
    slider.style.left = `${left}px`;

    if (left >= -offset) {
        left -= sliderLength;
        slider.style.left = `${left}px`;
    } else if (left <= -sliderLength -offset) {
        left += sliderLength;
        slider.style.left = `${left}px`;
    }
        
    if (Math.abs(velocity) < 2) {
        clearInterval(velocityInterval);
        return 0;
    }
};

sliderCover.addEventListener("mousedown", mousedownHandler);
sliderCover.addEventListener("mouseup", mouseupHandler);
sliderCover.addEventListener("mousemove", mousemoveHandler);
document.addEventListener("mouseup", documentMouseupHandler);


sliderCover.addEventListener("touchstart", mousedownHandler);
sliderCover.addEventListener("touchend", mouseupHandler);
sliderCover.addEventListener("touchmove", touchmoveHandler);
document.addEventListener("touchend", documentMouseupHandler);







let rate = 0.0000345245;
let buyButton = document.querySelector("#buy");
let sellButton = document.querySelector("#sell");
let currentState = true; // true = buy, false = sell
let row1 = document.querySelector("#row1");
let row2 = document.querySelector("#row2");
let input1 = row1.querySelector("input");
let input2 = row2.querySelector("input");
let converterButton = document.querySelector(".converter__button");


const buyButtonClickHandler = () => {
    if (!currentState) {
        currentState = true;
        rate = 0.0000345245;
        input1.value = 4;
        input2.value = input1.value * rate;
        sellButton.classList.toggle("active");
        buyButton.classList.toggle("active");
        row1.querySelector("#wallet__logo").src = "img/USD.svg";
        row1.querySelector("span").innerHTML = "USD";
        row2.querySelector("#wallet__logo").src = "img/Bitcoin.svg";
        row2.querySelector("span").innerHTML = "BTC";
        converterButton.innerHTML = "Buy Now";
    }
}

const sellButtonClickHandler = () => {
    if (currentState) {
        currentState = false;
        rate = 28964.9;
        input1.value = 1;
        input2.value = input1.value * rate;
        sellButton.classList.toggle("active");
        buyButton.classList.toggle("active");
        row1.querySelector("#wallet__logo").src = "img/Bitcoin.svg";
        row1.querySelector("span").innerHTML = "BTC";
        row2.querySelector("#wallet__logo").src = "img/USD.svg";
        row2.querySelector("span").innerHTML = "USD";
        converterButton.innerHTML = "Sell Now";
    }
}

const valueInputHandler = () => {
    input2.value = input1.value * rate;
}


buyButton.addEventListener("click", buyButtonClickHandler);
sellButton.addEventListener("click", sellButtonClickHandler);
input1.addEventListener("input", valueInputHandler)








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
        companyCircles[previousCompany].querySelector(".media__company-inner-circle").style.width = "102%";
        companyCircles[previousCompany].querySelector(".media__company-inner-circle").style.height = "102%";
    }
}
