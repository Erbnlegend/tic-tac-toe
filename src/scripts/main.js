// import { buildBoard } from "./build.js"
// import { wins } from "./wins.js"
// import { PlayerPlays } from "./PlayerPlays.js"
// import { reset } from "./reset.js"
// import { play } from "./play.js"

const Game = (() => {
    const board = document.getElementById('board')
    const boxes = [...document.querySelectorAll('.playArea')]
    const wins = document.getElementById('wins')
    const info = document.querySelector('.info')
    const resetButton = document.querySelector('.resetInfo')
    const resetEvent = document.getElementById('reset')
    resetEvent.addEventListener('click', reset)
    let gameBoard = [
        ['','',''],
        ['','',''],
        ['','','']
    ]

    boxes.forEach(element => {
        const coords = JSON.parse(element.dataset.coordinates)
        element.addEventListener('click', () => {
            play(element, coords)
        })
        
    })
    
    const PlayerPlays = (player, mark) => {
        return {
            player,
            mark
        }
    }
    const player1 = PlayerPlays('Player X', 'X')
    const player2 = PlayerPlays('Player O', 'O')
    let currentPlayer = player1
    info.textContent = currentPlayer.player
    // Init number of Rounds for winner
    let rounds = 0
    let winner = false

// Will change on player Selections
    
    function play(element, coords) {
        if(!winner) {
            info.classList.toggle('animate')
            wins.textContent = "No Winner Quite Yet"
            // No Cheaters
            if(gameBoard[coords.x][coords.y] === player1.mark || gameBoard[coords.x][coords.y] === player2.mark) {
                info.textContent = "yOu hErE tRyN CHeAt " + currentPlayer.player + "???"
                setTimeout(() => {
                    info.textContent = `Try again ${currentPlayer.player}`
                }, 2000);
            }
            else if(currentPlayer === player1) {
                element.textContent = player1.mark
                element.style.backgroundColor = 'rgba(94, 151, 61, 0.596)'
                gameBoard[coords.x][coords.y] = currentPlayer.mark
                // Must check for win before currentPlayer changes
                checkWin(gameBoard)
                currentPlayer = player2
                setTimeout(() => {
                    info.innerHTML = currentPlayer.player
                    info.classList.toggle('animate')
                }, 1);
            }
            else if(currentPlayer === player2) {
                element.textContent = currentPlayer.mark
                element.style.backgroundColor = 'rgba(61, 103, 151, 0.596)'
                gameBoard[coords.x][coords.y] = currentPlayer.mark
                // Must check for win before currentPlayer changes
                checkWin(gameBoard)
                currentPlayer = player1
                setTimeout(() => {
                    info.innerHTML = currentPlayer.player
                    info.classList.toggle('animate')
                }, 1);
            }
        }
    }

    function checkWin(gameBoard) {
        if(!winner) {
            // increment rounds for tie game check
            rounds++
            const checkPlayer = (current) => current === currentPlayer.mark
            const getColumn1 = gameBoard.map(i => i[0])
            const getColumn2 = gameBoard.map(i => i[1])
            const getColumn3 = gameBoard.map(i => i[2])

            // Each Row
            for(let item in gameBoard) {
                if(gameBoard[item].every(checkPlayer)) {
                    wins.textContent = `${currentPlayer.player} Wins!`
                    winner = true
                    console.log(gameBoard[item])
                }
            }
            // Each Column
            if(getColumn1.every(checkPlayer) || getColumn2.every(checkPlayer) || getColumn3.every(checkPlayer)) {
                wins.textContent = `${currentPlayer.player} Wins!`
                winner = true
            }
            // Cross Top Left to Bottom Right
            if(gameBoard[0][0] === currentPlayer.mark && gameBoard[1][1] === currentPlayer.mark && gameBoard[2][2] === currentPlayer.mark) {
                wins.textContent = `${currentPlayer.player} Wins!`
                winner = true
            }
            // Cross Top Right to Bottom Left
            if(gameBoard[0][2] === currentPlayer.mark && gameBoard[1][1] === currentPlayer.mark && gameBoard[2][0] === currentPlayer.mark) {
                wins.textContent = `${currentPlayer.player} Wins!`
                winner = true
            }
            // ITS A TIE!!
            if(rounds === 9 && !winner) {
                wins.textContent = "Well, nobody saw that coming! Its a tie!!"
                wins.style.fontSize = '80px'
                info.style.opacity = '0%'
            }
            if(winner) {
                resetButton.style.opacity = '100%'
                wins.style.fontSize = '80px'
                info.style.opacity = '0%'
            }
        }
    }
    function reset() {
        winner = false
        rounds = 0
        currentPlayer = player1
        info.innerHTML = currentPlayer.player
        info.style.opacity = '100%'
        resetButton.style.opacity = '0%'
        wins.style.fontSize = '36px'
        wins.textContent = " "
        info.classList.toggle('animate')
        gameBoard = [
            ['','',''],
            ['','',''],
            ['','','']
        ]
        boxes.forEach(element => {
            element.textContent = ""
            element.style.backgroundColor = "white"
        })
    }
})()

export { Game }