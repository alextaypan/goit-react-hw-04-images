import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  onClick,
  tags,
}) => {
  return (
    <li
      className={s.imageGalleryItem}
      onClick={() => {
        onClick(largeImageURL);
      }}
    >
      <img src={webformatURL} alt={tags} className={s.galleryItemImg} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
