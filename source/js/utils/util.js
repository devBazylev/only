const desk = window.matchMedia('(min-width: 1024px) and (max-width: 5000px)');

const cloneSlides = (parent, elems, array) => {
  elems.forEach((elem) => {
    const clone = elem.cloneNode(true);
    clone.setAttribute('aria-hidden', true);
    array.push(clone);
    parent.appendChild(clone);
  });
};

export {
  desk,
  cloneSlides,
};
