const burgerMenu = document.querySelector('.burger__menu');
const blur = document.querySelector('.blur');
const body = document.querySelector('body');
const hero = document.querySelector('.hero');
const div = document.createElement('div');
div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';
document.body.append(div);
const scrollWidth = div.offsetWidth - div.clientWidth;
div.remove();

const burgerMenuToggler = () => {
    burgerMenu.classList.toggle('burger__menu-shown');
    blur.classList.toggle('blur-visible');
    body.classList.toggle('unscrollable');
    hero.classList.toggle('unscrollable');
    if (body.classList.contains('unscrollable')) {
        body.style.paddingRight = `${scrollWidth}px`;
    } else {
        body.style.paddingRight = `0px`;
    }
}


window.addEventListener("resize", () => {
    if(window.innerWidth < 981) {
        return;
    }
    burgerMenu.classList.remove('burger__menu-shown');
    blur.classList.remove('blur-visible');
    body.classList.remove('unscrollable');
    hero.classList.add('unscrollable');
    body.style.paddingRight = `0px`;
})

blur.addEventListener("click", () => {
    burgerMenu.classList.remove('burger__menu-shown');
    blur.classList.remove('blur-visible');
    body.classList.remove('unscrollable');
    hero.classList.add('unscrollable');
    body.style.paddingRight = `0px`;
})