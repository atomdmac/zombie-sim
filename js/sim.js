SIM = function (scope) {
    scope = typeof scope === "object" ? scope : {};
    scope.config = {
        width : 500,
        height: 500
    };
    
    scope.bodies = [];
    scope.isRunning = false;
    scope.canvas = null;
    scope.ctx    = null;
    
    var particles = [];
    
    Number.prototype.clamp = function(min, max) {
        return Math.min(Math.max(this, min), max);
    };
    Math.randomInt = function randomInt(min, max) {
        return Math.round(((max - min) * Math.random()) + min);
    }
    function randomX() {
        return Math.randomInt(0, scope.config.width);
    }
    function randomY() {
        return Math.randomInt(0, scope.config.height);
    }
    function collide () {
        var bodies = scope.bodies;
        for(var i=0, l=bodies.length; i<l; i++){
            var body1 = bodies[i];
            
            // Outer bounderies
            if (body1.x - body1.radius < 0 ) body1.x = body1.radius;
            if (body1.x + body1.radius > scope.config.width) body1.x = scope.config.width - body1.radius;
            
            if (body1.y - body1.radius < 0) body1.y = body1.radius;
            if (body1.y + body1.radius > scope.config.height) body1.y = scope.config.height - body1.radius;
            
            // Collide with other bodies.
            for(var j=i+1; j<l; j++){
                var body2 = bodies[j];
                var x = body1.x - body2.x;
                var y = body1.y - body2.y;
                var slength = x*x+y*y;
                var length = Math.sqrt(slength);
                var target = body1.radius + body2.radius;
                
                // if the spheres are closer
                // then their radii combined
                if(length < target){ 
                    var factor = (length-target)/length;
                    // move the spheres away from each other
                    // by half the conflicting length
                    body1.x -= x*factor*0.5;
                    body1.y -= y*factor*0.5;
                    body2.x += x*factor*0.5;
                    body2.y += y*factor*0.5;
                }
            }
        }
    }
    function tick() {
        scope.ctx.clearRect(0, 0,
                            scope.config.width,
                            scope.config.height);
        
        var i, len = scope.bodies.length;
        for(i=0; i<len; i++) {
            scope.bodies[i].tick();
        }
        collide();
        for(i=0; i<len; i++) {
            scope.bodies[i].draw(scope.ctx);
        }
        
    }
    function toggleSim() {
        if( !scope.isRunning ) {
            scope.interval = setInterval(tick, 20);
        } else {
            clearInterval(scope.interval);
        }
        scope.isRunning = !scope.isRunning;
    }
    
    scope.init = function () {
        scope.canvas = document.getElementById("stage");
        scope.width  = scope.config.width;
        scope.height = scope.config.height;
        console.log(scope.canvas);
        scope.ctx    = scope.canvas.getContext("2d");
        
        var x, y, r;
        var padding = 10;
        for(var i=0; i<400; i++) {
            r = Math.randomInt(3, 5);
            x = randomX().clamp(r, scope.config.width  - r);
            y = randomY().clamp(r, scope.config.height - r);
            console.log(r, " ", x, " ", y);
            scope.bodies.push(new Body(x, y, r));
        }
        
        collide();
        
        // Start / Stop sim.
        scope.canvas.onclick = toggleSim;
    };
    
    scope.init();
    return scope;
}