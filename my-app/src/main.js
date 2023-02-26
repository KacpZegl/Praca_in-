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


const noAccessElement = document.querySelector('#no-access');
const noAccessText = document.querySelector('#no-access-text');
const scanQRElement = document.querySelector('#scan-qr');
const scanQRText = document.querySelector('#scan-qr-text');
const AccessElement = document.querySelector('#access');
const AccessText = document.querySelector('#access-text');
const Arrow = document.querySelector('#arrow');

window.addEventListener('message', (event) => {
    if (event.data.type === 'python-data') {
      const data = event.data.data;
      // do something with the data...
        if (data ===  "NOTcorrect"){
            // Display the element
            noAccessElement.style.display = 'block';
            noAccessText.style.display = 'block';
            // Hide the element after 10 seconds
            setTimeout(function() {
                noAccessElement.style.display = 'none';
                noAccessText.style.display = 'none';
            }, 5000);
        }
        else if (data === "scan-qr"){
            scanQRElement.style.display = 'block';
            scanQRText.style.display = 'block';
            Arrow.style.display = 'block';
            // Hide the element after 10 seconds
            setTimeout(function() {
                scanQRElement.style.display = 'none';
                scanQRText.style.display = 'none';
                Arrow.style.display = 'none';
            }, 20000);
        }
        else if (data === "correct"){
            scanQRElement.style.display = 'none';
            scanQRText.style.display = 'none';
            Arrow.style.display = 'none';
            AccessElement.style.display = 'block';
            AccessText.style.display = 'block';
            // Hide the element after 10 seconds
            setTimeout(function() {
                AccessElement.style.display = 'none';
                AccessText.style.display = 'none';
            }, 5000);
        }
        
    }
  });



Update();

