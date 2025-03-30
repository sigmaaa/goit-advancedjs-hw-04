export function createCardsMarkup(photos) {
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
