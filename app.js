'use strict'

const activeInput = document.getElementById('search-icon')

activeInput.addEventListener('click', () => {
    document.querySelector('.search-city').classList.toggle('active')
})



const weatherApp = {
    apiKey: 'dd29707a7a55da0ab5a47212f92d36dc',
    fetchWeather: function(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`)
        .then(res => res.json())
        .then(data => this.weatherDisplay(data))
        .catch(err => alert('City not found.'))
    },

    weatherDisplay: function(data) {
        
        const { name } = data
        const { temp, temp_min, temp_max } = data.main
        //const { country } = data.sys
        const { main, icon } = data.weather[0]
        const weatherVideoBg = document.getElementById('myVideo')
        if(main === 'Clouds'){
            weatherVideoBg.src = '/img/pexels-miguel-á-padriñán-6772574.mp4'
        }
        if(main === 'Rain'){
            weatherVideoBg.src = '/img/rain.mp4'
        }
        if(main === 'Mist'){
            weatherVideoBg.src = '/img/Pexels Videos 1911457.mp4'
        }
        if(main === 'Snow'){
            weatherVideoBg.src = '/img/Aerial Shot Of Sunset.mp4'
        }
        if(main === 'Clear'){
            weatherVideoBg.src = '/img/clear.mp4'
        }
        
        document.querySelector('.city-name').innerText = name
        document.querySelector('.type').innerText = main
        document.querySelector('.weather-icon').src = `http://openweathermap.org/img/wn/${icon}@2x.png`
        document.querySelector('.celsius').innerText = `${convertKelvinToCelsius(temp)}°C`
        document.querySelector('.min').innerText = `${convertKelvinToCelsius(temp_min)}°C`
        document.querySelector('.max').innerText = `${convertKelvinToCelsius(temp_max)}°C`
    },
}


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

document.querySelector('.date').innerText = `${monthNames[date.getMonth()]} ${day}, ${year}`


const input = document.querySelector('.search-input');
input.addEventListener('keyup', function(e){
    if(e.key === 'Enter'){
        weatherApp.fetchWeather(input.value)
        if(input.value == null || input.value === '') return
        document.querySelector('body').style.background = 'none'
        const main = document.querySelector('.main')
        main.style.display = 'flex'
        input.value = null
    }
});


function convertKelvinToCelsius(k) {
    const c = Math.floor(k - 273.15)
    return c
  }
