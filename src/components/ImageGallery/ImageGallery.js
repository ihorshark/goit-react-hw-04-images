import React from 'react';
import PropTypes from 'prop-types';
import './ImageGallery.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';

export default function ImageGallery({ onClick, images }) {
  return (
    <div>
      <ul className="ImageGallery">
        {images.map(image => {
          return (
            <ImageGalleryItem image={image} key={image.id} onClick={onClick} />
          );
        })}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  onClick: PropTypes.func,
  state: PropTypes.shape({
    images: PropTypes.array.isRequired,
  }),
};
