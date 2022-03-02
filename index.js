function showTemperature(response) {
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let headImg = document.querySelector("#mainImg");
  let mainWeather = response.data.weather[0].main.toLowerCase();
  let descriptionWeather = response.data.weather[0].description.toLowerCase();

  for (let i = 0; i < Icons.length; i++) {
    if (descriptionWeather.localeCompare(Icons[i]) === 0) {
      headImg.src = `src/${Icons[i]}.gif`;
    } else if (mainWeather.localeCompare(Icons[i]) === 0) {
      headImg.src = `src/${Icons[i]}.gif`;
    } else if (response.data.weather[0].icon === "50d") {
      headImg.src = `src/mist.gif`;
    }
  }
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

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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

let Icons = [
  "clear sky",
  "haze",
  "fog",
  "snow",
  "snow storm",
  "rain fall",
  "rain cloud",
  "rain",
  "light snow",
  "light rain",
  "heavy rain",
];
