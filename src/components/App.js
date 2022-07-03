import { useEffect, useState } from 'react';
import { Notify } from 'notiflix';
import SearchAPIService from 'components/SearchApiService';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [imageInfo, setImageInfo] = useState({
    url: '',
    alt: '',
  });
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const searchApi = new SearchAPIService();

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setStatus('pending');
    setPage(1);

    searchApi
      .fetchPictures(1, searchQuery)
      .then(res => {
        if (res.data.total === 0) {
          setStatus('idle');
          Notify.failure(`There are no images with name ${searchQuery}`);
          return;
        }
        setImages([...res.data.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error.message);
        setStatus('rejected');
      });
  }, [searchApi, searchQuery]);

  function buttonClickHandler() {
    setPage(prevState => prevState + 1);

    searchApi
      .fetchPictures(page + 1, searchQuery)
      .then(res => {
        setImages(prevState => [...prevState, ...res.data.hits]);
      })
      .catch(error => {
        setError(error.message);
        setStatus('rejected');
      })
      .finally(() => {
        setStatus('resolved');
      });
  }

  function onFormSubmit(search) {
    setSearchQuery(search);
  }

  function toggleModal() {
    setShowModal(prevState => !prevState);
  }

  function onImageClick(largeImageURL, alt) {
    setImageInfo({
      url: largeImageURL,
      alt: alt,
    });
    toggleModal();
  }

  return (
    <section>
      <Searchbar onSubmit={onFormSubmit} />
      {status === 'idle' && (
        <h1 className="Welcome">Welcome to Image Gallery!</h1>
      )}
      {status === 'pending' && <Loader />}
      {status === 'resolved' && (
        <ImageGallery
          images={images}
          searchQuery={searchQuery}
          onClick={onImageClick}
        />
      )}
      {status === 'resolved' && <Button onClick={buttonClickHandler} />}
      {status === 'rejected' && <h1>{error}</h1>}

      {showModal && <Modal info={imageInfo} onClose={toggleModal} />}
    </section>
  );
}
