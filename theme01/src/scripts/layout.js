// Style loading
import '../styles/theme.css';

// Components & Utils
import './utils/State';
import { setupObservers } from './utils/LazyLoad';
import { setupFormFields } from './components/FormErrors';
import { setupRebuyWidgetUpdate } from './components/RebuyWidget';
import contentModules from './components/contentModules';
import Modal from './components/Modal';
import QuickATC from './components/QuickATC';

// React Apps
// import './apps/inline-cart/index.jsx';
import './apps/email-signup/index.jsx';

/* =============== Sections ================ */
import Hero from './sections/hero';
import SiteHeader from './sections/siteHeader';
import BrandLogo from './sections/brandLogo';
import FourUp from './sections/fourUp.js';
import CategoryRow from './sections/categoryRow';
import ProductRecommendation from './sections/productRecommendation';

document.addEventListener('DOMContentLoaded', () => {
  setupObservers({});
  setupFormFields();

  Hero.init();
  SiteHeader.init();
  BrandLogo.init();
  CategoryRow.init();
  FourUp.init();
  contentModules.init();
  Modal.init();
  QuickATC.init();
  ProductRecommendation.init();

  // if (window.eHS.template != 'cart') {
  //   document.querySelectorAll('[href="/cart"]').forEach((link) => {
  //     link.addEventListener('click', (e) => {
  //       e.preventDefault();

  //       window.setState('cartOpen', true);
  //     });
  //   });
  // }
});

setupRebuyWidgetUpdate();

// Smooth scroll to all links with hash
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    var element = document.querySelector(this.getAttribute('href'));

    if (element) {
      e.preventDefault();
      var headerOffset = 150;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  });
});
