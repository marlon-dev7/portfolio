// new kursor({
//   type: 1,
//   removeDefaultCursor: true,
//   color: '#000000'
// });

// Menu responsive toggle
const containerIcons = document.getElementById("container__icons");
const menuIcon = document.getElementById("menu__icon");
const closeIcon = document.getElementById("close__icon");
const navList = document.getElementById("nav__list");

const mostrar_ocultar_nav = () => {
  const menuIsOpen = navList.classList.toggle("nav__list--show");
  menuIcon.classList.toggle("icon--hide");
  closeIcon.classList.toggle("icon--show");

  if (menuIsOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
}

containerIcons.addEventListener("click", mostrar_ocultar_nav);

// Close menu when clicking a nav link (mobile) - optional simple auto-close
navList.addEventListener('click', function(e){
  const a = e.target.closest('a');
  if(!a) return;
  // close menu after clicking a link
  navList.classList.remove('nav__list--show');
  menuIcon.classList.remove('icon--hide');
  closeIcon.classList.remove('icon--show');
  document.body.classList.remove('no-scroll');
});

// Obtiene la URL actual
// const currentLocation = window.location.pathname.split("/").pop();
// const menuItems = document.querySelectorAll("nav a");

// menuItems.forEach(item => {
//   if (item.getAttribute("href") === currentLocation) {
//     item.classList.add("active");
//   }
// });

// document.addEventListener("DOMContentLoaded", function() {
//   let activeItemIndicator = CSSRulePlugin.getRule(".menu-item p#active::after");
//   const toggleButton = document.querySelector(".burger");
//   let isOpen = false;

//   gsap.set(".menu-item p", { y: 225 });

//   const timeline = gsap.timeline({ paused: true });

//   timeline.to(".overlay", {
//     duration: 1.5,
//     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//     ease: "power4.inOut"
//   });

//   timeline.to(".menu-item p", {
//     duration: 1.5,
//     y: 0,
//     stagger: 0.2,
//     ease: "power4.out"
//   }, "-=1");

//   timeline.to(activeItemIndicator, {
//     with: "100%",
//     duration: 1,
//     ease: "power4.out",
//     delay: 0.5
//   }, "<");

//   toggleButton.addEventListener("click", function() {
//     if (isOpen) {
//       timeline.reverse();
//     } else {
//       timeline.play();
//     }
//     isOpen = !isOpen;
//   })
// });

