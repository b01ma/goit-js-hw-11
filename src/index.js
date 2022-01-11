import axios from 'axios';
import './sass/main.scss';

const refs = {
    button: document.querySelector('button'),
    gallery: document.querySelector('.image-gallery'),
}

// console.log(refs.body);
// refs.body.insertAdjacentHTML('beforeend', '<h1>hello world</h1>');

const BASE_URL = 'https://pixabay.com/api/?key=14665608-5c267132ac5256a05f9292b82';
const KEY = '14665608-5c267132ac5256a05f9292b82';

refs.button.addEventListener('click', onClickEvent);

function onClickEvent(event) {

    event.preventDefault();

    axios.get('https://pixabay.com/api/?key=14665608-5c267132ac5256a05f9292b82&q=yellow+flowers&image_type=photo')
        .then(r => {
            const dataArray = r.data.hits;
            const imageArray = dataArray.map(data => data.webformatURL);

            console.log(imageArray);

            const renderImage = imageArray.map(url => {
                refs.gallery.insertAdjacentHTML('beforeend', `<img src="${url}" alt="картинка">`);
            })


        })
        .then(console.log);
   

  
}




  

