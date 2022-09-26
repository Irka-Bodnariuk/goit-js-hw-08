// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryBoxRef = document.querySelector('.gallery');

//створення картинок
function creatingPictureMarkup(gallery) {
  return gallery
    .map(
      ({
        preview,
        original,
        description,
      }) => `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`
    )
    .join('');
}

galleryBoxRef.insertAdjacentHTML(
  'beforeend',
  creatingPictureMarkup(galleryItems)
);

const gallery = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
