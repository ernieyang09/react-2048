import { ROW, COL } from "@/constants";
import { lighten, darken } from 'polished';
import { styled } from "@linaria/react";
import { useEffect, useState } from "react";

type NUM2048 = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

const STile = styled.div<{ number: NUM2048, merge: boolean }>`
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
  z-index: ${({ merge }) => merge ? 3 : 2};
  transition-property: transform;
  transition-duration: 250ms;
  animation-timing-function: ease-in-out;



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
  update: false | "value" | "delete";
}

const Tile: React.FC<TileProps> = ({ number, X, Y, update }) => {

  const [changed, setChanged] = useState(false)
  
  useEffect(() => {
    setChanged(true)
    setTimeout(()=> {
      setChanged(false)
    }, 250)
  }, [number])


  return <STile update={update} number={number} X={0} Y={0} style={{
    fontWeight: 'bold',
    transform: `translate(${Y * 113 + Y * 15}px, ${X * 113 + X * 15}px) scale(${changed ? '1.1' : '1.0'})`,
  }}>{number}</STile>;
};

export default Tile;
