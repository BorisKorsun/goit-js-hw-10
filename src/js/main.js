import fetchCountries from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;


const refs = {
  inputRef: document.querySelector('#search-box'),
  countryListRef: document.querySelector('.country-list'),
  countryInfoRef: document.querySelector('.country-info'),
};

refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputForm = e.target;
  const searchQuery = inputForm.value.trim();
  refs.countryListRef.innerHTML = '';
  refs.countryInfoRef.innerHTML = '';

  if (!searchQuery) {
    return;
  }

  fetchCountries(searchQuery)
    .then(dataProcessing)
    .catch(errorProcessing)
}

function errorProcessing(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name.');
}

function dataProcessing(data) {
  if (data.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  };

  // console.log(data)

  renderCountryMarkup(data);
};

function renderCountryMarkup(data) {
  console.log(data)
  const markupData = data
      .map(({ flags: { svg }, name: { official } }) => {
        return `<li><img src="${svg}" alt="${official}" width="100" height="50"/>${official}</li>`;
      })
      .join('');

    if (data.length === 1) {
      const languages = Object.values(data[0].languages).join(', ');

      const markupInfo = `<ul>
      <li>Capital: ${data[0].capital}</li>
      <li>Population: ${data[0].population}</li>
      <li>Languages: ${languages}</li>
      </ul>`;

      refs.countryInfoRef.insertAdjacentHTML('afterbegin', markupInfo);
    }
    return refs.countryListRef.insertAdjacentHTML('afterbegin', markupData);
};

