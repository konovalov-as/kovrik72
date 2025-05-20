import {Burger} from './modules/header/burger.js';
import {StickyHeader} from './modules/header/sticky-header.js';

window.addEventListener('DOMContentLoaded', () => {
  // Modules
  // ---------------------------------
  const burger = new Burger();
  burger.init();
  const stickyHeader = new StickyHeader();
  stickyHeader.init();
});
