import GameState from "./GameState";

function Reset({ gameState, handleReset }) {
  if (gameState === GameState.inProgress) {
    return;
  }
  return (
    <button className="reset-button" onClick={handleReset}>
      Reset
    </button>
  );
}

export default Reset;
