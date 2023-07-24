import { ROW, COL } from '@/constants'
import { styled } from '@linaria/react'


const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`
const GridCell = styled.div`
  background: #F8FFE5;
  width: 113px;
  height: 113px;

`


const Grid: React.FC = () => {

  const grids = () => {
    const arr = []
    for (let i = 0; i < ROW * COL; i++) {
      arr.push(<GridCell key={i}></GridCell>)
    }
    return arr
  }
  return (
    <GridWrapper>
      {grids()}
    </GridWrapper>
  )
}

export default Grid
