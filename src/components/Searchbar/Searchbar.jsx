import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';

export default function Searchbar({ onSubmitSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchValue.trim() === '') {
      toast.error('Please enter valid search');
      return;
    }

    onSubmitSearch(searchValue);
    setSearchValue('');
  };

  const handleChangeInput = evt => {
    setSearchValue(evt.target.value.toLowerCase());
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <BsSearch style={{ width: 22, height: 22 }} />
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          value={searchValue}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
}
