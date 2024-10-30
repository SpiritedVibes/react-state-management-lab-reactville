import { useState, useEffect } from 'react';

const App = () => {
  const [zombieFighters, setFighter] = useState([
    {
      name: 'Survivor',
      price: 12,
      strength: 6,
      agility: 4,
      img: 'https://via.placeholder.com/150/92c952',
    },
    {
      name: 'Scavenger',
      price: 10,
      strength: 5,
      agility: 5,
      img: 'https://via.placeholder.com/150/771796',
    },
    {
      name: 'Shadow',
      price: 18,
      strength: 7,
      agility: 8,
      img: 'https://via.placeholder.com/150/24f355',
    },
    {
      name: 'Tracker',
      price: 14,
      strength: 7,
      agility: 6,
      img: 'https://via.placeholder.com/150/d32776',
    },
    {
      name: 'Sharpshooter',
      price: 20,
      strength: 6,
      agility: 8,
      img: 'https://via.placeholder.com/150/1ee8a4',
    },
    {
      name: 'Medic',
      price: 15,
      strength: 5,
      agility: 7,
      img: 'https://via.placeholder.com/150/66b7d2',
    },
    {
      name: 'Engineer',
      price: 16,
      strength: 6,
      agility: 5,
      img: 'https://via.placeholder.com/150/56acb2',
    },
    {
      name: 'Brawler',
      price: 11,
      strength: 8,
      agility: 3,
      img: 'https://via.placeholder.com/150/8985dc',
    },
    {
      name: 'Infiltrator',
      price: 17,
      strength: 5,
      agility: 9,
      img: 'https://via.placeholder.com/150/392537',
    },
    {
      name: 'Leader',
      price: 22,
      strength: 7,
      agility: 6,
      img: 'https://via.placeholder.com/150/602b9e',
    },
  ])

  const [totalStrength, setTotalStrength] = useState(0)
  const [totalAgility, setTotalAgility] = useState(0)

  // Helper functions to calculate
  const calculateTotalStrength = (fighters) => {
    return fighters.reduce((total, fighter) => total + fighter.strength, 0);
  }
const calculateTotalAgility = (fighters) => {
  return fighters.reduce((total, fighter) => total + fighter.agility, 0)
}


  const handleAddFighter = () => {
    const newFighter = {
      name: 'New Fighter',
      price: 13,
      strength: 5,
      agility: 7,
      img: 'placeholder',
    }
    const updatedFighters = [...zombieFighters, newFighter];
    setFighter(updatedFighters);
    setTotalStrength(calculateTotalStrength(updatedFighters)) // Recalculate total strength
    setTotalAgility(calculateTotalAgility(updatedFighters))
  }

  const handleRemoveFighter = (idx) => {
    const updatedFighters = zombieFighters.filter((_, index) => index !== idx);
    setFighter(updatedFighters);
    setTotalStrength(calculateTotalStrength(updatedFighters))
    setTotalAgility(calculateTotalAgility(updatedFighters))
  }

  // Update total strength when zombieFighters changes
  useEffect(() => {
    setTotalStrength(calculateTotalStrength(zombieFighters))
    setTotalAgility(calculateTotalAgility(zombieFighters))
  }, [zombieFighters])

  return (
    <>
      <button onClick={handleAddFighter}>Add Fighter</button>
      <p>Total Team Strength: {totalStrength}</p>
      <p>Total Team Agility: {totalAgility}</p>
      {zombieFighters.length === 0 ? (
        <p>Pick some team members!</p>
      ) : (
        <ul>
          {zombieFighters.map((fighter, idx) => (
            <li key={idx}>
              <p>Name: {fighter.name}</p>
              <p>Price: {fighter.price}</p>
              <p>Strength: {fighter.strength}</p>
              <p>Agility: {fighter.agility}</p>
              <img src={fighter.img} alt={`${fighter.name}`} />
              <button onClick={() => handleRemoveFighter(idx)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default App
