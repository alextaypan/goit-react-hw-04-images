import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <li
      className={s.imageGalleryItem}
      onClick={() => {
        onClick(largeImageURL);
      }}
    >
      <img src={webformatURL} alt="" className={s.galleryItemImg} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
