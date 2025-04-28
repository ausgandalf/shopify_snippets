import React, { useState, useEffect } from 'react';

import CartItems from './CartItems.jsx';
import OrderSummary from './OrderSummary.jsx';
import CartEmpty from './CartEmpty.jsx';

import { money } from './utils/helpers';
import { addEffect } from '../../utils/Effects.js';

const CartPage = ({ data }) => {
  const [cartState, setCartState] = useState(window.state.cartState || {});

  useEffect(addEffect('cartState', setCartState), []);

  return (
    <div className={`${cartState.item_count > 0 ? 'pt-9 lg:pt-14' : 'flex text-center justify-center pt-20'}`}>
      {cartState.item_count > 0 ? (
        <>
          <h2 className="mb-9 lg:mb-11 max-lg:text-center uppercase">
            {data.title} ({cartState.item_count})
          </h2>

          <div className="grid lg:grid-cols-[1fr,23.125rem] items-start lg:gap-10">
            <div className="px-6 py-4 flex lg:hidden justify-between border-t-2 lg:border-t-[3px] border-color-3 font-primary">
              <p className="text-sm uppercase">
                <b>Order Total</b>
              </p>
              <p className="text-sm">{cartState ? `$${money(cartState.total_price)}` : '-'}</p>
            </div>
            <div className="border-t-2 lg:border-t-[3px] border-color-3 lg:border-color-2">
              <CartItems data={data} />
            </div>

            <OrderSummary data={data} />
          </div>
        </>
      ) : (
        <CartEmpty data={data} />
      )}
    </div>
  );
};

export default CartPage;
