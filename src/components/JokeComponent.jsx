import React, { useState, useEffect } from "react";
import Loader from "./Loader";

function JokeComponent() {
  const [joke, setJoke] = useState("");
  const [loader, setLoader] = useState(false);

  const generateJoke = async () => {
    setLoader(true);
    try {
      const res = await fetch("https://teehee.dev/api/joke");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.joke) {
        setJoke(data.joke);
      } else {
        setJoke("No joke found.");
      }
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke(`Failed to load joke. Please try again later. Error: ${error.message}`);
    } finally {
      setLoader(false);
    }
  };

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
        {loader ? <Loader /> : "Generate Joke"}
      </button>
    </div>
  );
}

export default JokeComponent;