const iconElement = document.querySelector(".icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const form = document.querySelector("header form");
const input = document.querySelector(".search-input");
const list = document.querySelector(".ajax-section .cities");
const dateNow = document.querySelector('.date')
const iconEl = document.querySelector('.city-icon')
const Temp = document.querySelector('.city-temp')
const desc = document.querySelector('.descriprtion')
const cityName = document.querySelector('.city-name')
const searchedWeather = document.querySelector('.searched-weather')

//weather app data
const weather = {};


// VARS
const KELVIN = 273;

// API KEY
const key = "9b96ddc83e3afa573925068e85f75158";

form.addEventListener('submit', e =>{
  e.preventDefault();
  let inputVal = input.value;

 const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${key}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('data', JSON.stringify(data))
      const { main, name, sys, weather } = data || JSON.parse(localStorage.getItem('data'));
      localStorage.setItem('temp', Math.round(main.temp) )
      localStorage.setItem('name', name)
      localStorage.setItem('sys', sys.country)
      localStorage.setItem('weather', weather[0]["description"])
      localStorage.setItem('icon', icon)
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
          weather[0]["icon"] || localStorage.getItem('icon')
        }.svg`;

      populateWeather();
console.log(__dirname, 'did');
    //   const li = document.createElement("li");
    //   li.style.listStyleType = "none"
    //   li.classList.add("city");
    //   const markup = `
    //   <div class="searched-weather">
    //   <figure>
    //     <img class="city-icon" src="${icon}" alt="${
    //   weather[0]["description"] || localStorage.getItem('weather')
    // }">
    // <div class="city-temp">${Math.round(main.temp) || localStorage.getItem('temp')}
    // <sup>°C</sup></div>
    //     <figcaption>${weather[0]["description"] || localStorage.getItem('weather')}</figcaption>
    //   </figure>
    //     <h2 class="city-name" data-name="${name || localStorage.getItem('name')},${sys.country || localStorage.getItem('sys')}">
    //       <span>${name || localStorage.getItem('name')}</span>
    //       <sup>${sys.country || localStorage.getItem('sys')}</sup>
    //     </h2>
    //     </div>
    //   `;
    //   li.innerHTML = markup;
    //   list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  form.reset();
  input.focus();


})


const populateWeather = () =>{
  if(typeof localStorage !== 'undefined'){
    iconEl.src =  localStorage.getItem('icon');
    iconEl.alt =  localStorage.getItem('icon');
    Temp.innerHTML = `${localStorage.getItem('temp')} <sup> °C </sup>`;
    desc.textContent = localStorage.getItem('weather');
    cityName.innerHTML = `${localStorage.getItem('name')}  <sup> ${localStorage.getItem('sys')} </sup>`;
    searchedWeather.style.display = 'block';
  }
}
document.querySelector('.date').textContent = new Date()
populateWeather();

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
// Temp.addEventListener("click", function(){
//     if(weather.temperature.value === undefined) return;
    
//     if(weather.temperature.unit == "celsius"){
//         let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
//         fahrenheit = Math.floor(fahrenheit);
        
//         Temp.innerHTML = `${fahrenheit}°<span>F</span>`;
//         weather.temperature.unit = "fahrenheit";
//     }else{
//         Temp.innerHTML = `${weather.temperature.value}°<span>C</span>`;
//         weather.temperature.unit = "celsius"
//     }
// });