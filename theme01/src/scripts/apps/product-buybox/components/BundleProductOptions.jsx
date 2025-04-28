import React, { useState, useEffect, useRef } from 'react';

import { addEffect } from '../../../utils/Effects.js';
import { handleize } from '../../../utils/Strings.js';
import { resizeImage } from '../../../utils/Images.js';

const BundleProductOptions = () => {
  const { product } = window.eHS;

  const [optionState, setOptionState] = useState(window.state.selectedProductOptions || []);
  const [selectedVariant, setSelectedVariant] = useState(window.state.selectedVariant || false);
  const [baseStateOptions, setBaseStateOptions] = useState([]);

  useEffect(addEffect('selectedProductOptions', setOptionState), []);
  useEffect(addEffect('selectedVariant', setSelectedVariant), []);

  useEffect(() => {
    if (!baseStateOptions.length) {
      setBaseStates(optionState);
    }
  });

  const setBaseStates = (optionState) => {
    const baseStates = product.options.map((optionGroup) => {
      if (optionGroup.option.name != 'Flavor' && optionGroup.option.name != 'Color') {
        return optionGroup.option.values.find((value) => optionState.some((state) => state == value));
      }
    });

    const baseStateOptions = product.variants.filter((variant) => baseStates.find((baseState) => variant.title.includes(baseState)));

    if (baseStateOptions.length) {
      setBaseStateOptions(baseStateOptions);
    }

    return baseStateOptions;
  };

  const setSelectedOption = (optionGroup, optionValue) => {
    let newOptionState = [...optionState];
    const optionIndex = optionGroup.option.position - 1;

    newOptionState[optionIndex] = optionValue;

    const baseStateOptionsList = setBaseStates(newOptionState);
    const possibleOption = newOptionState.every((option) => baseStateOptionsList.find((baseOption) => baseOption.title.includes(option)));

    if (!possibleOption && baseStateOptionsList.length) {
      newOptionState = baseStateOptionsList[0].options;
    }

    window.setState('selectedProductOptions', newOptionState);
  };

  return (
    <div className="mt-6 border-b border-grey-5">
      {product.options.map((optionGroup, groupIndex) => {
        const optionList = optionGroup.option;
        const optionProduct = optionGroup.bundle_product;
        const optionSelectedVariant = optionProduct?.variants.find((variant) =>
          variant.title.includes(optionState[optionList.position - 1]),
        );

        return (
          <div className="flex gap-4 mb-8" key={`option-group-${groupIndex}`}>
            {optionProduct ? (
              <a href={`/products/${optionProduct.handle}`} className="inline-block max-w-[6.25rem]">
                {optionSelectedVariant ? (
                  <img
                    src={resizeImage(optionSelectedVariant.featured_image.src, 'x180')}
                    alt={optionProduct.featured_image.alt}
                    className="w-full object-cover"
                  />
                ) : (
                  <img
                    src={resizeImage(optionProduct.featured_image, 'x180')}
                    alt={optionProduct.featured_image.alt}
                    className="w-full object-cover"
                  />
                )}
              </a>
            ) : (
              <img
                src={resizeImage(selectedVariant.images[0].variant_image, 'x180')}
                alt={selectedVariant.images[0].alt}
                className="w-full max-w-[6.25rem] object-cover"
              />
            )}

            <div className="flex-1">
              {optionProduct ? (
                <a
                  href={`/products/${optionProduct.handle}`}
                  className="inline-block text-black font-bold no-underline mb-4 hover:underline hover:text-black"
                >
                  {optionList.name.split('(')[0].replace('[', '').replace(']', '')}
                </a>
              ) : (
                <div className="text-black font-bold mb-4 hover:text-black">
                  {optionList.name.split('(')[0].replace('[', '').replace(']', '')}
                </div>
              )}

              <div className="flex items-center mb-2">
                <span className="uppercase text-xxs font-bold text-grey-8 tracking-[0.14em]">
                  {optionList.name.replace(')', '').split('(')[1]}:
                </span>
                <span className="ml-2 text-xs text-grey-8">{optionState[optionList.position - 1]}</span>
              </div>

              <div className="select-wrap max-lg:max-w-xs max-lg:w-full">
                <select
                  onChange={(event) => setSelectedOption(optionGroup, event.target.value)}
                  value={optionState[optionList.position - 1]}
                  className="max-lg:w-full max-lg:min-w-0 max-lg:pr-10"
                >
                  {optionList.values.map((option) => (
                    <option key={`variant-option-${handleize(option)}`} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BundleProductOptions;
