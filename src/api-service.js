const URL = 'https://restcountries.eu/rest/v2/name';

const fetchByName = inputValue =>
  fetch(`${URL}/${inputValue}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Ошибка! Такой страны нет в списке!`);
  });

export { fetchByName };
