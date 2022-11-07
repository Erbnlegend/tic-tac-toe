import DOMElement from "./dom.js"
import { play } from "./play.js"
import { reset } from "./reset.js"

const Game = (() => {
    const PlayerPlays = (player, mark) => {
        return {
            player,
            mark
        }
    }
    const player1 = PlayerPlays('Player X', 'X')
    const player2 = PlayerPlays('Player O', 'O')

    const gameState = {
        gameBoard: [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        rounds: 0,
        winner: false,
        tie: false,
        currentPlayer: player1
    }

    DOMElement.resetEvent.addEventListener('click', () => {
        reset(gameState, player1, player2)
    })

    DOMElement.boxes.forEach(element => {
        const coords = JSON.parse(element.dataset.coordinates)
        element.addEventListener('click', () => {
            play(gameState, element, coords, player1, player2)
        })
        
    })

    DOMElement.info.textContent = gameState.currentPlayer.player
})()