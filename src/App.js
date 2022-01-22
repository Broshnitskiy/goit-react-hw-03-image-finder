// import "./App.css";
import React, { Component } from "react";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { Modal } from "./components/Modal/Modal";
import { Button } from "./components/Button/Button";
import { ImageGalleryItem } from "./components/ImageGalleryItem/ImageGalleryItem";
import { getImages } from "./fetch-api/fetchBackend";

class App extends Component {
  state = {
    imageName: "",
    gallery: [],
    page: null,
    error: null,
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
    const nextName = this.state.imageName;
    const { page } = this.state;

    if (prevName !== nextName || prevState.page !== this.state.page) {
      try {
        const data = await getImages(nextName.trim(), page);
        page === 1
          ? this.setState({ gallery: data.hits })
          : this.setState((prevState) => {
              return { gallery: [...prevState.gallery, ...data.hits] };
            });
      } catch (error) {
        this.setState({ error });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery>
          {this.state.gallery.length > 0 &&
            this.state.gallery.map(({ id, webformatURL }) => (
              <ImageGalleryItem
                key={id}
                imageUrl={webformatURL}
                imageName={this.state.imageName}
              />
            ))}
        </ImageGallery>
        <Button onClick={this.handleClick} />
        <Modal />
      </div>
    );
  }
}

export default App;
