import React, { useState } from 'react' 

function App() {
  const [jokes, setJokes] = useState([])

  const FetchJokes = () => {
    const res= fetch(" https://teehee.dev/api/joke")
    const data = res.json()
    setJokes(data)
  }

  return (
    <div className="text-center w-96 h-auto p-8 bg-blue-400 rounded-lg my-40 mx-auto text-white">
      <h1 className="text-2xl">Get a new joke😂</h1>
      <p className="text-l">New jokes upcoming</p>
      <button onClick={FetchJokes} className="bg-white text-black rounded-sm">New Joke</button>
    </div>
  )
}

export default App