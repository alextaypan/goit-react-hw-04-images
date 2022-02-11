import "./App.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchImages } from "./services/PixabayAPI";
import { Searchbar } from "./components/Searchbar/Searchbar";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./components/LoadMoreBtn/LoadMoreBtn";
import { Modal } from "./components/Modal/Modal";
import { Loader } from "./components/Loader/Loader";

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [total, setTotal] = useState(null);

  const fetchData = () => {
    const perPage = 12;

    setError(null);
    setIsLoading(true);

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
        setImages((prev) => [...prev, ...hits]);
        setTotal(totalHits);
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const changeSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const switchModal = (largeImageURL) => {
    setIsOpenModal(!isOpenModal);
    setLargeImageURL(largeImageURL);
  };

  useEffect(() => {
    setPage(page);
    if (!query) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const lastPage = images.length !== total && images.length !== 0;
  return (
    <>
      <ToastContainer theme="colored" autoClose={2000} />
      <Searchbar changeSearch={changeSearch} />
      {error ? (
        toast.error(error.message)
      ) : (
        <>
          <ImageGallery images={images} onClick={switchModal} />
          {isLoading ? (
            <Loader />
          ) : (
            query && lastPage && <LoadMoreBtn handleLoadMore={handleLoadMore} />
          )}
        </>
      )}
      {isOpenModal && (
        <Modal onClose={switchModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
};

export default App;
