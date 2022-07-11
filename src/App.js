import React, {useState} from 'react'
import { useEffect } from 'react';
import './App.css';
import Box from './components/Box';

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [squareWin, setSquareWin] = useState([]);
  const [playerWin, setPlayerWin] = useState(null);
  const [xPlayer, setXPlayer] = useState(true)
  const handlePlay = (index) => {
    const temp = state.slice()
    
    if(playerWin) return

    if (temp[index] !== null) return

    temp[index] = xPlayer ? 'X' : 'O'
   
    setState(temp)
    setXPlayer(!xPlayer)
  }

  const resetGame = () => {
    setState(Array(9).fill(null))
    setPlayerWin(null)
    setSquareWin([])
    setXPlayer(true)
  }

  function calculateWinner(squares) {
    let checkAllNull = squares.every(function (item) {
      return item === null;
    }); 

    if (checkAllNull) return

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setSquareWin([a, b, c])
        return "Over"
      }
    }
    
    let checkNull = squares.some(function (item) {
      return item === null;
    });

    return checkNull ? null : 'Draw';
  }

  useEffect(() => {
    if (calculateWinner(state) === "Over") {
      xPlayer ? setPlayerWin('O') : setPlayerWin('X')
    }
    if (calculateWinner(state) === "Draw") {
      setPlayerWin("Draw")
    }
  }, [state, xPlayer])

  return (
    <>
      <div className="App h-[100vh] justify-center items-center">
        { playerWin ? 
        <div class="text-center">
          <h1>
            {playerWin}
          </h1>
          <button onClick={() => resetGame()}>
            Play again
          </button>
        </div> : ""}
        <div class="flex mt-[200px] justify-center items-center">
          <div className="board flex">
            {state.map((item, index) => <Box color={squareWin.includes(index) ? "bg-[#00FF00]" : ""} key={index} stateXO={item} handlePlay={() => handlePlay(index)}/>)}
          </div>
        </div >
      </div>
    </>
  )
}

export default App;
