import React, { useState, useEffect } from 'react';

import { addEffect } from '../../../utils/Effects.js';

const StickyBanner = () => {
  const { product } = window.eHS;
  const [selectedVariant, setSelectedVariant] = useState(window.state.selectedVariant || false);
  const [showBanner, setShowBanner] = useState(false);
  const ProductBuybox = document.getElementById('ProductBuybox');

  useEffect(addEffect('selectedVariant', setSelectedVariant), []);

  const observer = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  });

  observer.observe(ProductBuybox);

  const scrollToProductBuybox = () => {
    ProductBuybox.scrollIntoView();
  };

  return (
    <div
      className={`sticky-banner fixed left-0 w-full py-4 lg:py-6 bg-white transition-all duration-500 z-[100] border-b border-b-color-3 ${
        showBanner ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container flex justify-between">
        <div className="flex max-lg:flex-col lg:items-center gap-1 lg:gap-12">
          <h6 className="text-grey-8 max-lg:hidden">{product.title}</h6>

          {product.options.map((optionGroup, groupIndex) => (
            <div className="flex items-center" key={`option-group-${groupIndex}`}>
              <span className="text-xs font-bold text-grey-8">{optionGroup.name}:</span>
              <span className="ml-1 text-xs text-grey-8">{selectedVariant.options[optionGroup.position - 1]}</span>
            </div>
          ))}
        </div>

        <button
          className="button button-normal button--primary button--small-primary !min-h-0 max-lg:text-xxs"
          onClick={scrollToProductBuybox}
        >
          See Buying Options
        </button>
      </div>
    </div>
  );
};

export default StickyBanner;
