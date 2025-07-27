import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';
import { debounce, desk } from '../utils/util';

const initInfo = (): void => {
  const info = document.querySelector('.info') as HTMLElement | null;
  if (!info) return;

  const frames = info.querySelectorAll('.info__frame');

  frames.forEach((frame) => {
    const frameEl = frame as HTMLElement;

    const sliders = frameEl.querySelectorAll<HTMLElement>('.info__slider');
    const conts = frameEl.querySelectorAll<HTMLElement>('.info__cont');
    const frac = frameEl.querySelector<HTMLElement>('.info__frac--min');
    const prev = frameEl.querySelector<HTMLButtonElement>('.info__btn--prev');
    const next = frameEl.querySelector<HTMLButtonElement>('.info__btn--next');
    const minYear = frameEl.querySelector<HTMLElement>('.info__year--min');
    const maxYear = frameEl.querySelector<HTMLElement>('.info__year--max');
    const pag = frameEl.querySelector<HTMLElement>('.info__pag');
    const covers = Array.from(pag?.querySelectorAll<HTMLElement>('.info__cover') || []);
    const bullets = Array.from(pag?.querySelectorAll<HTMLElement>('.info__bullet') || []);

    const total = covers.length;
    const iMax = sliders.length;
    let i = 0;
    let min = 1950;
    let max = 1961;

    const spinPag = (): void => {
      if (desk.matches) {
        const rotateDeg = (360 / total) * i;
        if (pag) {
          pag.style.transform = `translate(-50%, -50%) rotate(-${rotateDeg}deg)`;
        }
        covers.forEach((cover) => {
          cover.style.transform = `translate(-50%, -50%) rotate(${rotateDeg}deg)`;
        });
      } else {
        if (pag) {
          pag.style.transform = 'translate(-50%, -50%)';
        }
        covers.forEach((cover) => {
          cover.style.transform = 'translate(-50%, -50%)';
        });
      }
    };

    const setCoord = (): void => {
      covers.forEach((cover, j) => {
        const index = (j - 1) % total;
        const angle = (2 * Math.PI / total) * index;
        const radius = 13.8;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        cover.style.left = `calc(50% + ${x}vw)`;
        cover.style.top = `calc(50% + ${y}vw)`;
      });
    };

    const unsetCoord = (): void => {
      covers.forEach((cover) => {
        cover.style.left = '';
        cover.style.top = '';
      });
    };

    const onDesk = (): void => {
      if (desk.matches) {
        setCoord();
      } else {
        unsetCoord();
      }
      spinPag();
    };

    if (desk.matches) {
      setCoord();
    }

    const recalcYears = (): void => {
      const contActive = frameEl.querySelector<HTMLElement>(`.info__cont--${i}`);
      if (!contActive) return;
      const minNew = +contActive.getAttribute('data-min')!;
      const maxNew = +contActive.getAttribute('data-max')!;

      const animateMin = (): void => {
        if (min < minNew) {
          min++;
          if (minYear) minYear.textContent = String(min);
          setTimeout(animateMin, 10);
        } else if (min > minNew) {
          min--;
          if (minYear) minYear.textContent = String(min);
          setTimeout(animateMin, 10);
        }
      };

      const animateMax = (): void => {
        if (max < maxNew) {
          max++;
          if (maxYear) maxYear.textContent = String(max);
          setTimeout(animateMax, 10);
        } else if (max > maxNew) {
          max--;
          if (maxYear) maxYear.textContent = String(max);
          setTimeout(animateMax, 10);
        }
      };

      animateMin();
      animateMax();
    };

    const swapSlider = (): void => {
      conts.forEach((cont) => {
        cont.classList.toggle('info__cont--active', false);
      });
      if (conts[i]) {
        conts[i].classList.add('info__cont--active');
      }
      recalcYears();
    };

    const checkBtnStatus = (): void => {
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === iMax - 1;
    };

    const dataUpdate = (): void => {
      if (frac) frac.textContent = `0${i + 1}`;
      swapSlider();
      checkBtnStatus();
      spinPag();
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

    function activateBullet(id: number, bulletClick: boolean = false): void {
      if (id !== i) {
        covers.forEach((cover) => cover.classList.remove('info__cover--active'));
        if (bulletClick) {
          i = id;
        }
        if (covers[i]) covers[i].classList.add('info__cover--active');
        dataUpdate();
      }
    }

    const onBullet = (evt: Event): void => {
      const target = (evt.target as HTMLElement).closest('.info__cover') as HTMLElement | null;
      if (!target) return;
      const id = +target.getAttribute('data-id')!;
      activateBullet(id, true);
    };

    checkBtnStatus();

    bullets.forEach((bullet) => {
      bullet.addEventListener('click', onBullet);
    });
    if (prev) prev.addEventListener('click', onPrevDebounced);
    if (next) next.addEventListener('click', onNextDebounced);
    desk.addEventListener('change', onDesk);

    sliders.forEach((slider) => {
      const cont = slider.closest('.info__cont') as HTMLElement;
      // eslint-disable-next-line
      new Swiper(slider, {
        modules: [Navigation],
        observer: true,
        resizeObserver: true,
        slidesPerView: 'auto',
        updateOnWindowResize: true,
        spaceBetween: 25,
        slideActiveClass: 'info__slide--active',

        navigation: {
          prevEl: cont.querySelector<HTMLElement>('.info__twin--prev'),
          nextEl: cont.querySelector<HTMLElement>('.info__twin--next'),
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
