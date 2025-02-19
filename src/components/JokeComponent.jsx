import React, { useState, useEffect } from "react";
import Loader from "./Loader";

function JokeComponent() {
  const [joke, setJoke] = useState("");
  const [loader, setLoader] = useState(false);

const generateJoke = () => {
  setLoader(true);
  fetch("https://api.chucknorris.io/jokes/random").then((res) => res.json()).then((res) =>
    setJoke(res.value)).finally(() => {
      setLoader(false)
});
}

  useEffect(() => {
    generateJoke();
  }, []);

  return (
    <div className="text-center w-96 h-auto p-8 bg-white rounded-lg my-40 mx-auto text-black">
      <h1 className="text-2xl">Get a new joke 😂</h1>
      {joke ? (
        <p className="text-lg">{joke}</p>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={generateJoke}
        className="bg-gray-800 text-white rounded-sm p-2 mt-4 hover:cursor-pointer hover:bg-gray-700" 
      >
        {loader?<Loader />: "Generate Joke"}
      </button>
    </div>
  );
}

export default JokeComponent;