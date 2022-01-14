import './sass/main.scss';
import { options, fetchImage } from './js/fetchImage';
import renderImage from './js/renderImage';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';

const refs = {
    button: document.querySelector('button'),
    gallery: document.querySelector('.image-gallery'),
    input: document.querySelector('input'),
    loadMoreButton: document.querySelector('.load-more'),
    photoCard: document.querySelector('.phto-card'),
    footer: document.querySelector('.footer'),
}

// console.log(galleryA);

let searchQueryText = ''.trim(); 
let gallery = new SimpleLightbox('.image-gallery .photo-card');


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

    fetchImage(searchQueryText, options)
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
        })
  
};

function clearGallery() {
    refs.gallery.innerHTML = '';
};

function onLoadMoreEvent(event) {
    options.page += 1;

    fetchImage(searchQueryText, options)
        .then(r => {

            if (!r.data.totalHits) {
                alert('no resutls');
            }

            renderImage(r, refs.gallery);

            gallery.refresh();
        });
} 

function onImageClick(event) {
    
    if (event.target.nodeName !== 'IMG') {
        return;
    };

    gallery.on('show.simplelightbox');
};

function showLoadMoreButton() {
    refs.footer.classList.remove('is-hidden');
}
  

