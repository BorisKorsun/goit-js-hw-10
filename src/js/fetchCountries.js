import Notiflix from "notiflix";
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const FILTER_RESPONSE = '?fields=name,capital,population,flags,languages'

export default function fetchCountries(name) {
    fetch(`${BASE_URL}${name}${FILTER_RESPONSE}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status);
        }
        return response.json();
    })
    .then(data => {
        if (data.length > 10) {
            console.log(5)
        }
    });
};
