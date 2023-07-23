import { useState } from 'react'
import { styled } from '@linaria/react'

import { useGame } from './hooks'
import Grid from './components/Grid'
import Tile from './components/Tile'

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

  const { tiles } = useGame()

  return (
    <Test>
      <div>React 2048</div>
      <Board >
        <div style={{ position: 'relative' }}>
          <Grid />
          {
            tiles.map((tile) => (
              <Tile key={tile.id} number={tile.value} X={tile.x} Y={tile.y} />
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
