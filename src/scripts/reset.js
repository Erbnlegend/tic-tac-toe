import DOMElement from "./dom.js"

function reset(gameState, player1, player2) {
    gameState.tie = false
    gameState.winner = false
    gameState.rounds = 0
    gameState.currentPlayer = player1
    DOMElement.info.innerHTML = gameState.currentPlayer.player
    DOMElement.info.style.opacity = '100%'
    DOMElement.resetButton.style.opacity = '0%'
    DOMElement.wins.style.fontSize = '36px'
    DOMElement.wins.textContent = " "
    DOMElement.info.classList.toggle('animate')
    gameState.gameBoard = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    DOMElement.boxes.forEach(element => {
        element.textContent = ""
        element.style.backgroundColor = "white"
    })
}

export { reset }