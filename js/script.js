// Toggle active
const navbarNav = document.querySelector('.navbar-nav');

// Ketika menu diklik
document.querySelector('#hamburger-menu').onclick = () => {
   navbarNav.classList.toggle('active');
};

// Click di luar sidebar
const hamburger = document.querySelector('#hamburger-menu');

document.addEventListener('click', function (e) {
   if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
      navbarNav.classList.remove('active');
   }
})