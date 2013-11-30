var Human = function (config) {
    // Initialize Body "super-class".
    this.initBody(config);
    
    // Init Human "class".
    this.initHuman(config);
};

// ---------
// Constants
// ---------
Human.ALIVE  = 0;
Human.UNDEAD = 1;
Human.DEAD   = 2;

// ---------
// Initialization
// ---------
Human.prototype = Body.prototype;
Human.prototype.initHuman = function (config) {
    // Combat stats.
    this.stats = {
        defense: 10,
        attack: 10
    }
    
    // Possible values:
    // 0 = Alive
    // 1 = Undead
    // 2 = Dead
    this.status = config.status || 0;
}

// ---------
// Combat
// ---------
Human.prototype.attack = function (target) {
    var attack = Math.randomFloat(0, this.stats.attack);
    target.defend(this, attack);
};

Human.prototype.defend = function (attacker, strength) {
    var defemse = Math.randomFloat(0, this.stats.defense);
    if (defend < strength) {
        this.die();
    }
};

// ---------
// State/Status Change
// ---------
Human.prototype.die = function () {
    this.status++;
    switch (this.status) {
        // Undead
        case Human.UNDEAD:
            this.color = "#00ff00";
            break;
        // Dead
        case Human.DEAD:
            this.color = "#000";
    }
}