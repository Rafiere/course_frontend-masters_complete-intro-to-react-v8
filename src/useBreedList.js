import { useState, useEffect } from "react";

const localCache = {};

/* Essa função receberá um animal. Se, por exemplo, já tivermos selecionado um "dog" antes e essa função já conhecer esse "dog", ele obterá as informações desse animal em um cache local, ao invés de realizar a requisição para a API novamente. */

/* Hooks customizados são, basicamente, hooks do React que estão encapsulados de forma conjunta. */

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);

  /* Esse estado servirá para mostrarmos se o estado é "unloaded", "loading", "loaded" e etc. */

  const [status, setStatus] = useState("unloaded");

  /* Se nenhum animal for passado como parâmetro, a lista de raças estará zerada. Se o animal que for passado como parâmetro já existir, com a sua lista de raças, no objeto localCache, a lista de raças atual será definida com base no localCache. Se ele não existir, será feita a requisição para o "requestBreedList" e a lista de raças para um determinado animal será criada. */

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);

      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );

      const json = await res.json();

      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);

      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
