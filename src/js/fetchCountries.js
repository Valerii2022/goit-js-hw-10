import Notiflix from 'notiflix';

export const fetchCountries = (name) => {
  fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(r => r.json())
    .then(resolveFetch);
};

const resolveFetch = value => {
  if (value.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else{console.log(value)}
  
};
