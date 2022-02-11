import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "25282501-233467bc51a05ee3437c83310";

export const fetchImages = (query, page, perPage) => {
  return axios
    .get(
      `?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
