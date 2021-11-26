import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.results);
      });
  }, [page]);

  function paginaAnterior() {
    setPage(page - 1);
  }

  function paginaSiguiente() {
    setPage(page + 1);
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
