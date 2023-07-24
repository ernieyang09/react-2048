import { Tile, NUM2048 } from '@/types/Tile'
let idx = 99

const defaultTile = {
  // 0: {
  //   id: 0,
  //   value: 2 as const,
  //   x: 0,
  //   y: 0,
  //   update: undefined,
  // },
  // 1: {
  //   id: 1,
  //   value: 2 as const,
  //   x: 0,
  //   y: 1,
  //   update: undefined,
  // },
  // 2: {
  //   id: 2,
  //   value: 4 as const,
  //   x: 3,
  //   y: 0,
  //   update: undefined,
  // },
  // 3: {
  //   id: 3,
  //   value: 4 as const,
  //   x: 0,
  //   y: 2,
  //   update: undefined,
  // },
  // 4: {
  //   id: 4,
  //   value: 4 as const, 
  //   x: 0,
  //   y: 3,
  //   update: undefined,
  // }
}

interface IState {
  tiles: {
    [id: number]: Tile
  }
  isMove: boolean;
}

export const initState: IState = {
  tiles: defaultTile,
  isMove: false,
}

type ACTION_MOVE_TILE = { type: 'MOVE_TILE', payload: { [id: number]: Tile } }
type ACTION_CREATE_TILE = { type: 'CREATE_TILE' }
type ACTION_UPDATE_TILE = { type: 'UPDATE_TILE' }


export type TypeAction = ACTION_MOVE_TILE | ACTION_CREATE_TILE | ACTION_UPDATE_TILE



const createTile = (tiles) => {
  const set = new Set([...Array(16).keys()])

  for (const tile of Object.values(tiles)) {
    set.delete(tile.x * 4 + tile.y)
  }

  if (set.size === 0) {
    return undefined
  }

  const items = Array.from(set);
  const positionIdx = items[Math.floor(Math.random() * items.length)]

  return {
    id: idx++,
    x: Math.floor(positionIdx / 4),
    y: positionIdx % 4,
    value: Math.random() < 0.9 ? 2 as const : 4 as const,
    update: undefined,
  }
}

// TODO optimize move function(extract)
export const reducer = (state: IState, action: TypeAction): IState => {
  switch(action.type) {
    case "MOVE_TILE": {
      const updatedTiles = action.payload
      return {
        ...state,
        tiles: {
          ...state.tiles,
          ...updatedTiles,
        }
      }
    }
    case "CREATE_TILE": {
      const { tiles } = state

      const tile = createTile(tiles)

      return {
        ...state,
        tiles: {
          ...state.tiles,
          ...(tile && { [tile.id]: tile }),
        }
      }
    }
    case "UPDATE_TILE": {
      const { tiles } = state
      const  newBoard = Object.keys(tiles).reduce((a, key)=> {
        const tile = tiles[key]
        if (tile.update === 'delete') {
          return a
        }
        if (tile.update === 'value') {
          return { ...a, [key]: {...tile, value: tile.value * 2, update: undefined } }
        }
        return { ...a, [key]: {...tile} }
      }, {})

      const tile = createTile(newBoard)

      return {
        ...state,
        tiles: {
          ...newBoard,
          ...(tile && { [tile.id]: tile }),
        }
      }
    }
    default:
      return state
  }
}
