import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const BASE_URL = 'https://pixabay.com/api/?key=38555974-79c11b74c56dc56eebdd0e607&orientation=horizontal&image_type=photo&safesearch=true&per_page=40';

// прив'зуємо до розмітки
const searchForm = document.getElementById('search-form');
const inputSearch =  searchForm.firstElementChild;
const buttonSearch =  searchForm.lastElementChild;

const gallery = document.querySelector('div.gallery');
const buttonLoadMore = document.querySelector('.load-more');

// функція на пошук зображень по запиту

function fetches(request) {
  return fetch(`${BASE_URL}&q=${request}`)
    .then(response => {
      if (!response.ok) {
        gallery.innerHTML = ' ';
        Notiflix.Notify.failure(`Ошибка: ${response.status}`);
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (!(data.hits == '')) {
        if (page == 2)
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        createGallery(data.hits);

        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 0.65,
          behavior: 'smooth',
        });

        if (gallery.children.length == data.totalHits) {
          buttonLoadMore.style.display = 'none';
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
      } else
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
    })
    .catch(error => {
      gallery.innerHTML = ' ';
      Notiflix.Notify.failure('Помилка');
    //   console.log(error);
    });
}

function createGallery(hits) {
  const array = [];
  for (let i = 0; i < hits.length; i++) {
    const div = document.createElement('div');
    div.className = 'photo-card';
    div.innerHTML = `
        <a class="gallery-link" href=${hits[i].largeImageURL} onclick="return false;">
            <img src="${hits[i].webformatURL}" alt="${hits[i].tags}" width="320" height="240" loading="lazy" class="photo-img"/>
        </a>
        <ul class="info-block">
            <li class="info">  
                <h4 class="like">Likes</h4>
                <p class="info-item">${hits[i].likes}
                </p>   
            </li>             
            <li class="info">
                <h4 class="span span-view">Views</h4>
                <p class="info-item">${ hits[i].views }
                </p>
            </li>                
            <li class="info">
                <h4 class="span span-comment">Comments</h4>
                <p class="info-item">${hits[i].comments}
                </p>
            </li>             
            <li class="info">
                <h4 class="span span-download">Downloads</h4>
                <p class="info-item">${hits[i].downloads}
                </p>
            </li>               
    </ul>`;
    array.push(div);
  }
  gallery.append(...array);
  lightbox.refresh();
  buttonLoadMore.style.display = 'block';
}

searchForm.addEventListener('submit', event => {
  event.preventDefault();
});


function correctRequest(request) {
  return request.toLowerCase().replace(/\s+/g, '+');
}

let page = 1;

buttonSearch.addEventListener('click', () => {
  buttonLoadMore.style.display = 'none';
  gallery.innerHTML = ' ';
  page = 2;
  fetches(correctRequest(inputSearch.value));
});


buttonLoadMore.style.display = 'none';

buttonLoadMore.addEventListener('click', () => {
  fetches(`${correctRequest(inputSearch.value)}&page=${page}`);
  page += 1;
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: `alt`,
});