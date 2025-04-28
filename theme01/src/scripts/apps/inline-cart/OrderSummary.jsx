import React, { useState, useEffect, useRef } from 'react';
import { addToCart, removeFromCart } from '../../utils/Cart';
import Cookies from 'js-cookie';

import { addEffect } from '../../utils/Effects.js';
import { money } from './utils/helpers';

const GovxIDIcon = () => (
  <svg className="w-28" version="1.1" alt="GovX ID" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 1000 159.19">
    <path className="fill-color-1" d="M73.94,77.83,35,118.64H71.44a8.19,8.19,0,0,0,5.94-2.54l14.5-15.19a3.11,3.11,0,0,0,0-4.28Z"></path>
    <path
      className="fill-color-1"
      d="M77.38,33.13a8.23,8.23,0,0,0-5.94-2.54H35l81.85,85.75a7.24,7.24,0,0,0,5.23,2.23H127L81,70.39l4-4.18,47.93,50.08a7.4,7.4,0,0,0,5.34,2.28H143L89,62l4-4.19,55.47,58.11a8.48,8.48,0,0,0,6.14,2.63h4.36ZM65.43,37.64h3.51a.1.1,0,0,0,.1-.07l1.09-3.35a.1.1,0,0,1,.19,0l1.09,3.35a.1.1,0,0,0,.1.07H75a.1.1,0,0,1,.06.19l-2.84,2.06a.11.11,0,0,0,0,.12l1.09,3.34a.11.11,0,0,1-.16.12L70.29,41.4a.09.09,0,0,0-.12,0l-2.85,2.07a.11.11,0,0,1-.16-.12L68.25,40a.11.11,0,0,0,0-.12l-2.84-2.06A.11.11,0,0,1,65.43,37.64Zm-4.74.19-2.84,2.06a.11.11,0,0,0,0,.12l1.09,3.34a.11.11,0,0,1-.16.12L55.89,41.4a.09.09,0,0,0-.12,0l-2.84,2.07a.11.11,0,0,1-.16-.12L53.86,40a.13.13,0,0,0,0-.12L51,37.83a.11.11,0,0,1,.06-.19h3.52a.12.12,0,0,0,.1-.07l1.08-3.35a.11.11,0,0,1,.2,0L57,37.57a.1.1,0,0,0,.09.07h3.52A.11.11,0,0,1,60.69,37.83Zm11,11.27-2.84,2.07a.09.09,0,0,0,0,.11l1.09,3.35a.1.1,0,0,1-.16.11l-2.85-2.07a.13.13,0,0,0-.12,0l-2.84,2.07a.1.1,0,0,1-.16-.11l1.09-3.35a.09.09,0,0,0,0-.11L62,49.1a.11.11,0,0,1,.06-.19h3.52a.11.11,0,0,0,.1-.07l1.09-3.34a.1.1,0,0,1,.19,0L68,48.84a.1.1,0,0,0,.09.07h3.52A.11.11,0,0,1,71.67,49.1ZM82,60.27l-2.84,2.07a.09.09,0,0,0,0,.11l1.09,3.35a.1.1,0,0,1-.16.11l-2.84-2.07a.15.15,0,0,0-.13,0l-2.84,2.07a.1.1,0,0,1-.16-.11l1.09-3.35a.09.09,0,0,0,0-.11L72.3,60.27a.11.11,0,0,1,.06-.19h3.51A.1.1,0,0,0,76,60l1.09-3.34a.1.1,0,0,1,.19,0L78.34,60a.1.1,0,0,0,.1.07H82A.11.11,0,0,1,82,60.27Zm4.17-11.39L83.33,51a.09.09,0,0,0,0,.11l1.08,3.35a.1.1,0,0,1-.16.11l-2.84-2.06a.09.09,0,0,0-.12,0l-2.85,2.06a.1.1,0,0,1-.15-.11l1.08-3.35a.09.09,0,0,0,0-.11l-2.84-2.07a.1.1,0,0,1,.06-.18H80a.1.1,0,0,0,.09-.07l1.09-3.35a.11.11,0,0,1,.2,0l1.08,3.35a.12.12,0,0,0,.1.07h3.52A.1.1,0,0,1,86.18,48.88Z"
    ></path>
    <path
      className="fill-color-1"
      d="M122.17,69.18l36.76-38.51H122.48a8.17,8.17,0,0,0-5.94,2.54L99.94,50.59l17.75,18.59A3.09,3.09,0,0,0,122.17,69.18Z"
    ></path>
    <path
      className="fill-color-1"
      d="M183.28,10.21V127.75a1.9,1.9,0,0,1-1.48,1.86L97.39,148.93a1.87,1.87,0,0,1-.86,0L12.12,129.61a1.9,1.9,0,0,1-1.49-1.86V10.21H183.28M193.42.08H.5V127.75a12,12,0,0,0,9.36,11.74l84.41,19.32a12.21,12.21,0,0,0,5.38,0l84.41-19.32a12,12,0,0,0,9.36-11.74V.08Z"
    ></path>
    <path
      className="fill-grey-8 group-hover:fill-white transition-colors"
      d="M358.8,30.27H259.38A12.35,12.35,0,0,0,247,42.62v63.9a12.35,12.35,0,0,0,12.35,12.35H358.8a12.35,12.35,0,0,0,12.35-12.35V74.23A5.26,5.26,0,0,0,365.89,69H329.13V82.28a5.43,5.43,0,0,0,5.43,5.42h10.87a1.81,1.81,0,0,1,1.8,1.8v8.08a1.8,1.8,0,0,1-1.8,1.8l-72.5-.09a1.81,1.81,0,0,1-1.8-1.8V51.92a1.8,1.8,0,0,1,1.8-1.79h72.5a1.8,1.8,0,0,1,1.8,1.79v7.59h23.92V42.62A12.35,12.35,0,0,0,358.8,30.27Z"
    ></path>
    <path
      className="fill-grey-8 group-hover:fill-white transition-colors"
      d="M498.53,30.27H398.15a12.35,12.35,0,0,0-12.36,12.35v64A12.35,12.35,0,0,0,398.15,119H498.53a12.35,12.35,0,0,0,12.35-12.35v-64A12.35,12.35,0,0,0,498.53,30.27ZM486.78,97a2.09,2.09,0,0,1-.68,1.78,5.14,5.14,0,0,1-2.77.5h-70a5.22,5.22,0,0,1-2.68-.5A2,2,0,0,1,409.9,97V52.41a2,2,0,0,1,.77-1.77,5.1,5.1,0,0,1,2.68-.51h70a5,5,0,0,1,2.77.51,2.06,2.06,0,0,1,.68,1.77Z"
    ></path>
    <path
      className="fill-grey-8 group-hover:fill-white transition-colors"
      d="M610.93,35.79,580.85,94.11l-.1.21-.11-.21L550.57,35.79a10.25,10.25,0,0,0-9.12-5.52H518.2l43.38,84.28a8,8,0,0,0,7.13,4.32h24.07a8,8,0,0,0,7.14-4.32l43.37-84.28H620A10.23,10.23,0,0,0,610.93,35.79Z"
    ></path>
    <path
      className="fill-grey-8 group-hover:fill-white transition-colors"
      d="M769.21,30.3h-30.3a8.31,8.31,0,0,0-6,2.56L710,56.9l-23-24a8.28,8.28,0,0,0-6-2.56h-30.3l42.31,44.33L650.75,119h30.72a7.29,7.29,0,0,0,5.27-2.25L710,92.35l23.24,24.35a7.25,7.25,0,0,0,5.26,2.25h30.73L726.9,74.63Z"
    ></path>
    <path
      className="fill-grey-8 group-hover:fill-white transition-colors"
      d="M825.73,119h21.19V30.26H825.73a2.91,2.91,0,0,0-2.91,2.92v82.9A2.91,2.91,0,0,0,825.73,119Z"
    ></path>
    <path
      className="fill-grey-8 group-hover:fill-white transition-colors"
      d="M999.5,92.27V57a26.72,26.72,0,0,0-26.72-26.73H874.4V119h98.38A26.72,26.72,0,0,0,999.5,92.27Zm-37.06,6.55L902,99.24a5.22,5.22,0,0,1-2.68-.5,2,2,0,0,1-.77-1.77V52.41a2,2,0,0,1,.77-1.78,5.22,5.22,0,0,1,2.68-.5l60.48.42a12.37,12.37,0,0,1,12.28,12.37V86.46A12.36,12.36,0,0,1,962.44,98.82Z"
    ></path>
  </svg>
);

const OrderSummary = ({ data }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef(null);
  const [cartState, setCartState] = useState(window.state.cartState || {});
  const [donationItem, setDonationItem] = useState({});
  const [proApproved, setProApproved] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState('/checkout');
  const [errorMessage, setErrorMessage] = useState('');

  const freeShippingThreshold = data.thresholds.find((threshold) => threshold.thresholdType === 'free_shipping');
  const isProProgram = window.eHS.customerTags && window.eHS.customerTags.includes('ExpertVoice');
  const siteWideDiscount = window.eHS.sideWideDiscount;

  useEffect(addEffect('cartState', setCartState), []);

  useEffect(() => {
    if (eHS.isB2bCustomer && cartState.total_price < eHS.cartThreshold) {
      setCheckoutUrl('javascript:void(0);')
      setErrorMessage(eHS.cartErrorMessage);
    } else {
      setCheckoutUrl('/checkout')
      setErrorMessage('');
    }
  }, [cartState]);

  const handleDonationCheck = (event) => {
    if (event.target.checked) {
      addToCart({
        id: data.donationProduct.variants[0].id,
        quantity: 1,
      }).then(() => {});
    } else {
      removeFromCart(donationItem).then(() => {});
    }
    setIsSubscribed((current) => !current);
  };

  const setDonationTooltipTrigger = () => {
    const tooltipSelector = document.getElementById('donation-section').querySelector('a[href^="#"]');

    tooltipSelector.addEventListener('click', (e) => {
      e.preventDefault();
      setTooltip(!tooltip);
    });

    if (window.innerWidth >= 1024) {
      tooltipSelector.addEventListener('mouseover', (e) => {
        e.preventDefault();
        setTooltip(true);
      });

      tooltipSelector.addEventListener('mouseout', (e) => {
        e.preventDefault();
        setTooltip(false);
      });
    }
  };

  const getCartPrice = (cartState) => {
    return cartState.items.reduce((price, item) => {
      const includeSiteDiscount = item.product.tags && !item.product.tags.includes('exclude-sitewide-discount');
      let itemPrice = item.price;

      if (!isProProgram && siteWideDiscount && includeSiteDiscount && !item.variant.compare_at_price) {
        itemPrice = itemPrice * ((100 - siteWideDiscount) / 100);
      }
      return price + itemPrice * item.quantity;
    }, 0);
  };

  useEffect(() => {
    const cookieSet = Cookies.get('site_referer');

    if (cookieSet == 'expertvoice') {
      setProApproved(true);
    } else {
      setProApproved(false);
    }

    if (data.donationProduct && data.donationMessage) {
      setDonationTooltipTrigger();

      window.addEventListener('resize', setDonationTooltipTrigger);
      return () => {
        window.removeEventListener('resize', setDonationTooltipTrigger);
      };
    }
  }, []);

  useEffect(() => {
    if (data.donationProduct && data.donationMessage) {
      const itemExists = cartState.items.find((item) => item.id == data.donationProduct.variants[0].id);

      if (itemExists) {
        setDonationItem(itemExists);
        setIsSubscribed(true);
      } else {
        setIsSubscribed(false);
      }
    }
  }, [cartState]);

  return (
    <div className="order-summary sticky top-5">
      <div className="bg-grey-1 border-t-[3px] lg:border-[3px] border-color-2 text-center px-8 py-7 lg:py-11 transition-all duration-300">
        <h2 className="caps-regular max-lg:text-left">Order Summary</h2>

        <div className="mt-8 py-3 flex justify-between border-t border-grey-3">
          <p className="text-sm">
            <b>Subtotal</b>
          </p>
          <p className="text-sm">{cartState ? `$${money(getCartPrice(cartState))}` : '-'}</p>
        </div>

        <div className="py-3 flex justify-between border-t border-grey-3">
          <p className="text-sm">
            <b>Shipping*</b>
          </p>
          <p className="text-sm">TBD</p>
        </div>

        <div className="py-3 flex justify-between border-t border-grey-3">
          <p className="text-sm">
            <b>Taxes*</b>
          </p>
          <p className="text-sm">TBD</p>
        </div>

        <div className="py-3 flex justify-between border-t border-grey-3">
          <p className="text-sm">
            <b>Order Total</b>
          </p>
          <p className="text-sm font-bold tracking-[2px]">{cartState ? `$${money(getCartPrice(cartState))}` : '-'}</p>
        </div>

        {data.donationProduct && data.donationMessage && (
          <div id="donation-section" className="py-3 flex relative text-left">
            <input type="checkbox" id="donation-checkbox" className="mt-0.5" checked={isSubscribed} onChange={handleDonationCheck} />
            <label
              htmlFor="donation-checkbox"
              className="text-sm rte flex-1"
              dangerouslySetInnerHTML={{ __html: data.donationMessage }}
            ></label>
            {tooltip && (
              <div
                ref={tooltipRef}
                className="absolute w-64 border-2 border-color-2 px-6 py-4 text-color-2 z-1 bg-white left-1/2 -translate-x-1/2 bottom-full"
              >
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-t-8 border-t-white drop-shadow-tooltip"></span>
                <div className="tooltip-content text-left rte" dangerouslySetInnerHTML={{ __html: data.donationTooltip }}></div>
              </div>
            )}
          </div>
        )}

        <p className="text-xs pt-3 mb-6">{data.disclaimerText}</p>

        {isProProgram && !proApproved && (
          <p className="text-xs pt-3 mb-3">Please log in to your Expert Voice account before checking out.</p>
        )}

        {errorMessage && (
          <p className="text-error text-xs pt-3 mb-3">{errorMessage}</p>
        )}

        {isProProgram && !proApproved ? (
          <a href="https://www.expertvoice.com/brand/whitelabel" target="_blank" className="w-full button button--primary mb-5">
            Log in Here
          </a>
        ) : (
          <a href={checkoutUrl} className={`w-full button button--primary mb-5 ${errorMessage ? 'disabled' : ''}`}>
            Checkout
          </a>
        )}

        <a href={data.continueShoppingURL} className="button-link">
          {data.continueShoppingText}
        </a>

        {freeShippingThreshold && (
          <p className="text-xs mt-6 pt-6 border-t border-grey-3">
            FREE Shipping on orders ${freeShippingThreshold.thresholdAmount / 100}+
          </p>
        )}
      </div>

      {data.enableGovxID && (
        <div className="max-lg:pt-0 p-4 mt-6 lg:border border-grey-3 text-right">
          {data.govxIDMessage && <p className="mb-5 text-xxs text-left">{data.govxIDMessage}</p>}

          <a
            href="https://auth.govx.com/shopify/verify?shop=getwhitelabel.myshopify.com&utm_source=shopify&utm_medium=govxid&utm_campaign=custom_link"
            className="button-normal button button--secondary w-full min-h-[2.5rem] py-2 px-3 group"
          >
            <GovxIDIcon />
          </a>

          <a href="https://www.govx.com/t/govx-id" className="inline-block text-xs mt-2">
            What is GovX ID?
          </a>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
