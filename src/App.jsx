// Import necessary modules and components
import { useState, useEffect } from 'react';
import { getAllSpells, getAllMonsters, getAllEquipment } from './api';
import SpellCard from './SpellCard';
import MonsterCard from './MonsterCard'; // Create MonsterCard component
import EquipmentCard from './EquipmentCard'; // Create EquipmentCard component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

// Main App component
export default function App() {
  // State to track count, spells, selected spells, and search term
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
        {/* Navigation Bar */}
        <nav>
          <ul>
            <li><a href="#spell-list">Spell List</a></li>
            <li><a href="#spellbook">Spellbook</a></li>
            <li><a href="#monster-list">Monster List</a></li>
            <li><a href="#equipment-list">Equipment List</a></li>
          </ul>
        </nav>

        {/* Like button and count */}
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

        {/* Spell Search */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for spells..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Spell List */}
        <div className="App" id="spell-list">
          {/* Display loading message if spells are not loaded */}
          {spells.length === 0 && <span className="loading">Loading...</span>}

          {/* Display spell list using Bootstrap classes */}
          <ul className="spell-list list-unstyled d-flex justify-content-center gap-3">
            {spells
              .filter((spell) =>
                spell.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((spell) => (
                <SpellCard
                  key={spell.index}
                  spell={spell}
                  addToSpellbook={addToSpellbook}
                  isSpellSelected={isSpellSelected}
                  toggleSelection={toggleSelection}
                />
              ))}
          </ul>
        </div>

        {/* Spellbook */}
        <div className="spellbook" id="spellbook">
          <h2>Spellbook</h2>
          <ul>
            {spellbook.map((spell) => (
              <SpellCard
                key={spell.index}
                spell={spell}
                addToSpellbook={addToSpellbook}
                isSpellSelected={isSpellSelected}
                toggleSelection={toggleSelection}
              />
            ))}
          </ul>
        </div>

        {/* Monster List */}
        <div className="App" id="monster-list">
          {/* Fetch and display monster data */}
          {/* (Similar to the spell list, create a MonsterCard component) */}
          <ul className="monster-list list-unstyled d-flex justify-content-center gap-3">
            {monsters.map((monster) => (
              <MonsterCard key={monster.index} monster={monster} />
            ))}
          </ul>
        </div>

        {/* Equipment List */}
        <div className="App" id="equipment-list">
          {/* Fetch and display equipment data */}
          {/* (Similar to the spell list, create an EquipmentCard component) */}
          <ul className="equipment-list list-unstyled d-flex justify-content-center gap-3">
            {equipment.map((item) => (
              <EquipmentCard key={item.index} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
