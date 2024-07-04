const apiKey = "*********************************";

const searchBoxInputField = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeatherInfo(cityName) {
  if (!cityName) {
    alert("Enter valid city name");
    return;
  }
  try {
    const finalUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    const response = await fetch(finalUrl);
    const data = await response.json();

    if (data.cod != 200) {
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".error").style.display = "block";
      if (data.message) {
        document.querySelector(".error h2").innerHTML = data.message;
      }
      return;
    }

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "\u00B0" + "C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const currentWeatherState = data.weather[0].main;
    const mainImageUrl = "images/";

    switch (currentWeatherState) {
      case "Clouds":
        weatherIcon.src = mainImageUrl + "clouds.png";
        break;
      case "Clear":
        weatherIcon.src = mainImageUrl + "clear.png";
        break;
      case "Rain":
        weatherIcon.src = mainImageUrl + "rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = mainImageUrl + "drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = mainImageUrl + "mist.png";
        break;
      default:
        document.querySelector(".weather").style.display = "none";
        break;
    }

   
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  } catch (e) {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "block";
    if (e.message) {
        document.querySelector(".error h2").innerHTML = e.message;
      }
  }
}

searchBtn.addEventListener("click", () =>
  getWeatherInfo(searchBoxInputField.value)
);
