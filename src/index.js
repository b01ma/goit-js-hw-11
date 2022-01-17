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
let maxPage = 0;



if (!urlParam) {
    return;
    // console.log('поле в адресной строке с параметрами пустое:', urlParam);
} else {
    // console.log('поле в адресной строке с параметрами:', urlParam);
    getUrlParams(urlParam);
    getImage(urlParam, options);
}


refs.input.addEventListener('input', onInputEvent);
refs.button.addEventListener('click', onSearchEvent);
refs.loadMoreButton.addEventListener('click', onLoadMoreEvent);
refs.gallery.addEventListener('click', onImageClick);


// console.log('значение строки ввода: ',refs.input.value);

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

            const totalHits = r.data.totalHits;

            if (!totalHits) {
                Notiflix.Notify.warning('no resutls');
                return;
            }

            if (options.page === 1) {
                Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            }
            console.log('loading')
            renderImage(r, refs.gallery);
            console.log('yes, it is loaded')
            refs.loadMoreButton.disabled = false;
            gallery.refresh();

            maxPage = Math.round(totalHits / options.perPage);
            // console.log('maxPage:', maxPage);
            // console.log('currentPage:',currentPage);

            if (options.page >= maxPage) {
                console.log('last page')
                hideLoadMoreButton();
            } else {
                showLoadMoreButton();
            };
        
        }).catch(() => {
            Notiflix.Notify.failure('Миша, все хуйна, давай по-новой');
        });
};

function clearGallery() {
    refs.gallery.innerHTML = '';
};

function onLoadMoreEvent(event) {
    options.page += 1;

    refs.loadMoreButton.disabled = true;
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

function hideLoadMoreButton() {
    refs.footer.classList.add('is-hidden');
};

function getUrlParams(queryText) { 
;
    refs.input.value = queryText;
    searchQueryText = queryText;

    console.log('значение searchQueryText:', queryText )
};

function setUrlParams(params) {
    const url = new URL(window.location);
    console.log(url);

        console.log(url.searchParams)
    url.searchParams.set('searchQuery',params);
    

    window.history.pushState({}, '', url);
};





    
  

