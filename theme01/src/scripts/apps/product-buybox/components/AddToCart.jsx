import React, { useState, useEffect } from 'react';

import { addEffect } from '../../../utils/Effects.js';
import { addToCart } from '../../../utils/Cart.js';

const AddToCart = ({ data }) => {
  const { product } = window.eHS;
  const [quantity, setQuantity] = useState(1);
  const [buttonMessage, setButtonMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [price, setPrice] = useState(0);
  const [optionState, setOptionState] = useState(window.state.selectedProductOptions || []);
  const [subscriptionPrice, setSubscriptionPrice] = useState(window.state.subscriptionPrice || false);

  const isProProgram = window.eHS.customerTags && window.eHS.customerTags.includes('ExpertVoice');
  const siteWideDiscount = window.eHS.sideWideDiscount;
  const includeProDiscount = product.tags && !product.tags.includes('exclude-pro-discount');
  const includeSiteDiscount = product.tags && !product.tags.includes('exclude-sitewide-discount');

  useEffect(addEffect('productQuantity', setQuantity), []);
  useEffect(addEffect('selectedProductOptions', setOptionState), []);
  useEffect(addEffect('subscriptionPrice', setSubscriptionPrice), []);

  const selectedVariant = product.variants.find((variant) => {
    return optionState.reduce((allMatch, option) => {
      return allMatch && variant.options.includes(option);
    }, true);
  });

  useEffect(() => {
    window.setState('selectedVariant', selectedVariant);

    if (selectedVariant) {
      if (!selectedVariant.comparePrice && isProProgram && includeProDiscount) {
        setPrice(selectedVariant.price * 0.7);
      } else if (!selectedVariant.comparePrice && siteWideDiscount && includeSiteDiscount) {
        setPrice(selectedVariant.price * ((100 - siteWideDiscount) / 100));
      } else {
        setPrice(selectedVariant.price);
      }

      if (subscriptionPrice) {
        setPrice(subscriptionPrice);
      }

      if (selectedVariant.available) {
        setButtonMessage(`Add To Cart - $${((quantity * price) / 100.0).toFixed(2)}`);
      } else {
        setButtonMessage('Out Of Stock');
      }
    } else {
      setButtonMessage(data.buttonUnavailableLabel);
    }
  }, [selectedVariant, quantity, subscriptionPrice, price]);

  const addItemToCart = () => {
    setButtonMessage('Adding to cart');

    let productData = {
      id: selectedVariant.id,
      quantity: quantity,
    };

    if (window.state.purchaseFrequency == 'subscription') {
      productData = {
        id: selectedVariant.id,
        quantity: quantity,
        sellingPlan: window.state.purchaseSellingPlan,
      };
    }
    addToCart(productData).then((cart) => {
      if (cart?.status === 422) {
        if (cart?.message == 'This item has a minimum of 2.') {
          setErrorMessage('Must meet quantity minimum of 2. Please increase QTY to add item to the Cart.');
        } else {
          setErrorMessage(cart?.message);
        }

        setTimeout(() => {
          setErrorMessage('');
        }, 2000);
      } else {
        setErrorMessage('');
        setButtonMessage('Added!');
        setTimeout(() => {
          setButtonMessage(`Add To Cart - $${((quantity * price) / 100.0).toFixed(2)}`);
        }, 3000);
      }
    })
  };

  return (
    <div className="mt-6">
      <div className="lg:flex items-stretch">
        {selectedVariant && selectedVariant.available && (
          <div className="max-lg:mb-4 lg:mr-4 relative flex items-center border border-grey-3">
            <span className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-1 uppercase text-xxs font-bold">
              Qty
            </span>

            <button
              className="max-lg:w-1/3 p-4 h-full flex justify-center items-center"
              aria-label="decrease quantity"
              onClick={() => window.setState('productQuantity', Math.max(1, quantity - 1))}
            >
              <svg fill="none" height="4" viewBox="0 0 16 4" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 0.00927734H9.5H6.4994H0.5V3.00988H6.4994H9.5H15.5V0.00927734Z" fill="currentColor" />
              </svg>
            </button>

            <span className="max-lg:w-1/3 px-2.5 text-center">{quantity}</span>

            <button
              className="max-lg:w-1/3 p-4 h-full flex justify-center items-center"
              aria-label="increase quantity"
              onClick={() => window.setState('productQuantity', quantity + 1)}
            >
              <svg fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.7009 6.50928H9.70093V0.509277H6.70033V6.50928H0.700928V9.50988H6.70033V15.5093H9.70093V9.50988H15.7009V6.50928Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        )}

        {(!selectedVariant || (selectedVariant && selectedVariant.available)) && (
          <div className='relative'>
            <button
              className="button button--primary w-full min-h-[3.75rem]"
              disabled={!selectedVariant || !selectedVariant.available}
              onClick={selectedVariant && selectedVariant.available ? addItemToCart : () => {}}
            >
              {buttonMessage}
            </button>
            {errorMessage && (<p className='text-error text-xs mt-2 absolute'>{errorMessage}</p>)}
          </div>
        )}
      </div>

      {!selectedVariant && <p className="text-xs text-color-7 mt-2">{data.unavailableMessage}</p>}

      {selectedVariant && !selectedVariant.available && (
        <a className="button button-normal button--secondary w-full min-h-[3.75rem] klaviyo-bis-trigger" href="#">
          Notify Me When Available
        </a>
      )}
    </div>
  );
};

export default AddToCart;
