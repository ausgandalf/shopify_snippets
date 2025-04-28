import React from 'react';

import { upgradeToSubscription, switchToOneTime } from '../../utils/Recharge';

const SubscriptionUpsell = (props) => {
  const lineItem = props.data;
  const planOptions = lineItem.product.selling_plan[0].selling_plans;
  const selectedPlanName = lineItem.selling_plan_allocation ? lineItem.selling_plan_allocation.selling_plan.name : false;
  const selectedPlan = lineItem.product.selling_plan[0].selling_plans.find((plan) => {
    return selectedPlanName === plan.name;
  });
  const percentOff = planOptions[0]?.price_adjustments[0]?.value;

  const setNewSubscriptionPlan = (event) => {
    const newPlan = event.target.value;
    if (newPlan === 'one-time') {
      switchToOneTime(lineItem);
    } else {
      upgradeToSubscription(lineItem, newPlan);
    }
  };

  return (
    <div className="mt-4">
      {selectedPlan ? (
        <div className="w-full select-wrap">
          <select
            value={selectedPlan.id}
            onChange={(event) => {
              props.swapSubscription();
              setNewSubscriptionPlan(event);
            }}
            className="w-full small-text"
          >
            <optgroup label="One Time">
              <option value="one-time">One Time</option>
            </optgroup>
            <optgroup label="Subscribe & Save">
              {planOptions.map((option, optionIndex) => (
                <option key={`selling-plan-${optionIndex}`} value={option.id}>
                  {option.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
      ) : (
        <button
          className="w-full button-normal button button--secondary px-2 py-3 text-xs min-h-[2.5rem]"
          onClick={() => {
            props.swapSubscription();
            upgradeToSubscription(lineItem, planOptions[0].id);
          }}
        >
          <span className="lg:hidden">Subscribe & Save {percentOff}%</span>
          <span className="max-lg:hidden">Upgrade to Subscription & Save {percentOff}%</span>
        </button>
      )}
    </div>
  );
};

export default SubscriptionUpsell;
