import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';
import Player from '@vimeo/player';
import SideCart from '../sections/side-cart.js';

const selectors = {
  groupId: '#product_buybox_group',
  group: '[data-buybox-group]',
  formContainer: '[data-buybox-form-container]',
  productJson: '[data-buybox-product-json]',
  settingsJson: '[data-buybox-settings-json]',
  form: '[data-buybox-form]',
  variantId: '[data-buybox-variant-id]',
  price: '[data-buybox-price]',
  subscriptionPrice: '[data-subscription-price]',

  tooltipParent: '[data-buybox-tooltip-parent]',
  tooltip: '[data-buybox-tooltip]',
  tooltipTitle: '[data-buybox-tooltip-title]',
  tooltipContent: '[data-buybox-tooltip-content]',
  tooltipOpen: '[data-buybox-tooltip-open]',
  tooltipClose: '[data-buybox-tooltip-close]',

  gallery: '[data-buybox-gallery]',
  galleryDesktop: '[data-buybox-gallery-slider]',
  galleryControls: '[data-gallery-controls]',
  galleryMain: '[data-buybox-gallery-main]',
  galleryThumbs: '[data-buybox-gallery-thumbs]',
  media: '[data-buybox-media]',

  quantityWrapper: '[data-buybox-quantity-wrapper]',
  quantityMinus: '[data-buybox-quantity-minus]',
  quantityPlus: '[data-buybox-quantity-plus]',
  quantity: '[data-buybox-quantity]',

  optionGroupList: '[data-buybox-option-group-list]',
  optionGroup: '[data-buybox-option-group]',
  option: '[data-buybox-option]',
  optionSelected: '[data-buybox-option-selected]',

  formSubmit: '[data-buybox-form-submit]',

  atcWrapper: '[data-buybox-atc-wrapper]',
  notify: '[data-buybox-notify]',

  subscriptionWrapper: '[data-subscription-wrapper]',
  sellingPlansWrapper: '[data-selling-plans-wrapper]',
  sellingPlans: '[data-selling-plans]',
  sellingPlanRadios: '[name="selling_plan_radio"]',

  badgeSaving: '[data-badge-saving]',
  secondaryText: '[data-secondary-text]',
  promoCodeMessage: '[data-promo-code-message]',
  playIcon: '[data-icon-play]',
  previewImage: '[data-preview-image]',
  optionText: '[data-option-text]',
  variantOptionText: 'option[data-variant-option-text]',

  swellWidget: '[data-custom-swell-widget]',
  primeWidget: '#prime-widget',
  variantShowPrime: 'option[data-show-prime]',
  alienProduct: '[data-buybox-alien-product]',
}

const dom = {}

const cacheDom = () => {
  dom.form = document.querySelector(selectors.form);
  dom.gallery = document.querySelector(selectors.gallery);
  dom.galleryMain = document.querySelector(selectors.galleryMain);
  dom.galleryThumbs = document.querySelector(selectors.galleryThumbs);
  dom.galleryDesktop = document.querySelector(selectors.galleryDesktop);
  dom.galleryControls = document.querySelector(selectors.galleryControls);
  dom.tooltipParents = document.querySelectorAll(selectors.tooltipParent);
  dom.sellingPlanRadios = document.querySelectorAll(selectors.sellingPlanRadios);
  dom.sellingPlansWrapper = document.querySelector(selectors.sellingPlansWrapper);
  dom.sellingPlans = document.querySelector(selectors.sellingPlans);
  dom.swellWidget = document.querySelector(selectors.swellWidget);
  dom.primeWidget = document.querySelector(selectors.primeWidget);

  dom.options = document.querySelectorAll(selectors.option);
  dom.quantityWrapper = document.querySelector(selectors.quantityWrapper);
  dom.formSubmit = document.querySelector(selectors.formSubmit);
}

const initGallerySlider = () => {
  if (dom.buyboxDesktopGallerySliderInst) {
    dom.buyboxDesktopGallerySliderInst.destroy();
  }

  if (dom.buyboxGallerySliderInst) {
    dom.buyboxGallerySliderInst.destroy();
  }

  if (dom.gallery) {
    const color = dom.gallery.dataset.selectedColor || false;

    dom.buyboxDesktopGallerySliderInst = tns({
      container: dom.galleryDesktop,
      mode: 'carousel',
      items: 1.9,
      slideBy: 1,
      gutter: 10,
      controls: true,
      mouseDrag: true,
      controlsContainer: dom.galleryControls
    });

    dom.buyboxMobileGallerySliderInst = tns({
      container: dom.galleryMain,
      mode: 'carousel',
      items: 1,
      slideBy: 1,
      controls: false,
      navContainer: dom.galleryThumbs,
      navAsThumbnails: true,
      mouseDrag: true
    });

    dom.buyboxMobileGallerySliderInst.events.on('transitionEnd', (info, evtName) => {
      dom.galleryThumbs.querySelector('.tns-nav-active').scrollIntoViewIfNeeded();
    });

    document.addEventListener('click', (event) => {
      const playIcon = event.target.closest(selectors.playIcon);

      if (playIcon) {
        const media = playIcon.closest(selectors.media);
        const previewImage = media && media.querySelector(selectors.previewImage);
        const videoElem = media && media.querySelector('video');
        const iframeElem = media && media.querySelector('iframe');

        playIcon.classList.add('clicked');

        if (iframeElem) {
          if (iframeElem.src.includes('player.vimeo.com')) {
            var player = new Player(iframeElem);

            player.play();
          }

          if (iframeElem.src.includes('www.youtube.com')) {
            iframeElem.src += "&autoplay=1";
          }
        }

        videoElem && videoElem.play();

        previewImage && previewImage.classList.add('hidden');
      }
    });
  }
}

const buyboxQuantity = () => {
  if (dom.quantityWrapper) {
    const quantity = dom.quantityWrapper.querySelector(selectors.quantity);
    const quantityMinus = dom.quantityWrapper.querySelector(selectors.quantityMinus);
    const quantityPlus = dom.quantityWrapper.querySelector(selectors.quantityPlus);

    quantityMinus.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (quantity.value <= 1) {
        return;
      }

      quantity.value = parseInt(quantity.value) - 1;
    });

    quantityPlus.addEventListener('click', (evt) => {
      evt.preventDefault();
      quantity.value = parseInt(quantity.value) + 1;
    });
  }
}

const formatMoney = (price) => {
  return `$${(price / 100).toFixed(2)}`;
}

const buyboxOptions = () => {
  if (dom.options) {
    dom.options.forEach((option) => {
      option.addEventListener('click', (evt) => {
        const value = option.dataset.value;
        const decodedValue = decodeURIComponent(value);
        const optionName = option.dataset.optionName;
        const form = option.closest(selectors.form);
        const variantId = form.querySelector(selectors.variantId);
        const optionGroupList = option.closest(selectors.optionGroupList);
        const optionGroups = optionGroupList.querySelectorAll(selectors.optionGroup);
        const optionGroup = option.closest(selectors.optionGroup);
        const optionSelected = optionGroup.querySelector(selectors.optionSelected);
        const siblingOptions = optionGroup.querySelectorAll(selectors.option);
        const productJson = JSON.parse(form.querySelector(selectors.productJson).innerHTML);
        const sellingPlanId = dom.sellingPlans && dom.sellingPlans.value;
        const subscriptionPrice = form.querySelector(selectors.subscriptionPrice);
        const rechargeSellingPlanGroups = productJson.selling_plan_groups && productJson.selling_plan_groups.find((spg) => spg.app_id == '294517');
        const sellingPlans = rechargeSellingPlanGroups && rechargeSellingPlanGroups.selling_plans;
        const currentSellingPlan = sellingPlans && sellingPlans.find((sp) => sp.id == sellingPlanId);

        if (optionGroup.dataset.groupName.includes('Color') || optionGroup.dataset.groupName.includes('color')) {
          optionGroups.forEach((optGroup) => {
            if (optionGroup.dataset.groupName != optGroup.dataset.groupName) {
              const groupOptions = optGroup.querySelectorAll(selectors.option);
              groupOptions && groupOptions.forEach((opt) => {
                const otherSelectedOptions = optionGroupList.querySelectorAll(selectors.optionSelected);
                let optionVariantTitle = [];
                optionVariantTitle.push(option.dataset.value);
                optionVariantTitle.push(opt.dataset.value);
                optionVariantTitle = optionVariantTitle.join(' / ');

                const optionVariant = productJson.variants.find((v) => v.title == optionVariantTitle)
                const variantOptionTextElem = variantId && variantId.querySelector(selectors.variantOptionText + `[value="${optionVariant.id}"]`);
                const variantOptionText = variantOptionTextElem.dataset.variantOptionText;
                const caseQuantity = variantOptionTextElem.dataset.caseQuantity;
                const optionText = opt.querySelector(selectors.optionText);

                if (variantOptionText && caseQuantity) {
                  optionText.innerHTML = formatMoney(Math.round(optionVariant.price / 12)) + ' / ' + variantOptionTextElem.dataset.variantOptionText;
                  optionText.classList.remove('hidden');
                } else {
                  optionText.innerHTML = '';
                  optionText.classList.add('hidden');
                }

              });
            }
          });
        }

        siblingOptions.forEach((sibling) => {
          sibling.classList.remove('selected');
        });

        option.classList.add('selected');
        optionSelected.dataset.value = value;
        optionSelected.innerHTML = decodedValue;

        /* Update variant price & path */
        const selectedOptions = optionGroupList.querySelectorAll(selectors.optionSelected);
        let selectedVariantTitle = [];
        selectedOptions.forEach((selectedOption) => {
          selectedVariantTitle.push(selectedOption.dataset.value);
        });
        selectedVariantTitle = selectedVariantTitle.join(' / ');
        productJson.variants.forEach((variant) => {
          if (variant.title == selectedVariantTitle) {
            variantId.value = variant.id;
            form.dataset.variantId = variant.id;
            const price = form.querySelector(selectors.price);

            if (price) {
              let priceContent = '';


              if (variant.compare_at_price > variant.price) {
                priceContent = `
                  <span class="line-through text-grey-4 text-reg">${formatMoney(variant.compare_at_price)}</span>
                  <span class="text-lg text-error" data-price-selector>${formatMoney(variant.price)}</span>
                `;
              } else {
                priceContent = `
                  <span class="text-lg">${formatMoney(variant.price)}</span>
                `;
              }

              price.innerHTML = priceContent;
              updateSwellWidget(variant.price);
            }

            if (variant.featured_media) {
              dom.buyboxDesktopGallerySliderInst && dom.buyboxDesktopGallerySliderInst.goTo(variant.featured_media.position - 1);
              dom.buyboxMobileGallerySliderInst && dom.buyboxMobileGallerySliderInst.goTo(variant.featured_media.position - 1);
            }

            if (sellingPlanId && subscriptionPrice && currentSellingPlan) {
              const currentPriceAdjustments = currentSellingPlan.price_adjustments[0];
              const discountType = currentPriceAdjustments && currentPriceAdjustments.value_type;
              const discountAmount = currentPriceAdjustments && currentPriceAdjustments.value;
              const currentVariantPrice = variant.price;
              let discountedPrice = variant.price;

              if (discountType == 'percentage') {
                discountedPrice = parseInt(discountedPrice * (100 - discountAmount) / 100);
              } else {
                discountedPrice = discountedPrice - discountAmount * 100;
              }

              let priceContent = `
                <span class="line-through text-grey-4 text-reg">${formatMoney(currentVariantPrice)}</span>
                <span class="text-lg text-error" data-price-selector>${formatMoney(discountedPrice)}</span>
              `;

              subscriptionPrice && (subscriptionPrice.innerHTML = priceContent);
            }
            /* Show/Hide Notify Button*/
            const atcWrapper = form.querySelector(selectors.atcWrapper);
            const notify = form.querySelector(selectors.notify);

            if (notify) {
              if (!variant.available) {
                notify.classList.remove('!hidden');
                notify.style.display = null;
                atcWrapper.classList.add('!hidden');
              } else {
                notify.classList.add('!hidden');
                notify.style.display = null;
                atcWrapper.classList.remove('!hidden');
              }
            }

            /* Update URL with variant id */
            updateVariantPath(variant.id);
          }
        })
        displayPrime();
      });
    });
  }
}

const updateVariantPath = (variantId) => {
  var searchParams = new URLSearchParams(window.location.search);
  searchParams.set("variant", variantId);
  const variantPath = window.location.href.split('?')[0] + '?' + searchParams.toString();
  window.history.replaceState({}, '', variantPath);
}

const buyboxTooltip = () => {
  if (dom.tooltipParents) {
    dom.tooltipParents.forEach((parent) => {
      const tooltipOpen = parent.querySelector(selectors.tooltipOpen);
      const tooltipClose = parent.querySelector(selectors.tooltipClose);

      tooltipOpen.addEventListener('click', (evt) => {
        const tooltip = parent.querySelector(selectors.tooltip);
        tooltip.classList.add('active');
      });

      tooltipClose.addEventListener('click', (evt) => {
        const tooltip = parent.querySelector(selectors.tooltip);
        tooltip.classList.remove('active');
      });
    });

    document.addEventListener('click', (evt) => {
      if (!evt.target.closest(selectors.tooltipParent)) {
        dom.tooltipParents.forEach((parent) => {
          const tooltip = parent.querySelector(selectors.tooltip);
          tooltip.classList.remove('active');
        });
      }
    })
  }
}

const buyboxSellingPlans = () => {
  if (dom.sellingPlanRadios && dom.sellingPlansWrapper && dom.sellingPlans) {
    dom.sellingPlanRadios.forEach((sellingPlanRadio) => {
      sellingPlanRadio.addEventListener('change', (event) => {
        const subscriptionWrapper = event.target.closest(selectors.subscriptionWrapper);

        if (event.target.value == 'subscription') {
          const subscriptionPrice = subscriptionWrapper.querySelector(selectors.subscriptionPrice);

          dom.sellingPlansWrapper.classList.remove('hidden');
          dom.sellingPlans.setAttribute("name", "selling_plan");

          updateSwellWidget(subscriptionPrice.dataset.subscriptionPrice);
        } else {
          const price = subscriptionWrapper.querySelector(selectors.price);

          dom.sellingPlansWrapper.classList.add('hidden');
          dom.sellingPlans.setAttribute("name", "");

          updateSwellWidget(price.dataset.buyboxPrice);
        }
        displayPrime();
      });
    });

    dom.sellingPlans.addEventListener('change', (event) => {
      const sellingPlanId = event.target.value;
      const form = event.target.closest(selectors.form);
      const variantIdElem = form.querySelector(selectors.variantId);
      const variantId = variantIdElem.value;
      const productJson = JSON.parse(form.querySelector(selectors.productJson).innerHTML);
      const settingsJson = JSON.parse(form.querySelector(selectors.settingsJson).innerHTML);
      const badgeSaving = form.querySelector(selectors.badgeSaving);
      const secondaryText = form.querySelector(selectors.secondaryText);
      const promoCodeMessage = form.querySelector(selectors.promoCodeMessage);
      const tooltipTitle = form.querySelector(selectors.tooltipTitle);
      const tooltipContent = form.querySelector(selectors.tooltipContent);
      const subscriptionPrice = form.querySelector(selectors.subscriptionPrice);
      const rechargeSellingPlanGroups = productJson.selling_plan_groups && productJson.selling_plan_groups.find((spg) => spg.app_id == '294517');
      const sellingPlans = rechargeSellingPlanGroups && rechargeSellingPlanGroups.selling_plans;
      const currentSellingPlan = sellingPlans && sellingPlans.find((sp) => sp.id == sellingPlanId);


      currentSellingPlan && productJson.variants && productJson.variants.forEach((variant) => {
        if (variant.id == variantId) {
          const currentPriceAdjustments = currentSellingPlan.price_adjustments[0];
          const discountType = currentPriceAdjustments && currentPriceAdjustments.value_type;
          const discountAmount = currentPriceAdjustments && currentPriceAdjustments.value;
          const currentVariantPrice = window.eHS.customer.b2b ? (variant.price / (1.0 - 0.1)) : variant.price;
          let discountedPrice = variant.price;
          let savings = '';

          if (discountType == 'percentage') {
            savings = discountAmount + '%';
            discountedPrice = parseInt(discountedPrice * (100 - discountAmount) / 100);
          } else {
            savings = formatMoney(discountAmount * 100);
            discountedPrice = discountedPrice - discountAmount * 100;
          }

          badgeSaving && (badgeSaving.innerHTML = 'Save ' + savings);
          secondaryText && (secondaryText.innerHTML = settingsJson.secondary_text && settingsJson.secondary_text.replaceAll('##SAVE##', savings));
          promoCodeMessage && (promoCodeMessage.innerHTML = settingsJson.promo_code_message && settingsJson.promo_code_message.replaceAll('##SAVE##', savings));
          tooltipTitle && (tooltipTitle.innerHTML = settingsJson.tooltip_title && settingsJson.tooltip_title.replaceAll('##SAVE##', savings));
          tooltipContent && (tooltipContent.innerHTML = settingsJson.tooltip_content && settingsJson.tooltip_content.replaceAll('##SAVE##', savings));

          let priceContent = `
            <span class="line-through text-grey-4 text-reg">${formatMoney(currentVariantPrice)}</span>
            <span class="text-lg text-error" data-price-selector>${formatMoney(discountedPrice)}</span>
          `;

          subscriptionPrice.innerHTML = priceContent;
          updateSwellWidget(discountedPrice);
        }
      });
    });
  }
}

const updateSwellWidget = (price) => {
  let points = Math.floor(parseFloat(price) / 100);
  dom.swellWidget && (dom.swellWidget.innerHTML = points);
}


const formSubmission = () => {
  if (dom.form) {
    dom.form.addEventListener('submit', evt => {
      evt.preventDefault();
      addToCart();
    })
  }
}

const addToCart = () => {
  if (dom.formSubmit.getAttribute('aria-disabled') === 'true') return;

  dom.formSubmit.setAttribute('disabled', true);
  dom.formSubmit.setAttribute('aria-disabled', true);
  const variantId = dom.form.querySelector(selectors.variantId).value;
  const quantity = dom.form.querySelector(selectors.quantity).value;
  const subscriptionType = dom.form.querySelector(selectors.sellingPlanRadios + ':checked').value;
  const sellingPlanId = dom.sellingPlans && dom.sellingPlans.value;
  const item = {
    id: variantId,
    quantity: quantity,
  };

  if (subscriptionType == 'subscription') {
    item.selling_plan = sellingPlanId;
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
      SideCart.handleCartContent(response.sections, true);
    })
    .catch((e) => {
      console.error(e);
    })
    .finally(() => {
      dom.formSubmit.removeAttribute('disabled');
      dom.formSubmit.removeAttribute('aria-disabled');
    });
}

const displayPrime = () => {
  if (dom.form) {
    const variantId = dom.form.querySelector(selectors.variantId).value;
    const variantOptionElem = variantId && dom.form.querySelector(selectors.variantShowPrime + `[value="${variantId}"]`);
    const variantShowPrime = variantOptionElem && variantOptionElem.dataset.showPrime;
    let oneTime = null
    if (dom.sellingPlansWrapper) {
      oneTime = dom.form.querySelector(selectors.sellingPlansWrapper).classList.contains('hidden');
    }


    if (variantShowPrime == 'true' && oneTime == true) {
      const primeInterval = setInterval(() => {
        const primeWidgetIframe = dom.primeWidget && dom.primeWidget.querySelector('#bwpFrame');
        if (primeWidgetIframe && primeWidgetIframe.classList.contains('bwp-widget-loaded')){
          dom.primeWidget.classList.add('active');
          clearInterval(primeInterval);
        }
      }, 100);
    } else {
      dom.primeWidget && dom.primeWidget.classList.remove('active')
    }
  }
}

const initAlienProducts = () => {
  document.addEventListener('click', (event) => {
    const alienProduct = event.target.closest(selectors.alienProduct);
    const buyboxGroup = event.target.closest(selectors.group);

    if (alienProduct && buyboxGroup && alienProduct.dataset.href) {
      fetch(alienProduct.dataset.href + "?sections=buybox")
      .then((blob) => blob.json())
      .then((sections) => {
        buyboxGroup.innerHTML = getSectionInnerHTML(sections['buybox'], selectors.group);
        cacheDom();
        formSubmission();
        initGallerySlider();
        buyboxQuantity();
        buyboxOptions();
        buyboxTooltip();
        buyboxSellingPlans();
        displayPrime();
        window.history.replaceState({}, '', alienProduct.dataset.href);
      });
    }
  });
}

const getSectionInnerHTML = (html, selector) => {
  const target = new DOMParser().parseFromString(html, 'text/html').querySelector(selector)
  if (target)
    return target.innerHTML;
  else
    return ''
}

export const setupBuybox = () => {
  cacheDom();
  formSubmission();
  initGallerySlider();
  buyboxQuantity();
  buyboxOptions();
  buyboxTooltip();
  buyboxSellingPlans();
  displayPrime();
  initAlienProducts();
};
