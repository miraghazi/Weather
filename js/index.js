const searchInput = document.getElementById("search-input");
const cardContainer = document.getElementById("cards-container");

/*** Weather API ***/
async function getWeather(q) {
    let response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=1d7fc078b74548de8c6163555240210&q=${q}&days=3`);
    let finalResponse = await response.json();
    displayWeather(finalResponse);
}

/*** Default Weather ***/
getWeather("Cairo");

/*** Search Input Listener ***/
searchInput.addEventListener("keyup", function () {
    getWeather(searchInput.value);
});

/** get current location weather */
navigator.geolocation.getCurrentPosition(function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(`${latitude},${longitude}`);
});

/*** Display Weather ***/
function displayWeather(weather) {
if (weather.error == undefined) {
cardContainer.innerHTML = `
<div class="col-12 col-md-4">
    <div class="details-card rounded-4 overflow-hidden">
        <div  class="card-header d-flex align-items-center justify-content-between py-3 px-5">
            <p class="day mb-0">${new Date(weather.forecast.forecastday[0].date ).toLocaleDateString("en-US", { weekday: "long", })}</p>
            <p class="date mb-0">${new Date( weather.forecast.forecastday[0].date ).toLocaleDateString("en-US", { day: "numeric", month: "long" })}</p>
        </div>
        <div class="card-body py-5 px-4">
            <p class="location">${weather.location.name}</p>
            <img src="${weather.current.condition.icon}" alt="icon" class="weather-icon" />
            <p class="temp display-1">${weather.current.temp_c} &deg;C</p>
            <p class="condition">${weather.forecast.forecastday[0].day.condition.text}</p>
            <div class="card-footer d-flex gap-3  py-3">
                <p class="humidity"> <i class="fa-solid fa-xl fa-umbrella"></i> ${ weather.forecast.forecastday[0].day.avghumidity}%</p>
                <p class="wind"> <i class="fa-solid fa-xl  fa-wind"></i> ${ weather.forecast.forecastday[0].day.maxwind_kph} km/h</p>
                <p class="direction"> <i class="fa-regular fa-xl  fa-compass"></i> East</p>
            </div>
        </div>
    </div>
</div>

<div class="col-12 col-md-4">
    <div class="details-card middle rounded-4 overflow-hidden">
        <div class="card-header d-flex align-items-center justify-content-between py-3 px-5" >
            <p class="day mb-0">${new Date(weather.forecast.forecastday[1].date).toLocaleDateString("en-US", {weekday: "long", })}</p>
            <p class="date mb-0">${new Date(weather.forecast.forecastday[1].date).toLocaleDateString("en-US", { day: "numeric", month: "long" })}</p>
        </div>
        <div class="card-body text-center py-5 px-4">
        <img src="${ weather.forecast.forecastday[1].day.condition.icon }" alt="icon" class="weather-icon" />
            <p class="temp display-1 mb-0">${ weather.forecast.forecastday[1].day.maxtemp_c } &deg;C</p>
            <p class="low-temp display-5">${ weather.forecast.forecastday[1].day.mintemp_c} &deg;C</p>
            <p class="condition">${ weather.forecast.forecastday[1].day.condition.text }</p>
        </div>
    </div>
</div>

<div class="col-12 col-md-4">
    <div class="details-card rounded-4 overflow-hidden">
        <div class="card-header d-flex align-items-center justify-content-between py-3 px-5">
            <p class="day mb-0">${new Date(weather.forecast.forecastday[2].date ).toLocaleDateString("en-US", {   weekday: "long",})}</p>
            <p class="date mb-0">${new Date(  weather.forecast.forecastday[2].date ).toLocaleDateString("en-US", { day: "numeric", month: "long" })}</p>
        </div>
        <div class="card-body text-center py-5 px-4">
        <img src="${weather.forecast.forecastday[2].day.condition.icon }" alt="icon" class="weather-icon" />
            <p class="temp display-1 mb-0">${weather.forecast.forecastday[2].day.maxtemp_c} &deg;C</p>
            <p class="low-temp display-5 ">${  weather.forecast.forecastday[2].day.mintemp_c } &deg;C</p>
            <p class="condition">${ weather.forecast.forecastday[2].day.condition.text }</p>
        </div>
    </div>
</div>
`;
}
}