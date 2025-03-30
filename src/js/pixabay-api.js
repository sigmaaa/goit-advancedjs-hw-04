export function getImages(query) {
  const API_KEY = '49442933-c5db9ffac96cc4cef7ce5cd82';
  const BASE_URL = 'https://pixabay.com/api/';

  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  const options = {
    method: 'GET',
  };

  return fetch(url, options).then(res => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  });
}
