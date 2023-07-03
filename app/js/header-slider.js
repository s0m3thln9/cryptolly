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

const touchstartHandler = (e) => {
    previousOffset = 0;
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
    if(isTouch) {
        delta = e.offsetX - previousOffset;
        console.log(`delta = ${delta}, previousOffset = ${previousOffset}`);
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
    if(isTouch) {e.preventDefault();
        delta = e.touches[0].clientX - previousOffset;
        console.log(`delta = ${delta}, previousOffset = ${previousOffset}`);
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


sliderCover.addEventListener("touchstart", touchstartHandler);
sliderCover.addEventListener("touchend", mouseupHandler);
sliderCover.addEventListener("touchmove", touchmoveHandler);
document.addEventListener("touchend", documentMouseupHandler);