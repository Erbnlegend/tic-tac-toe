import DOMElements from "./dom.js"
import { checkWin } from "./wins.js"
import { reset } from "./reset.js"

function play(gameState, element, coords, player1, player2) {
    if(gameState.tie) {
        reset(gameState, player1, player2)
    }
    // No Cheaters
    if(!gameState.winner && gameState.gameBoard[coords.x][coords.y] === player1.mark || gameState.gameBoard[coords.x][coords.y] === player2.mark) {
        DOMElements.info.textContent = "yOu hErE tRyN CHeAt " + gameState.currentPlayer.player + "???"
        setTimeout(() => {
            DOMElements.info.textContent = `Try again ${gameState.currentPlayer.player}`
        }, 2000);
        return
    }
    if(!gameState.winner && !gameState.tie) {
        DOMElements.info.classList.toggle('animate')
        DOMElements.wins.textContent = "No Winner Quite Yet"
        if(gameState.currentPlayer === player1) {
            element.textContent = gameState.currentPlayer.mark
            element.style.backgroundColor = 'rgba(94, 151, 61, 0.596)'
            gameState.gameBoard[coords.x][coords.y] = gameState.currentPlayer.mark
            // Must check for win before currentPlayer changes
            checkWin(gameState)
            gameState.currentPlayer = player2
            setTimeout(() => {
                DOMElements.info.innerHTML = gameState.currentPlayer.player
                DOMElements.info.classList.toggle('animate')
            }, 1);
        }
        else if(gameState.currentPlayer === player2) {
            element.textContent = gameState.currentPlayer.mark
            element.style.backgroundColor = 'rgba(61, 103, 151, 0.596)'
            gameState.gameBoard[coords.x][coords.y] = gameState.currentPlayer.mark
            // Must check for win before currentPlayer changes
            checkWin(gameState)
            gameState.currentPlayer = player1
            setTimeout(() => {
                DOMElements.info.innerHTML = gameState.currentPlayer.player
                DOMElements.info.classList.toggle('animate')
            }, 1);
        }
    }

}

export { play }