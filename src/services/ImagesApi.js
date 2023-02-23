import axios from 'axios';

export default function ImagesApi(searchQuery, page) {
  const baseURL = 'https://pixabay.com/api/';
  const key = '32152972-b0c98a7cb53bef05c50b77987';
  const per_page = 12;

  const url = `${baseURL}?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${page}&per_page=${per_page}&key=${key}`;
  return axios.get(url).then(result => result.data);
}
