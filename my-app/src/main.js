var getWeather_time = 5; //in minutes
var getForecast_time = 10; //in minutes
var IsFirstUpdate = false;

getWeather_time = getWeather_time * 60 * 1000;
getForecast_time = getForecast_time * 60 * 1000;

function Update() {
    var isOnline = window.navigator.onLine;
    if (isOnline) {
        console.log('Online');
        if(IsFirstUpdate == false) {
            getWeather();
            getForecast();
            IsFirstUpdate = true;
        }
        setInterval(getWeather, getWeather_time);
        setInterval(getForecast, getForecast_time);
        
    } else {
        console.log('Offline');
    }
    setInterval(getTime, 500);
    getDays();

}

window.addEventListener('message', (event) => {
    if (event.data.type === 'python-data') {
      const data = event.data.data;
      console.log(data);
      // do something with the data...
    }
  });

Update();

