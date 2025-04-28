import React from 'react';

import Gallery from './components/Gallery.jsx';
import BuyboxContent from './components/BuyboxContent.jsx';
import StickyBanner from './components/StickyBanner.jsx';
import BundleStickyBanner from './components/BundleStickyBanner.jsx';

// Set the default state for selected options
const { product } = window.eHS;
const defaultVariantID = product.defaultVariant;
const defaultVariant = product.variants.find((variant) => variant.id === defaultVariantID);
const defaultOptions = defaultVariant.options;
const hiddenProduct = product.tags.includes('Hidden');

window.setState('selectedVariant', defaultVariant);
window.setState('selectedProductOptions', defaultOptions);

const Buybox = ({ data }) => {
  return (
    !hiddenProduct && (
      <>
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-[1fr,31rem] items-start">
            <Gallery />
            <BuyboxContent data={data} />
          </div>
        </div>

        {window.eHS.template !== 'product.bundles' ? <StickyBanner /> : <BundleStickyBanner />}
      </>
    )
  );
};

export default Buybox;
