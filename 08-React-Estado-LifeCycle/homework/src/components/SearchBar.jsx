import React, { useState } from "react";

export default function SearchBar({onSearch}) {
  const [city, setCity] = useState("");
  return (
    <form onSubmit={(e) => {
      e.preventDefault(); //para evitar que se actualice la pagina que es el default de form html
      onSearch(city);
    }}>
      <input
        type="text"
        placeholder="Ciudad..."
        value={city}
        onChange = {e => setCity(e.target.value)}
      />
      <input type="submit" value="Agregar" />
    </form>
  );
}
