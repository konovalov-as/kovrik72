import {mobileVhFix} from './utils/mobile-vh-fix.js';
// import {initModals} from './modules/modals/init-modals';
// import {Form} from './modules/form-validate/form';
// import {CustomSelect} from './modules/select/custom-select';
// import {uploadFile, uploadImageDrop} from './modules/input-file/init-upload';

// import {initLocomotiveScroll} from './modules/header/init-locomotive-scroll.js';
import {initTabs} from './modules/tabs/init-tabs.js';
import {initAccordions} from './modules/accordion/init-accordion.js';
import {initPhotoswipe} from './vendor/PhotoSwipe/init-photosipe.js';
import {switchTabByClickMenu} from './modules/tabs/menu-tabs.js';
import {initSmoothScroll} from './modules/smooth-scroll/index.js';
import {initMap} from './modules/yandexmap/map.js';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  mobileVhFix();
  // initLocomotiveScroll();
  initSmoothScroll();

  // Modules
  // ---------------------------------


  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    // uploadFile();
    // uploadImageDrop();
    // const select = new CustomSelect();
    // select.init();
    // const form = new Form();
    // window.form = form;
    // form.init();

    // initSlider();
    initTabs();
    initAccordions();
    initPhotoswipe();
    switchTabByClickMenu();
    initMap();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
