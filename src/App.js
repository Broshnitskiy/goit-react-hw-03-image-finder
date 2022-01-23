import "./App.css";
import React, { Component } from "react";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Modal } from "./components/Modal/Modal";
import { Button } from "./components/Button/Button";
import { ImageGalleryItem } from "./components/ImageGalleryItem/ImageGalleryItem";
import { getImages } from "./fetch-api/fetchBackend";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class App extends Component {
  state = {
    imageName: "",
    gallery: [],
    page: null,
    error: null,
    isLoading: false,
    showButton: false,
    showModal: false,
    bigImgUrl: "",
  };

  handleFormSubmit = (imageName) => {
    this.setState({ imageName, page: 1 });
  };

  handleClick = async () => {
    this.setState((prevState) => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  toggleModal = (imgUrl) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      bigImgUrl: imgUrl,
    }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const newName = this.state.imageName;
    const { page } = this.state;

    if (prevName !== newName || prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      this.setState({ showButton: true });
      try {
        const data = await getImages(newName.trim(), page);

        if (data.hits.length === 0) {
          toast.error(
            "Sorry, there are no images matching your search query. Please try again."
          );
          return;
        }
        if (page * 12 >= data.totalHits) {
          toast.warn(
            "We're sorry, but you've reached the end of search results."
          );
          this.setState({ showButton: false });
        }
        page === 1
          ? this.setState({ gallery: data.hits })
          : this.setState((prevState) => {
              return { gallery: [...prevState.gallery, ...data.hits] };
            });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  render() {
    const {
      gallery,
      imageName,
      error,
      isLoading,
      showButton,
      showModal,
      bigImgUrl,
    } = this.state;
    return (
      <div className={"App"}>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && (
          <div className={"Spinner"}>
            <Oval
              arialLabel="loading-indicator"
              height={100}
              width={100}
              strokeWidth={5}
              color="red"
              secondaryColor="yellow"
            />
          </div>
        )}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {gallery.length > 0 && (
          <ImageGallery>
            {gallery.map(({ id, webformatURL, largeImageURL }) => (
              <ImageGalleryItem
                key={id}
                onOpen={this.toggleModal}
                imageUrl={webformatURL}
                imageName={imageName}
                largeImageURL={largeImageURL}
              />
            ))}
          </ImageGallery>
        )}

        {showButton && !isLoading && <Button onClick={this.handleClick} />}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            imgUrl={bigImgUrl}
            imageName={imageName}
          >
            <button
              type="button"
              onClick={() => this.toggleModal()}
              className={"ModalButton"}
            >
              X
            </button>
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
