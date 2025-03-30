import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import { createCardsMarkup } from './js/render-functions';

import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  searchForm: document.querySelector('form'),
  gallery: document.querySelector('.gallery'),
  notFoundText: document.querySelector('.js-not-found-text'),
  loader: document.querySelector('.loader'),
};

import { getImages } from './js/pixabay-api';

const lightbox = new SimpleLightbox('.gallery_link', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

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
  setLoading(true);
  refs.gallery.innerHTML = '';

  // Timeout to simulate loading
  setTimeout(
    () =>
      getImages(query)
        .then(photos => {
          if (!photos.total) {
            iziToast.error({
              title: 'Error',
              message: `No results for query <span>${query}</span>`,
              position: 'topRight',
            });
            return;
          }
          refs.gallery.innerHTML = createCardsMarkup(photos.hits);
          lightbox.refresh();
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false)),
    2000
  );
});

function setLoading(isLoading) {
  if (isLoading) {
    refs.loader.classList.add('active');
  } else {
    refs.loader.classList.remove('active');
  }
}
