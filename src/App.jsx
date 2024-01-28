import { useState, useEffect} from 'react'
import {getAllSpells } from "./api"
import SpellCard from './SpellCard'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)
  const [spells, setSpells] = useState([])

  useEffect(() => {
    getAllSpells().then(setSpells);
  }, []);

  return (
    <>
      <h1>Spells</h1>
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
      <div className="App">
      <ul className='spell-list'>
        {spells.map((spell) => (
          <SpellCard key={spell.index} spell={spell} />
        ))}
      </ul>
    </div>
    </>
  )
}