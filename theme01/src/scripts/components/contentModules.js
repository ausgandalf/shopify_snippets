// This file does/can contain Javascript for content modules and features inside of content modules (accordions, products rec functionality, etc.)

const selectors = {
  accordion: '[data-accordion-container]',
  accordionHeading: '[data-accordion-heading]',
  accordionIcon: '[data-accordion-icon]',
};

const dom = {};

const cacheDom = () => {
  dom.accordions = document.querySelectorAll(selectors.accordion);
};

const initAccordions = () => {
  dom.accordions.forEach((accordion) => {
    const accordionHeading = accordion.querySelector(selectors.accordionHeading);

    accordionHeading.addEventListener('click', () => {
      accordion.classList.toggle('active');

      if (accordion.classList.contains('active')) {
        accordionHeading.setAttribute('aria-expanded', true);
        accordion.querySelector(
          selectors.accordionIcon,
        ).innerHTML = `<svg fill="none" height="4" viewbox="0 0 16 4" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.5 0.00927734H9.5H6.4994H0.5V3.00988H6.4994H9.5H15.5V0.00927734Z" fill="currentColor"/>
      </svg>`;
      } else {
        accordionHeading.setAttribute('aria-expanded', false);
        accordion.querySelector(
          selectors.accordionIcon,
        ).innerHTML = `<svg fill="none" height="16" viewbox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.7009 6.50928H9.70093V0.509277H6.70033V6.50928H0.700928V9.50988H6.70033V15.5093H9.70093V9.50988H15.7009V6.50928Z" fill="currentColor"/>
      </svg>`;
      }
    });
  });
};

const contentModules = {
  init() {
    cacheDom();
    initAccordions();
  },
};

export default contentModules;
