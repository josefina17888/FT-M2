import React from 'react';
import s from '../styles/SearchBar.module.css'
export default function SearchBar(props) {
  // acá va tu código
  return (<div className={s.div}>
    <input type="text" className={s.in} placeholder={"Ciudad..."} />
    <button className={`${s.boton} ${s.botonAgregar}`} onClick={() => props.onSearch("Buscando ciudad...")}>Agregar</button>
  </div>)
};