import { useState, useEffect, useReducer, useCallback } from "react"
import { reducer, initState } from "./reducer";



const useGame = () => {

  const [state, dispatch] = useReducer(reducer, initState);

  const { tiles } = state

  // const [tiles, setTiles] = useState(x)

  const moveUp = useCallback(() => {
    const updated = {}

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
    for (const tile of Object.values(tiles)) {
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

          updated[currentTile.id] = currentTile
          rowArr[j] = 0

        }

        const position = checkFreeSlot(currentTile.x, currentTile.y, rowArr)

        if (position[0] != currentTile.x || position[1] != currentTile.y) {
          currentTile.x = position[0]
          currentTile.y = position[1]
          updated[currentTile.id] = currentTile
        }

        prevTile = currentTile
      }
    }

    if (Object.keys(updated).length) {
      dispatch({ type: 'MOVE_TILE', payload: updated })

      setTimeout(() => {
        dispatch({ type: 'UPDATE_TILE' })
      }, 250)
    }

    // setTiles([...tiles])
    // console.log(tileMap)
  }, [tiles])

  const moveDown = useCallback(() => {
    const updated = {}

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
    for (const tile of Object.values(tiles)) {
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

          updated[currentTile.id] = currentTile
          rowArr[j] = 0

        }

        const position = checkFreeSlot(currentTile.x, currentTile.y, rowArr)

        if (position[0] != currentTile.x || position[1] != currentTile.y) {
          currentTile.x = position[0]
          currentTile.y = position[1]
          updated[currentTile.id] = currentTile
        }

        prevTile = currentTile
      }
    }

    if (Object.keys(updated).length) {
      dispatch({ type: 'MOVE_TILE', payload: updated })

      setTimeout(() => {
        dispatch({ type: 'UPDATE_TILE' })
      }, 250)
    }

    // setTiles([...tiles])
    // console.log(tileMap)
  }, [tiles])

  const moveRight = useCallback(() => {
    const updated = {}

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
    for (const tile of Object.values(tiles)) {
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

          updated[currentTile.id] = currentTile
          rowArr[j] = 0

        }

        const position = checkFreeSlot(currentTile.x, currentTile.y, rowArr)

        if (position[0] != currentTile.x || position[1] != currentTile.y) {
          currentTile.x = position[0]
          currentTile.y = position[1]
          updated[currentTile.id] = currentTile
        }

        prevTile = currentTile
      }
    }

    if (Object.keys(updated).length) {
      dispatch({ type: 'MOVE_TILE', payload: updated })

      setTimeout(() => {
        dispatch({ type: 'UPDATE_TILE' })
      }, 250)
    }

    // setTiles([...tiles])
    // console.log(tileMap)
  }, [tiles])

  const moveLeft = useCallback(() => {
    const updated = {}

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
    for (const tile of Object.values(tiles)) {
      const { x, y } = tile
      tileMap[x * 4 + y] = tile
    }
    for (let i = 0; i < 4; i++) {
      let prevTile
      const rowArr = tileMap.slice(i * 4, i * 4 + 4)
      // console.log(red)
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

          updated[currentTile.id] = currentTile
          rowArr[j] = 0

          // dispatch({ type: 'MERGE_TILE', payload: {
          //   prev: prevTile,
          //   current: currentTile,
          // } })

        }


        const position = checkFreeSlot(currentTile.x, currentTile.y, rowArr)

        if (position[0] != currentTile.x || position[1] != currentTile.y) {
          currentTile.x = position[0]
          currentTile.y = position[1]
          updated[currentTile.id] = currentTile
        }

        prevTile = currentTile
      }
    }

    if (Object.keys(updated).length) {
      dispatch({ type: 'MOVE_TILE', payload: updated })

      setTimeout(() => {
        dispatch({ type: 'UPDATE_TILE' })
      }, 250)
    }


  }, [tiles, dispatch])


  const start = useCallback(()=> {
    dispatch({ type: 'CREATE_TILE' })
    dispatch({ type: 'CREATE_TILE' })
  }, [])



  useEffect(() => {
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
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }

  }, [moveLeft, moveRight])





  return {
    start,
    tiles,
  }

}

export default useGame
