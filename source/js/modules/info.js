import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { debounce } from '../utils/util';

const initInfo = () => {
  const info = document.querySelector('.info');
  const frames = info.querySelectorAll('.info__frame');

  frames.forEach((frame) => {
    const sliders = frame.querySelectorAll('.info__slider');
    const conts = frame.querySelectorAll('.info__cont');
    const frac = frame.querySelector('.info__frac--min');
    const prev = frame.querySelector('.info__btn--prev');
    const next = frame.querySelector('.info__btn--next');
    const minYear = frame.querySelector('.info__year--min');
    const maxYear = frame.querySelector('.info__year--max');

    let i = 0;
    const iMax = sliders.length;
    let min = 1950;
    let max = 1961;

    const recalcYears = () => {
      const contActive = frame.querySelector(`.info__cont--${i}`);
      const minNew = +contActive.getAttribute('data-min');
      const maxNew = +contActive.getAttribute('data-max');

      const animateMin = () => {
        if (min < minNew) {
          min++;
          minYear.textContent = min;
          setTimeout(animateMin, 20);
        } else if (min > minNew) {
          min--;
          minYear.textContent = min;
          setTimeout(animateMin, 20);
        }
      };

      const animateMax = () => {
        if (max < maxNew) {
          max++;
          maxYear.textContent = max;
          setTimeout(animateMax, 20);
        } else if (max > maxNew) {
          max--;
          maxYear.textContent = max;
          setTimeout(animateMax, 20);
        }
      };

      animateMin();
      animateMax();
    };

    const checkBtnStatus = () => {
      prev.disabled = i === 0;
      next.disabled = i === iMax - 1;
    };

    const swapSlider = () => {
      conts.forEach((cont) => {
        if (cont.classList.contains('info__cont--active')) {
          cont.classList.remove('info__cont--active');
        }
      });
      conts[i].classList.add('info__cont--active');
      recalcYears();
    };

    const onPrevDebounced = debounce(() => {
      if (i > 0) {
        i--;
        frac.textContent = `0${i + 1}`;
        swapSlider();
        checkBtnStatus();
      }
    });

    const onNextDebounced = debounce(() => {
      if (i < iMax - 1) {
        i++;
        frac.textContent = `0${i + 1}`;
        swapSlider();
        checkBtnStatus();
      }
    });

    checkBtnStatus();

    prev.addEventListener('click', onPrevDebounced);
    next.addEventListener('click', onNextDebounced);

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
  });
};

export { initInfo };
