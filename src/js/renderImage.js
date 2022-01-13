
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
                  `<a href="${largeImageUrl}" class="photo-card">
                    
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
                        
                        </a>`);
            });
    
};



