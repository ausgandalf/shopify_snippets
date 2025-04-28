import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
import { cacheDom } from '../utils/QuerySelectors';

const selectors = {
  container: '.category-row-container'
}

const qsAll = {
  section: 'data-category-row'
};

const dom = {}

cacheDom(dom, {}, qsAll);

const swiperCategories = (container) => {
  if (!container) return;
  const scrollbarEl = container.querySelector('.swiper-scrollbar');
  const prevBtn = container.querySelector('.swiper-button-prev');
  const nextBtn = container.querySelector('.swiper-button-next');
  const swiper = new Swiper(container, {
    modules: [Navigation, Scrollbar],
    slidesPerView: 1.5,
    scrollbar: {
      enabled: true,
      el: scrollbarEl
    },
    breakpoints: {
      768: {
        slidesPerView: 2.5,
      },
      1024: {
        slidesPerView: 6,
        navigation: {
          nextEl: nextBtn,
          prevEl: prevBtn,
        },
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


const CategoryRow = {
  init() {
    cacheDom();
    bindEvents();
  }
}

export default CategoryRow
