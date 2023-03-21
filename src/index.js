import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
  inputField: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.inputField.addEventListener(
  'input',
  debounce(handleInputField, DEBOUNCE_DELAY)
);

function handleInputField() {
  const countryName = refs.inputField.value.trim();

  if (!countryName == '') {
    fetchCountries(countryName).then(onFetchResolve).catch(onFetchError);
  } else {
    resetInfo();
  }
}

function onFetchResolve(value) {
  if (value.length > 10) {
    resetInfo();
    return Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  }
  if (value.length >= 2 && value.length <= 10) {
    renderCountriesList(value);
  }
  if (value.length === 1) {
    renderCountryCard(value);
  }
}

function onFetchError(error) {
  resetInfo();
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function renderCountriesList(value) {
  resetInfo();

  value.map(el => {
    const markup = `<li class="list-item"><img src="${el.flags.svg}" alt="${el.flags.alt}" width=50 ><span>${el.name.official}</span></li>`;

    refs.countryList.insertAdjacentHTML('beforeend', markup);
  });
}

function renderCountryCard(value) {
  resetInfo();

  const markup = `<h1 class="card-title"><img src="${
    value[0].flags.svg
  }" alt="${value[0].flags.alt}" width=50>${
    value[0].name.official
  }</h1><ul class="card-list"><li class="card-item"><span>Capital:</span> ${
    value[0].capital[0]
  }</li><li class="card-item"><span>Population:</span> ${
    value[0].population
  }</li><li class="card-item"><span>Languages:</span> ${Object.values(
    value[0].languages
  )}</li></ul>`;

  refs.countryInfo.innerHTML = markup;
}

function resetInfo() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
