import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

const initInfo = () => {
  const sliders = document.querySelectorAll('.info__slider');
  sliders.forEach((slider) => {
    const cont = slider.closest('.info__cont');
    new Swiper(slider, {
      modules: [Navigation],
      observer: true,
      resizeObserver: true,
      slidesPerView: 'auto',
      updateOnWindowResize: true,
      spaceBetween: 25,
      slideActiveClass: 'info__slide--active',

      navigation: {
        prevEl: cont.querySelector('.info__twin--prev'),
        nextEl: cont.querySelector('.info__twin--next'),
        disabledClass: 'info__twin--disabled',
      },

      breakpoints: {
        1024: {
          spaceBetween: 80,
        },
      },
    });
  });
};

export { initInfo };
