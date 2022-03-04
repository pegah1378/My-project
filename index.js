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
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = ` <div class="row justify-content-around"> <!--row-->`;
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` 
      <div class="card col-md-2">
              <h4 class="card-title">${day}</h4>
              <img class="cardd-img-top" src="src/output-onlinegiftools (4).gif" alt="Card image cap" >
                  <div class="card-body">
                      
                      <h6>2022.2.20</h6>
                      <p class="card-text">8° <br>
                        
                        Direction : south-west
                        <br>
                        Speed : 12-28 km/h
                      </p>
                      
                  </div>
              </div>`;
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
displayForecast();
