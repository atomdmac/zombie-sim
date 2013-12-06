var Human = Body.extend({
    stats: null,
    status: null,
    behavior: null,
    isTrans: null,
    
    init: function (config) {
        this._super(config);
        this.age      = typeof config.age === "number" ? config.age : 0;
        this.isTrans  = false;
        this.status   = config.status || Human.ALIVE;
        
        this.stats    = Object.merge({
            age: 0,
            age_status: 0
        }, this.stats);
        this.behavior = {
            "seeking": false,
            "fleeing": false,
            "wandering": false
        };
        
        this.applyStatus();
    },
    
    // ---------
    // Update
    // ---------
    tick: function () {
        // Happy birthday.
        this.stats.age++;
        this.stats.age_status++;
        
        // No longer transitioning.
        this.isTrans = false;
        
        // Reset stats.
        this.behavior.notices = false;
        this.behavior.seeking = false;
        this.behavior.fleeing = false;
        this.behavior.wandering = false;
        
        if (this.status < Human.DEAD) {
            this._super();
        } else if (this.age > 1000) {
            this.status = Human.ROTTED;
        }
    },
    
    draw: function (ctx) {
        var tmpClr = this.color;
        if(this.isTrans) this.color = "#fff";
        this._super(ctx);
        this.color = tmpClr;
        
        // Draw sight range.
        /*
        ctx.strokeStyle = "#ccc";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.stats.sight, 0, Math.PI*2, false);
        ctx.stroke();
        
        
        var badges = "";
        if (this.behavior.notices)   badges += "N";
        if (this.behavior.seeking)   badges += "S";
        if (this.behavior.fleeing)   badges += "F";
        if (this.behavior.wandering) badges += "W";
        
        ctx.font = "normal 8pt Arial";
        ctx.fillStyle = "white";
        ctx.fillText(badges, this.x-this.radius, this.y);
        */
    },
    
    // --------
    // Senses / Input
    // --------
    notice: function (target) {
        this.behavior.notices = true;
        if (this.status == Human.ALIVE) {
            if (target.status == Human.INFECTED) {
                this.flee(target);
            }
        }
        else if (this.status == Human.INFECTED) {
            if (target.status == Human.ALIVE) {
                this.seek(target);
            }
        }
    },
    
    // ---------
    // Behaviors
    // ---------
    seek: function (target) {
        this.behavior.seeking = true;
        this._super(target);
    },
    
    flee: function (target) {
        this.behavior.fleeing = true;
        this._super(target);
    },
    
    wander: function () {
        this.behavior.wandering = true;
        this._super();
    },
    
    // ---------
    // Combat
    // ---------
    isHostel: function (target) {
        if (target.status == this.status) {
            return false;
        } else {
            return true;
        }
    },
    
    attack: function (target){
        if (target.status == Human.DEAD) {
            return;
        }
        var attack = Math.randomFloat(0, this.stats.attack);
        target.defend(this, attack);
    },
    
    defend: function (attacker, strength) {
        var defense = Math.randomFloat(0, this.stats.defense);
        if (defense < strength) {
            this.die();
        }
    },
    
    // ---------
    // Status
    // ---------
    die: function () {
        if (this.status !== Human.DEAD) {
            this.status++;
        }
        this.isTrans = true;
        this.applyStatus();
    },
    
    applyStatus: function () {
        this.stats.age_status = 0;
        switch (this.status) {
            case Human.ALIVE:
                this.color = "#74a8ad";
                this.stats = Object.merge(this.stats, Human.ALIVE_STATS);
                break;
            case Human.INFECTED:
                this.color = "#ff7c7c";
                this.stats = Object.merge(this.stats, Human.INFECTED_STATS);
                break;
            case Human.DEAD:
                this.color = "#968d8d";
                this.stats = Object.merge(this.stats, Human.DEAD_STATS);
                break;
        }
    }
});

// ---------
// Constants
// ---------
Human.ALIVE  = 0;
Human.INFECTED = 1;
Human.DEAD   = 2;
Human.ROTTED = 3;

Human.ALIVE_STATS = {
    "sight"   : 100,
    "defense" : 8,
    "attack"  : 8
};

Human.INFECTED_STATS = {
    "sight"    : 70,
    "defense"  : 2,
    "attack"   : 10
};

Human.DEAD_STATS = {
    "sight"    : 0,
    "defense"  : 0,
    "attack"   : 0
};