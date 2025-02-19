import React, { useState, useEffect } from "react";
import Loader from "./Loader";

function JokeComponent() {
  const [joke, setJoke] = useState("");
  const [loader, setLoader] = useState(false);

const generateJoke = () => {
  setLoader(true);
  fetch("https://teehee.dev/api/joke").then((res) => res.json()).then((res) =>
    setJoke(res.value)).finally(() => {
      setLoader(false)
});
}

  useEffect(() => {
    generateJoke();
  }, []);

  return (
    <div className="text-center w-96 h-auto p-8 bg-blue-400 rounded-lg my-40 mx-auto text-white">
      <h1 className="text-2xl">Get a new joke 😂</h1>
      {joke ? (
        <p className="text-lg">{joke}</p>
      ) : (
        <p>Loading...</p>
      )}
      <button
        onClick={generateJoke}
        className="bg-white text-black rounded-sm p-2 mt-4 hover:cursor-pointer hover:bg-gray-200" 
      >
        {loader?<Loader />: "Generate Joke"}
      </button>
    </div>
  );
}

export default JokeComponent;