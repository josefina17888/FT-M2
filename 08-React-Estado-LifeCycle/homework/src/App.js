import React, { useState } from 'react';
import './App.css';
import Cards from './components/Cards';
import Nav from './components/Nav';

export default function App() {
  const [cities, setCities] = useState ([]);

  const onSearch = (city) => {
    //evaluar antes si la ciudad ya está en el arreglo o no
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${"ffa28d438ca47ba8fd703c0ed0c2c0bc"}&units=metric`)
    .then(r => r.json())
    .then((recurso) => {
      if(recurso.main !== undefined){
        const ciudad = {
          min: Math.round(recurso.main.temp_min),
          max: Math.round(recurso.main.temp_max),
          img: recurso.weather[0].icon,
          id: recurso.id,
          wind: recurso.wind.speed,
          temp: recurso.main.temp,
          name: recurso.name,
          weather: recurso.weather[0].main,
          clouds: recurso.clouds.all,
          latitud: recurso.coord.lat,
          longitud: recurso.coord.lon
        };
        const oldCity = cities.find((city) => city.id === ciudad.id)
        if (!oldCity){
        setCities(oldCities => [...oldCities, ciudad]);
      } else {
        alert("La ciudad ya fue proporcionada")}
      } else {
        alert("Ciudad no encontrada");
      }
    })
    .catch(error => console.log(error))
  }

  //setCities(oldCities => [...oldCities, ciudad]) //usar spread si el nuevo valor depende del anterior o se suma al anterior

  const onClose = (cityId) => {
    setCities(oldCities => { return oldCities.filter(city => city.id !== cityId)});
  }

  return (
    <div className="App">
      <div>
        <Nav onSearch={onSearch}/>
         </div>
      <div>
        <Cards cities={cities} onClose={onClose}/>
      </div>
    </div>
  );
}
