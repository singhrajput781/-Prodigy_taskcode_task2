
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");


function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
}


function updateDisplay() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime);
}


function toggleStartPause() {
    if (!isRunning) {
        startTime = new Date().getTime() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startPauseBtn.textContent = "Pause";
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    } else {
        clearInterval(timerInterval);
        startPauseBtn.textContent = "Start";
    }
    isRunning = !isRunning;
}


function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    display.textContent = "00:00:00.00";
    startPauseBtn.textContent = "Start";
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsContainer.innerHTML = "";
}


function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement("div");
    lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
    lapsContainer.appendChild(lapElement);
}


startPauseBtn.addEventListener("click", toggleStartPause);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
