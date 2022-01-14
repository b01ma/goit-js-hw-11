
export default function renderImage(response, ref) {
    const dataArray = response.data.hits;
            dataArray.map(data => { 

                const url = data.webformatURL;
                const likes = data.likes;
                const views = data.views;
                const comments = data.comments;
                const downloads = data.downloads;
                const largeImageUrl = data.largeImageURL;
            
              ref.insertAdjacentHTML('beforeend',
                  `<a class="photo-card" href="${largeImageUrl}">

                        <div class="photo-card-wrapper" >

                        <div class="photo-card__thumb-image">
                            <img class="photo-card__image"
                            src="${url}"
                            alt="Фото Николая Тарасова" width="250">
                        </div>
                        
                        <div class="photo-card__info">
                            <p class="photo-card__info-item">
                            <b>Likes</b>${likes}
                            </p>
                            <p class="photo-card__info-item">
                            <b>Views</b> ${views}
                            </p>
                            <p class="photo-card__info-item">
                            <b>Comments</b>${comments}
                            </p>
                            <p class="photo-card__info-item">
                            <b>Downloads</b>${downloads}
                            </p>
                        </div>

                        </div>
                    
                    </a>`);
            });
    
};





