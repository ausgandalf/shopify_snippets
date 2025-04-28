import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
import { cacheDom } from '../utils/QuerySelectors';

const selectors = {
  container: '.four-up-container'
}

const qsAll = {
  section: 'data-four-up'
};

const dom = {}

cacheDom(dom, {}, qsAll);

const swiperCategories = (container) => {
  if (!container) return;
  const swiper = new Swiper(container, {
    modules: [Navigation, Scrollbar],
    slidesPerView: 1.2,
    breakpoints: {
      768: {
        slidesPerView: 2.5,
      },
      1024: {
        slidesPerView: 6,
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


const FourUp = {
  init() {
    cacheDom();
    bindEvents();
  }
}

export default FourUp
