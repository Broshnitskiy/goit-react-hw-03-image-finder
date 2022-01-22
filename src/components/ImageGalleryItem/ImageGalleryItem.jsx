import styles from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ imageUrl, imageName }) => {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={imageUrl}
        alt={imageName}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};
