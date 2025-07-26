const desk = window.matchMedia('(min-width: 1024px) and (max-width: 5000px)');

const debounce = (callback, timeoutDelay = 300) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  desk,
  debounce,
};
