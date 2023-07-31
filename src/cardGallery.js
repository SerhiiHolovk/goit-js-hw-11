import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

function createGallery(hits) {
  const array = [];
  for (let i = 0; i < hits.length; i++) {
    const div = document.createElement('div');
    div.className = 'photo-card';
    div.innerHTML = `
        <a class="gallery-link" href=${hits[i].largeImageURL} onclick="return false;">
            <img src="${hits[i].webformatURL}" alt="${hits[i].tags}" loading="lazy" class="photo-img"/>
        </a>
        <div class="info">  
            <span class="span span-like"></span>
            <p class="info-item">
                    ${hitsts[i].likes}
            </p>            
        <div>
            <span class="span span-view"></span>
            <p class="info-item">
                ${ hits[i].views }
            </p>
        </div>               
        <div>
            <span class="span span-comment"></span>
            <p class="info-item">
                ${hits[i].comments}
            </p>
        </div>            
        <div>
            <span class="span span-download"></span>
            <p class="info-item">
                ${hits[i].downloads}
            </p>
        </div>            
    </div>`;
    array.push(div);
  }
  gallery.append(...array);
  lightbox.refresh();
  buttonLoadMore.style.display = 'block';
}

export {createGallery};