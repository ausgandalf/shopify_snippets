const pro_discounted = 0.7;

const discountType = () => {
  let discountType = '';

  if (window.eHS.sideWideDiscount) {
    discountType = 'site-wide';
  }
  if (window.eHS.customerTags && window.eHS.customerTags.includes('ExpertVoice')) {
    discountType = 'pro-user';
  }
  return discountType;
};

const includeProDiscount = (tags) => {
  if (typeof tags == 'string') {
    tags = tags.split(',').map((tag) => tag.trim());
  }
  let include = true;
  if (tags && tags.includes('exclude-pro-discount')) {
    include = false;
  }
  return include;
};

const includeSiteDiscount = (tags) => {
  if (typeof tags == 'string') {
    tags = tags.split(',').map((tag) => tag.trim());
  }
  let include = true;
  if (tags && tags.includes('exclude-sitewide-discount')) {
    include = false;
  }
  return include;
};

const updateRebuyCheckoutButton = (cart) => {
  const checkoutButton = document.querySelector('.rebuy-cart__checkout-button--original');
  const checkoutButtonDisabled = document.querySelector('.rebuy-cart__checkout-button--disabled');
  const errorMessage = document.querySelector('.rebuy-cart__checkout-message');

  if (checkoutButton && checkoutButtonDisabled && cart?.cart && eHS.isB2bCustomer) {
    if (cart?.cart.total_price < eHS.cartThreshold) {
      checkoutButton.classList.add('!hidden');
      checkoutButtonDisabled.classList.remove('!hidden');
      errorMessage && errorMessage.classList.remove('!hidden');
    } else {
      checkoutButton.classList.remove('!hidden');
      checkoutButtonDisabled.classList.add('!hidden');
      errorMessage && errorMessage.classList.add('!hidden');
    }
  }
}

document.addEventListener('rebuy:smartcart.ready', (event) => {
  const smartcart = event.detail.smartcart;

  console.log('rebuy:smartcart.ready: smartcart', smartcart);

  updateRebuyCheckoutButton(smartcart);
});

const bindEvents = () => {

  document.addEventListener('rebuy:cart.change', function (event) { 
    updateRebuyCheckoutButton(event?.detail?.cart)

    if(event.detail.cart.itemCount() > 0) {
      document.querySelector('[data-header-cart]').style.display='block';
    }
    else {
      document.querySelector('[data-header-cart]').style.display='none';
    }
  });
  document.addEventListener('rebuy.ready', function (event) {
    let widget = event.detail.widget;
    let widgetEl = document.getElementById(`rebuy-widget-${widget.id}`);
    let products = widget.data.products;

    if (widgetEl) {
      products.forEach((product) => {
        let itemEl = widgetEl.querySelector(`.product-id-${product.id}`);

        if (itemEl) {
          let itemPriceEl = itemEl.querySelector('.rebuy-product-price');

          if (
            product.selected_variant.compare_at_price == null ||
            product.selected_variant.compare_at_price == product.selected_variant.price
          ) {
            if (discountType() == 'pro-user' && includeProDiscount(product.tags)) {
              itemPriceEl.innerHTML = `
                <div>
                  <span class="rebuy-money sale">
                    <span class="sr-only">Sale price</span>
                    <span>$${(product.selected_variant.price * pro_discounted).toFixed(2)}</span>
                  </span>
                  <span class="rebuy-money compare-at">
                    <span class="sr-only">Original price</span>
                    <span>$${product.selected_variant.price}</span>
                  </span>
                </div>
              `;
            } else if (discountType() == 'site-wide' && includeSiteDiscount(product.tags)) {
              itemPriceEl.innerHTML = `
                <div>
                  <span class="rebuy-money sale">
                    <span class="sr-only">Sale price</span>
                    <span>$${(product.selected_variant.price * ((100 - window.eHS.sideWideDiscount) / 100)).toFixed(2)}</span>
                  </span>
                  <span class="rebuy-money compare-at">
                    <span class="sr-only">Original price</span>
                    <span>$${product.selected_variant.price}</span>
                  </span>
                </div>
              `;
            }
          }
        }
      });
    }
  });
};

export const setupRebuyWidgetUpdate = () => {
  bindEvents();
};
