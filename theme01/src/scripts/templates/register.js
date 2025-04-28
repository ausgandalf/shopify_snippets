import Cookies from 'js-cookie';

const dom = {};

const selectors = {
  mainRegister: '.main-register',
  createCustomerForm: '#create_customer',
  customerFirstName: 'input[name="customer[first_name]"]',
  customerLastName: 'input[name="customer[last_name]"]',
  customerEmail: 'input[name="customer[email]"]',
};

const cacheDom = () => {
  dom.mainRegister = document.querySelector(selectors.mainRegister);
  dom.createCustomerForm = document.querySelector(selectors.createCustomerForm);
  dom.customerFirstName = document.querySelector(selectors.customerFirstName);
  dom.customerLastName = document.querySelector(selectors.customerLastName);
  dom.customerEmail = document.querySelector(selectors.customerEmail);
};

const init = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const siteRef = urlParams.get('site');
  const firstName = urlParams.get('firstName');
  const lastName = urlParams.get('lastName');
  const email = urlParams.get('email');

  if (siteRef == 'expertvoice') {
    if (dom.createCustomerForm) {
      const inputField = '<input type="hidden" id="customer_tags" name="customer[tags]" value="ExpertVoice"/>';

      dom.createCustomerForm.insertAdjacentHTML('afterbegin', inputField);
    }

    if (dom.customerFirstName && firstName) {
      dom.customerFirstName.value = firstName;
    }

    if (dom.customerLastName && lastName) {
      dom.customerLastName.value = lastName;
    }

    if (dom.customerEmail && email) {
      dom.customerEmail.value = email;
    }

    if (dom.mainRegister) {
      dom.mainRegister.insertAdjacentHTML(
        'afterbegin',
        '<p class="w-full max-w-[30rem] bg-white p-6 mx-auto mb-4"><b>Hey there, ' +
          firstName +
          '!</b> Please create your account below. If you already have an account, no need to recreate one. If you are having any issues, please call or email us at <a href="mailto:support@whitelabel.com">support@whitelabel.com</a>.</p>',
      );
    }

    Cookies.set('site_referer', 'expertvoice', { expires: 7 });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  cacheDom();
  init();
});
