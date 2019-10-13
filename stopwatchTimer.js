import { ClassHelper } from './classHelper.js';

function StopwatchTimer(initMode, initSeconds) {
  let startTime;
  let myInterval;
  let lastDifferenceSeconds = initSeconds;
  let differenceSeconds = 0;
  let mode = initMode;

  let htmlElements = {
    output: document.querySelector(`.container [data-mode="${mode}"] .output`),
    buttons: document.querySelectorAll(`.container .tabs [data-mode="${mode}"] .buttons button`),
    startButton: document.querySelector(`.container .tabs [data-mode="${mode}"] .buttons .start`),
    stopButton: document.querySelector(`.container .tabs [data-mode="${mode}"] .buttons .stop`),
    resetButton: document.querySelector(`.container .tabs [data-mode="${mode}"] .buttons .reset`)
  };

  function onStartButtonClick() {
    ClassHelper.removeClass('disabled', htmlElements.buttons);
    ClassHelper.addClass('disabled', [htmlElements.startButton]);
    myInterval = setInterval(onIntervalTick, 1000);
    startTime = new Date().getTime();
  }

  function onStopButtonClick() {
    ClassHelper.removeClass('disabled', htmlElements.buttons);
    ClassHelper.addClass('disabled', [htmlElements.stopButton]);
    clearInterval(myInterval);
    lastDifferenceSeconds = differenceSeconds;
  }

  function onResetButtonClick() {
    ClassHelper.removeClass('disabled', htmlElements.buttons);
    ClassHelper.addClass('disabled', [htmlElements.resetButton]);
    lastDifferenceSeconds = initSeconds;
    startTime = new Date().getTime();
    clearInterval(myInterval);
    onIntervalTick();
  }

  function onIntervalTick() {
    const differenceMilliseconds = new Date().getTime() - startTime;
    switch (mode) {
      case 'timer':
        differenceSeconds = lastDifferenceSeconds - Math.round(differenceMilliseconds / 1000);
        if (differenceSeconds === 0) {
          clearInterval(myInterval);
          console.log('stopped');
        }
        break;
      case 'stopwatch':
        differenceSeconds = lastDifferenceSeconds + Math.round(differenceMilliseconds / 1000);
        break;
      default:
        throw new Error('mode is not recognized');
    }

    let seconds = parseInt(differenceSeconds % 60);
    let minutes = parseInt((differenceSeconds / 60) % 60);
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    htmlElements.output.innerText = `00:${minutes}:${seconds}`;
  }

  htmlElements.startButton.addEventListener('click', onStartButtonClick);
  htmlElements.stopButton.addEventListener('click', onStopButtonClick);
  htmlElements.resetButton.addEventListener('click', onResetButtonClick);
}

export { StopwatchTimer };
