import fetchCountries from "./fetchCountries";
import debounce from 'lodash.debounce';
import Notiflix from "notiflix";

const DEBOUNCE_DELAY = 300;

const refs = {
    inputRef: document.querySelector('#search-box')
};

fetchCountries('Ukraine')

refs.inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
    const inputForm = e.target;
    const searchQuery = inputForm.value.trim();

    if (!searchQuery) {
        return
    }
}