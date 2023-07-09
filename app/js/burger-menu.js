const burgerMenu = document.querySelector('.burger__menu');
const blur = document.querySelector('.blur');
const body = document.querySelector('body');
const div = document.createElement('div');
let countOfOpen = 0;
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';
document.body.append(div);
const scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();
console.log(scrollWidth)

const burgerMenuToggler = () => {
    countOfOpen++;
    burgerMenu.classList.toggle('burger__menu-shown');
    blur.classList.toggle('blur-visible');
    body.classList.toggle('unscrollable');
    if (countOfOpen % 2 == 0) {
        body.style.paddingRight = `0px`;
    } else {
        body.style.paddingRight = `${scrollWidth}px`;
    }
}


window.addEventListener("resize", () => {
    if(window.innerWidth < 981) {
        return;
    }
    burgerMenu.classList.remove('burger__menu-shown');
    blur.classList.remove('blur-visible');
    body.classList.remove('unscrollable')
    body.style.paddingRight = `0px`;
})

blur.addEventListener("click", () => {
    burgerMenu.classList.remove('burger__menu-shown');
    blur.classList.remove('blur-visible');
    body.classList.remove('unscrollable');
    body.style.paddingRight = `0px`;
})