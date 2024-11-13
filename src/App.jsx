import { useState, useEffect } from 'react'

const App = () => {
  const [zombieFighters, setZombieFighters] = useState(
    [
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
  const [removedFighters, setRemovedFighters] = useState([])
  const [newFighter, setNewFighter] = useState({
    name: '',
    price: '',
    strength: '',
    agility: '',
    img: '',
  })
  const [totalCost, setTotalCost] = useState(0)
  const [money, setMoney] = useState(50) // Initial money
  const [error, setError] = useState('')

  const calculateTotalStrength = (fighters) =>
    fighters.reduce((total, fighter) => total + fighter.strength, 0)

  const calculateTotalAgility = (fighters) =>
    fighters.reduce((total, fighter) => total + fighter.agility, 0)

  const calculateTotalCost = (fighters) =>
    fighters.reduce((total, fighter) => total + fighter.price, 0)

  const handleAddFighter = () => {
    const fighter = {
      ...newFighter,
      price: parseInt(newFighter.price),
      strength: parseInt(newFighter.strength),
      agility: parseInt(newFighter.agility),
    }

    if (fighter.price > money) {
      setError("Not enough money to add this fighter!")
      return
    }

    const updatedFighters = [...zombieFighters, fighter]
    setZombieFighters(updatedFighters)
    setTotalStrength(calculateTotalStrength(updatedFighters))
    setTotalAgility(calculateTotalAgility(updatedFighters))
    setTotalCost(calculateTotalCost(updatedFighters))
    setMoney(money - fighter.price)
    setNewFighter({ name: '', price: '', strength: '', agility: '', img: '' })
    setError('')
  }

  const handleRemoveFighter = (idx) => {
    const removed = zombieFighters[idx]
    setRemovedFighters([...removedFighters, removed])
    const updatedFighters = zombieFighters.filter((_, index) => index !== idx)
    setZombieFighters(updatedFighters)
    setTotalStrength(calculateTotalStrength(updatedFighters))
    setTotalAgility(calculateTotalAgility(updatedFighters))
    setTotalCost(calculateTotalCost(updatedFighters))
    setMoney(money + removed.price)
  }

  const handleRestoreFighter = (idx) => {
    const restored = removedFighters[idx]
    if (restored.price > money) {
      setError("Not enough money to restore this fighter!")
      return
    }

    const updatedFighters = [...zombieFighters, restored]
    setZombieFighters(updatedFighters)
    setTotalStrength(calculateTotalStrength(updatedFighters))
    setTotalAgility(calculateTotalAgility(updatedFighters))
    setTotalCost(calculateTotalCost(updatedFighters))
    setMoney(money - restored.price)
    setRemovedFighters(removedFighters.filter((_, index) => index !== idx))
    setError('')
  }

  useEffect(() => {
    setTotalStrength(calculateTotalStrength(zombieFighters))
    setTotalAgility(calculateTotalAgility(zombieFighters))
    setTotalCost(calculateTotalCost(zombieFighters))
  }, [zombieFighters])

  return (
    <>
      <h2>Add a New Fighter</h2>
      <input
        type="text"
        placeholder="Name"
        value={newFighter.name}
        onChange={(e) => setNewFighter({ ...newFighter, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newFighter.price}
        onChange={(e) => setNewFighter({ ...newFighter, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Strength"
        value={newFighter.strength}
        onChange={(e) => setNewFighter({ ...newFighter, strength: e.target.value })}
      />
      <input
        type="number"
        placeholder="Agility"
        value={newFighter.agility}
        onChange={(e) => setNewFighter({ ...newFighter, agility: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={newFighter.img}
        onChange={(e) => setNewFighter({ ...newFighter, img: e.target.value })}
      />
      <button onClick={handleAddFighter}>Add Fighter</button>

      <p>Total Team Strength: {totalStrength}</p>
      <p>Total Team Agility: {totalAgility}</p>
      <p>Total Team Cost: {totalCost}</p>
      <p>Available Money: {money}</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}

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

      {removedFighters.length > 0 && (
        <>
          <h3>Removed Fighters</h3>
          <ul>
            {removedFighters.map((fighter, idx) => (
              <li key={idx}>
                <p>Name: {fighter.name}</p>
                <button onClick={() => handleRestoreFighter(idx)}>Restore</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default App