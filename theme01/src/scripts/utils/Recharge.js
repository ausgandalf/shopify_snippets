import { addToCart, removeFromCart } from './Cart.js';

export const upgradeToSubscription = (lineItem, sellingPlan) => {
  const { id, quantity } = lineItem;
  removeFromCart(lineItem, false)
    .then(() => {
      return addToCart({ id, quantity, sellingPlan });
    });
};

export const switchToOneTime = (lineItem) => {
  const { id, quantity } = lineItem;
  removeFromCart(lineItem, false)
    .then(() => {
      return addToCart({ id, quantity });
    });
};
