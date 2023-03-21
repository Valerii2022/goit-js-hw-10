import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    inputField: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}


refs.inputField.addEventListener('input', debounce(handleInputField, DEBOUNCE_DELAY));

function handleInputField() {
    const countryName = refs.inputField.value;


    if (countryName.trim('')) {
        fetchCountries(countryName.trim());
    }

    // Notiflix.Notify.failure('Oops, there is no country with that name');
    // Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}











