const input = document.getElementById("input");
const button = document.getElementById("button");
const cities = document.querySelector(".cities");
const msg = document.querySelector(".msg");
const apiKey = "2ac92e1fe5333d9955b7c49a8bf0688e"
const citiesArray = []

const displayWeather = async (city) =>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    const data = await response.json()
    const {name} = data;
    const{icon,description} = data.weather[0];
    const{temp} = data.main;
    const{country} = data.sys;
    
    if(citiesArray.includes(city)){
        msg.innerText = `You already know the weather for ${name},Please search for another city`
        setTimeout(() =>{
            msg.innerText = ""
        },3000)
    }
    else{
        cities.innerHTML += 
        `<ul class="city">
            <li class="city-name"> ${name} <sup> ${country}</sup></li>
            <li class="city-temp"> ${Math.round(temp)}<sup>${"°C"}</sup></li> 
            <li><img class="city-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt=""></li>
            <li><figcaption> ${description} <figcaption></li>
            </ul>`
        citiesArray.push(city)
    }
    input.value = ""

}
button.addEventListener("click", (e) => {
    e.preventDefault()
    displayWeather(input.value);
})
