import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '14665608-5c267132ac5256a05f9292b82';

export let options = {
        imageType: "photo",
        page: 1,
        perPage: 40,
        orientation: "horizontal",
        safeSearch: "false",
}
    
export function fetchImage(query, options) {
    return axios.get(`${BASE_URL}?key=${KEY}&q=${query}
     &image_type=${options.imageType}
     &page=${options.page}
     &per_page=${options.perPage}
     &orientation=${options.orientation}
     &safesearch=${options.safeSearch}`)
}