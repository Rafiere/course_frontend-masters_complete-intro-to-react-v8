import { useState, useEffect } from "react";
import Pet from "./Pet";

const ANIMALS = ["bird", "cat"];
const BREEDS = [];

const SearchParams = () => {
  /* O primeiro parâmetro da tupla do "useState" é uma variável que armazena
  o estado atual, enquanto que o segundo parâmetro é uma função que serve para atualizarmos o estado do componente. */

  /* Basicamente, o hook "useState" permite que lidemos com estados da aplicação. */
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");

  /* Um "effect" é, basicamente, algo que acontecerá fora do componente. Ele serve para executarmos tarefas fora do ciclo de vida do componente. A maioria das vezes que esse hook é utilizado, é para realizar requisições de APIs. Ele também pode ser utilizado para acessar o local storage, salvar algo na API, salvar algo no local storage e etc. */

  /* Se não passarmos nenhum array como o segundo parâmetro do "useEffect()", a função dele continuará sendo executada sempre que o componente renderizar. Se passarmos um array de dependências vazio como o segundo parâmetro, o "useEffect()" será executado apenas na primeira vez em que o array renderizar. */

  /* Ao inserirmos o estado "animal" no array de dependências, sempre que o valor do estado de "animal" for alterado, a função que está dentro do "useEffect()" será executada, que, nesse caso, é a função "requestPets". */

  const [pets, setPets] = useState([]);

  useEffect(() => {
    requestPets();
  }, []);

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );

    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => {
              return <option key={animal}>{animal}</option>;
            })}
          </select>
        </label>
        <label htmlFor="breed">
          Animal
          <select
            id="breed"
            disabled={BREEDS.length === 0}
            value={breed}
            onChange={(e) => {
              setBreed(e.target.value);
            }}
          >
            <option />
            {BREEDS.map((breed) => {
              return <option key={breed}>{breed}</option>;
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {pets.map((pet) => (
        <Pet
          key={pet.id}
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
        />
      ))}
    </div>
  );
};

export default SearchParams;
