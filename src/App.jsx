/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";

function Square(props) {
  const { value, handleBoxClick } = props;

  return (
    <button type="button" className="square-button" onClick={handleBoxClick}>
      {value}
    </button>
  );
}

function Board(props) {
  const { firstPlayer, currentSquares, handlePlay } = props;

  function handleBoxClick(index) {
    if (currentSquares[index] || calculateWinner(currentSquares)) {
      return;
    }

    const copyArray = currentSquares.slice();

    if (firstPlayer) {
      copyArray[index] = "X";
    } else {
      copyArray[index] = "0";
    }
    handlePlay(copyArray);
  }

  const winner = calculateWinner(currentSquares);

  let status;
  if (winner) {
    status = "Winner" + winner;
  } else {
    status = "Next player : " + (firstPlayer ? "X" : "O");
  }

  function calculateWinner(playState) {
    const winningCombinataions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinataions.length; i++) {
      const [a, b, c] = winningCombinataions[i];
      if (
        playState[a] &&
        playState[a] === playState[b] &&
        playState[b] === playState[c]
      ) {
        return playState[a];
      }
    }
    return null;
  }
  return (
    <div>
      <p>{status}</p>
      {[0, 1, 2].map((row) => {
        return (
          <div key={row} className="tac-row">
            {[0, 1, 2].map((col) => {
              return (
                <Square
                  key={row * 3 + col}
                  handleBoxClick={() => handleBoxClick(row * 3 + col)}
                  value={currentSquares[row * 3 + col]}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [currentMove, setCurrentMove] = useState(0);
  const firstPlayer = currentMove % 2 == 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Start the game";
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="board">
        <Board
          firstPlayer={firstPlayer}
          currentSquares={currentSquares}
          handlePlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
