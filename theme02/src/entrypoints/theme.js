// Style loading
import './theme.css'

// Components & Utils
import { setupFormFields } from '../scripts/components/formErrors.js'
import { setupEmailSignup } from '../scripts/components/emailSignup.js'
import { setupProductBadges } from '../scripts/components/badges.js'
import { setupBuybox } from '../scripts/components/buybox.js'
import { setupAccordions } from '../scripts/components/accordions.js'
import { initQuickBuy } from '../scripts/components/quickBuy.js'
import { initSmoothLinks } from '../scripts/utils/smoothLinks.js'
import { setupRebuyScripts } from '../scripts/components/rebuy.js'

// Sections
import Header from '../scripts/sections/header.js'
import Account from '../scripts/sections/account.js'
import SideCart from '../scripts/sections/side-cart.js';
import {setupHeroSection} from '../scripts/sections/hero.js';
import {setupFiftySection} from '../scripts/sections/fifty-fifty.js';
import { initGeneralContent } from '../scripts/sections/general-content.js'
import Blog from '../scripts/sections/blog.js';

/* =============== Sections ================ */
document.addEventListener('DOMContentLoaded', () => {
  Header.init();
  Account.init();
  SideCart.init();
  initQuickBuy();
  setupHeroSection();
  setupFormFields();
  setupEmailSignup();
  initSmoothLinks();
  initGeneralContent();
  setupProductBadges();
  setupAccordions();
  setupBuybox();
  Blog.init();
  setupFiftySection();
  setupRebuyScripts();
})