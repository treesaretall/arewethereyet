const apiKey = '753f239ca28f430c26c0ed9a292317c8';
const weatherDisplay = document.querySelector('.display-weather')

function getWeather(city) {
    return new Promise (async (resolve, reject) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`)
            const data = await response.json();

            console.log(data);
            resolve(data);
            
        } catch(error) {
            reject(error)
        }   
   })
   .then(function displayWeather(data) {
    let displayWeatherDiv = document.querySelector('.display-weather');
    displayWeatherDiv
    let weatherIconNum = data.weather[0].icon
    let weatherIcon = `https://openweathermap.org/img/w/${weatherIconNum}.png`
    let weatherTempLine = document.createElement('div');
    let weatherHumidityLine = document.createElement('div');
    let weatherWindLine = document.createElement('div');
    const weatherIconLine = document.createElement('img');
    weatherDisplay.appendChild(weatherIconLine);
    weatherIconLine.appendChild(weatherTempLine);
    weatherIconLine.appendChild(weatherHumidityLine);
    weatherIconLine.appendChild(weatherWindLine);
    weatherIconLine.setAttribute('src', weatherIcon);
    weatherTempLine.classList.add('weather-temp');
    weatherHumidityLine.classList.add('weather-humidity');
    weatherWindLine.classList.add('weather-wind')
        

    document.querySelector('.weather-temp').innerHTML = Math.round(data.main.temp) + '°F';
    document.querySelector('.weather-humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.weather-wind').innerHTML = Math.round(data.wind.speed) + ' mph';


    console.log(data.main.temp)
   });
}

