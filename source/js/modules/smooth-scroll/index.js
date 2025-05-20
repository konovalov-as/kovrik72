const initSmoothScroll = () => {
  document.querySelectorAll('[data-smooth="scroll"]').forEach((anchor) => {
    anchor.addEventListener('click', function (evt) {
      evt.preventDefault();

      document.querySelector(evt.target.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });
};

export {initSmoothScroll};
