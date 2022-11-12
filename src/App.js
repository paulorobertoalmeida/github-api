import React, { useEffect, useState } from "react";


export default function App() {
  const [repositories, setRepositories] = useState([]);
  // fetch the data from my own repo
  useEffect(async (): string => {
    const response: string = await fetch(
      "https://api.github.com/users/paulorobertoalmeida/repos"
    );
    const data: string = await response.json();

    setRepositories(data);
  }, []);
  // create and handle the favorite repos
  function handleFavorite(id) {
    const newRepositories = repositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRepositories(newRepositories);
  }
  // Change the title of the page
  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `you got ${filtered.length} favorites`;
  }, [repositories]);

  const [show, setShow] = useState();

  const ToggleData = () => {
    setShow(!show);
  };

  useEffect(() => {
  const newToggle = ToggleData.show;
  }, [show])
  

  return (
    <div className="max-w-2xl mx-auto mt-5">
      <div className="bg-grey shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <div className="p-5">
          <ul >
            {repositories.map((repo) => (
              <li key={repo.id} className="bg-gray-200 m-2 p-2 rounded-xl shadow-md item-center">
                {" "}
                {repo.name} {repo.favorite && <span>(Favorito)</span>}
                <button onClick={() => handleFavorite(repo.id)} className="text-center m-2 text-white font-bold rounded p-2   focus:outline-none bg-green-900 ">
                  Favoritar
                </button>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle" class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
                  <label onClick={ToggleData} className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">  </label>
                  {show? <h1>Favorito</h1> : <h1>not</h1>  }
                </div>
                
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
