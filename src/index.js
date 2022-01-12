import axios from 'axios';
import './sass/main.scss';

const refs = {
    button: document.querySelector('button'),
    gallery: document.querySelector('.image-gallery'),
    input: document.querySelector('input'),
}

// console.log(refs.body);
// refs.body.insertAdjacentHTML('beforeend', '<h1>hello world</h1>');

const BASE_URL = 'https://pixabay.com/api/?key=14665608-5c267132ac5256a05f9292b82';
const KEY = '14665608-5c267132ac5256a05f9292b82';
let searchQueryText = ''.trim();

refs.input.addEventListener('input', onInputEvent);
refs.button.addEventListener('click', onClickEvent);

function onInputEvent(event) {
    searchQueryText = event.currentTarget.value;
}

function onClickEvent(event) {
    event.preventDefault();

    clearGallery();

    const options = {
        imageType: "photo",
        page: 1,
        perPage: 10,
    }

    if (!searchQueryText) {
        return;
    };

    fetchPicture(searchQueryText, options)
        .then(r => {

            if (!r.data.totalHits) {
                alert('no resutls');
            }

            renderImage(r)
        });
  
};

function fetchPicture(query, options) {
     return axios.get(`https://pixabay.com/api/?key=14665608-5c267132ac5256a05f9292b82&q=${query}&image_type=${options.imageType}&page=${options.page}&per_page=${options.perPage}`)
}

function renderImage(response) {
    const dataArray = response.data.hits;
            dataArray.map(data => { 

                const url = data.webformatURL;
                const likes = data.likes;
                const views = data.views;
                const comments = data.comments;
                const downloads = data.downloads;


                refs.gallery.insertAdjacentHTML('beforeend',
                    `<div class="photo-card">
                        <img src="${url}" />
                        <div class="info">
                            <p class="info-item">
                            <b>Likes</b>${likes}
                            </p>
                            <p class="info-item">
                            <b>Views</b> ${views}
                            </p>
                            <p class="info-item">
                            <b>Comments</b>${comments}
                            </p>
                            <p class="info-item">
                            <b>Downloads</b>${downloads}
                            </p>
                        </div>
                    </div>`);
            });
};

function clearGallery() {
    refs.gallery.innerHTML = '';
}


  

