import axios from 'axios';

const API_KEY = '49442933-c5db9ffac96cc4cef7ce5cd82';
const BASE_URL = 'https://pixabay.com/api/';

export let dataTotalHits = 0;

export async function getImages(query, page_num, per_page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page_num,
        per_page: per_page,
      },
    });
    dataTotalHits = response.data.totalHits;
    return response.data.hits;
  } catch (error) {
    throw new Error(error.response ? error.response.status : error.message);
  }
}
