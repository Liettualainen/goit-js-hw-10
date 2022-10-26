import './css/styles.css';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputContryName = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');


inputContryName.addEventListener('input', debounce(() => {
      const inputTextTrim = inputContryName.value.trim(); 
      countryList.innerHTML = '';
      countryInfo.innerHTML = ''; 
  if (inputTextTrim !== '') {fetchCountries(inputTextTrim)
    .then(countriesAmount => {
        if (countriesAmount.length === 0) {     
          Notiflix.Notify.failure('Oops, there is no country with that name');} 
        else if (countriesAmount.length > 10) {    
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');}        
        else if (countriesAmount.length > 1 && countriesAmount.length < 11){
          renderSearchCountries(countriesAmount);}
        else if (countriesAmount.length === 1) { 
         renderСhosenCountry(countriesAmount); }
      });
    }
  }, DEBOUNCE_DELAY)
);

function renderSearchCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="60" hight="20">
         <h4>${country.name.official}</p>
              </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderСhosenCountry (countries) {
      const markup = countries
        .map(country => {
          return `<li>
  <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="60" hight="20">
  <h2>${country.name.official}</h2>
  <p><b>Capital</b>: ${country.capital}</p>
  <p><b>Population</b>: ${country.population}</p>
  <p><b>Languages</b>: ${Object.values(country.languages)}</p>
                </li>`;
        })
        .join('');
      countryInfo.innerHTML = markup;
}

