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
    burgerMenu.classList.remove('burger__menu-shown');
    blur.classList.remove('blur-visible');
})

blur.addEventListener("click", () => {
    burgerMenu.classList.remove('burger__menu-shown');
    blur.classList.remove('blur-visible');
})