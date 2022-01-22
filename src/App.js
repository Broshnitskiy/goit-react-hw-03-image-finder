// import "./App.css";
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

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const newName = this.state.imageName;
    const { page } = this.state;

    if (prevName !== newName || prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
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
    const { gallery, imageName, error, isLoading } = this.state;
    return (
      <div className="App">
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <Oval color="orange" height={80} width={80} />}
        <Searchbar onSubmit={this.handleFormSubmit} />
        {gallery.length > 0 && (
          <ImageGallery>
            {gallery.map(({ id, webformatURL }) => (
              <ImageGalleryItem
                key={id}
                imageUrl={webformatURL}
                imageName={imageName}
              />
            ))}
          </ImageGallery>
        )}

        {gallery.length > 0 && <Button onClick={this.handleClick} />}
        <Modal />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
