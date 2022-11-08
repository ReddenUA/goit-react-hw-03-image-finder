import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onClick,
  query,
}) => {
  return (
    <GalleryItem>
      <GalleryImage
        src={webformatURL}
        alt={`${query} image`}
        onClick={() => onClick(largeImageURL)}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};
