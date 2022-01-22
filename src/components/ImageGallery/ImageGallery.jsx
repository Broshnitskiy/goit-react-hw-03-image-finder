import styles from "./ImageGallery.module.css";

export const ImageGallery = ({ children }) => {
  return <ul className={styles.ImageGallery}>{children}</ul>;
};
