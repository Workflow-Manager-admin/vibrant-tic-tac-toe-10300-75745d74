import React, { useState, useEffect } from 'react';
import './App.css';

// PUBLIC_INTERFACE
function App() {
  // Board is a 9-element array representing the 3x3 grid
  const [board, setBoard] = useState(Array(9).fill(null));
  // True: X's turn, False: O's turn
  const [xIsNext, setXIsNext] = useState(true);
  // Track if game finished and who won (null if ongoing)
  const [winner, setWinner] = useState(null);
  // For winner animation highlighting line
  const [winningLine, setWinningLine] = useState([]);
  // For board reset animation
  const [animTrigger, setAnimTrigger] = useState(false);

  // Effect for checking winner after every move
  useEffect(() => {
    const {winner, line} = calculateWinner(board);
    setWinner(winner);
    setWinningLine(line);
  }, [board]);

  // PUBLIC_INTERFACE
  function handleSquareClick(idx) {
    if (board[idx] || winner) return; // ignore if filled or game over
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setAnimTrigger(true);
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setXIsNext(true);
      setAnimTrigger(false);
    }, 300); // Duration matches fade animation
  }

  // Helper for labels
  const player = xIsNext ? 'X' : 'O';
  let status;
  if (winner) {
    status = winner === 'Draw'
      ? "It's a draw! 🤝"
      : `Player ${winner} wins! 🎉`;
  } else {
    status = `Player ${player}'s turn`;
  }

  // Grid rendering
  return (
    <div className="ttt-app-bg">
      <div className="ttt-container">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div
          className={`ttt-board${animTrigger ? ' ttt-board-reset' : ''}`}
          role="grid" aria-label="Tic Tac Toe Board"
        >
          {board.map((val, idx) => {
            let cellClass = "ttt-square";
            if (winningLine.includes(idx)) cellClass += " ttt-win";
            if (val === "X") cellClass += " ttt-x";
            if (val === "O") cellClass += " ttt-o";
            return (
              <button
                className={cellClass}
                key={idx}
                onClick={() => handleSquareClick(idx)}
                aria-label={
                  val
                    ? `Cell ${idx+1}: ${val}`
                    : `Cell ${idx+1}: empty, place ${player}`
                }
                disabled={!!val || !!winner}
                tabIndex={0}
              >
                <span className="ttt-mark">{val}</span>
              </button>
            );
          })}
          {/* Highlighting winning strike for better visual */}
          {winner && winner !== "Draw" && <StrikeLine line={winningLine} />}
        </div>
        <div className="ttt-status-wrapper">
          <div className="ttt-status">{status}</div>
          <button className="ttt-reset-btn" onClick={handleReset} aria-label="Reset game">
            Reset
          </button>
        </div>
        <footer className="ttt-footer">
          <span>Made with <span role="img" aria-label="heart">💙</span> React</span>
        </footer>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  // All possible lines
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6],         // diags
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return {winner: squares[a], line};
    }
  }
  if (squares.every(Boolean)) {
    return {winner: "Draw", line: []};
  }
  return {winner: null, line: []};
}

// PUBLIC_INTERFACE
function StrikeLine({ line }) {
  // Map winning combination to a class for drawing highlight
  // Row: 0 1 2, 3 4 5, 6 7 8
  // Col: 0 3 6, 1 4 7, 2 5 8
  // Diag: 0 4 8, 2 4 6
  let className = "ttt-strike";
  if (line.length === 3) {
    if (line[0] === 0 && line[1] === 1 && line[2] === 2)
      className += " strike-row1";
    else if (line[0] === 3)
      className += " strike-row2";
    else if (line[0] === 6)
      className += " strike-row3";
    else if (line[0] === 0 && line[1] === 3)
      className += " strike-col1";
    else if (line[0] === 1)
      className += " strike-col2";
    else if (line[0] === 2)
      className += " strike-col3";
    else if (line[0] === 0 && line[1] === 4)
      className += " strike-diag1";
    else if (line[0] === 2 && line[1] === 4)
      className += " strike-diag2";
  }
  return <div className={className} aria-hidden="true" />;
}

export default App;
