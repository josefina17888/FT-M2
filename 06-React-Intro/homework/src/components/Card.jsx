import React from 'react';
import s from '../styles/Cards.module.css';
export default function Card(props) {
  // acá va tu código
//   Este Componente va a recibir las siguientes props:
// - **max**: Temperatura Máxima.
// - **min**: Temperatura Mínima.
// - **name**: Nombre de la ciudad.
// - **img**: nombre de la imagen que se debe mostrar.
// - **onClose**: recibe una función que se va a ejecutar cuando el usuario haga click en el botón de cerrar.
  //max, min, name, img, onClose
  
  return <div className={s.carta}>
    <button className={s.boton} onClick={props.onClose}>X</button>
    <h4 className={s.nombre}>{props.name}</h4>
    <div className={s.middle}>
      <div className={s.temp}>
      <p className={s.p}>Min</p>
      <p className={s.p}>{props.min}</p>
      </div>
      <div className={s.temp}>
      <p className={s.p}>Max</p>
      <p className={s.p}>{props.max}</p>
      </div>    
    </div>
    <img src={`http://openweathermap.org/img/wn/${props.img}@2x.png`} alt={'img'} />
  </div>
};