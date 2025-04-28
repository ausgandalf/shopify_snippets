import React, { useEffect, useState, useRef } from 'react';

import { addEffect } from '../../../utils/Effects.js';

window.setState('purchaseFrequency', 'one-time');
window.setState('purchaseSellingPlan', null);
window.setState('subscriptionPrice', null);

const SubscriptionWidget = () => {
  const { product } = window.eHS;
  const [tooltip, setTooltip] = useState(false);
  const learnRef = useRef(null);
  const tooltipRef = useRef(null);
  const [selectedVariant, setSelectedVariant] = useState(window.state.selectedVariant || false);
  const [purchaseFrequency, setPurchaseFrequency] = useState(window.state.purchaseFrequency || false);
  const [purchaseSellingPlan, setPurchaseSellingPlan] = useState(window.state.purchaseSellingPlan || false);
  const [price, setPrice] = useState(selectedVariant ? selectedVariant.price : product.price);
  const [subscriptionPrice, setSubscriptionPrice] = useState(window.state.subscriptionPrice || false);

  const isProProgram = window.eHS.customerTags && window.eHS.customerTags.includes('ExpertVoice');
  const siteWideDiscount = window.eHS.sideWideDiscount;
  const includeProDiscount = product.tags && !product.tags.includes('exclude-pro-discount');
  const includeSiteDiscount = product.tags && !product.tags.includes('exclude-sitewide-discount');

  const sellingPlans = product.selling_plan;
  const percentOff = sellingPlans[0]?.selling_plans[0]?.price_adjustments[0]?.value;

  const setPriceData = (variant) => {
    variant = variant || product;

    if (isProProgram && includeProDiscount) {
      setPrice(variant.price * 0.7);
    } else if (siteWideDiscount && includeSiteDiscount) {
      setPrice(variant.price * ((100 - siteWideDiscount) / 100));
    } else {
      setPrice(variant.price);
    }
  };

  useEffect(addEffect('selectedVariant', setSelectedVariant), []);
  useEffect(addEffect('purchaseFrequency', setPurchaseFrequency), []);
  useEffect(addEffect('purchaseSellingPlan', setPurchaseSellingPlan), []);
  useEffect(addEffect('subscriptionPrice', setSubscriptionPrice), []);

  const setOneTime = () => {
    window.setState('purchaseFrequency', 'one-time');
    window.setState('purchaseSellingPlan', null);
    window.setState('subscriptionPrice', null);
  };

  const setSubscription = () => {
    window.setState('purchaseFrequency', 'subscription');
    window.setState('purchaseSellingPlan', sellingPlans[0]?.selling_plans[0]?.id);
    window.setState('subscriptionPrice', Number((selectedVariant.price * (100 - percentOff)) / 100));
  };

  const setLearnButtonTrigger = () => {
    learnRef.current.addEventListener('click', (e) => {
      e.preventDefault();
      setTooltip(!tooltip);
    });

    if (window.innerWidth >= 1024) {
      learnRef.current.addEventListener('mouseover', (e) => {
        e.preventDefault();
        setTooltip(true);
      });

      learnRef.current.addEventListener('mouseout', (e) => {
        e.preventDefault();
        setTooltip(false);
      });
    }
  };

  useEffect(() => {
    window.onclick = function (event) {
      if (tooltip && tooltipRef.current !== event.target && learnRef.current !== event.target) {
        setTooltip(false);
      }
    };
    setPriceData(selectedVariant);
  });

  useEffect(() => {
    setLearnButtonTrigger();

    window.addEventListener('resize', setLearnButtonTrigger);
    return () => {
      window.removeEventListener('resize', setLearnButtonTrigger);
    };
  }, []);

  return (
    <div className="product-subscription-widget mt-6">
      <p className="mb-7 caps-small">Delivery Frequency:</p>

      <div
        className={`px-3.5 py-4 flex items-center ${
          purchaseFrequency == 'one-time' ? 'border-2 border-color-1 bg-grey-1' : 'border border-grey-3'
        }`}
      >
        <input
          type="radio"
          name="purchase-frequency"
          id="one-time"
          value="one-time"
          defaultChecked={purchaseFrequency == 'one-time' ? true : false}
          onClick={() => setOneTime()}
        />

        <label htmlFor="one-time" className="grow flex items-center text-xs">
          <span className="font-bold">One Time</span>
          <span className="ml-auto font-bold">${(price / 100.0).toFixed(2)}</span>
        </label>
      </div>

      <div
        className={`mt-4 px-3.5 py-4 ${purchaseFrequency == 'subscription' ? 'border-2 border-color-1 bg-grey-1' : 'border border-grey-3'}`}
      >
        <div className="flex items-start">
          <input
            type="radio"
            name="purchase-frequency"
            id="subscribe-and-save"
            value="subscribe"
            className="mt-0.5 shrink-0"
            defaultChecked={purchaseFrequency == 'subscription' ? true : false}
            onClick={() => setSubscription()}
          />

          <label htmlFor="subscribe-and-save" className="grow">
            <p className="flex items-center text-xs">
              <span className="font-bold">Subscribe {percentOff && `& Save ${percentOff}`}%</span>
              <span className="ml-auto font-bold">
                <span className="line-through text-grey-7 pr-2">${(price / 100.0).toFixed(2)}</span>
                <span className="text-error">${((price * (100 - percentOff)) / 10000).toFixed(2)}</span>
              </span>
            </p>

            <div className="text-xs text-color-2">
              Change or cancel any time.{' '}
              <a ref={learnRef} className="relative">
                Learn more
                {tooltip && (
                  <div
                    ref={tooltipRef}
                    className="absolute w-64 border-2 border-color-2 px-6 py-4 text-color-2 z-1 bg-white left-full lg:left-1/2 -translate-x-1/2 bottom-full mb-1.5"
                  >
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-t-8 border-t-white drop-shadow-tooltip"></span>
                    <b>How subscriptions work:</b> Products are automatically delivered on your schedule. No obligation, modify or cancel
                    your subscription anytime.
                  </div>
                )}
              </a>
            </div>
          </label>
        </div>

        {purchaseFrequency == 'subscription' && sellingPlans && (
          <div className="relative mt-3">
            <div className="select-wrap w-full">
              <select
                data-frequency
                aria-label="select delivery frequency"
                className="!border-grey-3 caps-small py-2 w-full min-w-0"
                onChange={(event) => window.setState('purchaseSellingPlan', Number(event.target.value))}
                value={purchaseSellingPlan}
              >
                {sellingPlans.map((sellingPlan) => {
                  return (
                    <option value={sellingPlan.selling_plans[0].id} key={sellingPlan.selling_plans[0].id}>
                      {sellingPlan.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionWidget;
