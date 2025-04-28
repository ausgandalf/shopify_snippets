const dom = {};

const selectors = {
  signInContainer: '.account-login',
  forgotContainer: '.forgot-password',
  forgotForm: '#recover_form',
  forgotSubmit: '#recover_form .form-submit',
  goToForgotBtn: '[data-go-forgot]',
  goToSignInBtn: '[data-go-signin]',
};

const cacheDom = () => {
  dom.signInContainer = document.querySelector(selectors.signInContainer);
  dom.forgotContainer = document.querySelector(selectors.forgotContainer);
  dom.forgotForm = document.querySelector(selectors.forgotForm);
  dom.forgotSubmit = document.querySelector(selectors.forgotSubmit);
  dom.goToForgotBtn = document.querySelector(selectors.goToForgotBtn);
  dom.goToSignInBtn = document.querySelector(selectors.goToSignInBtn);
};

const resetForgotForm = () => {
  dom.forgotContainer.querySelector('#RecoverEmail').value = '';
};

const bindEvents = () => {
  dom.goToForgotBtn &&
    dom.goToForgotBtn.addEventListener('click', (e) => {
      resetForgotForm();
      goToForgot();
    });
  dom.goToSignInBtn &&
    dom.goToSignInBtn.addEventListener('click', (e) => {
      window.location.hash = '';
      goToSignIn();
    });
};

const goToForgot = () => {
  dom.signInContainer && dom.signInContainer.classList.add('hidden');
  dom.forgotContainer && dom.forgotContainer.classList.remove('hidden');
};

const goToSignIn = () => {
  dom.forgotContainer && dom.forgotContainer.classList.add('hidden');
  dom.signInContainer && dom.signInContainer.classList.remove('hidden');
};

const init = () => {
  // Allow deep linking to recover password form
  if (window.location.hash === '#recover') {
    goToForgot();
  } else {
    goToSignIn();
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const ref = urlParams.get('site');

  if (ref == 'expertvoice') {
    window.location.href = `/account/register${queryString}`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  cacheDom();
  bindEvents();
  init();
});
