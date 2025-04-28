import SideCart from '../sections/side-cart.js';

const initQuickBuyEvent = () => {
  if (window.innerWidth >= 1024) {
    const productTileImages = document.querySelectorAll('[data-product-tile-image]')
    productTileImages && productTileImages.forEach((productTileImage) => {
      productTileImage.addEventListener('mouseleave', (event) => {
        const productItemWrapper = event.target.closest('[data-product-tile]');

        if (productItemWrapper) {
          const quickBtn = productItemWrapper.querySelector('[data-quick-buy-btn]');
          const variantOptionsWrapper = productItemWrapper.querySelector('[data-variant-options]');

          quickBtn.classList.remove('active');
          variantOptionsWrapper.classList.remove('active');
          variantOptionsWrapper.innerHTML = "";
        }
      });
    });
  }
  document.addEventListener('click', (event) => {
    const quickBtn = event.target.closest('[data-quick-add-btn]');

    if (quickBtn) {
      event.preventDefault();
      quickBtn.dataset.clickTriggered = 'true';
      const itemWrapper = quickBtn.closest('[data-product-tile]');
      const merchItem = quickBtn.closest('[data-merch-item]');
      const variantOptionsWrapper = itemWrapper.querySelector('[data-variant-options]');
      const options = itemWrapper && JSON.parse(itemWrapper.dataset.options);
      const variants = itemWrapper && JSON.parse(itemWrapper.dataset.variants);
      const defaultVariant = variants.length > 0 && variants[0];
      let html = '';
      const quickBtns = document.querySelectorAll('[data-quick-buy-btn]');

      quickBtns && quickBtns.forEach((qb) => {
        qb.classList.remove('active');
        const btnWrapper = qb.closest('[data-product-tile]');
        const vWrapper = btnWrapper.querySelector('[data-variant-options]');
        vWrapper.classList.remove('active');
        vWrapper.innerHTML = '';
        qb.dataset.clickTriggered = 'false';
      });
      quickBtn.classList.add("active");

      if (options && variants && variants.length > 1) {
        let preservedIndex = false;
        options.forEach((option, index) => {
          if (option.name != 'Color' && option.values && !preservedIndex) {
            preservedIndex = index;
            html = `<div data-option-list data-option-index="${index}" data-option-size="${option.values.length}">`;

            option.values.forEach((value) => {
              if (preservedIndex == options.length - 1) {
                let selectedVariant;
                variants.forEach((variant) => {
                  const selectedOptions = variant.options;
                  if (selectedOptions[preservedIndex] == value) {
                    selectedVariant = variant;
                  }
                });

                if (selectedVariant && selectedVariant.available) {
                  html += `<div data-quick-add data-variant-id="${selectedVariant.id}" data-selling-plan="${quickBtn.dataset.sellingPlan ? quickBtn.dataset.sellingPlan : ''}"><span class="variant-title">${value}</span>${merchItem ? `` : `<span class="variant-price">${formatMoney(selectedVariant.price)}</span>`}</div>`;
                } else {
                  html += `<div data-quick-add class="disabled"><span class="variant-title">${value}</span>${merchItem ? `` : `<span class="variant-price">${formatMoney(selectedVariant.price)}</span>`}</div>`;
                }
              } else {
                html += `<div data-option-value="${value}" ${merchItem ? `data-merch-item` : ``}><span class="variant-title">${value}</span><span class="variant-price">${formatMoney(selectedVariant.price)}</span></div>`;
              }
            });

            html += `</div>`;
          }
        });
      } else {
        html += `<div data-option-list data-option-size="1"><div data-quick-add data-variant-id="${defaultVariant.id}"><span class="variant-title">${defaultVariant.title}</span></div></div>`;
      }

      variantOptionsWrapper.innerHTML = html;
      variantOptionsWrapper.classList.add("active");
    }

    const optionBtn = event.target.closest('[data-option-value]');

    if (optionBtn) {
      event.preventDefault();
      const itemWrapper = optionBtn.closest('[data-product-tile]');
      const optionsWrapper = optionBtn.closest('[data-option-list]');
      const merchItem = optionBtn.closest('[data-merch-item]');
      const quickBtn = itemWrapper && itemWrapper.querySelector('[data-quick-buy-btn]');
      const variantOptionsWrapper = itemWrapper && itemWrapper.querySelector('[data-variant-options]');
      const options = itemWrapper && JSON.parse(itemWrapper.dataset.options);
      const variants = itemWrapper && JSON.parse(itemWrapper.dataset.variants);
      const prevOptionIndex = parseInt(optionsWrapper.dataset.optionIndex);
      const prevOptionValue = optionBtn.dataset.optionValue;
      let html = '';

      if (options && variants) {
        html = `<div data-option-list data-option-size="${options[prevOptionIndex + 1].values.length}">`;
        options[prevOptionIndex + 1].values.forEach((value, index) => {
          let selectedVariant;
          variants.forEach((variant) => {
            const selectedOptions = variant.options;
            if (selectedOptions[prevOptionIndex] == prevOptionValue && selectedOptions[prevOptionIndex + 1] == value) {
              selectedVariant = variant;
            }
          });

          if (selectedVariant.available) {
            html += `<div data-quick-add data-variant-id="${selectedVariant.id}" data-selling-plan="${quickBtn.dataset.sellingPlan}"><span class="variant-title">${value}</span>${merchItem ? `` : `<span class="variant-price">${formatMoney(selectedVariant.price)}</span>`}</div>`;
          } else {
            html += `<div data-quick-add class="disabled"><span class="variant-title">${value}</span>${merchItem ? `` : `<span class="variant-price">${formatMoney(selectedVariant.price)}</span>`}</div>`;
          }
        });
        html += `</div>`;
      }

      variantOptionsWrapper.innerHTML = html;
    }

    const variantIdBtn = event.target.closest('[data-quick-add]');

    if (variantIdBtn) {
      event.preventDefault();
      const itemWrapper = variantIdBtn.closest('[data-product-tile]');
      const quickBtn = itemWrapper && itemWrapper.querySelector('[data-quick-buy-btn]');
      const variantOptionsWrapper = itemWrapper && itemWrapper.querySelector('[data-variant-options]');
      const variantId = variantIdBtn.dataset.variantId;
      let sellingPlan = variantIdBtn.dataset.sellingPlan;

      if (!sellingPlan) {
        sellingPlan = null;
      }
      if (variantId) {
        quickBtn && quickBtn.classList.remove("active");
        variantOptionsWrapper.innerHTML = '';
        variantOptionsWrapper.classList.remove("active");
        addToCart(variantId, sellingPlan);
      }
    }
  });
};

const addToCart = (variantId, sellingPlan = false, quantity = 1) => {
  const item = {
    id: variantId,
    quantity: quantity,
  };

  if (sellingPlan) {
    item.selling_plan = sellingPlan;
  }

  let formData = {
    items: [
      item
    ],
    sections: 'side-cart,header',
    sections_url: window.location.pathname,
  };

  fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((response) => {
      if (response.status) return;
      SideCart.handleCartContent(response, true);
    })
    .catch((e) => {
      console.error(e);
    });
}

const formatMoney = (price) => {
  return `$${(price / 100).toFixed(2)}`;
}

export const initQuickBuy = () => {
  initQuickBuyEvent();
};