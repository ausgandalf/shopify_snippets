import { cacheDom }  from '../utils/QuerySelectors.js';

const dom = {};
const qs = {
  subscriptionHero: '.subscription-hero',
};

const insertBackToAccountLink = (header) => {
  const headerTitle = header.querySelector('h1');
  const html = `
    <div class="max-w-[75rem] mx-auto mb-6 lg:mb-8">
      <a href="/account" class="no-underline hover:no-underline inline-flex items-center text-black">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.5 0.625H6.5L0 7.875L6.5 15.375H11.5V0.625Z" fill="#FE5000"/>
          <path d="M19.25 0.625H14.25V15.375H19.25V0.625Z" fill="#FE5000"/>
        </svg>
        <span class="text-caps-small lg:text-caps-regular uppercase font-bold ml-4">Back to Account Overview</span>
      </a>
    </div>`;
  headerTitle.insertAdjacentHTML('beforebegin', html);
}

export const setupBackToAccountLink = () => {
  cacheDom(dom, qs, {}, false);
  if (dom.subscriptionHero) {
    insertBackToAccountLink(dom.subscriptionHero)
  }
}
