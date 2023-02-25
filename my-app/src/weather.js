// First, we define some variables to store the API key and the location for which we want to display the weather
const API_KEY = '99b2e4cb92637e289cd04acd2347114c';
const API_KEY_FORECAST = 'ccc347cdffc3cf203df315cfbec59570'
const LOCATION = 'Gliwice, ';
var fullDate = new Date();
var currentHour = fullDate.getHours();
var currentMinute = fullDate.getMinutes();
celsius = '°C'
zeros = '00';

// Then, we define a function that makes a request to the OpenWeatherMap API to retrieve the weather information for the specified location
function getWeather() {
  // We use the fetch API to make a GET request to the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&lang=pl&units=metric&appid=${API_KEY}`)
        .then(response => response.json()) // Once we receive the response, we parse it as JSON
        .then(data => {
        // Then, we extract the relevant information from the response and store it in some variables
        var temperature = data.main.temp;
        temperature = parseInt(temperature, 10);
       //var weatherDescription = data.weather[0].description;
        var weatherIcon = data.weather[0].icon;
        
        // Next, we update the page with the retrieved weather information
        document.getElementById('weather-temperature').innerHTML = temperature + celsius.sup();
        //document.getElementById('weather-description').innerHTML = weatherDescription;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
    });
}

// Finally, we call the getWeather function when the page loads
//window.onload = getWeather;

// Then, we define a function that makes a request to the OpenWeatherMap API to retrieve the weather information for the specified location
function getForecast() {
        // We use the fetch API to make a GET request to the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${LOCATION}&lang=pl&units=metric&appid=${API_KEY_FORECAST}`)
        .then(response => response.json()) // Once we receive the response, we parse it as JSON
        .then(data => {
            var forecastTime_0 = data.list[0].dt_txt;
            var forecastRefresh = new Date(forecastTime_0);
            var refreshTime = forecastRefresh.getHours();
        // Then, we extract the relevant information from the response and store it in some variables
        for (let i=0; i<5; i++) {
            var forecastTime = data.list[i].dt_txt;
            var forecastRefresh = new Date(forecastTime);
            var forecastTime = forecastRefresh.getHours();
            var forecastTemp = data.list[i].main.temp;
            forecastTemp = parseInt(forecastTemp, 10);
            var forecastIcon = data.list[i].weather[0].icon;
            
            selectedForecastTemp = "forecast" + i + "-temperature";
            selectedForecastTime = "forecast" + i + "-time";
            selectedForecastIcon = "forecast" + i + "-icon";

            document.getElementById(selectedForecastTemp).innerHTML = forecastTemp + celsius.sup();
            document.getElementById(selectedForecastTime).innerHTML = forecastTime + zeros.sup();
            document.getElementById(selectedForecastIcon).src = `https://openweathermap.org/img/wn/${forecastIcon}@2x.png`;
        }
    });
}
  
  // Finally, we call the getWeather function when the page loads
  //window.onload = getWeather;
