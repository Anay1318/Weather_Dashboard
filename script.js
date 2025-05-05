const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherOutput = document.getElementById('weather-output');

const cityName = document.getElementById('city-name');
const description = document.getElementById('description');
const temp = document.getElementById('temp');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// **REPLACE WITH YOUR ACTUAL OpenWeatherMap API KEY**
const API_KEY = 'd9d224fba0fede92d5d91bede9aa3d98';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const city = cityInput.value.trim();
  if (!city) return;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'City not found.');
    }

    const data = await response.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = data.weather[0].description;
    temp.textContent = data.main.temp.toFixed(1);
    humidity.textContent = data.main.humidity;
    wind.textContent = (data.wind.speed * 3.6).toFixed(1); // m/s to km/h

    weatherOutput.classList.remove('hidden');
  } catch (err) {
    alert(err.message);
    weatherOutput.classList.add('hidden');
  }
});
