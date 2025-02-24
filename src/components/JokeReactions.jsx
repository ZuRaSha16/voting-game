import React, { useState, useEffect } from "react";

function JokeReactions() {
  const [reactions, setReactions] = useState(() => {
    const saved = localStorage.getItem("reactions");
    return saved ? JSON.parse(saved) : {

    };
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const suggestedEmojis = ["😂", "❤️", "😭", "😎", "🤔", "😨", "😍", "😴", "🤮"];
  
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
          className="bg-gray-800 text-white rounded-lg px-4 py-2 mt-4 hover:cursor-pointer hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
        >
          Add Emoji
        </button>
        {showEmojiPicker && (
          <div className="fixed sm:absolute left-1/2 bottom-0 sm:bottom-auto sm:top-full transform -translate-x-1/2 w-full sm:w-auto sm:mt-2 p-4 bg-white rounded-lg shadow-xl border z-10">
            <div className="grid grid-cols-3 gap-4 mx-auto max-w-[280px]">
              {suggestedEmojis.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleAddEmoji(emoji)}
                  className="text-2xl w-14 h-14 hover:bg-gray-100 rounded transition-colors flex items-center justify-center aspect-square"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JokeReactions;