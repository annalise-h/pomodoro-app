/* 
<----- Element query selectors ----->
*/

const pomodoroTimer = document.getElementById('pomodoroCounterDisplay')
const minutesInput = document.getElementById('minutesInputText')
const secondsInput = document.getElementById('secondsInputText')
const addBtn = document.getElementById('pomorodoForm-addBtn')
const startBtn = document.getElementById('pomorodoForm-StartPauseBtn')
let timer
let totalMilliseconds

/* 
<----- Event listeners here ----->
*/

minutesInput.addEventListener('keyup', validateInputFields)
secondsInput.addEventListener('keyup', validateInputFields)
addBtn.addEventListener('click', handleAddClick)
startBtn.addEventListener('click', handleStartOrPauseClick)

/* 
<----- Event callbacks and helper functions ----->
*/

function validateInputFields() {
  let minutes = Number(minutesInput.value)
  let seconds = Number(secondsInput.value)

  // validates minutes can only be 0-60
  // validates seconds can only be 1-60
  // add button is only enabled when inputs are valid
  if (minutes < 60 && minutes >= 0 && seconds < 60 && seconds > 0) {
    addBtn.disabled = false
  } else {
    addBtn.disabled = true
  }
}

function handleAddClick() {
  let minutes = Number(minutesInput.value)
  let seconds = Number(secondsInput.value)

  const formattedInputs = populateFormattedPomodoro(minutes, seconds)
  minutesInput.value = formattedInputs[0]
  secondsInput.value = formattedInputs[1]

  startBtn.disabled = false
}

function handleStartOrPauseClick() {
  // check if button is in start or pause state
  const buttonState = startBtn.getAttribute('data-start-pause-state')
  if (buttonState == "start") startPomodoro()
  if (buttonState == "pause") pausePomodoro()
}

function startPomodoro() {
  addBtn.disabled = true
  startBtn.setAttribute('data-start-pause-state', 'pause')
  startBtn.innerText = 'Pause'
  let timerArray = pomodoroTimer.innerText.split(':')
  let minutes = Number(timerArray[0])
  let seconds = Number(timerArray[1])
  totalMilliseconds = minutes * 60000 + seconds * 1000

  timer = setInterval(handleCountdown, 1000)
}

function pausePomodoro() {
  addBtn.disabled = false
  startBtn.setAttribute('data-start-pause-state', 'start')
  startBtn.innerText = 'Start'
  clearInterval(timer)
}


function handleCountdown() {
  /*
  every interation of the countdown, we decrease the total milliseconds
  of the timer by 1 second (1000 milliseconds)
  */

  totalMilliseconds -= 1000

  // then we convert the total milliseconds to our minutes and seconds values
  let minutes = 0
  let seconds = 0
  if (totalMilliseconds >= 60000) {
    minutes = parseInt(totalMilliseconds / 60000) 
  } 

  if (totalMilliseconds >= 1000 ) {
    seconds = (totalMilliseconds - minutes * 60000) / 1000
  }

  // we take our minutes and seconds values and make them pretty
  populateFormattedPomodoro(minutes, seconds)

  if (totalMilliseconds == 0) completePomodoro()
}

function completePomodoro() {
   pausePomodoro()
   startBtn.disabled = true
   // set a timeout so user sees formatted timer before alert is triggered
   setTimeout(`alert('Pomodore completed')`, 100)
}

function populateFormattedPomodoro(minutes, seconds) {
  let formattedMinutes = minutes
  let formattedSeconds = seconds

  if (minutes == 0) formattedMinutes = '00' 
  // if (seconds == 0) formattedSeconds = '00' 

  if (minutes < 10 && minutes > 0) {
    formattedMinutes = '0' + minutes
  }

  if (seconds < 10) {
    formattedSeconds = '0' + seconds
  }

  pomodoroTimer.innerText = `${formattedMinutes}:${formattedSeconds}`
  return [formattedMinutes, formattedSeconds]
}

