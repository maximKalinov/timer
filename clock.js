const htmlElements = { output: document.querySelector('.container [data-mode="clock"] .output') };

function onClockNextTick() {
  const currentTime = new Date();
  const timeStrLong = currentTime.toTimeString();
  const timeStrShort = timeStrLong.split(' ')[0];
  htmlElements.output.innerText = timeStrShort;
}

function Clock() {}

Clock.prototype.init = function() {
  setInterval(onClockNextTick, 1000);
  onClockNextTick();
};

export { Clock };
