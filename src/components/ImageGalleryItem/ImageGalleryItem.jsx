export const ImageGalleryItem = ({ imageUrl, imageName }) => {
  return (
    <li className="gallery-item">
      <img src={imageUrl} alt={imageName} />
    </li>
  );
};
