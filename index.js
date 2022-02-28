function showTemperature(response) {
  console.log(response.data.main.humidity);
  document.querySelector("#number").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  input.value = "";
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
if (currentHour < 10) {
  currentHour = `0 ${currentHour}`;
}
let currentMin = currentTime.getMinutes();
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
  degreeF.innerHTML = 66;
}

let farenheit = document.querySelector("#faren");
farenheit.addEventListener("click", changeF);
*/
