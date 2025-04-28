import React from 'react';
import * as ReactDOM from 'react-dom/client';
import EmailSignup from './EmailSignup.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const appContainer = document.querySelector('#EmailSignup');
  if (!appContainer) return;

  const propsRaw = appContainer.getAttribute('props');
  const finalProps = JSON.parse(propsRaw);

  const root = ReactDOM.createRoot(appContainer);
  root.render(<EmailSignup data={finalProps} />);
});
