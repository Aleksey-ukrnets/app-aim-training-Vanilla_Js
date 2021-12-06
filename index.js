const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const starts = document.querySelectorAll('.starts')

let time = 0
let score = 0
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')

const board = document.querySelector('#board')

const colors = ['purple', 'yellow', 'green','blue','red','aqua']





startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
 if(event.target.classList.contains('time-btn')){
    screens[1].classList.add('up')
     time = parseInt(event.target.getAttribute('data-time'))
     startGame()
 }
})

board.addEventListener('click', (event)=> {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame(){
    createRandomCircle()    
    setInterval(decreaseTime, 1000)
    setTime(time)
}

function decreaseTime (){
    if(time == 0){
        finishGame()
    } else {
        let current = --time
        if(current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
   
}
function setTime(value){
    timeEl.innerHTML = `00:${value}`
}


function finishGame(){
    timeEl.parentNode.classList.add('hide')
 board.innerHTML = `
 <ul>
 <li><h1>Ваш счет: <span class='primary'>${score}</span></h1></li>
 <li><a id='again'>Начать сначала</a></li>
 </ul>
 `
 const startAgain = document.querySelector('#again')
startAgain.addEventListener('click', ()=> {
    setTimeout(() => {
        location.reload()
    },0);
})
}



function createRandomCircle(){
    const circle = document.createElement('div')
    circle.classList.add('circle')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    
    const colorBack = getRandomNumber(0, colors.length-1)
    circle.style.background = `${colors[colorBack]}`


    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    

    board.append(circle)
}



function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
