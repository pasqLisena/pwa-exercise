/* global axios localStorage */
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
  const obj = Object.assign({}, defaultContent, content); // eslint-disable-line prefer-object-spread
  console.log(obj.q);

  let response = JSON.parse(localStorage.getItem(obj.q));
  if (response) {
    console.log('--> CACHE');
  } else {
    response = await axios.get(`${api}/${url}?${queryString(obj)}`);
    console.log(response);
    localStorage.setItem(obj.q, JSON.stringify(response));
  }
  return response.data;
};

const WeatherApi = { request };
