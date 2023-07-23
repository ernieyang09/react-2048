import { useState, useEffect } from "react"

const x = [{
  id: 0,
  value: 2,
  x: 0,
  y: 0,
}, {
  id: 1,
  value: 2,
  x: 0,
  y: 1,
}, {
  id: 2,
  value: 4,
  x: 3,
  y: 0,
}, {
  id: 3,
  value: 4,
  x: 0,
  y: 2,
}, {
  id: 2,
  value: 4,
  x: 0,
  y: 3,
}]



const useGame = () => {

  const [tiles, setTiles] = useState(x)

  const moveLeft = () => {
    const tileMap = Array(16).fill(0)
    for (const tile of tiles) {
      const { value, x, y } = tile
      tileMap[x * 4 + y] = tile
    }
    for (let i = 0; i < 4; i++) {
      let prevTile
      for (let j = 0; j < 4; j++) {
        const currentTile = tileMap[i * 4 + j]
        if (currentTile == 0) {
          continue
        }

        if (prevTile && prevTile.value === currentTile.value) {

          prevTile.value *= 2
          console.log(prevTile, currentTile)
        }

        prevTile = currentTile
      }
    }
    setTiles([...tiles])
    // console.log(tileMap)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    // disables page scrolling with keyboard arrows
    e.preventDefault();

    switch (e.code) {
      case "ArrowLeft":
        moveLeft();
        break;
      case "ArrowRight":
        // moveRight();
        break;
      case "ArrowUp":
        console.log(2)
        // moveUp();
        break;
      case "ArrowDown":
        // moveDown();
        break;
    }
  };



  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }

  }, [])





  return {
    tiles
  }

}

export default useGame
