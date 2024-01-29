import { useState, useEffect } from 'react';
import { getAllSpells } from './api';
import SpellCard from './SpellCard';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

export default function App() {
  // State to track count and spells
  const [count, setCount] = useState(0);
  const [spells, setSpells] = useState([]);
  const [spellbook, setSpellbook] = useState([]); // Track selected spells
  const [searchTerm, setSearchTerm] = useState(''); // Track search term

  // useEffect to fetch spells and handle local storage
  useEffect(() => {
    // Retrieve saved spells from local storage
    const savedSpells = localStorage.getItem('spells');
    if (savedSpells) setSpells(JSON.parse(savedSpells));

    // Fetch all spells and update state and local storage
    getAllSpells().then((spells) => {
      setSpells(spells);
      localStorage.setItem('spells', JSON.stringify(spells));
    });
  }, []); // Empty dependency array triggers the effect only once on mount

  // Function to add spell to spellbook
  const addToSpellbook = (spell) => {
    setSpellbook((prevSpellbook) => [...prevSpellbook, spell]);
  };

  // Function to toggle spell selection
  const toggleSelection = (spell) => {
    if (isSpellSelected(spell)) {
      setSpellbook((prevSpellbook) =>
        prevSpellbook.filter((selectedSpell) => selectedSpell !== spell)
      );
    } else {
      setSpellbook((prevSpellbook) => [...prevSpellbook, spell]);
    }
  };

  // Function to check if a spell is selected
  const isSpellSelected = (spell) => spellbook.includes(spell);


  return (
    <>
      <div className="container">
        <div className="card">
          <button>
            Count is {count}
          </button>
          <p>
            <button className="" onClick={() => setCount((count) => count + 1)}>
              Like
            </button>
          </p>
        </div>
        <div className="App">
          {/* Display loading message if spells are not loaded */}
          {spells.length === 0 && <span className="loading">Loading...</span>}

          {/* Display spell list using Bootstrap classes */}
          <ul className="spell-list list-unstyled d-flex justify-content-center gap-3">
            {spells.map((spell) => (
              <SpellCard key={spell.index} spell={spell} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}