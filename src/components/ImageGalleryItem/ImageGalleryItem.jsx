import styles from "./ImageGalleryItem.module.css";

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
