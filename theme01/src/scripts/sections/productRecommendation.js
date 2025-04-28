import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
import { cacheDom } from '../utils/QuerySelectors';
import { fetchJSONTemplate } from '../utils/Fetch';

const selectors = {
  container: '.swiper',
};

const qsAll = {
  section: 'data-product-recommendation',
  variantSelectors: 'data-variant-selector',
};

const dom = {};

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
    slidesPerView: 1.5,
    loop: true,
    scrollbar: {
      enabled: true,
      el: scrollbarEl,
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
          releaseOnEdges: true,
        },
      },
    },
  });
};

const onVariantChange = (event) => {
  const productContainer = event.target.closest('[data-product-container]');
  const productHandle = event.target.dataset.productHandle;
  const variantID = event.target.value;

  if (productHandle) {
    fetchJSONTemplate(productHandle).then((product) => {
      const selectedVariant = product.variants.find((variant) => variant.id == variantID);
      const price = selectedVariant.price;
      const comparedAtPrice = selectedVariant.comparePrice;

      if (comparedAtPrice && comparedAtPrice > price) {
        productContainer.querySelector('[data-product-price]').classList.add('hidden');
        productContainer.querySelector('[data-product-sale]').classList.remove('hidden');
      }

      productContainer.querySelector('.product-media__image').src = selectedVariant.images[0].variant_image;
      productContainer.querySelector('[data-variant-id]').setAttribute('data-variant-id', selectedVariant.id);
      productContainer.querySelector('[data-product-price] > span:last-child').innerHTML = `$${(price / 100.0).toFixed(2)}`;
      productContainer.querySelector('[data-product-sale-price] > span:last-child').innerHTML = `$${(price / 100.0).toFixed(2)}`;
      productContainer.querySelector('[data-product-compare-price] > span:last-child').innerHTML = `$${(comparedAtPrice / 100.0).toFixed(
        2,
      )}`;
    });
  }
};

const bindEvents = () => {
  if (dom.section.length) {
    dom.section.forEach((section) => {
      const container = section.querySelector(selectors.container);
      swiperCategories(container);
    });
  }

  if (dom.variantSelectors.length) {
    dom.variantSelectors.forEach((variantSelector) => {
      variantSelector.addEventListener('change', onVariantChange.bind(this));
    });
  }
};

const ProductRecommendation = {
  init() {
    cacheDom();
    bindEvents();
  },
};

export default ProductRecommendation;
