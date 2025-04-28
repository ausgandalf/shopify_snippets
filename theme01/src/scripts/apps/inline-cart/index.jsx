import React from 'react';
import * as ReactDOM from 'react-dom/client';

// import InlineCart from './InlineCart.jsx';
import CartPage from './CartPage.jsx';

const defaultProps = {
  // Header
  title: 'Shopping Cart',
  headerBackground: '#FFFFFF',
  headerText: '#000000',
  // Thresholds
  thresholdBackground: '#F1F1F1',
  thresholdTextColor: '#241E18',
  thresholdBarBackground: '#D9D8D6',
  thresholdBarFillBackground: '#FE5000',
  // Disclaimer
  disclaimerBackground: '#F1F1F1',
  disclaimerTextColor: '#000000',
  disclaimerText: '*Shipping & taxes calculated at checkout',
  // empty cart content
  emptyCartMessage: 'Your cart is currently empty.',
  continueShoppingText: 'Continue Shopping',
  continueShoppingURL: '/collections/all',
  continueShoppingType: 'button--primary',
};

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('#InlineCart');
  const cartPageAppContainer = document.querySelector('#CartPage') || false;
  if (!appContainer) return;

  const propsRaw = appContainer.getAttribute('props');
  const props = JSON.parse(propsRaw);
  const finalProps = Object.assign(defaultProps, props);

  const root = ReactDOM.createRoot(appContainer);
  root.render(<InlineCart data={finalProps} />);

  if (cartPageAppContainer) {
    const cartPageRoot = ReactDOM.createRoot(cartPageAppContainer);
    const propsRaw = cartPageAppContainer.getAttribute('props');
    const props = JSON.parse(propsRaw);
    const finalCartProps = Object.assign(finalProps, props);

    cartPageRoot.render(<CartPage data={finalCartProps} />);
  }
});

// document.addEventListener('cartOpenStateChange', () => {
//   const isOpen = window.state['cartOpen'];
//   const appContainer = document.querySelector('#InlineCart');

//   if (isOpen && appContainer) {
//     const elementToFocus = appContainer.querySelectorAll('button')[0];

//     if (elementToFocus) {
//       elementToFocus.focus();
//     }
//   }
// });
