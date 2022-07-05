import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  function onInputChange(evt) {
    setSearchQuery(evt.currentTarget.value.toLowerCase());
  }

  function onFormSubmit(evt) {
    if (searchQuery.trim() === '') {
      Notify.info('Please enter something');
      return;
    }
    evt.preventDefault();
    onSubmit(searchQuery);
    // setSearchQuery('');
  }

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={onFormSubmit}>
        <button type="submit" className={s.SearchForm__button}>
          <span className={s.SearchForm__button__label}>Search</span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          value={searchQuery}
          onChange={onInputChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
