import React, { useState, useEffect } from "react";
import Loader from "./Loader";

function JokeComponent() {
  const [joke, setJoke] = useState("");
  const [loader, setLoader] = useState(false);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const generateJoke = async () => {
    setLoader(true);
    setUpvotes(0);
    setDownvotes(0);
    try {
      const res = await fetch("https://api.chucknorris.io/jokes/random");
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setJoke(data.value);
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
    <div className="text-center w-96 h-auto p-8 bg-white rounded-lg my-40 mx-auto text-black">
      <h1 className="text-2xl">Get a new joke 😂</h1>
      {joke ? (
        <p className="text-lg">{joke}</p>
      ) : (
        <p>Loading...</p>
      )}
      <div className="flex justify-center space-x-4 my-4">
        <button
          onClick={() => setUpvotes(upvotes + 1)}
          className="text-2xl hover:cursor-pointer"
        >
          👍 {upvotes}
        </button>
        <button
          onClick={() => setDownvotes(downvotes + 1)}
          className="text-2xl hover:cursor-pointer"
        >
          👎 {downvotes}
        </button>
      </div>
      <button
        onClick={generateJoke}
        className="bg-gray-900 text-white rounded-sm p-2 mt-4 hover:cursor-pointer hover:bg-gray-700 transition duration-200"
      >
        {loader ? <Loader /> : "Generate Joke"}
      </button>
    </div>
  );
}

export default JokeComponent;