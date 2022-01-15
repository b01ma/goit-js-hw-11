import './sass/main.scss';
import { options, fetchImage } from './js/fetchImage';
import renderImage from './js/renderImage';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import qs from 'query-string';

// 1. Fetch
// 2. Render Mark up
// 3. Libraries: Notiflix - for massasges; BasicLightBox - for large image view 
// in the window, Axios - for fetch
// 4. Load more button - pagination 
// Optional: 
// 5. Infinite scroll
// 6. Smooth scroll
// 7. Library Query-string to go back on the same page

const refs = {
    form: document.querySelector('#search-form'),
    button: document.querySelector('button'),
    gallery: document.querySelector('.image-gallery'),
    input: document.querySelector('input'),
    loadMoreButton: document.querySelector('.load-more'),
    photoCard: document.querySelector('.phto-card'),
    footer: document.querySelector('.footer'),
    querySerch: window.location.search, // это поле в адресной строке, что отвечает за параметр запроса
}

// console.log(galleryA);

let searchQueryText = ''.trim(); 
let gallery = new SimpleLightbox('.image-gallery .photo-card');

firstStartPage(getUrlParams(), options);

console.log(refs.form.elements.searchQuery.value);
console.log(refs.input.value);



refs.input.addEventListener('input', onInputEvent);
refs.button.addEventListener('click', onSearchEvent);
refs.loadMoreButton.addEventListener('click', onLoadMoreEvent);
refs.gallery.addEventListener('click', onImageClick);


function onInputEvent(event) {
    searchQueryText = event.currentTarget.value;

}

function onSearchEvent(event) {
    event.preventDefault();

    clearGallery();
    
    if (!refs.footer.classList.contains('is-hidden')) {
        refs.footer.classList.add('is-hidden');
    }

    if (!searchQueryText) {
        return;
    };

    options.page = 1;

    getImage(searchQueryText, options);
  
};

function clearGallery() {
    refs.gallery.innerHTML = '';
};

function onLoadMoreEvent(event) {
    options.page += 1;

    getImage(searchQueryText, options);
} 

function onImageClick(event) {
    
    if (event.target.nodeName !== 'IMG') {
        return;
    };

    gallery.on('show.simplelightbox');
};

function showLoadMoreButton() {
    refs.footer.classList.remove('is-hidden');
};

function getUrlParams() { 
    let params = qs.parse(refs.querySerch);
    refs.input.value = params.query;

    return refs.input.value;
}

function firstStartPage(query, options) {

    if (!query) {
        return;
    }

    getImage(query, options);

};

function getImage(query, options) {

    fetchImage(query, options)
        .then(r => {

            if (!r.data.totalHits) {
                Notiflix.Notify.warning('no resutls');
                return;
            }

            Notiflix.Notify.success(`Hooray! We found ${r.data.totalHits} images.`);

            renderImage(r, refs.gallery);

            gallery.refresh();
            
            showLoadMoreButton();
        
        }).catch(() => {
            Notiflix.Notify.failure('Миша, все хуйна, давай по-новой');
        });
}



    
  

