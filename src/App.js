import React, { useState } from "react";

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const handleCellClick = (index) => {
    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = player;

    setBoard(newBoard);
    setPlayer(player === "X" ? "O" : "X");
    checkWinner(newBoard);
  };

  const checkWinner = (board) => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(player);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner("Draw");
    }
  };

  const handleRestartClick = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setPlayer("X");
  };

  const renderCell = (index) => {
    return (
      <div
        className="cell"
        onClick={() => handleCellClick(index)}
        style={styles.cell}
      >
        {board[index]}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <h1>Tic Tac Toe Game</h1>
      <div style={styles.board}>
        {renderCell(0)}
        {renderCell(1)}
        {renderCell(2)}
        {renderCell(3)}
        {renderCell(4)}
        {renderCell(5)}
        {renderCell(6)}
        {renderCell(7)}
        {renderCell(8)}
      </div>
      {winner && (
        <div>
          {winner === "Draw" ? (
            <p>It's a draw!</p>
          ) : (
            <p>Congratulations, {winner} has won!</p>
          )}
          <button style={styles.resetButton} onClick={handleRestartClick}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default App;

// Inline CSS styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    backgroundColor: "#ccc",
    padding: "10px",
    borderRadius: "5px"
  },
  cell: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightYellow",
    height: "100px",
    width: "100px",
    fontSize: "3rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    border: "none",
    outline: "none",
    ":hover": {
      backgroundColor: "#eee"
    }
  },
  message: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px"
  },
  resetButton: {
    cursor: "pointer",
    width: "100px",
    height: "30px",
    backgroundColor: "lightblue"
  }
};
