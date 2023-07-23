import { ROW, COL } from "../constant";
import { lighten, darken } from 'polished';
import { styled } from "@linaria/react";

type NUM2048 = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

const STile = styled.div<{ number: NUM2048 }>`
  background: #f8ffe5;
  width: 113px;
  height: 113px;

  color: white;
  font-size: 1.8rem;
  display: flex;
  place-items: center;
  place-content: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;



  background: ${({ number }) =>
    ({
      2: "#FFC43D",
      4: "#EF476F",
      8: "#1B9AAA",
      16: "#06D6A0",
      32: `${lighten(0.1, '#EF476F')}`,
      64: `${lighten(0.1, '#1B9AAA')}`,
      128: `${lighten(0.1, '#06D6A0')}`,
      256: `${lighten(0.1, '#FFC43D')}`,
      512: `${darken(0.1, '#EF476F')}`,
      1024: `${darken(0.1, '#1B9AAA')}`,
      2048: `${darken(0.1, '#06D6A0')}`,
    }[number] || "red")};
`;

interface TileProps {
  number: NUM2048
  X: number;
  Y: number;
}

const Tile: React.FC<TileProps> = ({ number, X, Y }) => {
  return <STile number={number} X={0} Y={0} style={{
    fontWeight: 'bold',
    transform: `translate(${Y * 113 + Y * 15}px, ${X * 113 + X * 15}px)`,
  }}>{number}</STile>;
};

export default Tile;
