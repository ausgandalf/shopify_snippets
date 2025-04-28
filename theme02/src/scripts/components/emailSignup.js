const dom = {};
const qs = {
  emailForm: 'data-email-signup-form',
  emailInput: 'data-email-signup-address',
  emailError: 'data-email-signup-error',
  emailSuccess: 'data-email-signup-success',
};

const cacheDom = () => {
  Object.keys(qs).forEach((key) => {
    dom[key] = document.querySelector(`[${qs[key]}]`);
  });
};

const submitForm = (event) => {
  event.preventDefault();

  const formData = new FormData();
  formData.append('email', dom.emailInput.value);
  formData.append('g', dom.emailForm.dataset.listId);

  fetch('//manage.kmail-lists.com/ajax/subscriptions/subscribe', {
    method: 'POST',
    body: formData
  })
    .then((blob) => blob.json())
    .then((data) => {
      if (data.success == true) {
        dom.emailSuccess.classList.remove('hidden');
        dom.emailForm.classList.add('hidden');
      } else {
        dom.emailError.innerHTML = data.errors.join(', ');
        dom.emailError.classList.remove('hidden');
      }
    })
    .catch((err) => {
      dom.emailError.innerHTML = 'Something Went Wrong!';
      dom.emailError.classList.remove('hidden');
      console.log(err);
    });

    return false;
};

export const setupEmailSignup = () => {
  cacheDom();

  dom.emailForm.addEventListener('submit', submitForm);
};