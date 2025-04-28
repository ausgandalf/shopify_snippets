import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Buybox from './Buybox.jsx';

const defaultProps = {
  // Product Options Layout
  flavorLayout: 'box',
  // Product Unavailable
  buttonUnavailableLabel: 'Not available',
  unavailableMessage: "We're sorry, this combination of options does not exist for this product. Please update your selections.",
  // Accordions
  firstOpen: true,
  firstAccordionLabel: 'About This Product',
  secondAccordionLabel: 'Product Facts',
  thirdAccordionLabel: 'Benefits',
  fourthAccordionLabel: 'Recommended usage',
  fifthAccordionLabel: 'Highlights',
  sixthAccordionLabel: 'Materials & Specs',
};

document.addEventListener('DOMContentLoaded', () => {
  const buyboxApp = document.querySelector('#ProductBuybox') || false;
  if (!buyboxApp) return;

  const propsRaw = buyboxApp.getAttribute('props');
  const props = JSON.parse(propsRaw);
  const finalProps = Object.assign(defaultProps, props);

  const root = ReactDOM.createRoot(buyboxApp);
  root.render(<Buybox data={finalProps} />);

  window.listenToState((variant) => {
    if (!variant) return;

    const { origin, pathname } = window.location;
    const newURL = `${origin}${pathname}?variant=${variant.id}`;
    history.replaceState({}, '', newURL);
  }, 'selectedVariant');
});
