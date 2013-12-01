var Human = Body.extend({
    stats: null,
    status: null,
    
    init: function (config) {
        this._super(config);
        this.status = config.status || Human.ALIVE;
        this.applyStatus();
    },
    
    // ---------
    // Update
    // ---------
    tick: function () {
        if (this.status < Human.DEAD) {
            this._super();
        }
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
        this.applyStatus();
    },
    
    applyStatus: function () {
        switch (this.status) {
            case Human.ALIVE:
                this.color = "blue";
                this.stats = Human.ALIVE_STATS;
                break;
            case Human.UNDEAD:
                this.color = "red";
                this.stats = Human.UNDEAD_STATS;
                break;
            case Human.DEAD:
                this.color = "#eee";
                this.stats = Human.DEAD_STATS;
                break;
        }
    }
});

// ---------
// Constants
// ---------
Human.ALIVE  = 0;
Human.UNDEAD = 1;
Human.DEAD   = 2;

Human.ALIVE_STATS = {
    "defense": 8,
    "attack" : 12
};

Human.UNDEAD_STATS = {
    "defense": 4,
    "attack": 6
};

Human.DEAD_STATS = {
    "defense": 0,
    "attack": 0
};