import styles from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

export const ImageGalleryItem = ({
  imageUrl,
  imageName,
  largeImageURL,
  onOpen,
}) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => {
        onOpen(largeImageURL);
      }}
    >
      <img
        src={imageUrl}
        alt={imageName}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string,
  imageName: PropTypes.string,
  largeImageURL: PropTypes.string,
  onOpen: PropTypes.func,
};
