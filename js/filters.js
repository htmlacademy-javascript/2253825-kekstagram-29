import { getRandomArrayElement } from './utils.js';

const PICTURES_COUNT = 10;

const filterElement = document.querySelector('.img-filters');

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let currentFilter = Filter.DEFAULT;
let pictures = [];

const sortRandomly = getRandomArrayElement;

const sortByComments = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

const getFilteredPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(sortRandomly).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(sortByComments);
    default:
      return [...pictures];

  }
};

const onFilterClick = (filteredPictures) => {
  filterElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const onBtnClick = evt.target;
    if (onBtnClick.id === currentFilter) {
      return;
    }

    filterElement.querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    onBtnClick.classList.add('img-filters__button--active');
    currentFilter = onBtnClick.id;
    getFilteredPictures(filteredPictures);
  });
};

const initFilters = (loadedPictures) => {
  filterElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  onFilterClick(loadedPictures);
};


export { initFilters, getFilteredPictures };