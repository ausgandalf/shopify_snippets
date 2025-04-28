/*
 * Caches the DOM for a given component.
 *
 * @param {Object} dom: the object that will hold all saved nodes
 * @param {Object} selectors: an object holding all queries for single element queries. Keys are names to reference by and value is the selector.
 * @param {Object} selectorsAll: an object holding all queries for multi element queries. Keys are names to reference by and value is the selector.
 * @param {boolean} assumeAttributes: whether the function should build queries with square brackets for data attribute querying.
 *
 *
 * Example:
 *   const dom = {};
 *   const qs = {
 *     modal: 'data-recharge-modal',
 *     title: 'data-recharge-modal-title',
 *     content: 'data-recharge-modal-content',
 *   };
 *   const qsAll = {
 *     closeButtons: 'data-close-recharge-modal'
 *   };
 *
 *   ...
 *
 *   cacheDom(dom, qs, qsAll);
 *
 */

export const cacheDom = (dom, selectors = {}, selectorsAll = {}, assumeAttributes = true) => {
  Object.keys(selectors).forEach((selectorName) => {
    const selector = selectors[selectorName];
    const qs = assumeAttributes ? `[${selector}]` : selector;
    dom[selectorName] = document.querySelector(qs) || false;
  });

  Object.keys(selectorsAll).forEach((selectorName) => {
    const selector = selectorsAll[selectorName];
    const qs = assumeAttributes ? `[${selector}]` : selector;
    dom[selectorName] = [...document.querySelectorAll(qs)];
  });
};

/*
 * Returns object with the different query parameters
 *
 * Example:
 *    if URL contains ?view=alternate&pageOn=3
 *    URLQueryParams().pageOn would equal "3"
 */
export const URLQueryParams = () => {
  return new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
};

export const AllQueryParams = () => {
  return new URLSearchParams(window.location.search).entries();
}