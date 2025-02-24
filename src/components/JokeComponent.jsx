import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Share2 } from "lucide-react";

function JokeComponent() {
  const [joke, setJoke] = useState("");
  const [loader, setLoader] = useState(false);
  const [upvotes, setUpvotes] = useState(() => {
    const saved = localStorage.getItem("upvotes");
    return saved ? parseInt(saved) : 0;
  });
  const [downvotes, setDownvotes] = useState(() => {
    const saved = localStorage.getItem("downvotes");
    return saved ? parseInt(saved) : 0;
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem("upvotes", upvotes.toString());
  }, [upvotes]);

  useEffect(() => {
    localStorage.setItem("downvotes", downvotes.toString());
  }, [downvotes]);

  const shareJoke = async () => {
    try {
      await navigator.clipboard.writeText(joke);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy joke:", err);
    }
  };

  const generateJoke = async () => {
    setLoader(true);
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
      <div className="flex justify-center items-center space-x-4 my-6">
        <button
          onClick={() => setUpvotes(upvotes + 1)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
        >
          <span className="text-2xl">👍</span>
          <span className="text-lg font-semibold">{upvotes}</span>
        </button>
        <button
          onClick={() => setDownvotes(downvotes + 1)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
        >
          <span className="text-2xl">👎</span>
          <span className="text-lg font-semibold">{downvotes}</span>
        </button>
        <button
          onClick={shareJoke}
          className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          title="Copy to clipboard"
        >
          <Share2 size={24} className={copied ? "text-green-500" : "text-gray-600"} />
        </button>
      </div>
      <button
        onClick={generateJoke}
        className="bg-gray-800 text-white rounded-lg px-6 py-3 mt-4 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        {loader ? <Loader /> : "Generate Joke"}
      </button>
    </div>
  );
}

export default JokeComponent;