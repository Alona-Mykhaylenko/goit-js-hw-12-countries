import './sass/main.scss';
import debounce from 'lodash.debounce';

import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { fetchByName } from './api-service.js';
import countriesList from './countriesList.hbs';
import countryCard from './countryCard.hbs';

const countriestRef = document.querySelector('.countries');
const inputRef = document.querySelector('.search');
const errorMessageRef = document.querySelector('.error-message');

inputRef.addEventListener('input', debounce(getNames, 500));

function getNames(event) {
  resetSearch();
  const inputValue = event.target.value;
  if (!inputValue) return;
  fetchByName(inputValue)
    .then(renderMarkup)
    .catch(() => errorMessageRef.classList.remove('hidden'));
}

function renderMarkup(names) {
  if (names.length > 1 && names.length <= 10) {
    resetSearch();

    renderLayout(countriesList, names);
  } else if (names.length === 1) {
    resetSearch();

    renderLayout(countryCard, names);
  } else if (names.length > 10) {
    alert({
      text: 'Too many matches found. Please enter a more specific query!',
    });
  }
}

function resetSearch() {
  countriestRef.innerHTML = '';
  errorMessageRef.classList.add('hidden');
}

function renderLayout(tpl, names) {
  countriestRef.insertAdjacentHTML('beforeend', tpl(names));
}
