const desk: MediaQueryList = window.matchMedia('(min-width: 1024px) and (max-width: 5000px)');

const debounce = (callback: (...args: any[]) => void, timeoutDelay: number = 300): (...args: any[]) => void => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...rest: any[]) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};

export {
  desk,
  debounce
};
