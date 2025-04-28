const selectors = {
  headerIcon: '[data-header-cart]',
  sideCart: 'side-cart',
  cartOverlay: '[data-cart-overlay]',
  cartClose: '[data-cart-close]'
};

const dom = {};

const cacheDom = () => {
  for (const key in selectors) {
    dom[key] = document.querySelector(selectors[key]);
  }
};

const getSectionInnerHTML = (html, selector) => {
  const target = new DOMParser().parseFromString(html, 'text/html').querySelector(selector)
  if (target)
    return target.innerHTML;
  else
    return ''
}

const SideCart = {
  init() {
    cacheDom();

    dom.sideCart.querySelector(selectors.cartOverlay).addEventListener('click', this.close.bind(this));

    if (document.querySelectorAll(selectors.headerIcon).length > 0 && window.location.pathname !== '/cart') {
      document.querySelectorAll(selectors.headerIcon).forEach((headerIcon) => {
        this.setHeaderCartIconAccessibility(headerIcon);
      });
    }

    // changed code to apply dynamically generated element click event.
    window.addEventListener('click', (evt) => {
      if (evt.target.hasAttribute('data-qty-plus') || evt.target.closest('[data-qty-plus]')) {
        this.handleLineItemQuantity('plus', evt);
        evt.target.closest('[data-qty-plus]').setAttribute("disabled", "")
        evt.target.closest('[data-qty-plus]').classList.add('pointer-events-none')
        const iconPlus = document.querySelectorAll('.icon-plus')
        iconPlus.forEach((plusIcon) => {
          plusIcon.classList.add('hidden')
        });
        const iconLoadingPlus = document.querySelectorAll('.icon-loading-plus')
        iconLoadingPlus.forEach((plusLoadingIcon) => {
          plusLoadingIcon.classList.remove('hidden')
        });
      } else if (evt.target.hasAttribute('data-qty-minus') || evt.target.closest('[data-qty-minus]')) {
        this.handleLineItemQuantity('minus', evt);
        evt.target.closest('[data-qty-minus]').setAttribute("disabled", "")
        evt.target.closest('[data-qty-minus]').classList.add('pointer-events-none')
        const iconMinus = document.querySelectorAll('.icon-minus')
        iconMinus.forEach((minusIcon) => {
          minusIcon.classList.add('hidden')
        });
        const iconLoadingMinus = document.querySelectorAll('.icon-loading-minus')
        iconLoadingMinus.forEach((minusLoadingIcon) => {
          minusLoadingIcon.classList.remove('hidden')
        });
      }

      if (evt.target.hasAttribute('data-cart-item-remove') || evt.target.closest('[data-cart-item-remove]')) {
        const target = evt.target.closest('[data-cart-item-remove]');
        const variantId = target.dataset.variantId;
        this.removeLineItem(variantId);
      }

      if (!!evt.target.closest(selectors.cartClose)) {
        this.close();
      }

      const upgradeToSubButton = evt.target.closest('[data-upgrade-to-subscription]');

      if (upgradeToSubButton) {
        const subPanel = upgradeToSubButton.closest('[data-sub-panel]');
        this.upgradeToSubscription(subPanel.dataset.line, subPanel.dataset.quantity, upgradeToSubButton.dataset.upgradeToSubscription);
      }
    });

    document.addEventListener('change', (evt) => {
      const changePlanSelector = evt.target.closest('[data-change-selling-plans]');

      if (changePlanSelector) {
        const subPanel = changePlanSelector.closest('[data-sub-panel]');
        this.upgradeToSubscription(subPanel.dataset.line, subPanel.dataset.quantity, changePlanSelector.value == 'onetime' ? null : changePlanSelector.value);
      }
    });

    document.addEventListener('rebuy:cart.change', (event) => {
      this.renderContents();
    });
  },

  setHeaderCartIconAccessibility(headerIcon) {
    headerIcon.setAttribute('role', 'button');

    headerIcon.addEventListener('click', (e) => {
      e.preventDefault();
      this.open();
    });
  },

  open() {
    dom.sideCart.classList.add('active');
    if (window.innerWidth < 768) {
      document.body.classList.add('overflow-hidden');
    }
  },

  close() {
    dom.sideCart.classList.remove('active');
    if (window.innerWidth < 768) {
      document.body.classList.remove('overflow-hidden');
    }
  },

  getSectionsToRender() {
    return [
      {
        id: 'main-cart',
        target: '[data-main-cart]',
        selector: '[data-main-cart]',
      },
      {
        id: 'side-cart',
        target: '[data-cart-items]',
        selector: '[data-cart-items]',
      },
      {
        id: 'side-cart',
        target: '[data-cart-header]',
        selector: '[data-cart-header]',
      },
      {
        id: 'side-cart',
        target: '[data-cart-footer]',
        selector: '[data-cart-footer]',
      },
      {
        id: 'header',
        target: '[data-cart-count]',
        selector: '[data-cart-count]'
      },
    ];
  },

  handleLineItemQuantity(type, event) {
    const qtySelector = event.target.closest('[data-qty-selector]');
    const qtyLabel = qtySelector.querySelector('[data-qty]');
    const { maxQty, variantId } = qtySelector.dataset;
    const quantity = parseInt(qtyLabel.textContent);
    let newQuantity = quantity;

    if (type == 'plus') {
      newQuantity += 1;
    } else {
      newQuantity -= 1;
    }

    if (newQuantity <= 0) {
      this.removeLineItem(variantId);
    } else if (quantity != newQuantity) {
      qtyLabel.textContent = newQuantity;
      this.updateLineItemQuantity({ id: variantId, quantity: newQuantity });
    }
  },

  async updateLineItemQuantity(itemData) {
    const data = {
      updates: {}
    }

    data.updates[itemData.id] = itemData.quantity
    data.sections = 'main-cart,side-cart,header'

    dom.sideCart.classList.add('updating');

    fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((blob) => blob.json())
      .then((response) => {
        this.handleCartContent(response.sections, false, true)
      });
  },

  removeLineItem(variantId) {
    const data = {
      updates: {}
    }

    data.updates[variantId] = 0
    data.sections = 'main-cart,side-cart,header'

    dom.sideCart.classList.add('updating');

    fetch('/cart/update.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((blob) => blob.json())
      .then((response) => {
        this.handleCartContent(response.sections, false, true)
      });
  },

  async upgradeToSubscription(line, quantity, selling_plan = null) {
    dom.sideCart.classList.add('updating');

    return fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        line: line,
        quantity: quantity,
        selling_plan: selling_plan,
      })
    })
      .then((blob) => blob.json())
      .then((response) => this.renderContents());
  },

  handleCartContent(sections, openDrawer = false, removeOrAdjustQty = false) {
    if (openDrawer) {
      this.open();
    }

    this.getSectionsToRender().forEach((section => {
      const elementToReplace = document.querySelector(section.target)
      if (elementToReplace) {
        elementToReplace.innerHTML = getSectionInnerHTML(sections[section.id], section.selector);
        elementToReplace.classList.remove('hidden');
        if (section.selector == '[data-cart-count]') {
          if (parseInt(elementToReplace.innerHTML) > 0) {
            elementToReplace.parentElement.classList.remove('cart-empty');
          } else {
            elementToReplace.parentElement.classList.add('cart-empty');
          }
        }
      }
    }));

    dom.sideCart.classList.remove('updating');
  },

  renderContents() {
    dom.sideCart.classList.add('updating');

    fetch(window.location.pathname + "?sections=main-cart,side-cart,header")
      .then((blob) => blob.json())
      .then((sections) => {
        this.handleCartContent(sections, false, true)
      });
  }
};

export default SideCart;
