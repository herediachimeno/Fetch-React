import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [prev, setPrev] = useState("");
  const [next, setNext] = useState("");
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character");

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setPrev(res.info.prev);
        setNext(res.info.next);
        setData(res.results);
      });
  }, [url]);

  function paginaAnterior() {
    if (prev !== null) {
      setUrl(prev);
    }
  }

  function paginaSiguiente() {
    if (next !== null) {
      setUrl(next);
    }
  }

  const mostrarPersonajes = data.map(function (personaje) {
    return (
      <div>
        <h4>{personaje.name}</h4>
        <img src={personaje.image} alt="imagen_personaje" />
      </div>
    );
  });

  return (
    <>
      {mostrarPersonajes}
      <button onClick={paginaAnterior}>Página anterior</button>
      <button onClick={paginaSiguiente}>Página siguiente</button>
    </>
  );
}

export default App;
