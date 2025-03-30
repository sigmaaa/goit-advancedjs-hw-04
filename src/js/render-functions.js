import SimpleLightbox from 'simplelightbox';
import { getImages, dataTotalHits } from './pixabay-api';
import { refs } from './consts';

const lightbox = new SimpleLightbox('.gallery_link', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

export async function fetchAndRenderImages(query, curPageNum, perPage) {
  try {
    setLoading(true); // Show loading indicator if needed
    if (curPageNum === 1) {
      hideLoadMoreButton();
    }

    const photos = await getImages(query, curPageNum, perPage);
    console.log(photos);
    if (!photos.length) {
      iziToast.error({
        title: 'Error',
        message: `No results for query <span>${query}</span>`,
        position: 'topRight',
      });
      return;
    }

    refs.gallery.insertAdjacentHTML('beforeend', createCardsMarkup(photos));
    lightbox.refresh();
    dataTotalHits > curPageNum * perPage
      ? showLoadMoreButton()
      : hideLoadMoreButton();
  } catch (error) {
    console.error('Error fetching images:', error);
  } finally {
    setLoading(false); // Hide loading indicator if needed
  }
}

function setLoading(isLoading) {
  if (isLoading) {
    refs.loader.classList.add('active');
  } else {
    refs.loader.classList.remove('active');
  }
}

function showLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

function createCardsMarkup(photos) {
  return photos
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery_item">
            <a class="gallery_link" href="${largeImageURL}">
                <img class="gallery_image" src="${webformatURL}" alt="${tags}" />
            </a>
            <div class="info">
                <p>Likes <span>${likes}</span></p>
                <p>Views <span>${views}</span></p>
                <p>Comments <span>${comments}</span></p>
                <p>Downloads <span>${downloads}</span></p>
            </div>
        </li>`
    )
    .join('');
}
