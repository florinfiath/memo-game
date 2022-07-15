
import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const CardImages = [
  {"src":"img/img1.jpg", matched: false},
  {"src":"img/img2.jpg ",matched: false},
  {"src":"img/img3.jpg",matched: false},
  {"src":"img/img4.jpg",matched: false},
  {"src":"img/img5.jpg",matched: false},
  {"src":"img/img6.jpg",matched: false},
  {"src":"img/img7.jpg",matched: false},
  {"src":"img/img8.jpg",matched: false} ,
  {"src":"img/img9.jpg",matched: false} ,
  {"src":"img/img10.jpg",matched: false}, 
  {"src":"img/img11.jpg",matched: false}, 
  {"src":"img/img12.jpg",matched: false}, 
  {"src":"img/img13.jpg",matched: false}, 
  {"src":"img/img14.jpg",matched: false}, 
  {"src":"img/img15.jpg",matched: false}, 
  {"src":"img/img16.jpg",matched: false}, 
  {"src":"img/img17.png",matched: false},
  {"src":"img/img18.jpg",matched: false},
]


function App() {
   
  const [cards, setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne,setChoiceOne] = useState(null)
  const [choiceTwo,setChoiceTwo] = useState(null)
  const [disabled,setDisabled] = useState(false)


 //suffle cards

  const shuffleCards = () => {
    const shuffledCards = [...CardImages,...CardImages] 
    .sort(() => Math.random()- 0.5)
    .map((card) =>({...card, id:Math.random()}))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)

  }

  //handle a choice  

  const handleChoice = (card) => {
 choiceOne? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected cards 

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
             if (card.src === choiceOne.src) {
               return {...card, matched: true}
             }
             else {
              return card
             }
          })
        })
        resetTurn()
      }
      else {
    
       setTimeout(() => resetTurn() , 1000 ) 
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choice and increase turn

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically 

  useEffect (() => {
    shuffleCards()
  } , [])
  return (
   <div className='App'>
   <h1>Magic Match</h1>
   <button onClick={shuffleCards}>New Game</button>
 
   <div className='card-grid'>
     {cards.map(card => (
      <SingleCard 
      key = {card.id} 
      card = {card}
      handleChoice = {handleChoice}
      flipped = {card === choiceOne || card === choiceTwo || card.matched}
      disabled = {disabled}
      />
     ))}
   </div>
   <p>Turns: {turns}</p>
   </div>
   );
}

export default App;
