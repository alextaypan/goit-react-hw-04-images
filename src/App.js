import "./App.css";
import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchImages } from "./services/PixabayAPI";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./components/LoadMoreBtn/LoadMoreBtn";
import { Modal } from "./components/Modal/Modal";
import { Loader } from "./components/Loader/Loader";

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: "",
    error: null,
    page: 1,
    isOpenModal: false,
    largeImageURL: null,
    total: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { query, page } = this.state;
    const perPage = 12;

    this.setState({ error: null, isLoading: true });

    fetchImages(query, page, perPage)
      .then(({ hits, totalHits }) => {
        const totalPages = Math.ceil(totalHits / perPage);

        if (hits.length === 0) {
          return toast.error("Sorry, no images found. Please, try again!");
        }

        if (page === 1) {
          toast.success(`Wow! We found ${totalHits} images.`);
        }

        if (page === totalPages) {
          toast.info("We're sorry, you've reached the end of search results.");
        }

        this.setState((prevState) => ({
          images: [...prevState.images, ...hits],
          total: totalHits,
        }));
      })
      .catch((error) => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  changeSearch = (query) => {
    this.setState({ query, page: 1, images: [] });
  };

  handleLoadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }));
  };

  switchModal = (largeImageURL) => {
    this.setState(({ isOpenModal }) => ({
      isOpenModal: !isOpenModal,
    }));
    this.setState({ largeImageURL: largeImageURL });
  };

  render() {
    const {
      images,
      error,
      isLoading,
      query,
      total,
      isOpenModal,
      largeImageURL,
      tags,
    } = this.state;
    const lastPage = images.length !== total && images.length !== 0;
    return (
      <>
        <ToastContainer theme="colored" autoClose={2000} />
        <Searchbar changeSearch={this.changeSearch} />
        {error ? (
          toast.error(error.message)
        ) : (
          <>
            <ImageGallery images={images} onClick={this.switchModal} />
            {isLoading ? (
              <Loader />
            ) : (
              query &&
              lastPage && <LoadMoreBtn handleLoadMore={this.handleLoadMore} />
            )}
          </>
        )}
        {isOpenModal && (
          <Modal onClose={this.switchModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
