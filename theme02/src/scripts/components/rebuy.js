import SideCart from '../sections/side-cart.js';

const buildSubheading = (productHeadline) => {
  return `<p class="font-normal text-sm text-grey-4 mt-2">${productHeadline}</p>`
}

const attachEventListener = () => {
  document.addEventListener('rebuy.ready', function(event){

    let widget = event.detail.widget
    let widgetEl = document.getElementById(`rebuy-widget-${widget.id}`)
    let products = widget.data.products
    if (!products || !products.length) return
    products.forEach(product => {
      let itemEl = widgetEl.querySelector(`.product-id-${product.id}`)
      let itemTitleEl = itemEl.querySelector('.rebuy-product-title')

      let parsed = (JSON.parse(product.metafields.custom.subtitle))
      parsed.children.forEach((node) => {
        node.children.forEach((item) => {
          if ('metafields' in product) {
            itemTitleEl.insertAdjacentHTML('afterend', buildSubheading(item.value));
          }
				});
      });
    });
 
    document.querySelectorAll('.rebuy-subscribe-percent').forEach((rebuySubscribe) => {
          if (rebuySubscribe.innerHTML.includes("Save 0%")) {
            rebuySubscribe.classList.add("hidden")
          }
        });
    });


    document.addEventListener('rebuy.add', function(event){
      SideCart.renderContents();
    });
}

const setupRebuy = () => {
  attachEventListener();
};

export const setupRebuyScripts = () => {
  setupRebuy();
};