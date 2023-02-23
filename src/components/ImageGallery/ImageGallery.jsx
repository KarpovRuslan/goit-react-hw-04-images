import Button from 'components/Button/Button';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import ImagesApi from '../../services/ImagesApi';
import css from './ImageGallery.module.css';

export default function ImageGallery({ searchValue }) {
  const [status, setStatus] = useState('idle');
  const [currentImage, setCurrentImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(null);
  const [imgArray, setImgArray] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    setStatus('pending');
    ImagesApi(searchValue)
      .then(data => {
        if (data.hits.length > 0) {
          setImgArray(data.hits);
          setStatus('success');
          setPage(1);
          setTotalPages(Math.ceil(data.totalHits / 12));
        } else {
          setStatus('error');
        }
      })
      .catch(error => setStatus('error'));
  }, [searchValue]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    ImagesApi(page)
      .then(data => {
        if (data.hits.length > 0) {
          setImgArray(i => [...i, ...data.hits]);
          setStatus('success');
          setTotalPages(Math.ceil(data.totalHits / 12));
          setTimeout(
            () =>
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
              }),
            300
          );
        } else {
          setStatus('error');
        }
      })
      .catch(error => setStatus('error'));
  }, [page]);

  const showPicture = img => {
    setCurrentImage(img);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  if (status === 'idle') {
    return (
      <div className={css.imageGallery__textContent}>
        Please enter search Value to find smth..
      </div>
    );
  }

  if (status === 'pending') {
    return <Loader timeout={2000} />;
  }

  if (status === 'success') {
    return (
      <>
        <ul className={css.imageGallery}>
          <ImageGalleryItem image={imgArray} showPicture={showPicture} />
        </ul>
        {page < totalPages && (
          <Button onClick={() => setPage(page => page + 1)} />
        )}
        {showModal && (
          <Modal onClose={toggleModal} currentImage={currentImage} />
        )}
      </>
    );
  }
  if (status === 'error') {
    return (
      <p className={css.imageGallery__textContent}>
        Ooops! Something went wrong
      </p>
    );
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
