import React, { useState, useEffect } from 'react';

import CartItem from './CartItem.jsx';
import InlineCartItem from './InlineCartItem.jsx';

const CartItems = ({ data, inlineCart }) => {
  const [cartState, setCartState] = useState(window.state.cartState || { items: [] });
  const [cartProcessing, setCartProcessing] = useState(false);

  useEffect(() => {
    const abortController = window.listenToState((newCartState) => {
      setCartState(newCartState);
      setCartProcessing(false);
    }, 'cartState');
    return () => abortController.abort();
  }, []);

  const sortedItems = cartState.items
    ? cartState.items.sort((a, b) => {
        const titleScore = a.product.title.localeCompare(b.product.title);
        const optionScore = a.options_with_values[0].value.localeCompare(b.options_with_values[0].value);
        return titleScore !== 0 ? titleScore : optionScore;
      })
    : [];

  return (
    <div>
      {sortedItems.map((item, itemIndex) =>
        inlineCart ? (
          <InlineCartItem
            data={{ props: data, item: item, itemIndex: itemIndex, cartProcessing, setCartProcessing }}
            key={`cart-item-${itemIndex}`}
          />
        ) : (
          <CartItem
            data={{ props: data, item: item, itemIndex: itemIndex, cartProcessing, setCartProcessing }}
            key={`cart-item-${itemIndex}`}
          />
        ),
      )}
    </div>
  );
};

export default CartItems;
