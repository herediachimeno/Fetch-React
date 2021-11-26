import { useEffect, useState } from "react";
import "./App.css";

function Lista({ lista }) {
  console.log(lista);
  return (
    <ul>
      {lista.map((pokemon) => {
        return <li>{pokemon.pokemon.name}</li>;
      })}
    </ul>
  );
}

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/type")
      .then((res) => res.json())
      .then((datos) => {
        setData(datos.results);
      });
  }, []);

  useEffect(() => {
    fetch(select)
      .then((res) => res.json())
      .then((datos) => {
        let array = [];
        if (datos.pokemon.length > 0) {
          for (let i = 0; i < 3; i++) {
            array.push(
              datos.pokemon[Math.floor(Math.random() * datos.pokemon.length)]
            );
          }
        } else {
          array.push({ name: "No se encontraron pokémon de este tipo " });
        }
        setData2(array);
      });
  }, [select]);

  return (
    <>
      <select onChange={(e) => setSelect(e.target.value)}>
        {data.map((tipo) => {
          return <option value={tipo.url}>{tipo.name}</option>;
        })}
      </select>
      <Lista lista={data2} />
    </>
  );
}

export default App;
