import { addToCart, getCart } from '../utils/Cart';
import { cacheDom } from '../utils/QuerySelectors';

const qsAll = {
  atcBtn: 'data-atc',
};

const dom = {};

cacheDom(dom, {}, qsAll);

const bindEvents = () => {
  if (dom.atcBtn.length) {
    dom.atcBtn.forEach((btn) => {
      const productFree = btn.hasAttribute('data-product-free');

      btn.addEventListener('click', (e) => {
        const variantId = btn.dataset.variantId;

        if (variantId) {
          let productProperties = {};

          getCart(false).then((cart) => {
            const itemExists = cart.items.find((item) => item.id == variantId && item.properties['_free_sampler'] == 'true');

            if (productFree && !itemExists) {
              productProperties['_free_sampler'] = 'true';
            }

            const productData = {
              id: variantId,
              quantity: 1,
              properties: productProperties,
            };

            addToCart(productData);
          });
        }
      });
    });
  }
};

const QuickATC = {
  init() {
    cacheDom();
    bindEvents();
  },
};

export default QuickATC;
