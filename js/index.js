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
