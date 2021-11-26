import { useState, useEffect } from "react";

function Residentes(props) {
  const [data, setData] = useState([]);

  useEffect(
    function () {
      Promise.all(props.residents.map((url) => fetch(url)))
        .then((respuesta) => Promise.all(respuesta.map((res) => res.json())))
        .then((res) => {
          setData(res);
        });
    },
    [props.residents]
  );

  const personajes = data.map(function (personaje) {
    return <h3>{personaje.name}</h3>;
  });

  return <div>{personajes}</div>;
}

const InfoPlaneta = (props) => {
  const [residents, setResidents] = useState([]);

  console.log(props);

  useEffect(() => {
    fetch(props.url)
      .then((res) => res.json())
      .then((res) => {
        setResidents(res.residents);
      });
  }, [props.url]);

  return <Residentes residents={residents} />;
};

function App() {
  const [data, setData] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetch("http://swapi.dev/api/planets")
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res.results);
      });
  }, []);

  function handleChange(event) {
    setUrl("http://swapi.dev/api/planets/" + event.target.value);
  }

  const options = data.map(function (option, index) {
    return <option value={index + 1}>{option.name}</option>;
  });

  return (
    <>
      <select onChange={handleChange}>{options}</select>
      <InfoPlaneta url={url} />
    </>
  );
}

export default App;
