import React, { useEffect, useState, ReactNode, ChangeEvent } from "react";

import Animals from "./apifake/Animals";
import Owners from "./apifake/Owners";

import IOwner from "./apifake/Interfaces/IOwner";
import IAnimal from "./apifake/Interfaces/IAnimal";

import "./style.css";

// chamadas de api fake
const ownersConstructor: Owners = new Owners();
const animalsConstructor: Animals = new Animals();

const App = () => {
  const [owners, setOwners] = useState<IOwner[]>([]);
  const [selectedOwnerId, setSelectedOwnerId] = useState(1);
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [allAnimals, setAllAnimals] = useState<any[]>([]);

  useEffect(() => {
    ownersConstructor.getAll().then((ownersList) => {
      setOwners(ownersList);
    });
  }, []);

  useEffect(() => {
    animalsConstructor
      .getByOwnerId(selectedOwnerId)
      .then((animal) => setAnimals(animal));
  }, [selectedOwnerId]);

  const onChangeInput = (event: ChangeEvent<HTMLSelectElement>) => {
    const id = event.target.value;
    setSelectedOwnerId(Number(id));
  };

  const getAllAnimals = () => {
    let allAnimals = owners.map(async (guy) => {
      return await animalsConstructor.getByOwnerId(guy.id);
    });
    Promise.all(allAnimals).then((animals) => setAllAnimals(animals));
  };

  const getOwner = (ownerId: number) => {
    return owners.filter((owner) => owner.id === ownerId);
  };

  const parseOwnersAndAnimals = () => {
    return allAnimals.map((animal) => {
      const { ownerId } = animal[0];
      const owner = getOwner(ownerId);
      const { name } = owner[0];

      return {
        name: name,
        totalAnimals: animal.length,
      };
    });
  };

  const sortAnimals = (param: any) => {
    return Object.entries(param).sort((a: any, b: any) => {
      return b[1].totalAnimals - a[1].totalAnimals;
    });
  };

  const renderOwnersElements = () =>
    owners.map((owner) => optionElements(owner.id, owner.id, owner.name));

  const renderAnimalsElements = () =>
    animals.map((animal) => optionElements(animal.id, animal.id, animal.name));

  const optionElements = (
    value: string | number,
    key: string | number,
    name: string
  ) => {
    return (
      <option value={value} key={key}>
        {name}
      </option>
    );
  };

  const renderListElements = (): ReactNode => {
    const animalsAndOwner = parseOwnersAndAnimals();
    const sortable = sortAnimals(animalsAndOwner);

    return sortable.map((guys: any, index: number) => {
      const { name, totalAnimals } = guys[1];
      return (
        <tr key={`list-${index}`}>
          <td>{name}</td>
          <td>{totalAnimals}</td>
        </tr>
      );
    });
  };

  return (
    <div className="App">
      <section id="owners-section">
        <label htmlFor="owners">Donos:</label>
        <select id="owners" onChange={onChangeInput}>
          {renderOwnersElements()}
        </select>
      </section>
      <section id="animals-section">
        <label htmlFor="animals">Animais:</label>
        <select id="animals">{renderAnimalsElements()}</select>
      </section>
      <section id="report">
        <button onClick={getAllAnimals}>Ordenar donos com mais animais</button>
        <table id="reportList">
          <thead>
            <tr>
              <th>Dono</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>{renderListElements()}</tbody>
        </table>
      </section>
    </div>
  );
};

export default App;
