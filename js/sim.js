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
    
    function randomX() {
        return Math.randomInt(0, scope.config.width);
    }
    function randomY() {
        return Math.randomInt(0, scope.config.height);
    }
    function collide (preventAccel) {
        var bodies     = scope.bodies,
            // Let's keep track of how many collisions happen here.
            collisions = 0;
            preventAccel = preventAccel || false;
            
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
                    
                    collisions++;
                    
                    // TODO: This is an experiment.
                    // var tmp = body1.color;
                    // body1.color = body2.color;
                    // body2.color = tmp;
                    
                    // Prevent acceleration?
                    if (preventAccel) {
                        body1.stop();
                        body2.stop();
                    }
                }
            }
        }
        return collisions;
    }
    function tick() {
        console.log("tick");
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
        scope.ctx    = scope.canvas.getContext("2d");
        
        // Create test bodies.
        var x, y, r;
        var padding = 10;
        for(var i=0; i<500; i++) {
            r = Math.randomInt(3, 5);
            x = randomX().clamp(r, scope.config.width  - r);
            y = randomY().clamp(r, scope.config.height - r);
            
            // console.log(r, " ", x, " ", y);
            
            scope.bodies.push(new Body({"x": x, "y": y, "radius":r}));
        }
        
       // TODO: This is messy.  Find a better hueristic to determine how many collide() iterations we need.
        var numCollisions = 1,
            safety = 100, safetyCount = 0;
        while(numCollisions > 0) {
            numCollisions = collide(true);
            console.log("cols: ", numCollisions);
            safetyCount++;
            if (safetyCount > safety) {
                console.log("breaking");
                break;
            }
        };
        console.log("itrs: ", safetyCount);
        
        // Start / Stop sim.
        scope.canvas.onclick = toggleSim;
        // DEBUG CODE: Makes clicking thru iterations easy :)
        /*scope.canvas.onclick = function () {
            tick();
        }*/
    };
    
    scope.init();
    return scope;
}