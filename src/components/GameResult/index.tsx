import { styled } from "@linaria/react";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { GameStatus } from "@/constants";

const SGameState = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  place-self: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(85, 85, 85, 0.9);
  z-index: 50;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.5s;

  .text {
    color: white;
    font-size: 2em;
  }
`;

const GameOver: React.FC<{ start: () => void }> = ({ start }) => (
  <>
    <div style={{ marginTop: "-4em", marginBottom: "1.5em" }}>
      <div className="text">Game over!</div>
    </div>
    <div>
      <Button onClick={start}>Try again</Button>
    </div>
  </>
);

const Congratulation: React.FC<{ start: () => void }> = ({ start }) => (
  <>
    <div style={{ marginTop: "-4em", marginBottom: "1.5em" }}>
      <div className="text">Congratulation!!</div>
    </div>
    <div>
      <Button onClick={start}>Play again</Button>
    </div>
  </>
);

const GameResult: React.FC<{ start: () => void; gameStatus: GameStatus }> = ({
  start,
  gameStatus,
}) => {
  
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout
    if (gameStatus === GameStatus.PENDING) {
      setShow(false);
      return;
    }

    timeout = setTimeout(() => {
      setShow(true);
    }, 500);

    return () => clearTimeout(timeout)
  }, [gameStatus]);

  return (
    <SGameState show={show}>
      {gameStatus === GameStatus.SUCCESS && <Congratulation start={start} />}
      {gameStatus === GameStatus.FAIL && <GameOver start={start} />}
    </SGameState>
  );
};

export default GameResult;
