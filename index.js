let Icons = [
  "clear sky",
  "fog",
  "snow",
  "snow storm",
  "rain fall",
  "rain cloud",
  "rain",
  "light snow",
  "light rain",
  "heavy rain",
  "mist",
  "clouds",
  "thunderstorm",
  "drizzle",
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getForcast(coordinates) {
  console.log(coordinates);
  let apiKey = "9ea936a09a35e656c9c6abae603a0dd5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&unites=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#des").innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let headImg = document.querySelector("#mainImg");
  let mainWeather = response.data.weather[0].main.toLowerCase();
  let descriptionWeather = response.data.weather[0].description.toLowerCase();
  let icon = response.data.weather[0].icon;
  for (let i = 0; i < Icons.length; i++) {
    if (descriptionWeather.localeCompare(Icons[i]) === 0) {
      headImg.src = `src/${Icons[i]}.gif`;
    } else if (mainWeather.localeCompare(Icons[i]) === 0) {
      headImg.src = `src/${Icons[i]}.gif`;
    } else if (icon === "50d") {
      headImg.src = `src/mist.gif`;
    }
  }
  getForcast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = ` <div class="row justify-content-around"> <!--row-->`;

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      let forecastIcon;
      let mainWeather = forecastDay.weather[0].main.toLowerCase();
      let descriptionWeather = forecastDay.weather[0].description.toLowerCase();
      let iconID = forecastDay.weather[0].id;

      for (let i = 0; i < Icons.length; i++) {
        if (descriptionWeather.localeCompare(Icons[i]) === 0) {
          forecastIcon = `src/${Icons[i]}.gif`;
        } else if (mainWeather.localeCompare(Icons[i]) === 0) {
          forecastIcon = `src/${Icons[i]}.gif`;
        } else if (
          iconID === 711 ||
          iconID === 731 ||
          iconID === 741 ||
          iconID === 751 ||
          iconID === 761 ||
          iconID === 762 ||
          iconID === 771 ||
          iconID === 781
        ) {
          forecastIcon = `src/mist.gif`;
        }
      }
      forecastHtml =
        forecastHtml +
        ` 
      <div class="card col-md-2">
              <h4 class="card-title">${formatDay(forecastDay.dt)}</h4>
              <img class="cardd-img-top" src="src/mist.gif" alt="Card image cap" >
                  <div class="card-body">
                      
                    
                      <p class="card-text"><span id="max">${Math.round(
                        forecastDay.temp.max
                      )}°</span><br><span id="min">${Math.round(
          forecastDay.temp.min
        )}°</span> <br>
                        
                        
                      </p>
                      
                  </div>
              </div>`;
    }
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

function search(event) {
  event.preventDefault();
  let apiKey = "9ea936a09a35e656c9c6abae603a0dd5";
  let city = document.querySelector("#cityname").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let submitCity = document.querySelector(".submit-city");
submitCity.addEventListener("click", search);

let currentTime = new Date();
let currentYear = currentTime.getFullYear();
let currentDay = days[currentTime.getDay()];
let currentMonth = currentTime.getMonth();
let currentDate = currentTime.getDate();
let currentHour = currentTime.getHours();
let currentMin = currentTime.getMinutes();
if (currentHour < 10) {
  currentHour = `0 ${currentHour}`;
}

if (currentMin < 10) {
  currentMin = `0 ${currentMin}`;
}

let formattedDate = `${currentDay}  ${currentYear}.${currentDate}.${currentMonth}`;
let formattedTime = `${currentHour} : ${currentMin}`;
document.querySelector("span#nowDate").innerHTML = formattedDate;
document.querySelector("#time").innerHTML = formattedTime;

function findMyLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);

  function showPosition(position) {
    let apiKey = "9ea936a09a35e656c9c6abae603a0dd5";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    axios.get(apiUrl).then(showTemperature);
    axios.get(apiUrl).then(function myCityName(response) {
      document.querySelector(
        "#city-name"
      ).innerHTML = `<em><strong>${response.data.name}</strong></em>`;
    });
  }
}
let btn = document.querySelector("#current");
btn.addEventListener("click", findMyLoc);
/*
function changeC(event) {
  event.preventDefault();
  let degree = document.querySelector("#number");

  degree.innerHTML = 19;
}
let cilisious = document.querySelector("#cilis");
cilisious.addEventListener("click", changeC);

function changeF(event) {
  event.preventDefault();
  let degreeF = document.querySelector("#number");
  let displayF = (degreeF.innerHTML * 9)/5 +32;
  degreeF.innerHTML = Math.round(displayF);
}

let farenheit = document.querySelector("#faren");
farenheit.addEventListener("click", changeF);
*/
