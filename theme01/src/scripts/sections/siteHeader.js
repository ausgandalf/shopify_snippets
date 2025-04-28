import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';

const selectors = {
  header: '[data-header]',
  navItem: '[data-nav-item]',
  navBackdrop: '[data-dropdown-backdrop]',
  navDropdown: '[data-nav-dropdown]',
  mobileNavTrigger: '[data-mobile-navigation]',
  mobileNavClose: '[data-close-mobile-nav]',
  mobileNavDrawer: '[data-mobile-nav]',
  mobileMenuOne: '[data-mobile-menu-one]',
  mobileDropdownHeader: '[data-dropdown-header]',
  mobileMenuReturn: '[data-menu-return]',
  promoBanner: '[data-promo-banner]',
  promoBannerMobile: '[data-promo-banner-mobile]',
  searchWrapper: '.header__search',
  searchBox: '.boost-pfs-search-box',
  mobileSearchBtn: '[data-mobile-header-search]',
  tabletSearchCloseBtn: '[data-tablet-search-close]',
};

const dom = {};

const cacheDom = () => {
  dom.header = document.querySelector(selectors.header);
  dom.dropdowns = dom.header.querySelectorAll(selectors.navDropdown);
  dom.backdrop = dom.header.querySelector(selectors.navBackdrop);
  dom.promoBanner = document.querySelector(selectors.promoBanner);
  dom.promoBannerMobile = document.querySelector(selectors.promoBannerMobile);
  dom.searchWrapper = document.querySelector(selectors.searchWrapper);
  dom.searchBox = document.querySelector(selectors.searchBox);
  dom.mobileSearchBtn = document.querySelector(selectors.mobileSearchBtn);
  dom.tabletSearchCloseBtn = document.querySelector(selectors.tabletSearchCloseBtn);
};

const openDropdown = (navItem) => {
  const navID = navItem.dataset.navItem;
  const dropdownSelector = '[data-nav-dropdown="' + navID + '"]';

  if (document.querySelector(dropdownSelector)) {
    navItem.classList.add('active');
    dom.header.querySelector(dropdownSelector).classList.add('active');
    dom.header.querySelector(selectors.navBackdrop).classList.add('active');
  }

  /* Hide Instant Search */
  hideInstantSearch();
};

const closeDropdowns = (navDropdowns) => {
  navDropdowns.forEach((navDropdown) => {
    navDropdown.classList.remove('active');
  });

  document.querySelectorAll(selectors.navItem).forEach((navItem) => {
    navItem.classList.remove('active');
  });

  dom.header.querySelector(selectors.navBackdrop).classList.remove('active');
};

const initScrollVisibility = () => {
  let lastScroll = 0;
  let threshold = dom.header.offsetHeight;
  const body = document.querySelector('body');

  if (window.pageYOffset == 0) {
    if (dom.promoBanner) {
      threshold = dom.promoBanner.offsetHeight + dom.header.offsetHeight;
    }

    if (dom.promoBannerMobile && window.matchMedia('(max-width: 1024px)')) {
      threshold = dom.promoBannerMobile.offsetHeight + dom.header.offsetHeight;
    }
  }

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= threshold) {
      body.classList.remove('show-header');
      body.classList.remove('is-scrolling');
      document.querySelector('#shopify-section-site-header').style.paddingTop = '0px';
      return;
    }

    if (currentScroll > threshold) {
      body.classList.add('is-scrolling');
      document.querySelector('#shopify-section-site-header').style.paddingTop = dom.header.offsetHeight + 'px';

      if (currentScroll > lastScroll && !body.classList.contains('hide-header')) {
        // Scroll Down
        body.classList.remove('show-header');
        body.classList.add('hide-header');
      } else if (currentScroll < lastScroll && body.classList.contains('hide-header')) {
        // Scroll Up
        body.classList.remove('hide-header');
        body.classList.add('show-header');
      }

      lastScroll = currentScroll;
    }
  });
};

const triggerMobileNavigation = () => {
  const body = document.querySelector('body');

  if (body.classList.contains('show-mobile-nav')) {
    body.classList.remove('show-mobile-nav');

    dom.header.querySelectorAll('[data-mobile-menu-two]').forEach((menuTwo) => {
      menuTwo.classList.remove('active');
    });
  } else {
    body.classList.add('show-mobile-nav');
  }
};

const handleNavigationEvents = () => {
  if (dom.header && dom.dropdowns.length) {
    // Desktop Navigation Levels
    const navItems = dom.header.querySelectorAll(selectors.navItem);
    const navDropdowns = dom.header.querySelectorAll(selectors.navDropdown);

    // Mobile Menu Levels
    const mobileMenuOne = dom.header.querySelectorAll(selectors.mobileMenuOne);
    const mobileMenuReturn = dom.header.querySelectorAll(selectors.mobileMenuReturn);
    const mobileDropdownHeader = dom.header.querySelectorAll(selectors.mobileDropdownHeader);

    navItems.forEach((navItem) => {
      const navWrapperData = '[data-nav-wrapper="' + navItem.dataset.navItem + '"]';
      const navWrapper = document.querySelector(navWrapperData);

      navItem.addEventListener('mouseenter', () => {
        openDropdown(navItem);
      });

      // Close dropdown when you leave the nav wrapper
      navWrapper.addEventListener('mouseleave', () => {
        closeDropdowns(navDropdowns);
      });
    });

    mobileMenuOne.forEach((menu) => {
      menu.addEventListener('click', () => {
        const mobileNavId = menu.dataset.mobileMenuOne;
        dom.header.querySelector('[data-mobile-menu-two="' + mobileNavId + '"]').classList.add('active');
      });
    });

    mobileMenuReturn.forEach((mobileReturn) => {
      mobileReturn.addEventListener('click', () => {
        mobileReturn.parentElement.classList.remove('active');
      });
    });

    mobileDropdownHeader.forEach((menu) => {
      menu.addEventListener('click', (event) => {
        event.preventDefault();
        const mobileNavId = menu.dataset.dropdownHeader;
        const panel = dom.header.querySelector('[data-dropdown-content="' + mobileNavId + '"]');

        menu.classList.toggle('active');
        panel.classList.toggle('active');

        // Animate the dropdown
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }
};

const handleHeaderEvents = () => {
  if (dom.header) {
    const mobileNavTrigger = dom.header.querySelector(selectors.mobileNavTrigger);
    const mobileNavClose = dom.header.querySelectorAll(selectors.mobileNavClose);

    initScrollVisibility();

    mobileNavTrigger.addEventListener('click', () => {
      triggerMobileNavigation();
    });

    mobileNavClose.forEach((navClose) => {
      navClose.addEventListener('click', () => {
        triggerMobileNavigation();
      });
    });
  }
};

const handlePromoBannerSlider = () => {
  if (dom.promoBanner) {
    const nextBtn = dom.promoBanner.querySelector('.swiper-button-next');
    const prevBtn = dom.promoBanner.querySelector('.swiper-button-prev');
    const autoplayDelay = dom.promoBanner.getAttribute('data-autoplay-delay');

    new Swiper(dom.promoBanner, {
      modules: [Navigation, Autoplay],
      slidesPerView: 1,
      slidesPerGroup: 1,
      loop: true,
      autoplay: {
        delay: Number(autoplayDelay) || false,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
    });
  }

  if (dom.promoBannerMobile) {
    const nextBtn = dom.promoBannerMobile.querySelector('.swiper-button-next');
    const prevBtn = dom.promoBannerMobile.querySelector('.swiper-button-prev');
    const autoplayDelay = dom.promoBannerMobile.getAttribute('data-autoplay-delay');

    new Swiper(dom.promoBannerMobile, {
      modules: [Navigation, Autoplay],
      slidesPerView: 1,
      slidesPerGroup: 1,
      loop: true,
      autoplay: {
        delay: Number(autoplayDelay) || false,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
    });
  }
};

const handleMobileSearchBtn = () => {
  if (dom.searchWrapper && dom.searchBox && dom.mobileSearchBtn && dom.tabletSearchCloseBtn) {
    dom.mobileSearchBtn.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        dom.searchBox.click();
      } else {
        dom.searchWrapper.classList.add('open');
      }
    });
    dom.tabletSearchCloseBtn.addEventListener('click', () => {
      dom.searchWrapper.classList.remove('open');
      hideInstantSearch();
    });
  }
};

const hideInstantSearch = () => {
  document.querySelectorAll('.boost-sd__search-widget-init-wrapper').forEach((wrapper) => {
    wrapper.classList.add('boost-sd__g-hide');
  });
};

const siteHeader = {
  init() {
    cacheDom();
    handleNavigationEvents();
    handleHeaderEvents();
    handlePromoBannerSlider();
    handleMobileSearchBtn();
  },
};

export default siteHeader;
