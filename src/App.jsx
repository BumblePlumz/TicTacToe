import { useState } from "react";
import Player from "./components/Player";
import Gameboard from "./components/Gameboard";
import Log from "./components/Log";
import GameOver from "./components/Gameover";
import { WINNING_COMBINATIONS } from "./assets/winning-combinations";

function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer = "0";
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  const activePlayer = deriveActivePlayer(gameTurns);
  let winner;

  let gameboard = initialGameBoard;
  for (const turn of gameTurns){
      const { square, player } = turn;
      const { row, col } = square;

      gameboard[row][col] = player;
  }

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = firstSquareSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex){
    // setActivePlayer((currentActivePlayer) => currentActivePlayer === "X" ? "O" : "X");
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer },...prevTurns,];

      return updatedTurns;
    });
  }

  return (
    <main>
      <h1>React Tic-Tac-Toe</h1>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="player 1" playerSymbol="X" isActive={activePlayer === "X"} />
          <Player name="player 2" playerSymbol="0" isActive={activePlayer === "0"} />
        </ol>
        {winner && <GameOver winner={winner} />}
        <Gameboard onSelectSquare={handleSelectSquare} board={gameboard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
