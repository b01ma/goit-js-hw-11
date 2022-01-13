import './sass/main.scss';
import { options, fetchImage } from './js/fetchImage';
import renderImage from './js/renderImage';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
    button: document.querySelector('button'),
    gallery: document.querySelector('.image-gallery'),
    input: document.querySelector('input'),
    loadMoreButton: document.querySelector('.load-more'),
    photoCard: document.querySelector('.phto-card'),
    // galleryA: document.querySelector('.image-gallery a'),
}

// console.log(galleryA);

let searchQueryText = ''.trim(); 
let gallery = {};

gallery = new SimpleLightbox('.image-gallery a');


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

    if (!searchQueryText) {
        return;
    };

    options.page = 1;

    fetchImage(searchQueryText, options)
        .then(r => {

            if (!r.data.totalHits) {
                alert('no resutls');
            }

            renderImage(r, refs.gallery);
            
            createSimpleLightBox();
        
        }).then()
        .catch(error => {
            alert('Миша, все хуйна, давай по новой');
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
        });
} 

function onImageClick(event) {
    
    if (event.target.nodeName !== 'IMG') {
        return;
    };

    showSimpleLightBox();
};

function createSimpleLightBox() {
    gallery = new SimpleLightbox('.image-gallery a');
    console.log('created SimpleLB')
}

function showSimpleLightBox() {
    gallery.on('show.simplelightbox');
    console.log('SimpleLB show')
}

  

