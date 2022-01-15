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
    querySearch: window.location.search, // это поле в адресной строке, что отвечает за параметр запроса
    url: window.location.origin, // это базовый доменный адрес в адресной строке 
};

let searchQueryText = ''.trim(); 
let gallery = new SimpleLightbox('.image-gallery .photo-card');
let urlParam = qs.parse(refs.querySearch).searchQuery;
console.log('urlParam:', urlParam)

if (!urlParam) {
    console.log('поле в адресной строке с параметрами пустое:', urlParam);
    return;
} else {
    console.log('поле в адресной строке с параметрами:', urlParam);
    getUrlParams(urlParam);
    getImage(urlParam, options);
    
    // window.onload = function () {
    //     if (!window.location.hash) {
    //         window.location = window.location + '#loaded';
    //         window.location.reload();
    //     };
    // };
}


refs.input.addEventListener('input', onInputEvent);
refs.button.addEventListener('click', onSearchEvent);
refs.loadMoreButton.addEventListener('click', onLoadMoreEvent);
refs.gallery.addEventListener('click', onImageClick);


console.log('значение строки ввода: ',refs.input.value);

function onInputEvent(event) {
    searchQueryText = event.currentTarget.value;
    console.log('текст в поле input:',searchQueryText);

}

function onSearchEvent(event) {
    event.preventDefault();

    clearGallery();
    
    if (!refs.footer.classList.contains('is-hidden')) {
        refs.footer.classList.add('is-hidden');
    }

    if (!searchQueryText) {
        console.log('пустое поле ввода поиска:', !searchQueryText);
        return;
    };

    options.page = 1;

    setUrlParams(searchQueryText);

    getImage(searchQueryText, options);
  
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

function getUrlParams(queryText) { 
;
    refs.input.value = queryText;
    searchQueryText = queryText;

    console.log('значение searchQueryText:', queryText )

    return refs.input.value;
};

function setUrlParams(params) {
    const url = new URL(window.location);
    console.log(url);

        console.log(url.searchParams)
    url.searchParams.set('searchQuery',params);
    

    window.history.pushState({}, '', url);
};





    
  

