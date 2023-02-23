import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ image, showPicture }) {
  return image.map(({ webformatURL, tags, id, largeImageURL }) => (
    <li
      className={css.imageGalleryItem}
      key={id}
      onClick={() => showPicture({ alt: tags, src: largeImageURL })}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={css.imageGalleryItemImage}
      />
    </li>
  ));
}

ImageGalleryItem.propTypes = {
  showPicture: PropTypes.func.isRequired,
  image: PropTypes.array.isRequired,
};
