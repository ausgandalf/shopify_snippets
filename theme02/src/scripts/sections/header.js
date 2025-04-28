import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

const selectors = {
  header: '.header-wrapper',
  headerNavToggler: '[data-header-nav-toggler]',
  headerNav: '[data-header-nav]',
  menuAccordion: '[data-menu-accordion]',
  menuAccordionHeading: '[data-menu-accordion-heading]',
  menuAccordionContent: '[data-menu-accordion-content]',
  menuAccordionIcon: '[data-menu-accordion-icon]',
  announcementContainer: '[data-announcement-slider-container]',
  announcementSlider: '[data-announcement-slider]',
  announcementControls: '[data-announcement-slider-controls]',
}

const dom = {}

const cacheDom = () => {
  dom.header = document.querySelector(selectors.header);
  dom.headerNavToggler = document.querySelector(selectors.headerNavToggler);
  dom.headerNav = document.querySelector(selectors.headerNav);
  dom.menuAccordionHeadings = document.querySelectorAll(selectors.menuAccordionHeading);
  dom.announcementSlider = document.querySelector(selectors.announcementSlider);
  dom.announcmentContainer = document.querySelector(selectors.announcementContainer);
}

const stickyBehavior = () => {
  if (dom.header) {
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
      { threshold: [1] }
    );

    observer.observe(dom.header);

    let oldScrollY = window.scrollY;
    window.addEventListener('scroll', (evt) => {
      if(oldScrollY < window.scrollY){
        dom.header.classList.remove('active');
      } else {
        dom.header.classList.add('active');
      }

      oldScrollY = window.scrollY;
    });
  }
}

const bindEvents = () => {

  if (dom.headerNavToggler) {
    dom.headerNavToggler.addEventListener('click', (evt) => {
      resetNavHeight();

      dom.headerNav.classList.toggle('active');
      if (dom.headerNav.classList.contains('active')) {
        dom.headerNavToggler.classList.add('active');
        document.body.classList.add('header-nav-opened');
      } else {
        dom.headerNavToggler.classList.remove('active');
        document.body.classList.remove('header-nav-opened');
      }
    })
  }

  if (dom.menuAccordionHeadings) {
    dom.menuAccordionHeadings.forEach((heading) => {
      heading.addEventListener('click', (evt) => {
        const menuAccordion = heading.closest(selectors.menuAccordion);
        menuAccordion.classList.toggle('active');
      });
    });
  }
}

const resetNavHeight = () => {
  if (dom.headerNav) {
    let offset = dom.header.offsetHeight;
    offset += dom.header.getBoundingClientRect().top;
    dom.headerNav.style.top = offset + 'px';
  }
}

const addAnimation = () => {
  const animationItems = document.querySelectorAll('.content-link')

  animationItems.forEach(animationItem => {
    animationItem.addEventListener('mouseover', e => {
      animationItem.classList.add('link-animated')
    })

    window.addEventListener("resize", e => {
      animationItem.classList.remove('link-animated');
    })
  })

  const darkAnimationItems = document.querySelectorAll('.content-link-dark')

  darkAnimationItems.forEach(animationItem => {
    animationItem.addEventListener('mouseover', e => {
      animationItem.classList.add('dark-link-animated')
    })

    window.addEventListener("resize", e => {
      animationItem.classList.remove('dark-link-animated');
    })
  })
}

const initAnnouncementSlider = () => {
  if (dom.announcementSlider && dom.announcementSlider.childNodes.length > 1) {
    const autoplay = dom.announcementSlider.dataset.autoplay;
    const autoplaySpeed = dom.announcementSlider.dataset.autoplaySpeed;
    const container = dom.announcementSlider.closest(selectors.announcementContainer);
    const controls = container.querySelector(selectors.announcementControls);
    const controlBtns = controls.querySelectorAll('button');

    const announcementSlider = tns({
      container: dom.announcementSlider,
      mode: 'carousel',
      items: 1,
      slideBy: 1,
      autoplay: autoplay == "true" ? true: false,
      autoplayTimeout: autoplaySpeed * 1000,
      controls: true,
      controlsContainer: controls,
      autoHeight: false,
      nav: false,
      autoplayButtonOutput: false,
      autoplayHoverPause: true,
      mouseDrag: true,
      onInit: (e) => {
        dom.announcementSlider.classList.add('loaded')
      },
    });

    controlBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        announcementSlider.pause();
      })
    });
  }
}

const Header = {
  init() {
    cacheDom()
    stickyBehavior()
    addAnimation()
    bindEvents()
    initAnnouncementSlider()
  }
}

export default Header
