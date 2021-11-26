import "./App.css";
import { useState, useEffect } from "react";

function Cartas(props) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/cards?set=" + props.selected)
      .then((res) => res.json())
      .then((res) => {
        setCards(res.cards);
        console.log(res);
      });
  }, [props.selected]);

  const mostrarCartas = cards.map(function (card) {
    return (
      <div>
        <h3>{card.name}</h3>
        <img class="carta" src={card.imageUrl} alt="imagen_carta" />
        <p>{card.text}</p>
      </div>
    );
  });

  return mostrarCartas;
}

function App() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("https://api.magicthegathering.io/v1/sets")
      .then((res) => res.json())
      .then((res) => {
        setData(res.sets);
      });
  }, []);

  function manageChange(event) {
    setSelected(event.target.value);
  }

  const options = data.map((option) => {
    return <option value={option.code}>{option.name}</option>;
  });

  return (
    <>
      <select onChange={manageChange}>{options}</select>;{" "}
      <Cartas selected={selected} />{" "}
    </>
  );
}

export default App;
