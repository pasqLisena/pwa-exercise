/* eslint-env jquery  */
/* global WeatherApi */

const cities = [
    { name: 'Paris' },
    { name: 'Berlin' },
    { name: 'Los Angeles' },
    { name: 'London' },
    { name: 'New York' },
    { name: 'Madrid' },
    { name: 'São Paulo' },
    { name: 'Tokyo' },
    { name: 'Hong Kong' },
    { name: 'Buenos Aires' },
    { name: 'Moscow' },
    { name: 'Dubai' },
];


function createTile(data) {
    console.log(data);
    const $tile = $('<div class="tile is-child box">');
    const $media = $('<article class="media">');
    $tile.append($media);

    const { icon } = data.weather[0];

    const $figure = $('<figure class="media-left">');
    const $figureInner = $('<p class="image is-64x64">');
    const $img = $('<img>').attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
    $figure.append($figureInner);
    $figureInner.append($img);
    $media.append($figure);

    const $mediaContent = $('<div class="media-content">');
    const $content = $('<div class="content">');
    const $title = $('<h4 class="title is-4">').text(data.name);
    const $sub = $('<h5>').addClass('subtitle')
        .text(`Min: ${data.main.temp_min}° - Max: ${data.main.temp_max}°`);
    $mediaContent.append($content);
    $content.append($title);
    $content.append($sub);
    $media.append($mediaContent);

    return $tile;
}

console.log(cities);

const $cityList = $('#city-list').empty();
for (const city of cities) {
    WeatherApi.request('weather', { q: city.name })
        .then((data) => {
            $cityList.append(createTile(data));
        });
}

const $cityForm = $('#city-form');
const $cityName = $('#city-name');
const $main = $('#main-meteo');
const $noData = $('#main-meteo-off');

$cityForm.on('submit', (evt) => {
    evt.preventDefault();
    const city = $cityName.val();
    WeatherApi.request('weather', { q: city })
        .then((data) => {
            const { icon } = data.weather[0];

            $main.show();
            $noData.hide();

            $('img', $main).attr('src', `http://openweathermap.org/img/wn/${icon}@2x.png`);
            $('.title', $main).text(data.name);
            $('.min', $main).text(data.main.temp_min);
            $('.max', $main).text(data.main.temp_max);
        })
        .catch((e) => {
            console.error(e);
            $main.hide();
            $noData.show();
        });
});