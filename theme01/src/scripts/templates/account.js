import { setupAccountNavMobile } from '../components/AccountNav';
import { setupBackToAccountLink } from '../components/RechargePortal';

document.addEventListener('DOMContentLoaded', () => {
  setupAccountNavMobile();

  if (window.location.pathname.includes('/tools/recurring/portal/')) {
    setupBackToAccountLink();
  }
});
