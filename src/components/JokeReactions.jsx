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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const suggestedEmojis = ["😊", "🤔", "😱", "🤣", "😍", "😇"];

  useEffect(() => {
    localStorage.setItem("reactions", JSON.stringify(reactions));
  }, [reactions]);

  const handleAddEmoji = (emoji) => {
    if (!reactions[emoji]) {
      setReactions(prev => ({
        ...prev,
        [emoji]: 0
      }));
    }
    setShowEmojiPicker(false);
  };



  return (
    <div className="flex flex-wrap justify-center items-center gap-4 my-6">
      {Object.entries(reactions).map(([emoji, count]) => (
        <div key={emoji} className="flex items-center gap-2">
          <button
            onClick={() => setReactions(prev => ({
              ...prev,
              [emoji]: prev[emoji] + 1
            }))}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105"
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-lg font-semibold">{count}</span>
          </button>
          <button
            onClick={() => setReactions(prev => {
              const newReactions = { ...prev };
              delete newReactions[emoji];
              return newReactions;
            })}
            className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            ×
          </button>
        </div>
      ))}
      <div className="relative">
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Add Emoji
        </button>
        {showEmojiPicker && (
          <div className="absolute top-full mt-2 p-4 bg-white rounded-lg shadow-xl border z-10 grid grid-cols-5 gap-4 min-w-[280px]">
            {suggestedEmojis.map(emoji => (
              <button
                key={emoji}
                onClick={() => handleAddEmoji(emoji)}
                className="text-2xl p-3 hover:bg-gray-100 rounded transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JokeReactions;