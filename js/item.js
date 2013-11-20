function Item (config) {
    // Possible values:
    // 0 - MedKit (Cure bite)
    // 1 - Weapon (Increased attack damage)
    // 2 - Armor  (Increased defense)
    this.type = config.type || Math.randomInt(0, 2);
    
    this.isUsed = config.isUsed || false;
    
    this.use = function (scope) {
        // TODO
    }
}