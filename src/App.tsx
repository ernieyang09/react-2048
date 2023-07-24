import { styled } from '@linaria/react'

import { useGame } from './hooks'
import Grid from './components/Grid'
import Tile from './components/Tile'
import { useEffect } from 'react';

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
`

const Test = styled.div`
  width: 500px;
  margin: 0 auto;
`


function App() {

  const { tiles, start } = useGame()

  useEffect(()=> {
    start()
  }, [])

  return (
    <Test>
      <div>React 2048</div>
      <Board >
        <div style={{ position: 'relative' }}>
          <Grid />
          {
            Object.entries(tiles).map(([key, tile]) => (
              <Tile key={key} number={tile.value} X={tile.x} Y={tile.y} update={tile.update} />
            ))
          }
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
      </Board>
    </Test>
  )
}

export default App
