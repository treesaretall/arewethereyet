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
    const weatherLine1 = document.createElement('div');
    weatherDisplay.appendChild(weatherLine1);
    console.log(data.main.temp)
   });
}

