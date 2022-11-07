export default {
    board: document.getElementById('board'),
    boxes: [...document.querySelectorAll('.playArea')],
    wins: document.getElementById('wins'),
    info: document.querySelector('.info'),
    resetButton: document.querySelector('.resetInfo'),
    resetEvent: document.getElementById('reset')
}