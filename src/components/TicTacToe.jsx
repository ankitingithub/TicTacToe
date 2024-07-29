import Board from "./Board";
import { useState, useEffect } from "react";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import gameOverSoundAsset from "../sounds/game_over.wav";
import clickSoundAsset from "../sounds/click.wav";

const Player_X = "X";
const Player_Y = "O";

const gameOverSound = new Audio(gameOverSoundAsset);
gameOverSound.volume = 0.9;
const clickSound = new Audio(clickSoundAsset);
clickSound.volume = 1;

const winningCombinations = [
  //row
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  //col
  { combo: [0, 3, 6], strikeClass: "strike-col-1" },
  { combo: [1, 4, 7], strikeClass: "strike-col-2" },
  { combo: [2, 5, 8], strikeClass: "strike-col-3" },
  //Dias
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations) {
    const tilesValue1 = tiles[combo[0]];
    const tilesValue2 = tiles[combo[1]];
    const tilesValue3 = tiles[combo[2]];
    if (
      tilesValue1 != null &&
      tilesValue1 === tilesValue2 &&
      tilesValue1 === tilesValue3
    ) {
      setStrikeClass(strikeClass);
      if (tilesValue1 === Player_X) {
        setGameState(GameState.playerXWins);
        return;
      } else {
        setGameState(GameState.playerOWins);
        return;
      }
    }
  }

  const isAllTilesFilledIn = tiles.every((tile) => tile !== null);
  if (isAllTilesFilledIn) {
    setGameState(GameState.draw);
  }
}

function TicTacToe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(Player_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  useEffect(() => {
    if (tiles.some((tile) => tile !== null)) {
      clickSound.play();
    }
  }, [tiles]);

  useEffect(() => {
    if (gameState !== GameState.inProgress) {
      gameOverSound.play();
    }
  }, [gameState]);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }
    if (tiles[index] != null) {
      return;
    }
    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    if (playerTurn === Player_X) {
      setPlayerTurn(Player_Y);
    } else {
      setPlayerTurn(Player_X);
    }
  };

  const handleReset = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(Player_X);
    setStrikeClass(null);
  };

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
      />
      <GameOver gameState={gameState} />
      <Reset gameState={gameState} handleReset={handleReset} />
    </div>
  );
}

export default TicTacToe;
