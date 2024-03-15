let startTime;
let elapsedTime = 0;
let timerInterval;
let lapCounter = 1;

const display = document.querySelector('.display');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.querySelector('.laps');

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  return date.toISOString().substr(11, 8);
}

function printElapsedTime() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    printElapsedTime();
  }, 10);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  printElapsedTime();
  lapsList.innerHTML = ''; // Clear laps list
  lapCounter = 1; // Reset lap counter
}

function addLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
  lapsList.appendChild(lapItem);
  lapCounter++;
}

startButton.addEventListener('click', () => {
  startTimer();
  startButton.disabled = true;
  pauseButton.disabled = false;
  resetButton.disabled = false;
  lapButton.disabled = false; // Enable lap button
});

pauseButton.addEventListener('click', () => {
  pauseTimer();
  startButton.disabled = false;
  pauseButton.disabled = true;
  lapButton.disabled = true; // Disable lap button when paused
});

resetButton.addEventListener('click', () => {
  resetTimer();
  startButton.disabled = false;
  pauseButton.disabled = true;
  resetButton.disabled = true;
  lapButton.disabled = true; // Disable lap button when reset
});

lapButton.addEventListener('click', addLap);
