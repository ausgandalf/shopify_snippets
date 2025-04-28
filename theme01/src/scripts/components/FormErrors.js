import { cacheDom } from '../utils/QuerySelectors.js';

const dom = {};
const qs = {
  inputs: 'data-error-message',
  errorMessage: 'data-error-for',
};

const clearOldMessage = (input) => {
  input.classList.remove('input-invalid');
  const inputID = input.getAttribute('id');
  const targetParent = input.parentNode;
  const oldMessageEl = document.querySelector(`[${qs.errorMessage}="${inputID}"]`);
  oldMessageEl && targetParent.removeChild(oldMessageEl);
};

const setupFormFieldListener = (input) => {
  if (input.disabled) return;

  input.addEventListener('invalid', (event) => {
    // get our element parent to manipulate
    const targetParent = input.parentNode;
    // get details for setting message
    const message = input.getAttribute(qs.inputs);
    const inputID = input.getAttribute('id');
    // clear any old messages
    clearOldMessage(input);
    // add new message
    input.classList.add('input-invalid');
    const messageEl = document.createElement('div');
    messageEl.setAttribute(qs.errorMessage, inputID);
    messageEl.classList.add('input-error');
    messageEl.innerHTML = message;
    targetParent.insertBefore(messageEl, input.nextSibling);
  });

  // on input change, remove old errors
  input.addEventListener('change', (event) => {
    const input = event.target;
    clearOldMessage(input);
  });
};

export const setupFormFields = () => {
  cacheDom(dom, {}, qs);
  dom.inputs.forEach((input) => setupFormFieldListener(input));
};
