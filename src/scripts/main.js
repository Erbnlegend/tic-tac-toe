// import { buildBoard } from "./build.js"
// import { wins } from "./wins.js"
// import { PlayerPlays } from "./PlayerPlays.js"
// import { reset } from "./reset.js"
// import { play } from "./play.js"

const Game = (() => {
    const board = document.getElementById('board')
    const boxes = [...document.querySelectorAll('.playArea')]
    const info = document.querySelector('.player')
    const gameBoard = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    
    let winner = ""

    boxes.forEach(element => {
        const coords = JSON.parse(element.dataset.coordinates)
        element.addEventListener('click', () => {
            play(element, coords)
        })
        
    })
    
    const PlayerPlays = (player, mark, turn) => {
        return {
            player,
            mark,
            turn
        }
    }
    const player1 = PlayerPlays('Player X', 'X', true)
    const player2 = PlayerPlays('Player O', 'O', false)
    let currentPlayer = player1
    info.textContent = currentPlayer.player

// Will change on player Selections
    
    function play(element, coords) {
        info.classList.toggle('animate')
        if(gameBoard[coords.x][coords.y] === player1.mark || gameBoard[coords.x][coords.y] === player2.mark) {
            info.textContent = "yOu hErE tRyN CHeAt " + currentPlayer + "???"
        }
        else if(player1.turn) {
            element.textContent = player1.mark
            player1.turn = false
            player2.turn = true
            gameBoard[coords.x][coords.y] = player1.mark

        }
        else if(player2.turn) {
            element.textContent = player2.mark
            player1.turn = true
            player2.turn = false
            gameBoard[coords.x][coords.y] = player2.mark
        }
        setTimeout(() => {
            info.classList.toggle('animate')
        }, 1);
        checkWin(gameBoard)
        if(currentPlayer === player1) {
            currentPlayer = player2
        }
        else if(currentPlayer === player2) {
            currentPlayer = player1
        }
        setTimeout(() => {
            info.innerHTML = currentPlayer.player
        }, 1);
    }

    function checkWin(gameBoard) {
        const checkPlayer1 = (current) => current === player1.mark
        const checkPlayer2 = (current) => current === player2.mark

        for(let item in gameBoard) {
            if(gameBoard[item].every(checkPlayer1)) {
                info.textContent = `${currentPlayer.player} Wins!`
            }
            if(gameBoard[item].every(checkPlayer2)) {
                info.textContent = `${currentPlayer.player} Wins!`
            }
        }
        if(gameBoard[0][0] === currentPlayer.mark && gameBoard[1][1] === currentPlayer.mark && gameBoard[2][2] === currentPlayer.mark) {
            info.textContent = `${currentPlayer.player} Wins!`
        }
        if(gameBoard[0][2] === currentPlayer.mark && gameBoard[1][1] === currentPlayer.mark && gameBoard[2][0] === currentPlayer.mark) {
            info.textContent = `${currentPlayer.player} Wins!`
        }
    }
    
})()

export { Game }