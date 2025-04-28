import React, { useState, useEffect } from 'react';

import { addEffect } from '../../../utils/Effects.js';

import Accordions from './Accordions.jsx';
import AddToCart from './AddToCart.jsx';
import Callout from './Callout.jsx';
import ProductOptions from './ProductOptions.jsx';
import BundleProductOptions from './BundleProductOptions.jsx';
import SubscriptionWidget from './SubscriptionWidget.jsx';
import NutritionPanel from './NutritionPanel.jsx';

const BuyboxContent = ({ data }) => {
  const { product } = window.eHS;
  const [selectedVariant, setSelectedVariant] = useState(window.state.selectedVariant || false);

  const isProProgram = window.eHS.customerTags && window.eHS.customerTags.includes('ExpertVoice');
  const siteWideDiscount = window.eHS.sideWideDiscount;
  const includeProDiscount = product.tags && !product.tags.includes('exclude-pro-discount');
  const includeSiteDiscount = product.tags && !product.tags.includes('exclude-sitewide-discount');

  const [price, setPrice] = useState(selectedVariant ? selectedVariant.price : product.price);
  const [comparePrice, setComparePrice] = useState(selectedVariant ? selectedVariant.comparePrice : product.price);
  const [priceLabel, setPriceLabel] = useState('');

  const setPriceData = (variant) => {
    variant = variant || product;

    if (!variant.comparePrice && isProProgram && includeProDiscount) {
      setComparePrice(variant.price);
      setPrice(variant.price * 0.7);
      setPriceLabel('Pro Discount');
    } else if (!variant.comparePrice && siteWideDiscount && includeSiteDiscount) {
      setComparePrice(variant.price);
      setPrice(variant.price * ((100 - siteWideDiscount) / 100));
      setPriceLabel('Sale');
    } else {
      setComparePrice(variant.comparePrice);
      setPrice(variant.price);
      setPriceLabel('');
    }
  };

  useEffect(addEffect('selectedVariant', setSelectedVariant), []);
  useEffect(() => {
    if (selectedVariant?.metafields.limited) {
      window.setState('purchaseFrequency', 'one-time');
      window.setState('purchaseSellingPlan', null);
      window.setState('subscriptionPrice', null);
    }
    setPriceData(selectedVariant);
  });

  return (
    <div className="lg:mt-6">
      {product.type && <p className="caps-small pb-2 text-grey-7 max-lg:hidden">{product.type}</p>}

      <h1 className="h5 text-grey-8 pb-2">{product.title}</h1>

      {window.eHS.template !== 'product.gift-card' && (
        <span
          className="stamped-product-reviews-badge block mb-3"
          data-id={product.id}
          data-product-sku={product.handle}
          data-product-type={product.type}
          data-product-title={product.title}
        ></span>
      )}

      {product.metafields.quick_glance_description && <p className="text-grey-8 pb-2">{product.metafields.quick_glance_description}</p>}

      <div className="tracking-wider pb-4 flex items-center border-b border-grey-5">
        {price && (
          <h6 className={`text-base font-primary font-bold ${comparePrice && comparePrice > price ? 'text-error' : 'text-grey-8'}`}>
            ${(price / 100.0).toFixed(2)}
          </h6>
        )}
        {comparePrice && comparePrice > price && (
          <h6 className="text-base ml-2 text-grey-8 line-through">${(comparePrice / 100.0).toFixed(2)}</h6>
        )}
        {priceLabel && <h6 className="text-base bg-color-2 text-white caps-small pl-1.5 pr-1 ml-4">{priceLabel}</h6>}

        <NutritionPanel />
      </div>

      {selectedVariant && selectedVariant.metafields.model_specs && (
        <p className="text-xs font-bold text-color-2 mt-6">{selectedVariant.metafields.model_specs}</p>
      )}

      {product.options[0].name !== 'Title' &&
        (window.eHS.template !== 'product.bundles' ? <ProductOptions data={data} /> : <BundleProductOptions />)}

      {selectedVariant && selectedVariant.available && !selectedVariant.metafields.limited && !!product.selling_plan.length && (
        <SubscriptionWidget />
      )}

      <AddToCart data={data} />

      <Accordions data={data} />

      <Callout />

      {/* <div
        id="lcly-button-0"
        className="mt-4"
        data-switchlive="true"
        data-switchlive-impression="true"
        data-switchlive-impression-id-pl="1"
      >
        <div id="lcly-link-0" data-switchlive="true" data-switchlive-mode="auto" data-switchlive-id-pl="6"></div>
      </div> */}
    </div>
  );
};

export default BuyboxContent;
