/*
 * Loads of ideas and code stolen from Codeflow.
 *
 * URL: http://codeflow.org/entries/2010/nov/29/verlet-collision-with-impulse-preservation/
 * 
 * Sheesh, that dude is so much smarter than I am.
 */

var Body = function(x, y, radius){
    var self = this;
    self.color = "#ccc";
    self.x = x;
    self.y = y;
    self.px = x;
    self.py = y;
    self.ax = 0;
    self.ay = 0;
    self.radius = radius;
    self.maxAcc = 1;
};

// ---------
// Steering Behaviors
// ---------
Body.prototype.flee = function () {
    // TODO
}

Body.prototype.seek = function () {
    // TODO
}

Body.prototype.wander = function () {
    var range = this.maxAcc,
        min   = range * -1,
        max   = range;
    this.ax = Math.randomInt(min, max);
    this.ay = Math.randomInt(min, max);
}

// ---------
// Physics
// ---------
Body.prototype.accelerate = function (delta) {
    this.x += this.ax * delta * delta
    this.y += this.ay * delta * delta;
    this.ax = 0;
    this.ay = 0;
}

Body.prototype.stop = function () {
    this.px = this.x;
    this.py = this.y;
    this.ax = 0;
    this.ay = 0;
}

Body.prototype.inertia = function (delta) {
    var x = this.x*2 - this.px;
    var y = this.y*2 - this.py;
    this.px = this.x;
    this.py = this.y;
    this.x = x;
    this.y = y;
}

// ---------
// Step / Update
// ---------

Body.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fill();
}

Body.prototype.tick = function () {
    var step = 8,
        step = 1/step;
    
    this.wander();
    this.accelerate(step);
    this.inertia(step);
}
