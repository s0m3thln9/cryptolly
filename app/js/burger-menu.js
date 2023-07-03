let burgerMenu = document.querySelector('.burger__menu');
let blur = document.querySelector('.blur');

const burgerMenuToggler = () => {
    burgerMenu.classList.toggle('burger__menu-shown');
    blur.classList.toggle('blur-visible');
}


window.onresize(() => {
    console.log(window.innerWidth);
    //if(window.innerWidth > 980)
});