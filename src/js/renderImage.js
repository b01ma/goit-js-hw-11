
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
                    `<a href="https://pixabay.com/get/g78345ee89ef3501dd382025bae5e4488e3a78961b70e5d75e551c6427735aeb9e8fa0b907bc541db97ee46292c99d0246358eb5c2731105daede1cc58ff6091c_1280.jpg">
                    <div class="photo-card">
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
                        </a>
                    </div>`);
            });
    
};



