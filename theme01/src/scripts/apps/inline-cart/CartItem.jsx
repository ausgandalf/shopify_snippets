import React, { useEffect, useState } from 'react';

import { updateCart } from '../../utils/Cart.js';
import { resizeImage } from '../../utils/Images.js';
import { money } from './utils/helpers';

const RemoveIcon = () => (
  <svg width="19" height="21" viewBox="0 0 19 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.8544 2.96533H1.52034C1.19879 2.96533 0.937378 3.22565 0.937378 3.54829C0.937378 3.87094 1.19878 4.13125 1.52034 4.13125H3.27034V17.5483C3.27034 18.3216 3.57769 19.0642 4.12456 19.6111C4.67143 20.158 5.4141 20.4653 6.18738 20.4653H13.1874C13.9607 20.4653 14.7033 20.158 15.2502 19.6111C15.7971 19.0642 16.1044 18.3216 16.1044 17.5483V4.13125H17.8544C18.176 4.13125 18.4374 3.87094 18.4374 3.54829C18.4374 3.22565 18.176 2.96533 17.8544 2.96533ZM14.9374 17.5483C14.9374 18.5152 14.1542 19.2983 13.1874 19.2983H6.18738C5.22051 19.2983 4.43738 18.5152 4.43738 17.5483V4.13125H14.9374V17.5483Z"
      fill="currentColor"
    />
    <path
      d="M7.35441 1.7983H12.0215H12.0204C12.343 1.7983 12.6044 1.53689 12.6044 1.21534C12.6044 0.892694 12.343 0.631287 12.0204 0.631287H7.35444C7.03179 0.631287 6.77039 0.892692 6.77039 1.21534C6.77039 1.53689 7.03177 1.7983 7.35441 1.7983Z"
      fill="currentColor"
    />
    <path
      d="M7.93743 15.7983C8.09165 15.7983 8.24039 15.7371 8.34979 15.6277C8.45918 15.5183 8.52041 15.3696 8.52041 15.2153V8.21534C8.52041 7.89269 8.2601 7.63129 7.93745 7.63129C7.61481 7.63129 7.35449 7.89269 7.35449 8.21534V15.2153C7.35449 15.3696 7.41574 15.5183 7.52512 15.6277C7.63449 15.7371 7.7832 15.7983 7.93743 15.7983Z"
      fill="currentColor"
    />
    <path
      d="M11.4374 15.7983C11.5916 15.7983 11.7404 15.7371 11.8498 15.6277C11.9592 15.5183 12.0204 15.3696 12.0204 15.2153V8.21534C12.0204 7.89269 11.7601 7.63129 11.4375 7.63129C11.1148 7.63129 10.8545 7.89269 10.8545 8.21534V15.2153C10.8545 15.3696 10.9157 15.5183 11.0251 15.6277C11.1345 15.7371 11.2832 15.7983 11.4374 15.7983Z"
      fill="currentColor"
    />
  </svg>
);

const CartItem = ({ data }) => {
  const { item, itemIndex, setCartProcessing } = data;
  const [price, setPrice] = useState(item.price);
  const [comparePrice, setComparePrice] = useState(item.variant.compare_at_price);
  const [priceMessage, setPriceMessage] = useState(item.message);
  const [giftProduct, setGiftProduct] = useState(false);
  const hiddenProduct = item.product.tags.includes('Hidden');
  const isProProgram = window.eHS.customerTags && window.eHS.customerTags.includes('ExpertVoice');
  const siteWideDiscount = window.eHS.sideWideDiscount;
  const includeSiteDiscount = item.product.tags && !item.product.tags.includes('exclude-sitewide-discount');

  const cleanedOptions = (item) => {
    if (!item.options_with_values) return [];
    return item.options_with_values.filter((option) => {
      return option.value !== 'Default Title';
    });
  };

  const updateLineItem = (item, quantity) => {
    updateCart({ key: item.key, quantity }).then(() => setCartProcessing(false));
  };

  const getSelectedPlan = (lineItem) => {
    return lineItem.selling_plan_allocation
      ? lineItem.selling_plan_allocation.selling_plan.name.replace('Delivery every ', '')
      : 'One-time';
  };

  const setPriceData = () => {
    if (!isProProgram && siteWideDiscount && includeSiteDiscount) {
      if (!item.variant.compare_at_price) {
        setComparePrice(item.price);
        setPrice(item.price * ((100 - siteWideDiscount) / 100));
        setPriceMessage('Sale');

        if (item.selling_plan_allocation) {
          setComparePrice(item.variant.price * ((100 - siteWideDiscount) / 100));
        }
      }
    } else {
      setComparePrice(item.variant.compare_at_price);
      setPrice(item.price);
      setPriceMessage(item.message);

      if (item.selling_plan_allocation) {
        setComparePrice(item.variant.price);
      }
    }
  };

  if (hiddenProduct && item.quantity > 1) {
    updateLineItem(item, 1);
  }

  useEffect(() => {
    setGiftProduct(false);
    setPriceData();

    if (item.properties && (item.properties['_attribution'] == 'Rebuy Gift with Purchase' || item.properties['_free_sampler'] == "true")) {
      setGiftProduct(true);
    }
  });

  return (
    <div
      className={`flex justify-between max-lg:items-start border-b max-lg:last:border-b-0 border-grey-4 pb-6 max-lg:last:pb-3 lg:pb-8 my-6 lg:my-8 max-lg:px-5 gap-x-3 lg:gap-16 ${
        data.cartProcessing ? 'opacity-40 pointer-events-none' : ''
      }`}
    >
      {!hiddenProduct ? (
        <a className="shrink-0" href={`/products/${item.product.handle}/`}>
          <img
            src={resizeImage(item.image, 'x180')}
            alt={item.title}
            className="h-20 lg:h-36 w-20 lg:w-36 object-contain object-center bg-light-grey"
          />
        </a>
      ) : (
        <div className="shrink-0">
          <img
            src={resizeImage(item.image, 'x180')}
            alt={item.title}
            className="h-20 lg:h-36 w-20 lg:w-36 object-contain object-center bg-light-grey"
          />
        </div>
      )}

      <div className="grow flex max-lg:items-center max-lg:flex-wrap max-lg:gap-y-5 justify-between lg:max-w-[37rem] xl:max-w-[53rem]">
        <div className="max-lg:w-full max-lg:flex max-lg:gap-3 max-lg:justify-between lg:flex-1 lg:max-w-[15rem] max-lg:items-start">
          <div>
            {!hiddenProduct ? (
              <a className="no-underline" href={`/products/${item.product.handle}/`}>
                <h4 className="uppercase text-xs lg:text-base text-grey-8 mb-1">{item.product.title}</h4>
              </a>
            ) : (
              <h4 className="uppercase text-xs lg:text-base text-grey-8 mb-1">{item.product.title}</h4>
            )}

            {cleanedOptions(item).map((option, optionIndex) => (
              <p className="text-xs text-grey-8" key={`item-${itemIndex}-option-${optionIndex}`}>
                <span>{option.name}:</span> {option.value}
              </p>
            ))}

            {item.product.selling_plan.length > 0 && <p className="text-xs text-grey-8">{getSelectedPlan(item)}</p>}

            {priceMessage && <p className="inline-block caps-small bg-color-2 text-white pl-1.5 pr-1 my-2">{priceMessage}</p>}

            {item.original_price > item.price ? (
              <p className="flex items-center gap-1.5 text-xs tracking-[0.16em] mt-2">
                <span className="font-bold text-error">${money(item.price)}</span>
                <span className="line-through">${money(item.original_price)}</span>
              </p>
            ) : comparePrice && comparePrice > price ? (
              <p className="flex items-center gap-1.5 text-xs tracking-[0.16em] mt-2">
                <span className="font-bold text-error">${money(price)}</span>
                <span className="line-through">${money(comparePrice)}</span>
              </p>
            ) : (
              <p className="text-xs font-bold tracking-[0.16em] mt-2">${money(item.price)}</p>
            )}
          </div>

          <button
            className="lg:hidden"
            aria-label={`Remove ${item.product.title} from cart`}
            onClick={() => {
              data.setCartProcessing(true);
              updateLineItem(item, 0);
            }}
          >
            <RemoveIcon />
          </button>
        </div>

        <div className="max-lg:self-start pt-2 min-w-[1px]">
          {!hiddenProduct && !giftProduct && (
            <div className="relative flex items-center border border-grey-3">
              <label className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-white px-1 uppercase text-xxs font-bold tracking-[0.16em] max-lg:hidden">
                Qty
              </label>
              <button
                className="p-4"
                aria-label="decrease quantity"
                onClick={() => {
                  data.setCartProcessing(true);
                  updateLineItem(item, item.quantity - 1);
                }}
              >
                <svg className="w-3" fill="none" height="4" viewBox="0 0 16 4" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.5 0.00927734H9.5H6.4994H0.5V3.00988H6.4994H9.5H15.5V0.00927734Z" fill="currentColor" />
                </svg>
              </button>
              <span className="px-2.5">{item.quantity}</span>
              <button
                className="p-4"
                aria-label="increase quantity"
                onClick={() => {
                  data.setCartProcessing(true);
                  updateLineItem(item, item.quantity + 1);
                }}
              >
                <svg className="w-3" fill="none" height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15.7009 6.50928H9.70093V0.509277H6.70033V6.50928H0.700928V9.50988H6.70033V15.5093H9.70093V9.50988H15.7009V6.50928Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="lg:flex-1 lg:max-w-[10rem] text-right flex flex-col justify-between items-end">
          {item.original_line_price > item.line_price ? (
            <p className="flex flex-col tracking-[0.11em]">
              <span className="text-sm leading-6 font-bold text-error">${money(item.line_price * item.quantity)}</span>
              <span className="text-xs leading-6 line-through">${money(item.original_line_price * item.quantity)}</span>
              <span className="text-xs leading-6 text-error italic tracking-normal">
                ${money((item.original_line_price - item.line_price) * item.quantity)} Savings
              </span>
            </p>
          ) : comparePrice && comparePrice > price ? (
            <p className="flex flex-col tracking-[0.11em]">
              <span className="text-sm leading-6 font-bold text-error">${money(price * item.quantity)}</span>
              <span className="text-xs leading-6 line-through">${money(comparePrice * item.quantity)}</span>
              <span className="text-xs leading-6 text-error italic tracking-normal">
                ${money((comparePrice - price) * item.quantity)} Savings
              </span>
            </p>
          ) : (
            <p className="text-sm leading-6 font-bold tracking-[0.11em]">${money(item.price * item.quantity)}</p>
          )}

          <button
            className="max-lg:hidden"
            aria-label={`Remove ${item.product.title} from cart`}
            onClick={() => {
              data.setCartProcessing(true);
              updateLineItem(item, 0);
            }}
          >
            <RemoveIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
