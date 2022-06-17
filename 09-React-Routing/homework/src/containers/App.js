import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Nav from '../components/Nav.jsx';
import Cards from '../components/Cards.jsx';
import About from '../components/About';
import Ciudad from '../components/Ciudad';

function App() {
  const [cities, setCities] = useState([]);
  function onClose(id) {
    setCities(oldCities => oldCities.filter(c => c.id !== id));
  }
  function onSearch(ciudad) {
    //Llamado a la API del clima
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${"ffa28d438ca47ba8fd703c0ed0c2c0bc"}&units=metric`)
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
          setCities(oldCities => [...oldCities, ciudad]);
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }
  function onFilter(ciudadId) { //para encontrar la info de la ciudad con el id
    let ciudad = cities.filter(c => c.id === parseInt(ciudadId)); //el id llega como string, hay que hacerle el parse int para pasarlo a numero
    if(ciudad.length > 0) {
        return ciudad[0];
    } else {
        return null;
    }
  }
  return (
    <div className="App">
      <Route 
      path='/'
      render={() =>
      <Nav onSearch={onSearch}/>}
      />
      <Route
      path='/about'
      component={About} />
      <div>
        <Route
        exact path='/'
        render={() =>
        <Cards
          cities={cities}
          onClose={onClose}
        />} 
        />
      </div>
      <Route
    exact
    path='/ciudad/:ciudadId'
    render={({match}) => <Ciudad
          city={onFilter(match.params.ciudadId)}
        />}
  />
      <hr />
    </div>
  );
}

export default App;
