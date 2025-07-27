import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { debounce, desk } from '../utils/util';

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
    const pag = frame.querySelector('.info__pag');
    const covers = Array.from(pag.querySelectorAll('.info__cover'));
    const bullets = pag.querySelectorAll('.info__bullet');

    const iMax = sliders.length;
    let i = 0;
    let min = 1950;
    let max = 1961;

    const setCoord = () => {
      covers.forEach((cover, i) => {
        const total = covers.length;
        const index = (i - 1) % total;
        const angle = (2 * Math.PI / total) * index;
        const radius = 13.8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        cover.style = `left: calc(50% + ${x}vw); top: calc(50% + ${y}vw);`;
      });
    };

    const unsetCoord = () => {
      covers.forEach((cover) => {
        cover.style = '';
      });
    };

    const onDesk = () => {
      if (desk.matches) {
        setCoord();
      } else {
        unsetCoord();
      }
    };

    if (desk.matches) {
      setCoord();
    }

    const recalcYears = () => {
      const contActive = frame.querySelector(`.info__cont--${i}`);
      const minNew = +contActive.getAttribute('data-min');
      const maxNew = +contActive.getAttribute('data-max');

      const animateMin = () => {
        if (min < minNew) {
          min++;
          minYear.textContent = min;
          setTimeout(animateMin, 10);
        } else if (min > minNew) {
          min--;
          minYear.textContent = min;
          setTimeout(animateMin, 10);
        }
      };

      const animateMax = () => {
        if (max < maxNew) {
          max++;
          maxYear.textContent = max;
          setTimeout(animateMax, 10);
        } else if (max > maxNew) {
          max--;
          maxYear.textContent = max;
          setTimeout(animateMax, 10);
        }
      };

      animateMin();
      animateMax();
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

    const checkBtnStatus = () => {
      prev.disabled = i === 0;
      next.disabled = i === iMax - 1;
    };

    const dataUpdate = () => {
      frac.textContent = `0${i + 1}`;
      swapSlider();
      checkBtnStatus();
    };

    const onPrevDebounced = debounce(() => {
      if (i > 0) {
        const oldId = i;
        i--;
        activateBullet(oldId);
      }
    });

    const onNextDebounced = debounce(() => {
      if (i < iMax - 1) {
        const oldId = i;
        i++;
        activateBullet(oldId);
      }
    });

    function activateBullet(id, bulletClick = false) {
      if (id !== i) {
        covers.forEach(cover => cover.classList.remove('info__cover--active'));
        if (bulletClick) {
          i = id;
        }
        covers[i].classList.add('info__cover--active');
        dataUpdate();
      }
    }

    const onBullet = (evt) => {
      const target = evt.target.closest('.info__cover');
      const id = +target.getAttribute('data-id');
      activateBullet(id, true);
    };

    checkBtnStatus();

    bullets.forEach((bullet) => {
      bullet.addEventListener('click', onBullet);
    });
    prev.addEventListener('click', onPrevDebounced);
    next.addEventListener('click', onNextDebounced);
    desk.addEventListener('change', onDesk);

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
