import React, { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import JokeReactions from "./JokeReactions";

function JokeComponent() {
  const [joke, setJoke] = useState("");
  const [loader, setLoader] = useState(false);
  const reactionsRef = useRef();

  const generateJoke = async () => {
    setLoader(true);
    if (reactionsRef.current) {
      reactionsRef.current.resetReactions();
    }
    
    try {
      const res = await fetch("https://official-joke-api.appspot.com/random_joke");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setJoke(`${data.setup} ${data.punchline}`);
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
    <div className="text-center w-96 h-auto p-8 bg-white rounded-lg shadow-xl my-40 mx-auto text-black transition-all duration-300 hover:shadow-2xl">
      <h1 className="text-2xl border-2 rounded-lg p-3 bg-gray-800 text-white mb-6 transition-colors duration-300 hover:bg-gray-700">Get a new joke 😂</h1>
      <div className="min-h-[100px] flex items-center justify-center">
        {joke ? (
          <p className="text-lg transition-opacity duration-300 ease-in-out">{joke}</p>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
      </div>
      <JokeReactions ref={reactionsRef} />
      <button
        onClick={generateJoke}
        className="bg-gray-800 text-white rounded-lg px-6 py-3 mt-4 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
      >
        {loader ? <Loader /> : "Generate Joke"}
      </button>
    </div>
  );
}

export default JokeComponent;