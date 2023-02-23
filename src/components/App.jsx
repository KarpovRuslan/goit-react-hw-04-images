import React, { useState } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalStyle } from './GlobalStyle';

export default function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <GlobalStyle />
      <Searchbar onSubmitSearch={setSearchValue} />
      <ToastContainer
        theme="dark"
        autoClose={2000}
        newestOnTop
        transition={Zoom}
      />
      <ImageGallery searchValue={searchValue} />
    </>
  );
}
