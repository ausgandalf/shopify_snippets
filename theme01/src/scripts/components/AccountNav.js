import { cacheDom }  from '../utils/QuerySelectors.js';

const dom = {};
const qs = {
  accountNav: 'data-account-mobile-nav',
};

const setupAccountNavMobileListener = (nav) => {
  nav.addEventListener('change', (event) => {
    let redirectUrl = nav.value

    window.location.href = redirectUrl
  })
}

export const setupAccountNavMobile = () => {
  cacheDom(dom, qs, {})
  if (dom.accountNav) {
    setupAccountNavMobileListener(dom.accountNav)
  }
}
