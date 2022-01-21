import { Component } from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { getImages } from "../../fetch-api/fetchBackend";

export class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    error: null,
  };

  async componentDidUpdate(prevProps) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;
    const page = this.state.page;

    if (prevName !== nextName) {
      try {
        const data = await getImages(nextName.trim(), page);
        this.setState((prevState) => {
          return { gallery: [...prevState.gallery, ...data.hits] };
        });
      } catch (error) {
        this.setState({ error });
      }
    }
  }

  handleClick = () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    return (
      <>
        <ul className="gallery">
          {this.state.gallery &&
            this.state.gallery.map(({ id, webformatURL }) => (
              <ImageGalleryItem
                key={id}
                imageUrl={webformatURL}
                imageName={this.props.imageName}
              />
            ))}
        </ul>
        <Button onClick={this.handleClick} />
        <Modal />
      </>
    );
  }
}
