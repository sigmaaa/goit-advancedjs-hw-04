import iziToast from 'izitoast';
import { fetchAndRenderImages } from './js/render-functions';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './js/consts';

const perPage = 15;

const state = {
  curPageNum: 1,
  savedQuery: '',
};

refs.searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const form = event.currentTarget;
  const query = form.elements.query.value.trim();
  if (query === '') {
    iziToast.warning({
      title: 'Caution',
      message: 'Please enter a query!',
      position: 'topRight',
    });

    return;
  }
  state.savedQuery = query;
  state.curPageNum = 1;
  refs.gallery.innerHTML = '';

  fetchAndRenderImages(state.savedQuery, state.curPageNum, perPage);
});

refs.loadMoreBtn.addEventListener('click', function (event) {
  state.curPageNum += 1;
  fetchAndRenderImages(state.savedQuery, state.curPageNum, perPage);
});
