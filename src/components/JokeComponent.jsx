import React, { useState, useEffect } from "react";

function JokeComponent() {
  const [joke, setJoke] = useState(null);

  const FetchJoke = async () => {
    try {
      const res = await fetch("https://teehee.dev/api/joke");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log("API response:", data);
      setJoke(data.joke || data.text || "No joke found.");
    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke("Failed to load joke. Please try again later.");
    }
  };

  useEffect(() => {
    FetchJoke();
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
        onClick={FetchJoke}
        className="bg-white text-black rounded-sm p-2 mt-4 hover:cursor-pointer hover:bg-gray-200" 
      >
        New Joke
      </button>
    </div>
  );
}

export default JokeComponent;