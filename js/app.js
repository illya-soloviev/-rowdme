const navItems = document.querySelectorAll('.nav__link');



/* Swiper Slider [https://swiperjs.com/] */
let mySwiper = new Swiper('.swiper-container', {
  speed: 700,
  spaceBetween: 100,
  touchRatio: 0,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  }
});



/* Fixed Header */
const header = document.querySelector('#header');

function fixedHeader() {
    let scrollPos = window.scrollY;

    if(scrollPos > 0) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
}

window.addEventListener('scroll', fixedHeader);
window.addEventListener('load', fixedHeader);



/* Smooth Scroll [https://github.com/cferdinandi/smooth-scroll] */
let scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true
});



/* ScrollSpy */
let scrollPos = window.pageYOffset;

function scrollSpy(scrollPos) {
    let windowH = document.documentElement.clientHeight;
    let sectionsSpy = document.querySelectorAll('[data-scrollspy]');

    sectionsSpy.forEach(item => {
        let sectionId = item.getAttribute('data-scrollspy');
        let sectionOffset = item.offsetTop;
        sectionOffset = sectionOffset - ( windowH * 0.33333 );

        if( scrollPos >= sectionOffset ) {
            navItems.forEach(item=> {
                item.classList.remove('active');
            });

            navItems.forEach(item=> {
                let valNavItemAttribute = item.getAttribute('href');
                if( valNavItemAttribute == sectionId ) {
                    item.classList.add('active');
                }
            });
        }
    });
}


scrollSpy(scrollPos);

window.addEventListener('scroll', function() {
    scrollPos = window.pageYOffset;
    scrollSpy(scrollPos);
});
window.addEventListener('resize', function() {
    scrollPos = window.pageYOffset;
    scrollSpy(scrollPos);
});



/* Tabs */
let tab = function() {
    let tabNav = document.querySelectorAll('.tabs-nav__item'),
        tabContent = document.querySelectorAll('.tabs__item'),
        tabName;

    tabNav.forEach(item => {
       item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
        tabNav.forEach(item => {
           item.classList.remove('active');
        });
        this.classList.add('active');
        tabName = this.getAttribute('data-name');
        selectTabContent(tabName);
    }

    function selectTabContent(tabName) {
        tabContent.forEach(item => {
            (item.classList.contains(tabName)) ? item.classList.add('active'):item.classList.remove('active');
        })
    }
}

tab();



/* Modals */
const   modals = document.querySelectorAll('.modal'),
        modalBtn = document.querySelectorAll('[data-modal]'),
        modalClose = document.querySelectorAll('.modal__close');

modalBtn.forEach(item => {
   item.addEventListener('click', function(event) {
       event.preventDefault();

       let modalName = this.getAttribute('data-modal');
       openModalWindow(modalName);
   });
});

modalClose.forEach(item => {
    item.addEventListener('click', closeModalWindow);
});

function openModalWindow(modalName) {
    if( !document.body.classList.contains('no-scroll') ) {
        document.body.classList.add('no-scroll');
    }

    modals.forEach(item => {
        item.style.display = 'none';
    });
    document.querySelector(modalName).style.display = 'flex';
}

function closeModalWindow() {
    document.body.classList.remove('no-scroll');
    this.closest('.modal').style.display = 'none';
}



/* Close modal window on click the body  */
window.addEventListener('click', function(event) {
   if(event.target.classList.contains('modal')) {
       if(!nav.classList.contains('active')) {
           document.body.classList.toggle('no-scroll');
       }
       event.target.style.display = "none";
   }
});



/* Mobile nav  */
const navToggle = document.querySelector('#nav-toggle'),
      nav = document.querySelector('#header__nav');

navToggle.addEventListener('click', function(event) {
    event.preventDefault();

    navToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});



/* Close mobile nav on click menu item */
let windowWidth = document.documentElement.clientWidth;

function closeNavMobile() {
    navToggle.classList.toggle('active');
    nav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

function isActivatedMobileView(windowWidth) {
    if( windowWidth <= 991 ) {
        navItems.forEach(item => {
            item.addEventListener('click', closeNavMobile);
        });
    } else {
        navItems.forEach(item => {
            item.removeEventListener('click', closeNavMobile);
        });
    }
}

isActivatedMobileView(windowWidth);

window.addEventListener('resize', function() {
    windowWidth = document.documentElement.clientWidth;
    isActivatedMobileView(windowWidth);
});



/* Display the backTop anchor */
window.addEventListener('scroll', displayBackTopAncor);
window.addEventListener('load', displayBackTopAncor);

function displayBackTopAncor() {
    let introH = document.querySelector('#home').offsetHeight,
        backTopAnchor = document.querySelector('#backTop'),
        scrollPos = window.scrollY;

    if(scrollPos > introH - 350) {
        backTopAnchor.classList.add('show');
    }
    else {
        backTopAnchor.classList.remove('show');
    }
}









