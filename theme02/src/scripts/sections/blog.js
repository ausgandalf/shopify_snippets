import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

const selectors = {
  blogNavContainer: '[data-blog-nav-container]',
  blogNav: '[data-blog-nav]',
  blogNavItem: '[data-blog-nav-item]',
  blogNavControls: '[data-blog-nav-controls]',
}

const dom = {}

const cacheDom = () => {
  dom.blogNav = document.querySelector(selectors.blogNav);
}

const initBlogNav = () => {
  if (dom.blogNav && dom.blogNav.childNodes.length > 1) {
    const container = dom.blogNav.closest(selectors.blogNavContainer);
    const controls = container.querySelector(selectors.blogNavControls);
    const startIndex = dom.blogNav.dataset.startIndex;

    const blogNavSlider = tns({
      container: dom.blogNav,
      mode: 'carousel',
      loop: false,
      autoWidth: true,
      items: 'auto',
      slideBy: 1,
      mouseDrag: true,
      controls: true,
      controlsContainer: controls,
      nav: false,
      gutter: 32,
      startIndex: startIndex,
      responsive: {
        1024: {
          gutter: 48,
        },
      },
    });
  }
}

const Blog = {
  init() {
    cacheDom();
    initBlogNav();
  }
}

export default Blog
