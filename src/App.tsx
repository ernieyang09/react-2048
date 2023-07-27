import { styled } from "@linaria/react";
import { useEffect } from "react";
import { useGame } from "./hooks";
import Grid from "./components/Grid";
import Tile from "./components/Tile";
import GameResult from "./components/GameResult";
import Button from "./components/Button";
import Theme from "@/style/Theme";
import { MediaMobile } from "@/style";

const Board = styled.div`
  position: relative;
  width: 497px;
  height: 497px;
  background: #9a9a95;
  padding: var(--grid-gap);
  margin: 0 auto;

  ${MediaMobile} {
    width: 260px;
    height: 260px;
  }
`;

const Test = styled.div`
  width: 527px;
  margin: 0 auto;

  ${MediaMobile} {
    width: 320px;
  }
`;

const Score = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
  line-height: 1;
  color: #555;

  .number {
    margin-left: 1em;
    font-size: 1.5em;
  }
`;

function App() {
  const { tiles, start, score, gameStatus } = useGame();

  useEffect(() => {
    start();
  }, [start]);

  return (
    <Theme>
      <Test>
        <div
          style={{
            fontSize: "3em",
            display: "flex",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        >
          React
          <div style={{ marginLeft: "8px", letterSpacing: "2px" }}>
            <span style={{ color: "#FFC43D" }}>2</span>
            <span style={{ color: "#EF476F" }}>0</span>
            <span style={{ color: "#1B9AAA" }}>4</span>
            <span style={{ color: "#06D6A0" }}>8</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
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
          </div>
          <GameResult gameStatus={gameStatus} start={start} />
        </Board>
      </Test>
    </Theme>
  );
}

export default App;
