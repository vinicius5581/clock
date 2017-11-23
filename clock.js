function Clock(el) {
    const currentDate = new Date;
    const hour = currentDate.getHours() % 12;
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    this.el = el || document.getElementById('clock');

    // Hour hand speed (deg/min)
    this.hourRotDegMin =  (minutes * .5) + hour * 30 - 90;
    // Min hand speed (deg/min)
    this.minRotDegMin = minutes * 6 - 90;
    // Sec hand speed (deg/sec)
    this.secRotDegSec = seconds * 6 - 90;

    this.render();
    this.runMinutes();
    this.runSeconds();
}

Clock.prototype.runMinutes = function() {
  setInterval(() => {
    this.hourRotDegMin += .5;
    this.minRotDegMin += 3;
    this.updateClockPerMinute(this.hourRotDegMin, this.minRotDegMin);
  }, 60000);
}

Clock.prototype.runSeconds = function() {
  setInterval(() => {
    this.secRotDegSec++;
    this.updateClockPerSecond(this.secRotDegSec);
  }, 1000)
}

Clock.prototype.render = function() {
  let template = `
    <div class='clock'>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `;
  this.el.innerHTML = template;
  this.updateClockPerMinute(this.hourRotDegMin, this.minRotDegMin);
  this.updateClockPerSecond(this.secRotDegSec);
}


// TODO: Make the methods bellow private

Clock.prototype.updateClockPerMinute = function(hourRotDegMin, minRotDegMin) {
  const watchContainer = this.el.children[0];
  const hours = watchContainer.children[0];
  const minutes = watchContainer.children[1];

  hours.style.transform = `rotate(${hourRotDegMin}deg)`;
  minutes.style.transform = `rotate(${minRotDegMin}deg)`;
}

Clock.prototype.updateClockPerSecond = function(secRotDegSec) {
  const watchContainer = this.el.children[0];
  const seconds = watchContainer.children[2];

  seconds.style.transform = `rotate(${secRotDegSec}deg)`;
}
