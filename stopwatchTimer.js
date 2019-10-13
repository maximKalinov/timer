import { ClassHelper } from './classHelper.js';

function TimerCore(initSeconds, rate) {
  this.initSeconds = initSeconds;
  this.startTime;
  this.differenceSeconds = 0;
  this.lastDifferenceSeconds = initSeconds;
  this.myInterval;
  this.onTick;

  this.start = function() {
    this.myInterval = setInterval(this.tick, 1000);
    this.startTime = new Date().getTime();
  }
  
  this.stop = function() {
    clearInterval(this.myInterval);
    this.lastDifferenceSeconds = this.differenceSeconds;
  }

  this.reset = function() {
    clearInterval(this.myInterval);
    this.lastDifferenceSeconds = this.initSeconds;
    this.startTime = new Date().getTime();
    this.tick();
  }

  this.getResult = function() {
    return this.differenceSeconds;
  }

  this.tick = () => {
    let differenceMilliseconds = new Date().getTime() - this.startTime;
    this.differenceSeconds = this.lastDifferenceSeconds + rate * Math.round(differenceMilliseconds / 1000);
    if (this.differenceSeconds <= 0) {
      clearInterval(this.myInterval);
      this.differenceSeconds = 0;
      console.log('stopped');
    }
    this.onTick(this.differenceSeconds);
  }
}

function TimerTabBase(timer, initMode) {
  this.timer = timer;
  this.mode = initMode;
}

TimerTabBase.prototype.init = function() {
  let timer = this.timer;
  let mode = this.mode;
  timer.onTick = showTime;

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
    timer.start();
  }

  function onStopButtonClick() {
    ClassHelper.removeClass('disabled', htmlElements.buttons);
    ClassHelper.addClass('disabled', [htmlElements.stopButton]);
    timer.stop();
  }

  function onResetButtonClick() {
    ClassHelper.removeClass('disabled', htmlElements.buttons);
    ClassHelper.addClass('disabled', [htmlElements.resetButton]);
    timer.reset();
  }

  function showTime(totalSeconds) {
    let seconds = parseInt(totalSeconds % 60);
    let minutes = parseInt((totalSeconds / 60) % 60);
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


function StopwatchTab() {
  this.timer = new TimerCore(0, 1);
  this.mode = 'stopwatch';
}

StopwatchTab.prototype = Object.create(TimerTabBase.prototype);
StopwatchTab.prototype.constructor = StopwatchTab;

function TimerTab(initSeconds) {
  this.timer = new TimerCore(initSeconds, -1);
  this.mode = 'timer';
}

TimerTab.prototype = Object.create(TimerTabBase.prototype);
TimerTab.prototype.constructor = TimerTab;


export { StopwatchTab as Stopwatch, TimerTab as Timer };
