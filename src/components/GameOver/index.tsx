import { styled } from "@linaria/react";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

const SGameOver = styled.div<{ show: boolean }>`
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
    font-size: 2rem;
  }
`;

const GameOver: React.FC<{ start: () => void }> = ({ start }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);
  return (
    <SGameOver show={show}>
      <div style={{ marginTop: "-4rem", marginBottom: "24px" }}>
        <div className="text">Game over!</div>
      </div>
      <div>
        <Button onClick={start}>Try again</Button>
      </div>
    </SGameOver>
  );
};

export default GameOver;
