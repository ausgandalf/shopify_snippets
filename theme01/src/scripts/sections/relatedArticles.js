import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
import { cacheDom } from '../utils/QuerySelectors';

const selectors = {
  container: '.swiper'
}

const qsAll = {
  section: 'data-related-articles'
};

const dom = {}

cacheDom(dom, {}, qsAll);

const swiperCategories = (container) => {
  if (!container) return;
  const scrollbarEl = container.querySelector('.swiper-scrollbar');
  const nextBtn = container.querySelector('.swiper-button-next');
  const prevBtn = container.querySelector('.swiper-button-prev');

  new Swiper(container, {
    modules: [Navigation, Scrollbar],
    slidesPerView: 1,
    spaceBetween: 30,
    scrollbar: {
      enabled: true,
      el: scrollbarEl
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 4,
        mousewheel: {
          enabled: true,
          sensitivity: 4,
          forceToAxis: true,
          releaseOnEdges: true
        }
      }
    }
  });
}

const bindEvents = () => {
  if (dom.section.length) {
    dom.section.forEach(section => {
      const container = section.querySelector(selectors.container);
      swiperCategories(container);
    });
  }
}

const RelatedArticles = {
  init() {
    cacheDom();
    bindEvents();
  }
}

export default RelatedArticles
