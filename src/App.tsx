import { styled } from "@linaria/react";

import { useGame } from "./hooks";
import Grid from "./components/Grid";
import Tile from "./components/Tile";
import GameOver from "./components/GameOver";
import Button from "./components/Button";
import { useEffect } from "react";

export const mobile = `
  @media screen and (max-width: 520px) {
`;

const Board = styled.div`
  position: relative;
  width: 497px;
  height: 497px;
  background: #9a9a95;
  padding: 15px;

  ${mobile} {
    width: 280px;
    height: 280px;
  }
`;

const Test = styled.div`
  width: 527px;
  margin: 0 auto;
`;

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  line-height: 1;
  color: #555;

  .number {
    margin-left: 1rem;
    font-size: 1.5rem;
  }
`;

function App() {
  const { tiles, start, score, gameOver } = useGame();

  useEffect(() => {
    start();
  }, [start]);

  return (
    <Test>
      <div style={{ fontSize: "3rem", display: 'flex', marginTop: '24px', marginBottom: '24px' }}>
        React 
        <div style={{ marginLeft: '8px', letterSpacing: "2px" }}>
          <span style={{ color: "#FFC43D" }}>2</span>
          <span style={{ color: "#EF476F" }}>0</span>
          <span style={{ color: "#1B9AAA" }}>4</span>
          <span style={{ color: "#06D6A0" }}>8</span>
        </div>
      </div>
      
      <div
        style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}
      >
        <Score>
        score: <span className="number">{score}</span>
        </Score>
        <Button onClick={start}>New Game</Button>
      </div>
      <Board>
        <div style={{ position: "relative" }}>
          <Grid />
          {Object.entries(tiles).map(([key, tile]) => (
            <Tile
              key={key}
              number={tile.value}
              X={tile.x}
              Y={tile.y}
              update={tile.update}
            />
          ))}
          {/* <Tile number={4} X={0} Y={1} />
          <Tile number={8} X={0} Y={2} />
          <Tile number={16} X={0} Y={3} />
          <Tile number={32} X={1} Y={0} />
          <Tile number={64} X={1} Y={1} />
          <Tile number={128} X={1} Y={2} />
          <Tile number={256} X={1} Y={3} />
          <Tile number={512} X={2} Y={0} />
          <Tile number={1024} X={2} Y={1} />
          <Tile number={2048} X={2} Y={2} /> */}
        </div>
        {gameOver && <GameOver start={start} />}
      </Board>
    </Test>
  );
}

export default App;
