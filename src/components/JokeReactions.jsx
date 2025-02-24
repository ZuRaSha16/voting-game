import React, { useState, useEffect } from "react";

function JokeReactions() {
  const [reactions, setReactions] = useState(() => {
    const saved = localStorage.getItem("reactions");
    return saved ? JSON.parse(saved) : {
      "😂": 0,
      "❤️": 0,
      "😢": 0
    };
  });
  const [newEmoji, setNewEmoji] = useState("");

  useEffect(() => {
    localStorage.setItem("reactions", JSON.stringify(reactions));
  }, [reactions]);

  const handleAddEmoji = (e) => {
    e.preventDefault();
    if (newEmoji && !reactions[newEmoji]) {
      setReactions(prev => ({
        ...prev,
        [newEmoji]: 0
      }));
      setNewEmoji("");
    }
  };

  const resetReactions = () => {
    setReactions(prev => {
      const resetReactions = {};
      Object.keys(prev).forEach(emoji => {
        resetReactions[emoji] = 0;
      });
      return resetReactions;
    });
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-6">
      {Object.entries(reactions).map(([emoji, count]) => (
        <button
          key={emoji}
          onClick={() => setReactions(prev => ({
            ...prev,
            [emoji]: prev[emoji] + 1
          }))}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
        >
          <span className="text-2xl">{emoji}</span>
          <span className="text-lg font-semibold">{count}</span>
        </button>
      ))}
      <form onSubmit={handleAddEmoji} className="flex items-center gap-2">
        <input
          type="text"
          value={newEmoji}
          onChange={(e) => setNewEmoji(e.target.value)}
          placeholder="Add emoji"
          className="w-20 px-2 py-1 border rounded"
        />
        <button
          type="submit"
          className="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default JokeReactions;