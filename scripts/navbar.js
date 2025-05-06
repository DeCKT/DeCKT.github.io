const navMenu = document.querySelector('#nav-menu');
const navMenuOpener = document.querySelector('#nav-menu-opener');
const navMenuCloser = document.querySelector('#nav-menu-closer')
const cartOpener = document.querySelector('#cart-opener');
const cartCloser = document.querySelector('#cart-closer')
const cartContainer = document.querySelector('#cart-container');
const header = document.querySelector('header');

function updateHeaderBackground() {
  if (window.scrollY > window.innerHeight) {
    header.classList.add('header-solid');
  } else {
    header.classList.remove('header-solid');
  }
}

// Run on scroll
window.addEventListener('scroll', updateHeaderBackground);

// Optional: run once on load in case user reloads scrolled
updateHeaderBackground();


function openMenu() {
  if (cartContainer.classList.contains('cart-open')) {
    closeCart()
  }
  navMenu.classList.add('menu-open')
}

function closeMenu() {
  navMenu.classList.remove('menu-open')
}

function openCart() {
  if (navMenu.classList.contains('menu-open')) {
    closeMenu()
  }
  cartContainer.classList.add('cart-open')
  
}

function closeCart() {
  cartContainer.classList.remove('cart-open')
}

navMenuOpener.addEventListener('click', openMenu)
navMenuCloser.addEventListener('click', closeMenu)

cartOpener.addEventListener('click', openCart)
cartCloser.addEventListener('click', closeCart)