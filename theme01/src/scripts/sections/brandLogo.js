import { cacheDom } from '../utils/QuerySelectors';

const selectors = {
  moreBtn: '[data-more-btn]',
  brandLogoItem: '[data-brand-value-logo-item]'
}

const qsAll = {
  brandLogo: 'data-brand-value-logo'
};

const dom = {}

cacheDom(dom, {}, qsAll);

const bindEvents = () => {
  if (dom.brandLogo) {
    dom.brandLogo.forEach(section => {
      const moreBtn = section.querySelector(selectors.moreBtn);
      const items = section.querySelectorAll(selectors.brandLogoItem);

      if (moreBtn) {
        moreBtn.addEventListener('click', (e) => {
          moreBtn.classList.toggle('collapsed');
          if (moreBtn.classList.contains('collapsed')) {
            items.forEach((item, idx) => idx < 8 ? item.classList.remove('hidden') : item.classList.add('hidden'));
          } else {
            items.forEach(item => item.classList.remove('hidden'));
          }
        });
      }
    });
  }
}


const BrandLogo = {
  init() {
    cacheDom();
    bindEvents();
  }
}

export default BrandLogo