// import { throttle } from 'lodash'
import { useEffect, useReducer, useCallback, useRef, useState } from "react"
import { reducer, initState } from "./reducer";
import { GameStatus, LOCAL_STORAGE_KEY } from "@/constants";

const pushLocalStorage = (record) => {
  const histories = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
  histories.push(record)
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(histories.slice(0, 10)))
  // TODO optimize
  setTimeout(() => {
    window.dispatchEvent(new Event("new record"))
  }, 500)
}

const freshNow = (tiles) => {
  const newBoard = Object.keys(tiles).reduce((a, key) => {
    const tile = tiles[key]
    if (tile.update === 'delete') {
      return a
    }
    if (tile.update === 'value') {
      return { ...a, [key]: { ...tile, value: tile.value * 2, update: undefined } }
    }
    return { ...a, [key]: { ...tile } }
  }, {})


  return newBoard
}

const checkBoard = (tiles) => {
  const tileMap = Array(16).fill(0)
  const currentBoard = Object.values(tiles)

  for (const tile of currentBoard) {
    if (tile.value === 2048) {
      return GameStatus.SUCCESS
    }
    const { x, y } = tile
    tileMap[x * 4 + y] = tile
  }
  if (currentBoard.length !== 16) {
    return GameStatus.PENDING
  }
  for (let i = 0; i < 4; i++) {
    for (let j = i + 1; j < 4; j++) {
      if (tileMap[i * 4 + j].value === tileMap[i * 4 + j - 1].value) {
        return GameStatus.PENDING
      }
    }
    for (let j = i + 1; j < 4; j++) {
      if (tileMap[i + j * 4].value === tileMap[i + j * 4 - 4].value) {
        return GameStatus.PENDING
      }
    }
  }

  for (let i = 3; i > -1; i--) {
    for (let j = i - 1; j > -1; j--) {
      if (tileMap[i * 4 + j].value === tileMap[i * 4 + j + 1].value) {
        return GameStatus.PENDING
      }
    }
    for (let j = i - 1; j > -1; j--) {
      if (tileMap[i + j * 4].value === tileMap[i + j * 4 + 4].value) {
        return GameStatus.PENDING
      }
    }
  }
  return GameStatus.FAIL
}

const useGame = () => {

  const [state, dispatch] = useReducer(reducer, initState);
  const [gameStatus, setGameStatus] = useState(GameStatus.RUNNING)
  const { tiles, stateChanging } = state
  const boardRef = useRef(tiles)


  const score = Object.values(tiles).reduce((s, c) => s + c.value, 0)
  // const gameStatus = stateChanging ? GameStatus.RUNNING : checkBoard(tiles)

  useEffect(()=> {
    if (gameStatus === GameStatus.STOP) {
      return
    }
    if (stateChanging) {
      setGameStatus(GameStatus.RUNNING)
      return
    }
    setGameStatus(checkBoard(tiles))
  }, [gameStatus, stateChanging, tiles])

  useEffect(() => {
    boardRef.current = tiles
  }, [tiles])

  useEffect(() => {
    if ([GameStatus.SUCCESS, GameStatus.FAIL].includes(gameStatus)) {
      pushLocalStorage({
        date: new Date(),
        score,
        data: tiles,
        gameStatus,
      })
    }
  }, [tiles, score, gameStatus])

  const moveUp = useCallback(() => {
    // if (stateChanging) {
    //   return
    // }
    // console.log('up', tiles)

    dispatch({ type: 'START_MOVE' })
    const updated = freshNow(tiles)

    const checkFreeSlot = (x, y, rowArr) => {
      let newX = x
      for (let i = 0; i < x; i++) {
        if (rowArr[i] == 0) {
          newX = i
          rowArr[i] = 1
          rowArr[x] = 0
          break
        }
      }
      return [newX, y]
    }

    const tileMap = Array(16).fill(0)
    for (const tile of Object.values(updated)) {
      const { x, y } = tile
      tileMap[x * 4 + y] = tile
    }
    for (let i = 0; i < 4; i++) {
      let prevTile
      const rowArr = []
      for (let j = 0; j < 4; j++) {
        rowArr.push(tileMap[i + j * 4])
      }

      for (let j = 0; j < 4; j++) {

        const currentTile = tileMap[i + j * 4]
        if (currentTile == 0) {
          continue
        }
        if (prevTile && prevTile.update !== 'delete' && prevTile.value === currentTile.value) {

          currentTile.x = prevTile.x
          currentTile.y = prevTile.y
          prevTile.update = "value"
          currentTile.update = "delete"

          updated[currentTile.id] = { ...currentTile }
          updated[prevTile.id] = prevTile
          rowArr[j] = 0

        }

        if (currentTile.update === 'delete') {
          continue
        }

        const position = checkFreeSlot(currentTile.x, currentTile.y, rowArr)

        if (position[0] != currentTile.x || position[1] != currentTile.y) {
          currentTile.x = position[0]
          currentTile.y = position[1]
          updated[currentTile.id] = { ...currentTile }
        }

        prevTile = currentTile
      }
    }

    if (Object.keys(updated).length) {
      dispatch({ type: 'MOVE_TILE', payload: updated })

      setTimeout(() => {
        dispatch({ type: 'UPDATE_TILE' })
        dispatch({ type: 'END_MOVE' })
      }, 125)
    } else {
      dispatch({ type: 'END_MOVE' })
    }

  }, [tiles])

  const moveDown = useCallback(() => {
    // if (stateChanging) {
    //   return
    // }
    // console.log('down', tiles)
    dispatch({ type: 'START_MOVE' })
    const updated = freshNow(tiles)

    const checkFreeSlot = (x, y, rowArr) => {
      let newX = x
      for (let i = 3; i > x; i--) {
        if (rowArr[i] == 0) {
          newX = i
          rowArr[i] = 1
          rowArr[x] = 0
          break
        }
      }
      return [newX, y]
    }

    const tileMap = Array(16).fill(0)
    for (const tile of Object.values(updated)) {
      const { x, y } = tile
      tileMap[x * 4 + y] = tile
    }
    for (let i = 0; i < 4; i++) {
      let prevTile
      const rowArr = []
      for (let j = 0; j < 4; j++) {
        rowArr.push(tileMap[i + j * 4])
      }

      for (let j = 3; j > -1; j--) {

        const currentTile = tileMap[i + j * 4]
        if (currentTile == 0) {
          continue
        }
        if (prevTile && prevTile.update !== 'delete' && prevTile.value === currentTile.value) {

          currentTile.x = prevTile.x
          currentTile.y = prevTile.y
          prevTile.update = "value"
          currentTile.update = "delete"

          updated[currentTile.id] = { ...currentTile }
          updated[prevTile.id] = prevTile
          rowArr[j] = 0

        }

        if (currentTile.update === 'delete') {
          continue
        }

        const position = checkFreeSlot(currentTile.x, currentTile.y, rowArr)

        if (position[0] != currentTile.x || position[1] != currentTile.y) {
          currentTile.x = position[0]
          currentTile.y = position[1]
          updated[currentTile.id] = { ...currentTile }
        }

        prevTile = currentTile
      }
    }


    // console.log(updated)

    if (Object.keys(updated).length) {
      dispatch({ type: 'MOVE_TILE', payload: updated })

      setTimeout(() => {
        dispatch({ type: 'UPDATE_TILE' })
        dispatch({ type: 'END_MOVE' })
      }, 125)
    } else {
      dispatch({ type: 'END_MOVE' })
    }

    // setTiles([...tiles])
    // console.log(tileMap)
  }, [tiles])

  const moveRight = useCallback(() => {
    // if (stateChanging) {
    //   return
    // }
    // console.log('right', tiles)
    dispatch({ type: 'START_MOVE' })
    const updated = freshNow(tiles)

    const checkFreeSlot = (x, y, rowArr) => {
      let newY = y
      for (let i = 3; i > y; i--) {
        if (rowArr[i] == 0) {
          newY = i
          rowArr[i] = 1
          rowArr[y] = 0
          break
        }
      }
      return [x, newY]
    }

    const tileMap = Array(16).fill(0)
    for (const tile of Object.values(updated)) {
      const { x, y } = tile
      tileMap[x * 4 + y] = tile
    }
    for (let i = 0; i < 4; i++) {
      let prevTile
      const rowArr = tileMap.slice(i * 4, i * 4 + 4)
      for (let j = 3; j > -1; j--) {
        const currentTile = tileMap[i * 4 + j]
        if (currentTile == 0) {
          continue
        }
        if (prevTile && prevTile.update !== 'delete' && prevTile.value === currentTile.value) {
          currentTile.x = prevTile.x
          currentTile.y = prevTile.y
          prevTile.update = "value"
          currentTile.update = "delete"

          updated[currentTile.id] = { ...currentTile }
          updated[prevTile.id] = prevTile
          rowArr[j] = 0

        }

        if (currentTile.update === 'delete') {
          continue
        }

        const position = checkFreeSlot(currentTile.x, currentTile.y, rowArr)

        if (position[0] != currentTile.x || position[1] != currentTile.y) {
          currentTile.x = position[0]
          currentTile.y = position[1]
          updated[currentTile.id] = { ...currentTile }
        }

        prevTile = currentTile
      }
    }

    if (Object.keys(updated).length) {
      dispatch({ type: 'MOVE_TILE', payload: updated })

      setTimeout(() => {
        dispatch({ type: 'UPDATE_TILE' })
        dispatch({ type: 'END_MOVE' })
      }, 125)
    } else {
      dispatch({ type: 'END_MOVE' })
    }

    // setTiles([...tiles])
    // console.log(tileMap)
  }, [tiles])

  const moveLeft = useCallback(() => {
    // if (stateChanging) {
    //   return
    // }
    // console.log('left', tiles)
    dispatch({ type: 'START_MOVE' })
    const updated = freshNow(tiles)

    const checkFreeSlot = (x, y, rowArr) => {
      let newY = y
      for (let i = 0; i < y; i++) {
        if (rowArr[i] == 0) {
          newY = i
          rowArr[i] = 1
          rowArr[y] = 0
          break
        }
      }
      return [x, newY]
    }

    const tileMap = Array(16).fill(0)
    for (const tile of Object.values(updated)) {
      const { x, y } = tile
      tileMap[x * 4 + y] = tile
    }
    for (let i = 0; i < 4; i++) {
      let prevTile
      const rowArr = tileMap.slice(i * 4, i * 4 + 4)
      for (let j = 0; j < 4; j++) {
        const currentTile = tileMap[i * 4 + j]
        if (currentTile == 0) {
          continue
        }
        if (prevTile && prevTile.update !== 'delete' && prevTile.value === currentTile.value) {

          currentTile.x = prevTile.x
          currentTile.y = prevTile.y
          prevTile.update = "value"
          currentTile.update = "delete"

          updated[currentTile.id] = { ...currentTile }
          updated[prevTile.id] = prevTile
          rowArr[j] = 0

          // dispatch({ type: 'MERGE_TILE', payload: {
          //   prev: prevTile,
          //   current: currentTile,
          // } })

        }

        if (currentTile.update === 'delete') {
          continue
        }


        const position = checkFreeSlot(currentTile.x, currentTile.y, rowArr)

        if (position[0] != currentTile.x || position[1] != currentTile.y) {
          currentTile.x = position[0]
          currentTile.y = position[1]
          updated[currentTile.id] = { ...currentTile }
        }

        prevTile = currentTile
      }
    }

    if (Object.keys(updated).length) {
      dispatch({ type: 'MOVE_TILE', payload: updated })

      setTimeout(() => {
        dispatch({ type: 'UPDATE_TILE' })
        dispatch({ type: 'END_MOVE' })
      }, 125)
    } else {
      dispatch({ type: 'END_MOVE' })
    }


  }, [tiles])


  const start = useCallback(() => {
    dispatch({ type: 'EMPTY_BOARD' })
    dispatch({ type: 'CREATE_TILE' })
    dispatch({ type: 'CREATE_TILE' })
  }, [])

  const stop = useCallback(() => {
    setGameStatus(GameStatus.STOP)
  }, [])

  const resume = useCallback(() => {
    setGameStatus(GameStatus.PENDING)
  }, [])



  useEffect(() => {
    if ([GameStatus.SUCCESS, GameStatus.FAIL, GameStatus.STOP].includes(gameStatus)) {
      return
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      // disables page scrolling with keyboard arrows
      e.preventDefault();

      switch (e.code) {
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
        case "ArrowUp":
          moveUp();
          break;
        case "ArrowDown":
          moveDown();
          break;
      }
    }

    // can add throttle
    // const throttleHandle = throttle(handleKeyDown, 150)

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }

  }, [moveLeft, moveRight, moveUp, moveDown, gameStatus])

  return {
    start,
    stop,
    resume,
    tiles,
    score,
    gameStatus,
  }

}

export default useGame
