const SearchParams = () => {
  /* O primeiro parâmetro da tupla do "useState" é uma variável que armazena
  o estado atual, enquanto que o segundo parâmetro é uma função que serve para atualizarmos o estado do componente. */
  const [location, setLocation] = useState("");

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;
