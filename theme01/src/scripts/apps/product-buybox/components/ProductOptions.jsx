import React, { useState, useEffect, useRef } from 'react';

import { addEffect } from '../../../utils/Effects.js';
import { handleize } from '../../../utils/Strings.js';

const RulerIcon = () => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.63219 7.55168L16.8957 22.8152L22.368 17.343L7.10443 2.07944L1.63219 7.55168ZM16.8957 20.7752L3.67219 7.55168L7.10443 4.11944L8.28005 5.29506L7.05567 6.51944L8.06348 7.52725L9.28786 6.30287L10.8235 7.83849L9.60003 9.06287L10.6078 10.0707L11.8322 8.84629L13.3678 10.3819L12.1435 11.6063L13.1513 12.6141L14.4 11.415L15.9356 12.9272L14.7112 14.1516L15.719 15.1594L16.9434 13.935L20.3279 17.3428L16.8957 20.7752Z"
      fill="#241E18"
    />
    <path d="M15.6845 17.8266L17.3814 16.1297L18.3995 17.1478L16.7026 18.8447L15.6845 17.8266Z" fill="#241E18" />
  </svg>
);

const ProductOptions = ({ data }) => {
  const { product, sizingChart } = window.eHS;
  const flavorBoxRef = useRef();
  const activeFlavorRef = useRef();
  const disableFlavorRef = useRef();
  const sizeChartModal = useRef(null);
  const flavorLayout = data.flavorLayout;

  const [optionState, setOptionState] = useState(window.state.selectedProductOptions || []);
  const [selectedVariant, setSelectedVariant] = useState(window.state.selectedVariant || false);
  const [baseStateOptions, setBaseStateOptions] = useState([]);
  const [hasSizingChart, setHasSizingChart] = useState();
  const [selectedFlavor, setSelectedFlavor] = useState();

  useEffect(addEffect('selectedProductOptions', setOptionState), []);
  useEffect(addEffect('selectedVariant', setSelectedVariant), []);

  useEffect(() => {
    if (!baseStateOptions.length) {
      setBaseStates(optionState);
    }

    if (product.options.find((option) => option.name == 'Size') && sizingChart) {
      const activeSizingChart = sizingChart.find((chart) => {
        const types = chart.productType.replace(' ', '').split(',');

        return types.includes(product.type) && product.tags.includes(chart.productTag);
      });

      setHasSizingChart(activeSizingChart);
    }

    const flavorOptions = product.options.find((option) => option.name == 'Flavor');

    if (flavorOptions) {
      const flavorSelected = flavorOptions.values.find((option) => optionState.includes(option));

      setSelectedFlavor(flavorSelected);
    }

    if (!flavorBoxRef.current || !activeFlavorRef.current) return;

    flavorBoxRef.current.scrollTo({
      top: activeFlavorRef.current.offsetTop,
      left: activeFlavorRef.current.offsetLeft,
    });
  });

  const openModal = (e) => {
    e.preventDefault();

    sizeChartModal.current.classList.add('active');

    // Lock Body scroll
    document.body.classList.add('overflow-hidden');
  };

  const closeModal = (e) => {
    e.preventDefault();

    sizeChartModal.current.classList.remove('active');

    // Lock Body scroll
    document.body.classList.remove('overflow-hidden');
  };

  const setBaseStates = (optionState) => {
    const baseStates = product.options.map((optionGroup) => {
      if (optionGroup.name != 'Flavor' && optionGroup.name != 'Color') {
        return optionGroup.values.find((value) => optionState.some((state) => state == value));
      }
    });

    const baseStateOptions = product.variants.filter((variant) => baseStates.find((baseState) => variant.title.includes(baseState)));

    if (baseStateOptions.length) {
      setBaseStateOptions(baseStateOptions);
    }

    return baseStateOptions;
  };

  const setSelectedOption = (optionGroup, option) => {
    let newOptionState = [...optionState];
    const optionIndex = optionGroup.position - 1;

    newOptionState[optionIndex] = option;

    const baseStateOptionsList = setBaseStates(newOptionState);
    const possibleOption = newOptionState.every((option) => baseStateOptionsList.find((baseOption) => baseOption.title.includes(option)));

    if (!possibleOption && baseStateOptionsList.length) {
      newOptionState = baseStateOptionsList[0].options;
    }

    if (optionGroup.name == 'Flavor') {
      setSelectedFlavor(option);
    }

    window.setState('selectedProductOptions', newOptionState);
  };

  const FlavorOption = ({ optionGroup }) =>
    flavorLayout == 'box' ? (
      <div className="relative max-lg:py-4 p-1.5 border border-grey-3 lg:border-grey-4 mb-6 lg:mb-10 before:content-[''] before:absolute before:right-1.5 before:z-1 before:top-0 before:h-full before:w-10 before:bg-gradient-to-r before:from-transparent before:via-30% before:via-[#ffffff96] before:to-white">
        <div
          className="product-option__flavor relative grid max-lg:grid-flow-col max-lg:max-w-[88vw] max-lg:grid-rows-3 grid-cols-[12rem] auto-cols-[12rem] lg:grid-cols-2 gap-4 max-lg:py-3 p-1.5 lg:max-h-56 max-lg:overflow-x-scroll lg:overflow-y-scroll"
          ref={flavorBoxRef}
        >
          {optionGroup.values.map((option) => {
            const hasOption = baseStateOptions.length
              ? baseStateOptions.find((optionState) => optionState.options.includes(option))
              : product.variants.find((variant) => variant.title.includes(option));

            return (
              hasOption && (
                <button
                  className={`group bg-white flex items-center gap-3 ${optionState.includes(option) ? 'flavor-active' : ''}`}
                  key={`variant-option-${option}`}
                  onClick={() => setSelectedOption(optionGroup, option)}
                  ref={optionState.includes(option) ? activeFlavorRef : disableFlavorRef}
                >
                  <div
                    className={`relative w-[3.75rem] h-[3.75rem] border-2 lg:group-hover:border-color-1 transition-colors ${
                      optionState.includes(option) ? 'border-color-1' : 'border-transparent'
                    } ${hasOption.available ? '' : 'grayscale'}`}
                  >
                    <span className={`swatch-image-${handleize(option)} bg-no-repeat bg-cover bg-center w-full h-full block`}></span>

                    {!hasOption.available && (
                      <span className="absolute top-1/2 left-1/2 w-[95%] h-[95%] -translate-x-1/2 -translate-y-1/2 bg-disabled-flavor bg-center bg-no-repeat bg-contain"></span>
                    )}
                  </div>
                  <span className={`flex-1 text-left font-bold text-xs ${hasOption.available ? '' : 'text-grey-7'}`}>{option}</span>
                </button>
              )
            );
          })}
        </div>
      </div>
    ) : (
      <div className="relative mb-6 lg:mb-10 select-wrap w-full">
        <select className="w-full" onChange={(e) => setSelectedOption(optionGroup, e.target.value)} value={selectedFlavor}>
          {optionGroup.values.map((option) => {
            const hasOption = baseStateOptions.length
              ? baseStateOptions.find((optionState) => optionState.options.includes(option))
              : product.variants.find((variant) => variant.title.includes(option));

            return (
              hasOption && (
                <option key={`variant-option-${option}`} value={option}>
                  {option}
                </option>
              )
            );
          })}
        </select>
      </div>
    );

  const ColorOption = ({ optionGroup }) => (
    <div className="flex flex-wrap gap-3 mb-6 lg:mb-10">
      {optionGroup.values.map((option) => {
        const hasOption = baseStateOptions.length
          ? baseStateOptions.find((optionState) => optionState.options.includes(option))
          : product.variants.find((variant) => variant.title.includes(option));

        return (
          hasOption && (
            <button
              className={`relative h-[3.125rem] w-[3.125rem] lg:hover:border-grey-8 transition-all ${
                optionState.includes(option) ? 'border-2 border-grey-8' : 'border border-grey-3'
              }`}
              key={`variant-option-${option}`}
              aria-label={option}
              onClick={() => setSelectedOption(optionGroup, option)}
            >
              {!hasOption.available && (
                <span className="absolute top-0 left-0 w-full h-full bg-disabled-flavor bg-center bg-no-repeat bg-contain"></span>
              )}

              <span className={`absolute inset-0.5 swatch-${handleize(option)}`}></span>
            </button>
          )
        );
      })}
    </div>
  );

  const DefaultOption = ({ optionGroup }) => (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-6 lg:mb-10">
      {optionGroup.values.map((option) => (
        <button
          className={`min-h-[3.125rem] py-3.5 text-xs font-bold lg:hover:border-color-1 transition-all ${
            optionState.includes(option) ? 'border-2 border-color-1' : 'border border-grey-3'
          }`}
          key={`variant-option-${option}`}
          onClick={() => setSelectedOption(optionGroup, option)}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="mt-6 border-b border-grey-5">
      {product.options.map((optionGroup, groupIndex) => {
        return (
          <div className="mt-4" key={`option-group-${groupIndex}`}>
            <div className="mb-4 flex items-center">
              <span className="uppercase text-xxs font-bold text-grey-8 tracking-[0.14em]">{optionGroup.name}:</span>
              <span className="ml-2 text-xs text-grey-8">{optionState[optionGroup.position - 1]}</span>
            </div>

            {{
              Flavor: <FlavorOption optionGroup={optionGroup} />,
              Color: <ColorOption optionGroup={optionGroup} />,
            }[optionGroup.name] || <DefaultOption optionGroup={optionGroup} />}

            {optionGroup.name == 'Size' && hasSizingChart && (
              <>
                <p className="flex items-center gap-2 -mt-2 lg:-mt-6 mb-6">
                  <RulerIcon />

                  <a href="#" onClick={openModal} className="font-bold text-xs text-color-2">
                    {hasSizingChart.ctaText ? hasSizingChart.ctaText : 'Sizing Chart/Specs'}
                  </a>
                </p>

                <div className="modal" ref={sizeChartModal}>
                  <div className="modal__container container">
                    <div className="modal__close bg-close bg-no-repeat bg-center w-5 h-5 bg-contain" onClick={closeModal}></div>

                    <div className="modal__inner bg-white py-8">
                      <img
                        className="col-start-3 lg:col-start-5 col-span-8 lg:col-span-4"
                        src={hasSizingChart.sizeChartImage}
                        alt={'Size chart for ' + selectedVariant.title}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <span className="modal__backdrop" onClick={closeModal}></span>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductOptions;
