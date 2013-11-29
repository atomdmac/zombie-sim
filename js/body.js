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
    
    self.stop = function () {
        self.px = self.x;
        self.py = self.y;
        self.ax = 0;
        self.ay = 0;
    }
    
    self.flee = function (x, y) {
        // TODO: Run away from the given point.
    }
    
    self.seek = function (x, y) {
        // TODO: Move toward the given point.
    }
    
    self.wander = function () {
        // TODO: Wander aimlessly.
    }
    
    function steer() {
        var range = self.maxAcc,
            min   = range * -1,
            max   = range;
        self.ax = Math.randomInt(min, max);
        self.ay = Math.randomInt(min, max);
    }

    function accelerate(delta) {
        self.x += self.ax * delta * delta
        self.y += self.ay * delta * delta;
        self.ax = 0;
        self.ay = 0;
    }
    
    function inertia(delta) {
        var x = self.x*2 - self.px;
        var y = self.y*2 - self.py;
        self.px = self.x;
        self.py = self.y;
        self.x = x;
        self.y = y;
    }
    
    self.draw = function (ctx) {
        ctx.fillStyle = self.color;
        ctx.beginPath();
        ctx.arc(self.x, self.y, self.radius, 0, Math.PI*2, false);
        ctx.fill();
    }
    
    self.tick = function (ctx) {
        var step = 8,
            step = 1/step;
        
        steer();
        accelerate(step);
        inertia(step);
    }
};
