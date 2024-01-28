import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Title</h1>
      <div className="card">
        <button> 
          count is {count}
        </button>
        <p>
        <button class="" onClick={() => setCount((count) => count + 1)}>
          Like</button>
        </p>
      </div>
      <p className="read-the-docs">
        This is a test!
      </p>
    </>
  )
}

export default App
