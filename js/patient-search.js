const navbarUserImage = document.querySelector('.navbar-user-image');
const navbarUserInitial = document.querySelector('.navbar-user-initial');
let userImage = null;
let userName = '';
let userImageSrc = '';

navbarUserInitial.classList.add('block');
navbarUserImage.classList.add('hidden');

if (userImage) {
  navbarUserImage.classList.remove('hidden');
  navbarUserImage.src = userImageSrc;
  navbarUserImage.alt = `${userName} Image`;
  navbarUserImage.classList.add('block');
  navbarUserInitial.classList.remove('block');
  navbarUserInitial.classList.add('hidden');
}

const navList = [
  { name: 'Dashboard', link: 'dashboard.html', icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM12 16H16V10H12V16ZM12 4H16V2H12V4ZM2 16H6V14H2V16Z" fill="#5D5F5F"/>
  </svg>` },
  { name: 'Patients', link: 'patients.html', icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM12 16H16V10H12V16ZM12 4H16V2H12V4ZM2 16H6V14H2V16Z" fill="#5D5F5F"/>
  </svg>` },
  { name: 'Queue', link: 'queue.html', icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM１２ １６H１６V１０Ｈ１２V１６ZM１２ ４H１６V２Ｈ１２V４ZM２ １６H６V１４Ｈ２V１６Z" fill="#5D5F5F"/>
  </svg>` },
  { name: 'Appointments', link: 'appointments.html', icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM12 16H16V10H12V16ZM12 4H16V2H12V4ZM2 16H6V14H2V16Z" fill="#5D5F5F"/>
  </svg>` },
  { name: 'Settings', link: 'settings.html', icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0ZM2 8H6V2H2V8ZM12 16H16V10H12V16ZM12 4H16V2H12V4ZM2 16H6V14H2V16Z" fill="#5D5F5F"/>
  </svg>` }
]