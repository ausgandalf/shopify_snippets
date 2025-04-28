export const getCart = (setState = true) => {
  return fetch('/cart?view=json')
    .then((blob) => blob.json())
    .then((cart) => {
      window.eHS.cart = cart;

      setState && window.setState('cartState', cart);
      return cart;
    });
};

export const addToCart = async ({ id, quantity, properties = {}, sellingPlan = false }) => {
  const item = { id, quantity, properties };
  if (sellingPlan) {
    item.selling_plan = sellingPlan;
  }

  const response = await fetch(window.Shopify.routes.root + 'cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [item],
    }),
  })
  .then(response => {
    return response.json();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  if (typeof response.status === 'undefined') {
    getCart();
    if (window.eHS.template != 'cart') {
      window.setState('cartOpen', true);
    }
  }

  return response;
};

window.atc = (id) => {
  addToCart({
    id,
    quantity: 1,
  });
};

export const updateCart = ({ key = false, variantID = false, quantity = 0, attributes = false, note = false }) => {
  const updatesBody = { updates: {} };

  if (variantID) {
    updatesBody.updates[variantID] = quantity;
  }

  if (attributes) {
    updatesBody.attributes = attributes;
  }

  if (key) {
    updatesBody.updates[key] = quantity;
  }

  if (note) {
    updatesBody.note = note;
  }

  return fetch('/cart/update.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatesBody),
  })
    .then((blob) => blob.json())
    .then((updates) => {
      return getCart();
    });
};

export const removeFromCart = (lineItem, setState = true) => {
  return fetch('/cart/change.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: lineItem.key,
      quantity: 0,
    }),
  })
    .then((blob) => blob.json())
    .then((data) => {
      if (setState) getCart(setState);
    });
};
