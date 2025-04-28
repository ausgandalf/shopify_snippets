import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import { addEffect } from '../../utils/Effects.js';
import { money } from './utils/helpers';

import FreeShipping from './FreeShipping.jsx';
import InlineCartHeader from './InlineCartHeader.jsx';
import CartItems from './CartItems.jsx';

// // Add event listeners for opening cart
// if (window.eHS.template != 'cart') {
//   ['openCart', 'addToCart'].forEach((eventName) => {
//     document.addEventListener(eventName, () => {
//       window.setState('cartOpen', true);
//     });
//   });
// }

// // Add event listeners for closing the cart
// ['closeCart', 'keydown'].forEach((eventName) => {
//   document.addEventListener(eventName, (event) => {
//     if (event.keyCode && event.keyCode !== 27) return;
//     window.setState('cartOpen', false);
//   });
// });

const InlineCart = ({ data }) => {
  // const [openState, setOpenState] = useState(false);
  const [cartState, setCartState] = useState(window.state.cartState || {});
  // const [proApproved, setProApproved] = useState(false);
  const isProProgram = window.eHS.customerTags && window.eHS.customerTags.includes('ExpertVoice');
  const siteWideDiscount = window.eHS.sideWideDiscount;
  const [checkoutUrl, setCheckoutUrl] = useState('/checkout');
  
  // const [proApproved, setProApproved] = useState(false);
  const headerCart = document.querySelector('[data-header-cart]');
  const headerQuantity = document.querySelector('[data-header-cart-qty]');

  if (typeof headerCart != 'undefined') {
    if (cartState.item_count == 0) {
      headerCart.classList.add('hidden');
      headerCart.setAttribute('aria-hidden', 'true');
    } else {
      headerCart.classList.remove('hidden');
      headerCart.setAttribute('aria-hidden', 'false');
      headerQuantity.innerHTML = cartState.item_count;
    }
  }

  useEffect(addEffect('cartState', setCartState), []);
  // useEffect(
  //   addEffect('cartOpen', (isOpen) => {
  //     if (isOpen) {
  //       document.body.classList.add('overflow-hidden');
  //     } else {
  //       document.body.classList.remove('overflow-hidden');
  //     }
  //     setOpenState(isOpen);
  //   }),
  //   [],
  // );

  useEffect(() => {
    const cookieSet = Cookies.get('site_referer');

    if (cookieSet == 'expertvoice') {
      // setProApproved(true);
      document.querySelector('.rebuy-button.rebuy-cart__checkout-button').classList.remove('hidden');
    } else {
      // setProApproved(false);
      document.querySelector('.rebuy-button.rebuy-cart__checkout-button').classList.add('hidden');
    }
  }, []);

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
    if (eHS.isB2bCustomer && cartState.total_price < eHS.cartThreshold) {
      setCheckoutUrl('javascript:void(0);')
    }
  }, [cartState]);

  return <div></div>;

  return (
    <aside
      className={`fixed right-0 top-0 bottom-0 flex flex-col max-h-screen w-full max-w-[25rem] z-side-cart bg-white transition-all duration-500 ${
        openState ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`}
    >
      {openState && (
        <div
          className="absolute top-0 bottom-0 right-full w-screen bg-black opacity-50"
          onClick={() => window.setState('cartOpen', false)}
        ></div>
      )}

      <InlineCartHeader data={data} />

      {cartState.item_count > 0 && <FreeShipping data={data} />}

      {cartState.item_count > 0 ? (
        <>
          <div className="pb-6 grow overflow-auto h-full">
            <CartItems data={data} inlineCart={true} />

            {data.rebuyWidgetID && <div data-rebuy-id={data.rebuyWidgetID}></div>}
          </div>

          <div className="left-0 right-0 bottom-0 border-t border-grey-6" style={{ boxShadow: '0 0 9px 0 rgba(0,0,0,0.15)' }}>
            <div className="py-5 px-4 text-center">
              {(!isProProgram || proApproved) && (
                <a className="button button--primary w-full mb-3" href={checkoutUrl} >
                  Checkout
                  {cartState.total_price ? ` - $${money(getCartPrice(cartState))}` : ''}
                </a>
              )}

              <a href="/cart" className="button-link">
                View Cart
              </a>
            </div>
            {data.disclaimerText && (
              <p
                className="px-4 py-2 text-center text-xs"
                style={{ backgroundColor: data.disclaimerBackground, color: data.disclaimerTextColor }}
              >
                {data.disclaimerText}
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="pt-20 text-center grow bg-grey-1 overflow-y-auto">
          <div className="px-6 mb-16">
            <div className="mb-20 rte" dangerouslySetInnerHTML={{ __html: data.emptyCartMessage }}></div>

            <a href={data.continueShoppingURL} className={`button ${data.continueShoppingType} w-full`}>
              {data.continueShoppingText}
            </a>
          </div>

          {data.rebuyWidgetID && <div data-rebuy-id={data.rebuyWidgetID}></div>}
        </div>
      )}
    </aside>
  );
};

export default InlineCart;
