import DOMElement from "./dom.js"

function checkWin(gameState) {
    if(!gameState.winner) {
        // increment rounds for tie gameState check
        gameState.rounds++
        const checkPlayer = (current) => current === gameState.currentPlayer.mark
        const getColumn1 = gameState.gameBoard.map(i => i[0])
        const getColumn2 = gameState.gameBoard.map(i => i[1])
        const getColumn3 = gameState.gameBoard.map(i => i[2])

        // Each Row
        for(let item in gameState.gameBoard) {
            if(gameState.gameBoard[item].every(checkPlayer)) {
                DOMElement.wins.textContent = `${gameState.currentPlayer.player} Wins!`
                gameState.winner = true
            }
        }
        // Each Column
        if(getColumn1.every(checkPlayer) || getColumn2.every(checkPlayer) || getColumn3.every(checkPlayer)) {
            DOMElement.wins.textContent = `${gameState.currentPlayer.player} Wins!`
            gameState.winner = true
        }
        // Cross Top Left to Bottom Right
        if(gameState.gameBoard[0][0] === gameState.currentPlayer.mark && gameState.gameBoard[1][1] === gameState.currentPlayer.mark && gameState.gameBoard[2][2] === gameState.currentPlayer.mark) {
            DOMElement.wins.textContent = `${gameState.currentPlayer.player} Wins!`
            gameState.winner = true
        }
        // Cross Top Right to Bottom Left
        if(gameState.gameBoard[0][2] === gameState.currentPlayer.mark && gameState.gameBoard[1][1] === gameState.currentPlayer.mark && gameState.gameBoard[2][0] === gameState.currentPlayer.mark) {
            DOMElement.wins.textContent = `${gameState.currentPlayer.player} Wins!`
            gameState.winner = true
        }
        // ITS A TIE!!
        if(gameState.rounds === 9 && !gameState.winner) {
            DOMElement.wins.textContent = "Well, nobody saw that coming! Its a tie!!"
            gameState.gameBoard.tie = true
            DOMElement.info.style.opacity = '0%'
            DOMElement.resetButton.style.opacity = '100%'
            return
        }
        if(gameState.winner) {
            DOMElement.resetButton.style.opacity = '100%'
            DOMElement.wins.style.fontSize = '80px'
            DOMElement.info.style.opacity = '0%'
        }
    }
}

export { checkWin }