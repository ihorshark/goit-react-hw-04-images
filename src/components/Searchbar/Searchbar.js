import { useState } from 'react';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix';
import './Searchbar.css';

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
    setSearchQuery('');
  }

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
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
  onSubmit: PropTypes.func,
};
