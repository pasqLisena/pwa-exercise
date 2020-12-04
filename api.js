/* eslint-env browser  */
/* global axios */
/* eslint-disable prefer-object-spread */
const api = 'https://api.openweathermap.org/data/2.5';

// The api key is ok to be exposed, it's free and only for self study.
const key = 'b5e7ada3bd028f6482908a861c2306d1';

const defaultContent = {
  appid: key,
  units: 'metric',
  lang: 'en',
};

const queryString = (obj) => Object.entries(obj)
  .map(([index, val]) => `${index}=${val}`)
  .join('&');

const request = async (url, content = {}) => {
  const obj = Object.assign({}, defaultContent, content);

  //  let response = JSON.parse(localStorage.getItem(obj.q));
  let response = null;
  if (response && !navigator.onLine) {
    console.log(obj.q, '--> CACHE');
    // localStorage.setItem(obj.q, JSON.stringify(response));
  } else {
    response = await axios.get(`${api}/${url}?${queryString(obj)}`);
    console.log(obj.q, '--> FETCH');
  }
  return response.data;
};

const WeatherApi = { request };
