import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ onClick, images }) {
  return (
    <div>
      <ul className={s.ImageGallery}>
        {images.map(image => {
          return (
            <li
              className={s.ImageGalleryItem}
              key={image.id}
              onClick={() => onClick(image.largeImageURL, image.tags)}
            >
              <ImageGalleryItem image={image} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};
