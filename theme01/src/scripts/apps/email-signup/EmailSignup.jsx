import React, { useState } from 'react';

const EmailSignup = ({
  data: { backgroundColor, textColor, title, content, inputLabel, ctaLabel, successMessage, errorMessage, klaviyoListId },
}) => {
  const [successMessaging, setSuccessMessaging] = useState(false);
  const [errorMessaging, setErrorMessaging] = useState(false);
  const [email, setEmail] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('g', klaviyoListId);

    fetch('https://manage.kmail-lists.com/ajax/subscriptions/subscribe', {
      method: 'POST',
      body: formData,
    })
      .then((blob) => blob.json())
      .then((data) => {
        if (data.success) {
          setSuccessMessaging(successMessage);

          setTimeout(() => {
            setSuccessMessaging(false);
          }, 5000);
        } else {
          setErrorMessaging(true);
        }
      })
      .catch((err) => {
        setErrorMessaging(true);
        console.error(err);
      });
  };

  return (
    <div className="py-12" style={{ backgroundColor: backgroundColor }}>
      <div className="container flex max-lg:flex-col items-center gap-6">
        <div className="max-lg:text-center lg:flex-1">
          {title && <h5 className={textColor}>{title}</h5>}
          {content && <div className={`rte ${textColor}`} dangerouslySetInnerHTML={{ __html: content }}></div>}
        </div>
        {successMessaging ? (
          <span className={`alert success-alert justify-center w-full lg:flex-1`}>{successMessage}</span>
        ) : (
          <form
            className="flex flex-col gap-2 lg:flex-1"
            onSubmit={(e) => {
              handleFormSubmit(e);
            }}
          >
            <div className="flex max-lg:flex-col gap-2 items-start">
              <input
                type="email"
                name="email"
                className="email-signup__input"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder={inputLabel}
              />
              <button
                className="py-3 px-8 w-full lg:w-auto min-w-[12.5rem] bg-color-5 text-black self-stretch font-primary uppercase cursor-pointer hover:opacity-90"
                type="submit"
              >
                {ctaLabel}
              </button>
            </div>
            {errorMessaging && <span className="input-error mt-0.5">{errorMessage}</span>}
          </form>
        )}
      </div>
    </div>
  );
};

export default EmailSignup;
