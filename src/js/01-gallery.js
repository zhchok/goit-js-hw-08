// Add imports above this line
import { galleryItems } from './gallery-items.js';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'simplelightbox/dist/simple-lightbox.min.js';
// Change code below this line

// 1.Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
const gallery = document.querySelector('.gallery');

function makeGalleryMarkup({ preview, original, description }) {
  return `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`;
}

const galleryMarkup = galleryItems.map(makeGalleryMarkup).join('');
gallery.insertAdjacentHTML('afterbegin', galleryMarkup);

// 2.Реалізація делегування на div.gallery і отримання url великого зображення.

function onOpenLargeImage(e) {
  const target = e.target;
  if (target.nodeName !== 'IMG') {
    return;
  }
  e.preventDefault();
  const originalImgLink = target.dataset.source;

  const lightbox = new SimpleLightbox('.gallery a', function () {
    `<img
    src="${originalImgLink}"
    alt="${target.alt}"
  />`;
  });
}

gallery.addEventListener('click', onOpenLargeImage);

console.log(galleryItems);
