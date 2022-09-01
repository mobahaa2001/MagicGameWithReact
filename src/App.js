import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
]
function App() {
  // Using React Hook(useState and useEffect)
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceOTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  // Shuffle Cards
  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({
        ...card,
        id: Math.random(),
      }))
    setChoiceOne(null)
    setChoiceOTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // Handle A Choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceOTwo(card) : setChoiceOne(card)
  }

  // Compare 2 Selected Cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])
  
  // Reset Choices & Increase Turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceOTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false)
  }

  // Start A New Game Automagically
  useEffect(() => {
    shuffledCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Game</h1>
      <button onClick={shuffledCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  )
}

export default App
