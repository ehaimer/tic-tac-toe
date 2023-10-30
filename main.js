const board = document.getElementById("board")
const gameHeading = document.getElementById("game-heading")
const restartButton = document.getElementById("restart-button")
const gameSquares = document.querySelectorAll(".game-square")

const BOARD_WIDTH = 3
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

let boardState = resetBoardState()
let currentPlayer = 1
let numberOfTurns = 0

gameSquares.forEach((gameSquare, i) => {
  gameSquare.addEventListener("click", () => {
    gameMove(gameSquare, i)
  })
})

function gameMove(gameSquare, i) {
  gameSquare.textContent = currentPlayer === 1 ? "X" : "O"
  gameSquare.disabled = true
  numberOfTurns++

  if (didWin(currentPlayer, i)) {
    restartButton.style.display = "block"
    gameSquares.forEach((gameSquare) => (gameSquare.disabled = true))
    gameHeading.textContent = `Player ${currentPlayer} Won!`
    restartButton.addEventListener("click", restartGame)
  } else if (numberOfTurns === BOARD_WIDTH * BOARD_WIDTH) {
    restartButton.style.display = "block"
    gameSquares.forEach((gameSquare) => (gameSquare.disabled = true))
    gameHeading.textContent = `Tie Game!`
    restartButton.addEventListener("click", restartGame)
  } else {
    currentPlayer === 1 ? (currentPlayer = 2) : (currentPlayer = 1)
    gameHeading.textContent = `Player ${currentPlayer}'s Turn`
  }
}

function resetBoardState() {
  return new Array(BOARD_WIDTH * BOARD_WIDTH).fill()
}

function restartGame() {
  currentPlayer = 1
  restartButton.style.display = "none"
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`
  numberOfTurns = 0
  gameSquares.forEach((gameSquare) => {
    gameSquare.disabled = false
    gameSquare.textContent = ""
  })
  boardState = resetBoardState()
}

function didWin(currentPlayer, i) {
  boardState[i] = currentPlayer
  return winConditions.some((winCondition) =>
    winCondition.every((element) => boardState[element] === currentPlayer)
  )
}
