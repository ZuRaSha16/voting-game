import React from "react";
import JokeComponent from "./components/JokeComponent";

const App = () => {
  return (
    <div className="bg-gray-800 h-screen w-screen flex justify-center items-center">
      <JokeComponent />
    </div>
  );
};

export default App;