const apiKey = WeatherApiKey;
const weatherDisplay = document.querySelector('.display-weather');

function getWeather(city) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`);
      const data = await response.json();

      console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  }).then(function displayWeather(data) {
    weatherDisplay.innerHTML = '';

    let weatherIconNum = data.weather[0].icon;
    let weatherIcon = `https://openweathermap.org/img/w/${weatherIconNum}.png`;

    const weatherIconLine = document.createElement('img');
    const weatherTempLine = document.createElement('div');
    const weatherHumidityLine = document.createElement('div');
    const weatherWindLine = document.createElement('div');

    weatherIconLine.src = weatherIcon;
    weatherTempLine.classList.add('weather-temp');
    weatherHumidityLine.classList.add('weather-humidity');
    weatherWindLine.classList.add('weather-wind');

    weatherTempLine.textContent = "Temperature: " + Math.round(data.main.temp) + '°F';
    weatherHumidityLine.textContent = "Humidity: " + data.main.humidity + '%';
    weatherWindLine.textContent = "Wind Speed: " + Math.round(data.wind.speed) + ' mph';

    weatherDisplay.appendChild(weatherIconLine);
    weatherDisplay.appendChild(weatherTempLine);
    weatherDisplay.appendChild(weatherHumidityLine);
    weatherDisplay.appendChild(weatherWindLine);
  });
}

