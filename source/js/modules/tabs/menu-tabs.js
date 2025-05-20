const switchTabByClickMenu = () => {
  const priceParent = document.querySelector('[data-price-tabs="price-parent"]');
  if (!priceParent) {
    return;
  }

  const allGoodsTabs = priceParent.querySelectorAll('[data-price-tabs="price-element"]');
  const allGoodsControlList = document.querySelectorAll('[data-price-tabs="price-control"]');

  const priceLinks = document.querySelectorAll('[data-price-tabs="price-link"]');

  priceLinks.forEach((element, index) => {
    element.classList.remove('is-active');
    element.setAttribute('data-index', index);
  });

  priceLinks.forEach((priceLink) => {
    priceLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      const tabId = evt.target.getAttribute('data-index');
      allGoodsTabs.forEach((tab) => tab.classList.remove('is-active'));
      allGoodsControlList.forEach((tab) => tab.classList.remove('is-active'));

      const activeTab = allGoodsTabs[Number(tabId)];
      activeTab.classList.add('is-active');
      activeTab.scrollIntoView({behavior: 'smooth'});
      allGoodsControlList[Number(tabId)].classList.add('is-active');

    });
  });
};

export {switchTabByClickMenu};
