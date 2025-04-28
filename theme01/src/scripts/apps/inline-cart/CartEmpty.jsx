import React from 'react';

const CartEmpty = ({ data }) => {
  return (
    <div className="relative text-center">
      <h2 className="mb-8 lg:mb-9 uppercase">{data.title}</h2>

      <div className="mb-8 lg:mb-9" dangerouslySetInnerHTML={{ __html: data.emptyCartMessage }}></div>

      <a href={data.continueShoppingURL} className={`button ${data.continueShoppingType}`}>
        {data.continueShoppingText}
      </a>
    </div>
  );
};

export default CartEmpty;
