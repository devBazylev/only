import Swiper from 'swiper';
import {Navigation, Pagination} from 'swiper/modules';

const initInfo = () => {
  new Swiper('.info__slider', {
    modules: [Pagination, Navigation],
    observer: true,
    slidesPerView: 'auto',
    watchSlidesProgress: true,
    resizeObserver: true,
    updateOnWindowResize: true,
    spaceBetween: 25,
    slideActiveClass: 'info__slide--active',

    navigation: {
      prevEl: '.info__btn--prev',
      nextEl: '.info__btn--next',
      disabledClass: 'info__btn--disabled',
    },

    pagination: {
      el: '.info__pag',
      clickable: true,
      bulletClass: 'info__bullet',
      bulletActiveClass: 'info__bullet--active',
    },

    breakpoints: {
      1024: {
        spaceBetween: 80,
      },
    },
  });
};

export {initInfo};
