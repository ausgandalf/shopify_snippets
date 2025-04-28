import { cacheDom }  from '../utils/QuerySelectors.js';

const dom = {};
const qsAll = {
  menus: 'page-menu',
};

const setupMenuListener = (menu) => {
  menu.addEventListener('change', (event) => {
    window.location.href = menu.value;
  });
};

export const setupPageNavigation = () => {
  cacheDom(dom, {}, qsAll);

  setTimeout(() => {
    [...dom.menus].forEach((menu) => {
      const options = menu.querySelectorAll('option');
      options.forEach((option, index) => {
        if (option.hasAttribute('selected')) {
          menu.options.selectedIndex = index;
        }
      });
      setupMenuListener(menu);
    });
  }, 100);
};
