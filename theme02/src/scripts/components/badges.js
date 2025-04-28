const state = {
  white: ['bg-white', 'text-black', 'border','border-black'],
  ocean: ['bg-primary-3', 'text-white'],
  ice: ['bg-primary-1', 'text-black'],
  sunshine: ['bg-primary-4', 'text-black'],
  green: ['bg-primary-5', 'text-white', 'icon-carbon-neutral'],
  gray: ['bg-grey-3', 'text-grey-5'],
  error: ['bg-error', 'text-white']
};

const dom = {};
const qs = {
  badges: 'data-product-badges'
};

const cacheDom = () => {
  dom.badges = [...document.querySelectorAll(`[${qs.badges}]`)];
};

window.setupBadges = () => {
  cacheDom();
  dom.badges.forEach((badgeEl) => {
    const badges = badgeEl.getAttribute(qs.badges).toLowerCase();
    const badgeToDisplay = window.badges.find((badge) => badges.includes(badge.title.toLowerCase()));
    if (badgeToDisplay) {
      badgeEl.classList.add(...state[badgeToDisplay.color]);
      badgeEl.innerHTML = badgeToDisplay.title.toLowerCase();
      badgeEl.classList.remove('!hidden');
    } else {
      badgeEl.classList.add('!hidden');
    }
  });
};

export const setupProductBadges = () => {
  window.setupBadges();
};