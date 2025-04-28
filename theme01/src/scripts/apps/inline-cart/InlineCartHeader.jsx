import React, { useState, useEffect } from 'react';

import { addEffect } from '../../utils/Effects.js';

const InlineCartHeader = ({ data }) => {
  const [cartState, setCartState] = useState(window.state.cartState || {});

  useEffect(addEffect('cartState', setCartState), []);

  return (
    <header
      style={{ backgroundColor: data.headerBackground, color: data.headerText }}
      className="relative py-4 px-7 text-center border-b border-color-3"
    >
      <h6 className="text-h6-m text-center uppercase">
        {data.title} {cartState.item_count > 0 && `(${cartState.item_count})`}
      </h6>

      <button
        aria-label="Close Cart"
        className="absolute top-1/2 right-3 -translate-y-1/2"
        onClick={() => window.setState('cartOpen', false)}
      >
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.958008" y="0.813354" width="33" height="33" fill="white" fillOpacity="0.01" />
          <path d="M24.2639 10.5074L10.6521 24.1192" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.6521 10.5074L24.2639 24.1192" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </header>
  );
};

export default InlineCartHeader;
