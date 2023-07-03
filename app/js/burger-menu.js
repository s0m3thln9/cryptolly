let burgerMenu = document.querySelector('.burger__menu');
let blur = document.querySelector('.blur');

const burgerMenuToggler = () => {
    burgerMenu.classList.toggle('burger__menu-shown');
    blur.classList.toggle('blur-visible');
}


window.addEventListener("resize", () => {
    if(window.innerWidth < 981) {
        return;
    }
    blur.classList.remove('blur-visible');
})