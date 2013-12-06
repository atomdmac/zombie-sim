/*
 * Loads of ideas and code stolen from Codeflow.
 *
 * URL: http://codeflow.org/entries/2010/nov/29/verlet-collision-with-impulse-preservation/
 * 
 * Sheesh, that dude is so much smarter than I am.
 */

var Body = Class.extend({
    color: null,
    x: null,
    y: null,
    px: null,
    py: null,
    ax: null,
    ay: null,
    radius: null,
    maxAcc: null,
    
    init: function (config) {
        config = config || {};
        this.color  = config.color || "#ccc";
        this.x      = config.x || 0;
        this.y      = config.y || 0;
        this.px     = this.x;
        this.py     = this.y;
        this.ax     = config.ax || 0;
        this.ay     = config.ay || 0;
        this.radius = config.radius || 1;
        this.maxAcc = config.maxAcc || 5;
        this.maxSpeed = config.maxSpeed || 10;
    },
    
    // ---------
    // Update
    // ---------
    
    draw: function (ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        ctx.fill();
    },
    
    tick: function () {
        var step = 8,
            step = 1/step;
        
        this.accelerate(step);
        this.inertia(step);
    },
    
    // ---------
    // Steering Behaviors
    // ---------
    flee: function (target) {
        var xd = (this.x - target.x),
            yd = (this.y - target.y),
            l = Math.sqrt(xd*xd+yd*yd)
            x = xd / l,
            y = yd / l;
        
        this.ax += x;
        this.ay += y;
    },
    
    seek: function (target) {
        var xd = (target.x - this.x),
            yd = (target.y - this.y),
            l  = Math.sqrt(xd*xd+yd*yd),
            x  = xd / l,
            y  = yd / l;
        this.ax += x;
        this.ay += y;
    },
    
    wander: function () {
        var range = this.maxAcc,
        min   = range * -1,
        max   = range;
        this.ax += Math.randomFloat(min, max);
        this.ay += Math.randomFloat(min, max);
    },
    
    accelerate: function (delta) {
        //this.ax = this.ax.clamp(-this.maxAcc, this.maxAcc);
        //this.ay = this.ay.clamp(-this.maxACc, this.maxAcc);
        
        this.x += this.ax * delta * delta
        this.y += this.ay * delta * delta;
        this.ax = 0;
        this.ay = 0;
    },
    
    inertia: function (delta) {
        var x, y;
        x = this.x*2 - this.px;
        y = this.y*2 - this.py;
        this.px = this.x;
        this.py = this.y;
        this.x = x;
        this.y = y;
    },
    
    stop: function () {
        this.px = this.x;
        this.py = this.y;
        this.ax = 0;
        this.ay = 0;
    }
});
