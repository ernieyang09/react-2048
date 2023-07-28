import { styled } from '@linaria/react'
import { useEffect, useRef } from 'react'
import { useGame } from '@/hooks'
import Board from '@/components/Board'
import GameResult from '@/components/GameResult'
import RecordBlock from '@/components/Record'
import Button from '@/components/Button'
import Theme from '@/style/Theme'
import { MediaMobile } from '@/style'

const Wrapper = styled.div`
  width: 527px;
  margin: 0 auto;

  ${MediaMobile} {
    width: 320px;
  }
`

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
`

function App() {
  const { tiles, start, score, gameStatus, stop, resume } = useGame()
  const rootRef = useRef<HTMLDivElement>(null)
  rootRef.current

  useEffect(() => {
    start()
  }, [start])

  return (
    <Theme>
      <Wrapper ref={rootRef}>
        <div
          style={{
            fontSize: '3em',
            display: 'flex',
            marginTop: '2rem',
            marginBottom: '2rem',
          }}>
          React
          <div style={{ marginLeft: '8px', letterSpacing: '2px' }}>
            <span style={{ color: '#FFC43D' }}>2</span>
            <span style={{ color: '#EF476F' }}>0</span>
            <span style={{ color: '#1B9AAA' }}>4</span>
            <span style={{ color: '#06D6A0' }}>8</span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '16px',
          }}>
          <Score>
            score: <span className="number">{score}</span>
          </Score>
          <Button onClick={start}>New Game</Button>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <Board>
            {Object.entries(tiles).map(([key, tile]) => (
              <Board.Tile
                key={key}
                number={tile.value}
                X={tile.x}
                Y={tile.y}
                update={tile.update}
              />
            ))}
            <GameResult gameStatus={gameStatus} start={start} />
          </Board>
        </div>
        <RecordBlock rootRef={rootRef} stop={stop} resume={resume} />
      </Wrapper>
    </Theme>
  )
}

export default App
