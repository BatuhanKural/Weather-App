const showBtn = document.querySelector('.input-row button')
const weatherContent = document.querySelector('.content')
const inputElement = document.querySelector('.input-row input')

async function getData(){
    const API_KEY = "423ece1b56da4adcb28184351252404"
    const city = inputElement.value.trim();
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    const response = await fetch(url)
    const data = await response.json()
    return data
}

async function showContent(){
if(weatherContent.innerHTML.length > 0){
    weatherContent.innerHTML = ""
}
const data = await getData()
console.log(data)
const icon = document.createElement('img')
icon.src = data.current.condition.icon
const tempHeading = document.createElement('h2')
tempHeading.textContent = data.current.temp_c + "°"
const placeHeading = document.createElement('h3')
placeHeading.textContent = data.location.name + ", " + data.location.country
const localTime = document.createElement('h5')
localTime.textContent = "Local Time:" + " " + data.location.localtime
const subBox = document.createElement('div')
subBox.setAttribute('id', 'sub-box')
weatherContent.append(icon,tempHeading,placeHeading,localTime, subBox)
const humidityBox = document.createElement('div')
humidityBox.setAttribute('id', 'humidity-box')
const humidityIcon = document.createElement('img')
humidityIcon.src = "./img/humidity-icon.png"
const humidityVal = document.createElement('span')
humidityVal.innerHTML = `${data.current.humidity}% <br> Humidity`
humidityBox.append(humidityIcon,humidityVal)
const windBox = document.createElement('div')
windBox.setAttribute('id', 'wind-box')
const windIcon = document.createElement('img')
windIcon.src = "./img/wind-icon.png"
const windVal = document.createElement('span')
windVal.innerHTML = `${data.current.wind_kph} km/h <br> Wind`
windBox.append(windIcon, windVal)
subBox.append(humidityBox, windBox)
weatherContent.style.visibility = "visible"
inputElement.value = ""
}

showBtn.addEventListener('click', showContent)

inputElement.addEventListener('keydown', e => {
    if(e.key === "Enter"){
        showContent()
    }
})