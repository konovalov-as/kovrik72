// export const initYandexMap = () => {
//
//
//   initMap();
//
//   async function initMap() {
//     // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
//     await ymaps3.ready;
//
//     const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapControls} = ymaps3;
//
//     // // Import the package to add a default marker
//     // const {YMapDefaultMarker} = await ymaps3.import('@yandex/ymaps3-default-ui-theme');
//
//     let popupWithImage = null;
//     let popupWithButtons = null;
//
//
//     // Иницилиазируем карту
//     const map = new YMap(
//       // Передаём ссылку на HTMLElement контейнера
//       document.getElementById('map'),
//
//       // Передаём параметры инициализации карты
//       {
//         location: {
//           // Координаты центра карты
//           center: [65.565796, 57.142643],
//
//           // Уровень масштабирования
//           zoom: 17
//         }
//       }
//     );
//
//     // Добавляем слой для отображения схематической карты
//     map.addChild(new YMapDefaultSchemeLayer());
//
//
//
//
//
//
//
//
//
//
//   }
//
// }


// блок с картой
const mapBox = document.querySelector('[data-mapbox]');

export const initMap = function () {
  if (!mapBox) {
    return;
  }

  const mapCenterCoords = {
    x: mapBox.dataset.mapCenterCoordX,
    y: mapBox.dataset.mapCenterCoordY,
  };

  const zoom = mapBox.dataset.zoom;

  const pinCoords = {
    x: mapBox.dataset.pinCoordX,
    y: mapBox.dataset.pinCoordY,
  };

  const mapPin = {
    iconHref: mapBox.dataset.mapPin,
    width: mapBox.dataset.width,
    height: mapBox.dataset.height,
    alt: mapBox.dataset.alt,
  }

  const popupContent = {
    header: mapBox.dataset.header,
    body: mapBox.dataset.body,
    footer: mapBox.dataset.footer,
  }

  async function initYMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {
      YMap,
      YMapDefaultSchemeLayer,
      YMapDefaultFeaturesLayer,
      YMapMarker,
      YMapControls,
    } = ymaps3;
    const {YMapZoomControl, YMapGeolocationControl} = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
    const {YMapOpenMapsButton} = await ymaps3.import('@yandex/ymaps3-controls-extra');

    // Иницилиазируем карту
    const map = new YMap(
      // Передаём ссылку на HTMLElement контейнера
      mapBox,
      // Передаём параметры инициализации карты
      {
        location: {
          // Координаты центра карты
          center: [mapCenterCoords.y, mapCenterCoords.x],
          // Уровень масштабирования
          zoom,
        },
        behaviors: ['drag', 'scrollZoom', 'pinchZoom', 'dblClick', 'magnifier'],
      },
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer());

    // Добавьте слой для маркеров
    map.addChild(new YMapDefaultFeaturesLayer());

    class markerWithPopup extends ymaps3.YMapComplexEntity {
      _onAttach() {
        this._actualize();
      }
      _onDetach() {
        this.marker = null;
      }
      _onUpdate(props) {
        if (props.coordinates) {
          this.marker?.update({coordinates: props.coordinates});
        }
        this._actualize();
      }

      _actualize() {
        const props = this._props;
        this._lazyCreatePopup();
        this._lazyCreateMarker();

        if (!this._state.popupOpen || !props.popupHidesMarker) {
          this.addChild(this.marker);
        } else if (this.marker) {
          this.removeChild(this.marker);
        }

        if (this._state.popupOpen) {
          this.popupElement.style.display = 'flex';
          this._markerElement.removeChild(this._beaconElement);
        } else if (this.popupElement) {
          this.popupElement.style.display = 'none';
          this._markerElement.appendChild(this._beaconElement);
        }
      }

      _lazyCreateMarker() {
        if (this.marker) return;

        const pinElement = document.createElement('button');
        pinElement.setAttribute('type', 'button');
        pinElement.setAttribute('aria-label', 'Открыть popup');
        pinElement.className = 'marker__pin';

        const pinIcon = document.createElement('img');
        pinIcon.src = this._props.mapPin.iconHref;
        pinIcon.width = this._props.mapPin.width;
        pinIcon.height = this._props.mapPin.height;
        pinIcon.alt = this._props.mapPin.alt;
        pinElement.append(pinIcon);

        const beaconElement = document.createElement('span');
        beaconElement.className = 'marker__beacon';
        this._beaconElement = beaconElement;

        const animation1 = document.createElement('div');
        animation1.className = 'marker__animation';

        const animation2 = animation1.cloneNode(true);
        animation2.classList.add('marker__animation-delay');
        beaconElement.append(animation1, animation2);

        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.append(pinElement, beaconElement);

        this._markerElement = markerElement;

        pinElement.onclick = () => {
          this._state.popupOpen = true;
          this._actualize();
        };

        const container = document.createElement('div');
        container.append(this._markerElement, this.popupElement);

        this.marker = new YMapMarker({coordinates: this._props.coordinates, draggable: false}, container);
      }

      _lazyCreatePopup() {
        if (this.popupElement) return;

        const element = document.createElement('div');
        element.className = 'popup';

        const title = document.createElement('h3');
        title.textContent = this._props.popupContent.header;

        const textBody = document.createElement('p');
        textBody.textContent = this._props.popupContent.body;

        const textFooter = document.createElement('p');
        textFooter.textContent = this._props.popupContent.footer;

        const closeBtn = document.createElement('button');
        closeBtn.className = 'popup__close';
        closeBtn.setAttribute('type', 'button');
        closeBtn.setAttribute('aria-label', 'Закрыть popup')
        closeBtn.textContent = '✖';
        closeBtn.onclick = () => {
          this._state.popupOpen = false;
          this._actualize();
        };

        element.append(title, textBody, textFooter, closeBtn);

        this.popupElement = element;
      }

      constructor(props) {
        super(props);
        this._state = {popupOpen: false};
      }
    }

    // Инициализируйте и добавьте маркер на карту
    let rightMarker = null;
    map.addChild(
      (rightMarker = new markerWithPopup({
        coordinates: [pinCoords.y, pinCoords.x],
        popupContent,
        mapPin,
      }))
    );

    // Добавляем элементы управления
    map.addChild(new YMapControls({position: 'right'}).addChild(new YMapZoomControl({})));
    map.addChild(new YMapControls({position: 'bottom left'}).addChild(new YMapOpenMapsButton({})));
    map.addChild(new YMapControls({position: 'left'}).addChild(new YMapGeolocationControl({})));
  }

  initYMap();

  function addAriaLabels() {
    const zoomButtons = document.querySelectorAll('.ymaps3x0--zoom-control .ymaps3x0--button');
    if (zoomButtons.length >= 2) {
      zoomButtons[0].setAttribute('aria-label', 'Zoom in');
      zoomButtons[1].setAttribute('aria-label', 'Zoom out');
    }

    const otherButtons = document.querySelectorAll('.ymaps3x0--control:not(.ymaps3x0--zoom-control) .ymaps3x0--button');
    otherButtons.forEach((button, index) => {
      button.setAttribute('aria-label', 'Toggle location');
    });
  }

  setTimeout(addAriaLabels, 500);
};
