import PhotoSwipe from './photoswipe.esm.min.js';
import PhotoSwipeLightbox from './photoswipe-lightbox.esm.min.js';

let photoswipe;
const initPhotoswipe = () => {
  photoswipe = new PhotoSwipeLightbox({
    gallery: '.goods-gallery',
    children: 'a',
    pswpModule: PhotoSwipe,
    arrowPrev: true,
    arrowNext: true,
    zoom: true,
    closeOnScroll: false,
  });

  photoswipe.init();

  window.photoswipe = photoswipe;
};

export {initPhotoswipe, photoswipe};
